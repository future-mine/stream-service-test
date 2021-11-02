export const convertToBoolean = (input: string | undefined): boolean | undefined => {
    if (input == undefined) {
        return false
    }

    try {
        return JSON.parse(input) as boolean
    } catch (e) {
        return undefined
    }
}

export const convertToNumber = (input: string): number | undefined => {
    try {
        return JSON.parse(input) as number
    } catch {
        return undefined
    }
}

export const clearEmojis = (input: string): string => {
    return input.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
    )
}
