import axios, { Method } from "axios"
export const getStreams = async (accessToken: string = "", limit = 1000): Promise<any> => {
    try {
        let data: any[] = []
        let cursor = null
        while (data.length < limit) {
            const url: string = cursor
                ? `https://api.twitch.tv/helix/streams?first=100&after=${cursor}`
                : `https://api.twitch.tv/helix/streams?first=100`
            const config = {
                method: "get" as Method,
                url,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Client-Id": process.env.TWITCH_CLIENT_ID,
                },
            }
            const response: any = await axios(config)
            data = data.concat(response.data.data)
            cursor = response.data.pagination.cursor
        }
        return data
    } catch (error) {
        return []
    }
}
