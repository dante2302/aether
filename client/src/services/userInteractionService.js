const likeUrl = "http://localhost:5155/likes"
const dislikeUrl = "http://localhost:5155/dislikes"
const saveUrl = "http://localhost:5155/saves"
import * as request from "./request"

export async function likePost(userData, postId)
{
    return await request.post({
        url: `${likeUrl}`,
        accessToken: userData.accessToken,
        bodyData: {
            ownerId: userData.id,
            postId
        }
    });
}

export async function dislikePost(userData, postId)
{
    return await request.post({
        url: `${dislikeUrl}`,
        accessToken: userData.accessToken,
        bodyData: {
            ownerId: userData.id,
            postId
        }
    });
}

export async function removeDislike(userData, postId)
{
  return await request.Delete({
    url: `${dislikeUrl}?postId=${postId}&userId=${userData.id}`,
    accessToken: userData.accessToken
  });
}

export async function removeLike(userData, postId)
{
  return await request.Delete({
    url: `${likeUrl}?postId=${postId}&userId=${userData.id}`,
    accessToken: userData.accessToken
  });
}

export async function getUserLikes(id){
  return await request.get(`${likeUrl}/${id}`);
}

export async function getUserDislikes(id){
  return await request.get(`${dislikeUrl}/${id}`);
}