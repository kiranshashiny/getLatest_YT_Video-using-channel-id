const axios = require("axios");

async function getChannelId(url) {

   const html =
      (await axios.get(url)).data;

   const match =
      html.match(/"channelId":"(UC[^"]+)"/);

   if (match)
      console.log(match[1]);
   else
      console.log("Not found");
}

getChannelId(
    "https://www.youtube.com/@MarketBeatMedia"
);
