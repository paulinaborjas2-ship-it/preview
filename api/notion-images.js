const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });

module.exports = async (req, res) => {
  const databaseId = '26b98a091a818080901bcca3fe1612e2';

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      page_size: 12,
    });

    const images = response.results
      .map(page => {
        const files = page.properties.Image?.files || [];
        if (files.length > 0) {
          let url = files[0].file?.url || files[0].external?.url;
          return url ? { url } : null;
        }
        return null;
      })
      .filter(Boolean);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
