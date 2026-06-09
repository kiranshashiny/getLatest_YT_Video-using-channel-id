# getLatest_YT_Video-using-channel-id


nodetest/test folder

node getlatestvideo.js



shows the transcripts, and goes to LLM to get a conclusion 



listofurls.js

```
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

```
