export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const endPoints = {
  getVideos: `${baseUrl}Videos`,
  getReplies: `${baseUrl}replies`,
  getComments: `${baseUrl}comments`,

  //Healing - Real APIS
  auth: `auth/login`,
  getGroupUsers: (groupId: string | null, courseId: string | null) =>
    `Users/getGroupUsers/?groupId=${groupId}&courseId=${courseId}`,
  getSessionsByGroupId: (groupId: string | null) =>
    `Videos/getSessionsByGroupId/${groupId}`,
  getRecommendedVideos: (groupId: string | null) =>
    `Videos/getAllRecommended/${groupId}`,
  getCommentByVideoId: (videoId: string | null) =>
    `Comments/getCommentsByVideoId/${videoId}`,
  getUser: (userId: string | null) => `Users/getOne/${userId}`,
  getUserProfile: (userId: string | null) => `Users/getProfile/${userId}`,
  getUserAttachments: (userId: string | null) =>
    `Attachments/getUserFiles/${userId}`,
  updateUser: (userId: string | null) => `Users/update/${userId}`,
  createReply: (commentId: string | null) =>
    `ReplayComments/createReplayComment/${commentId}`,
  getRepliesByCommentId: (commentId: string | null) =>
    `ReplayComments/getAllReplies/${commentId}`,
  getCoursesByCategoryId: (categoryId: string | null) =>
    `Courses/getByCategory/${categoryId}`,
  getCourses: `Courses/`,
  getCourseById: (courseId: string | null) => `Courses/getOne/${courseId}`,
};
