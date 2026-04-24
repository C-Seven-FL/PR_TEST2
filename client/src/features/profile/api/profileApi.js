import { env } from "../../../shared/config/env";
import { httpClient } from "../../../shared/lib/api/httpClient";
import {
  getCurrentMockUser,
  updateCurrentMockUserProfile,
} from "../../../shared/lib/auth/mockAuth";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const profileApiConfig = {
  path: env.userProfilePath,
};

function mapMockUserToProfile(user) {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    name: user.profile?.name || user.displayName || "",
    address: user.profile?.address || "",
    phone_number: user.profile?.phone_number || "",
    mail: user.email || "",
    notifications: Array.isArray(user.profile?.notifications)
      ? user.profile.notifications
      : [],
    notification_turn:
      typeof user.profile?.notification_turn === "boolean"
        ? user.profile.notification_turn
        : true,
  };
}

function mapApiProfile(data, fallbackUser) {
  return {
    id: data?.id || data?._id || fallbackUser?.uid || "",
    name: data?.name || fallbackUser?.displayName || "",
    address: data?.address || "",
    phone_number: data?.phone_number || data?.phoneNumber || "",
    mail: data?.mail || data?.email || fallbackUser?.email || "",
    notifications: Array.isArray(data?.notifications) ? data.notifications : [],
    notification_turn:
      typeof data?.notification_turn === "boolean"
        ? data.notification_turn
        : typeof data?.notificationTurn === "boolean"
          ? data.notificationTurn
          : true,
  };
}

export async function fetchUserProfile(currentUser) {
  if (env.useMockAuth) {
    await sleep(220);
    return mapMockUserToProfile(getCurrentMockUser());
  }

  const { data } = await httpClient.get(profileApiConfig.path);
  return mapApiProfile(data?.data || data, currentUser);
}

export async function updateUserProfile(payload, currentUser) {
  if (env.useMockAuth) {
    await sleep(260);
    return mapMockUserToProfile(updateCurrentMockUserProfile(payload));
  }

  const { data } = await httpClient.put(profileApiConfig.path, payload);
  return mapApiProfile(data?.data || data, currentUser);
}