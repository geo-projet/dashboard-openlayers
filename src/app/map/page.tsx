'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import OLMap from '@/components/Map';
import LayerSwitcher, { basemaps } from '@/components/LayerSwitcher';
import VectorLayerAttributes from '@/components/VectorLayerAttributes';
import GeoJSON from 'ol/format/GeoJSON';

export default function MapPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [geojsonData, setGeojsonData] = useState(null);
  const [selectedBasemap, setSelectedBasemap] = useState(basemaps[0].id);
  const [thematicLayerVisible, setThematicLayerVisible] = useState(true);
  const [attributesOpen, setAttributesOpen] = useState(false);
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number | null>(null);
  const [initialExtent, setInitialExtent] = useState<[number, number, number, number] | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
    if (status === 'authenticated') {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/data');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          const data = await response.json();
          setGeojsonData(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [status, router]);

  // Calculer l'étendue initiale de la carte après chargement des données
  useEffect(() => {
    if (geojsonData && geojsonData.features.length > 0) {
      const format = new GeoJSON();
      const features = format.readFeatures(geojsonData, { featureProjection: 'EPSG:3857' });
      let globalExtent: [number, number, number, number] | null = null;
      features.forEach((f: any) => {
        const geom = f.getGeometry?.();
        if (geom) {
          const ext = geom.getExtent();
          if (!globalExtent) {
            globalExtent = ext;
          } else {
            globalExtent = [
              Math.min(globalExtent[0], ext[0]),
              Math.min(globalExtent[1], ext[1]),
              Math.max(globalExtent[2], ext[2]),
              Math.max(globalExtent[3], ext[3]),
            ];
          }
        }
      });
      if (globalExtent) {
        setInitialExtent(globalExtent);
      }
    }
  }, [geojsonData]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen"><p>Chargement de la session...</p></div>;
  }

  if (!session) {
    return null;
  }

  return (
    <main className="h-screen flex flex-col">
      <header className="flex-shrink-0 flex items-center justify-between p-2 bg-white border-b border-gray-200 z-10" style={{ minHeight: '48px', height: '48px' }}>
        <div>
          <h1 className="text-lg font-bold">Votre Carte Personnalisée</h1>
          <p className="text-xs text-gray-500">Connecté en tant que {session.user?.name}</p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Déconnexion
        </button>
      </header>

      <div className="flex-grow relative">
        {geojsonData ? (
          <>
            <LayerSwitcher 
              selectedBasemap={selectedBasemap} 
              onBasemapChange={setSelectedBasemap} 
              thematicLayerVisible={thematicLayerVisible}
              onThematicLayerToggle={setThematicLayerVisible}
            />
            <OLMap 
              geojsonData={geojsonData} 
              basemapId={selectedBasemap} 
              thematicLayerVisible={thematicLayerVisible} 
              selectedFeatureIndex={selectedFeatureIndex}
              initialExtent={initialExtent}
            />
            {/* Bouton pour ouvrir/fermer la composante attributs */}
            <div className="absolute bottom-5 left-0 w-full z-20 flex flex-col items-end">
              <button
                className="m-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
                onClick={() => setAttributesOpen((open) => !open)}
              >
                {attributesOpen ? 'Fermer les attributs' : 'Afficher les attributs'}
              </button>
              {attributesOpen && (
                <VectorLayerAttributes 
                  geojsonData={geojsonData} 
                  onSelectFeature={(_, idx) => setSelectedFeatureIndex(selectedFeatureIndex === idx ? null : idx)}
                  selectedIndex={selectedFeatureIndex}
                />
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Chargement de la carte...</p>
          </div>
        )}
      </div>
    </main>
  );
}