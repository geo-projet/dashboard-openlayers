# Dashboard OpenLayers (Next.js)

This project is a web mapping dashboard built with [Next.js](https://nextjs.org) and [OpenLayers](https://openlayers.org). It allows you to visualize vector layers, switch basemaps, and interact with map features.

## Features
- Interactive map with OpenLayers
- Vector layer attribute table (selectable rows, zoom to feature)
- Basemap switching (OSM, Carto, Satellite, etc.)
- Authentication (NextAuth)
- Responsive UI

## Installation

First, clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Running the Project

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

## Usage
- Log in to access the map dashboard.
- Use the basemap switcher to change the background map.
- Load vector data and view its attributes in the table below the map.
- Click a row in the attribute table to zoom to the corresponding feature on the map. Click again to deselect and reset the view.

## Customization
- Edit `src/app/map/page.tsx` and `src/components/Map.tsx` to customize map logic.
- Edit `src/components/VectorLayerAttributes.tsx` to change the attribute table behavior.

## Environment Configuration

You must create a `.env.local` file at the root of the project with your geospatial database connection parameters. Example:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
```

Refer to your database provider's documentation for the correct values.

## Deployment

To deploy, follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) or use [Vercel](https://vercel.com/).

## Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [OpenLayers Documentation](https://openlayers.org/doc/)
- [NextAuth Documentation](https://next-auth.js.org/)

---

Made with Next.js & OpenLayers.
