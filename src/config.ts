export const port = process.env.PORT || 5001
export const host =
    process.env.NODE_ENV === "dev"
        ? `http://localhost:${port}`
        : "https://twitch-stream-test.herokuapp.com"
