This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Set up Mapbox API key
```

Set Mapbox API key in `local.env` file in route directory:

    NEXT_PUBLIC_MAPBOX_TOKEN=

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[http://localhost:3000/api/hello](http://localhost:3000/api/hello) is an endpoint that uses [Route Handlers](https://beta.nextjs.org/docs/routing/route-handlers). This endpoint can be edited in `app/api/hello/route.ts`.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Useful Resources

Tutorials, Stackoverflow Q&As, and any other references:

- [TailwindCSS Documentation](https://tailwindcss.com/docs/installation) - learn about TailwindCSS.
- [React-Table Component](https://dev.to/serhatgenc/creating-a-reusable-table-component-with-react-table-and-material-ui-10jd) - Creating a reusable table component with React-Table.
- [Paginate an array](https://ilikekillnerds.com/2020/09/how-to-paginate-an-array-in-javascript/) - How to paginate an array in JavaScript.
- [React Papaparse Documentation](https://react-papaparse.js.org/docs) - React CSV parser.
- [React-Map-Gl](https://visgl.github.io/react-map-gl/docs) - React wrapper for Mapbox GL JS.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
