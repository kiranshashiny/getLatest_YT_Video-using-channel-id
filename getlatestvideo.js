const axios = require("axios");
const xml2js = require("xml2js");

const channelUrls = [

    "https://www.youtube.com/@RickOrford",

    "https://www.youtube.com/@MarketBeatMedia",

    "https://www.youtube.com/@YahooFinance",

    "https://www.youtube.com/@CNBC"

];

async function getChannelId(url) {

    try {

        const response =
            await axios.get(url, {
                headers: {
                    "User-Agent":
                    "Mozilla/5.0"
                }
            });

        const html =
            response.data;

        const patterns = [

            /"channelId":"(UC[^"]+)"/,

            /"externalId":"(UC[^"]+)"/,

            /"browseId":"(UC[^"]+)"/

        ];

        for (const pattern of patterns) {

            const match =
                html.match(pattern);

            if (match) {

                return match[1];
            }
        }

        return null;

    } catch (err) {

        console.log(
            "Channel lookup error:",
            url
        );

        return null;
    }
}

async function getLatestVideo(channelId) {

    try {

        const feedUrl =
          `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

        const response =
            await axios.get(feedUrl);

        const parser =
            new xml2js.Parser();

        const result =
            await parser.parseStringPromise(
                response.data
            );

        const latest =
            result.feed.entry[0];

        return {

            title:
                latest.title[0],

            published:
                latest.published[0],

            videoId:
                latest["yt:videoId"][0]

        };

    } catch (err) {

        return null;
    }
}

async function run() {

    for (const url of channelUrls) {

        console.log(
            "\n=========================="
        );

        console.log(
            "Channel URL:",
            url
        );

        const channelId =
            await getChannelId(url);

        if (!channelId) {

            console.log(
                "Channel ID not found"
            );

            continue;
        }

        console.log(
            "Channel ID:",
            channelId
        );

        const latest =
            await getLatestVideo(
                channelId
            );

        if (!latest) {

            console.log(
                "Could not fetch latest video"
            );

            continue;
        }

        console.log(
            "Latest Video:",
            latest.title
        );

        console.log(
            "Uploaded:",
            latest.published
        );

        console.log(
            "Video URL:",
            `https://youtube.com/watch?v=${latest.videoId}`
        );
    }
}

run();
