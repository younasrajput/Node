const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeBitcointalk() {
  // Make a GET request to the BitcoinTalk forums page
  const response = await axios.get('https://bitcointalk.org/index.php?board=1.0');

  // Load the HTML of the page into cheerio
  const $ = cheerio.load(response.data);

  // Select all of the topic rows from the table on the page
  const topicRows = $('table.bordercolor tr td.windowbg');

  // Loop through each topic row and extract the title and URL
  const topics = [];
  topicRows.each((i, row) => {
    const title = $(row).find('a.subject').text().trim();
    const url = $(row).find('a.subject').attr('href');
    topics.push({ title, url });
  });

  return topics;
}

scrapeBitcointalk().then(topics => {
  console.log(topics);
});
