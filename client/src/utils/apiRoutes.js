import { config } from "./Constants";

export const host = config.url.API_URL;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setProfilePictureRoute = `${host}/api/auth/setprofilepicture`;
export const getAllUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
