import { defineConfig } from "sanity";
// import { deskTool } from "sanity/desk";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";

export default defineConfig({
  name: "sanity-nextjs-site",
  title: "Sanity Next.js Site",
  basePath: "/studio",
  projectId: "g6rf683r",
  dataset: "production",
  plugins: [structureTool(), visionTool(), codeInput(), table()],
  schema: { types: schemaTypes },
});
