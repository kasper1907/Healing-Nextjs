const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const endPoints = {
    getVideos: `${baseUrl}Videos`,
    getReplies: `${baseUrl}Replies`,
    getComments: `${baseUrl}comments`,
}