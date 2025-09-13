import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: 12,
    });

    // Mapea cada página a { url, link }
    const images = response.results
      .map((page) => {
        const props = page.properties;
        const fileObj =props.Image?.files?.[0]; // 👈 nombre de tu columna "Imagen"
        const link = props.Link?.url || null;     // 👈 opcional, si tienes columna "Link"
        return fileObj
          ? {
              url: fileObj.file?.url || fileObj.external?.url,
              link,
            }
          : null;
      })
      .filter(Boolean);

    res.status(200).json(images);
  } catch (error) {
    console.error("❌ Error en Notion API:", error.body || error);
    res.status(500).json({ error: "No pude cargar datos de Notion" });
  }
}
