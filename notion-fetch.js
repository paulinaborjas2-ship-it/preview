const { Client } = require('@notionhq/client');

const notion = new Client({ auth: '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' });
const databaseId = '26b98a091a818080901bcca3fe1612e2';

async function getInstagramPosts() {
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map(page => {
    // Cambia los nombres de las propiedades según tu base de Notion si es necesario
    const image = page.properties.Image?.files?.[0]?.file?.url || '';
    const date = page.properties.Date?.date?.start || '';
    const name = page.properties.Name?.title?.[0]?.plain_text || '';
    return { image, date, name };
  });
}

module.exports = { getInstagramPosts };
