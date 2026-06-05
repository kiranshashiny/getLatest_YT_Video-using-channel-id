const axios = require("axios");

async function getChannelId(url) {

    const html =
      (await axios.get(url)).data;

    const patterns = [
      /"externalId":"(UC[^"]+)"/,
      /"channelId":"(UC[^"]+)"/,
      /"browseId":"(UC[^"]+)"/
    ];

    for (const p of patterns) {

        const match = html.match(p);

        if (match) {
            console.log(match[1]);
            return;
        }
    }

    console.log("Not found");
}

getChannelId(
 "https://www.youtube.com/@RickOrford"
);
