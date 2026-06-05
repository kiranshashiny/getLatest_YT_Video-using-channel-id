const axios = require("axios");

async function getYoutubeChannelId(url) {

    try {

        const response =
            await axios.get(url, {
                headers: {
                    "User-Agent":
                    "Mozilla/5.0"
                }
            });

        const html = response.data;

        const patterns = [

            {
                name: "channelId",
                regex: /"channelId":"(UC[^"]+)"/
            },

            {
                name: "externalId",
                regex: /"externalId":"(UC[^"]+)"/
            },

            {
                name: "browseId",
                regex: /"browseId":"(UC[^"]+)"/
            }

        ];

        for (const p of patterns) {

            const match =
                html.match(p.regex);

            if (match) {

                return {
                    url,
                    method: p.name,
                    channelId: match[1]
                };
            }
        }

        return {
            url,
            method: "not found",
            channelId: null
        };

    } catch (err) {

        return {
            url,
            method: "error",
            channelId: err.message
        };
    }
}

async function run() {

    const urls = [

        "https://www.youtube.com/@RickOrford",

        "https://www.youtube.com/@MarketBeatMedia",

        "https://www.youtube.com/@YahooFinance",

        "https://www.youtube.com/@CNBC"
    ];

    for (const url of urls) {

        const result =
            await getYoutubeChannelId(url);

        console.log(result);
    }
}

run();
