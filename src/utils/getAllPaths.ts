import { writeFileSync } from "node:fs";
import { join } from "node:path";
export async function generateRoutes() {
  const allRoutes = await getStaticPaths();

  // Save the routes to a JSON file
  const routesFilePath = join(process.cwd(), "routes.json");
  writeFileSync(routesFilePath, JSON.stringify(allRoutes, null, 2));

  console.log(`Routes saved to ${routesFilePath}`);
}

// Assuming you have this function in your Astro configuration
async function getStaticPaths() {
  // Your existing getStaticPaths implementation
  return [
    { url: "/", component: "index.astro" },
    { url: "/about", component: "about.astro" },
    // Add more routes here
  ];
}
