// api/notion-images.js
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;

    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: 12,
    });

    const images = response.results
      .map((page) => {
        const props = page.properties;
        const fileObj = props.Image?.files?.[0]; // 👈 usa el nombre exacto de tu columna en Notion
        if (fileObj) {
          return {
            url: fileObj.file?.url || fileObj.external?.url,
          };
        }
        return null;
      })
      .filter(Boolean);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

