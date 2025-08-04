import React from 'react';

interface VectorLayerAttributesProps {
  geojsonData: GeoJSON.FeatureCollection | null;
  onSelectFeature?: (feature: GeoJSON.Feature, idx: number) => void;
  selectedIndex?: number | null;
}

// Affiche les attributs descriptifs de chaque feature (sans la géométrie)
const VectorLayerAttributes: React.FC<VectorLayerAttributesProps> = ({ geojsonData, onSelectFeature, selectedIndex }) => {
  if (!geojsonData || !geojsonData.features.length) {
    return <div className="p-4 text-gray-500">Aucune donnée vectorielle à afficher.</div>;
  }

  return (
    <div className="bg-white border-t border-gray-200 p-4 overflow-x-auto">
      <h2 className="font-semibold mb-2">Attributs des entités</h2>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {Object.keys(geojsonData.features[0].properties || {}).map((key) => (
              <th key={key} className="px-2 py-1 border-b font-bold text-left">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {geojsonData.features.map((feature, idx) => (
            <tr
              key={idx}
              className={selectedIndex === idx ? 'bg-blue-100 cursor-pointer' : 'hover:bg-blue-50 cursor-pointer'}
              onClick={() => onSelectFeature && onSelectFeature(feature, idx)}
            >
              {Object.keys(feature.properties || {}).map((key) => (
                <td key={key} className="px-2 py-1 border-b">{feature.properties ? feature.properties[key] : ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VectorLayerAttributes;
