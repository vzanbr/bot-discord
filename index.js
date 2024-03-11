import { Client, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import { google } from "googleapis";
import { schedule } from "node-cron";

config();

const Client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds
    ]
})

const youtubeClient = google.youtube({
        version: "v3",
        auth: process.env.YOUTUBE_API_KEY
})

let lastVideoId = ''

discordClient.login(process.env.DISCORD_TOKEN)

discordClient.on('ready', () => {
    console.log('Bot online, logado como : ${discordClient.user.tag}')
    checkNewVideos()
    schedule("0 * * *", checkNewVideos)
})

async function checkNewVideos() {
    try {
        const response = await youtubeClient.search.list({
            channelId: UCbtAlJgX6iZwAP5S3vrwkiw,
            order: "date",
            part: "snippet",
            maxResults: 1
        }).then(res => res)
        const lastVideo = response.data.items[0]
        if(lastVideo?.id?.videoId != lastVideoId) {
            lastVideoId = lastVideo?.id?.videoId
            const videoUrl = "url do video, {lastVideo}"
            const message = "confira o ultimo video"
            const channel = discordClient.channels.cache.get(UCbtAlJgX6iZwAP5S3vrwkiw)
            channel.send(message + videoUrl)
        }
    } catch (error) {
        console.log( "Erro ao buscar video ")
        console.log(error)
    }
}