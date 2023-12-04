export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const endPoints = {
  getVideos: `${baseUrl}Videos`,
  getReplies: `${baseUrl}replies`,
  getComments: `${baseUrl}comments`,

  //Healing - Real APIS
  auth: `auth/login`,
  getGroupUsers: (groupId: string | null, courseId: string | null) =>
    `users/getGroupUsers/?groupId=${groupId}&courseId=${courseId}`,
  getSessionsByGroupId: (groupId: string | null) =>
    `videos/getSessionsByGroupId/${groupId}`,
  getRecommendedVideos: (groupId: string | null) =>
    `videos/getAllRecommended/${groupId}`,
  getCommentByVideoId: (videoId: string | null) =>
    `comments/getCommentsByVideoId/${videoId}`,
  getUser: (userId: string | null) => `users/getOne/${userId}`,
  getUserProfile: (userId: string | null) => `users/getProfile/${userId}`,
  getUserAttachments: (userId: string | null) =>
    `attachments/getUserFiles/${userId}`,
};
