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

                console.log(
                    `Found using ${p.name}:`
                );

                console.log(match[1]);

                return match[1];
            }
        }

        console.log(
            "No channel ID found."
        );

        return null;

    } catch (err) {

        console.log(
            "Error:",
            err.message
        );

        return null;
    }
}

getYoutubeChannelId(
   "https://www.youtube.com/@RickOrford"
);
