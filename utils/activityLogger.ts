import { db } from '../firebase.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export type ActivityType = 'login' | 'post_created' | 'post_published' | 'user_created' | 'settings_updated' | 'content_deleted' | 'user_deleted';

export interface LogActivityParams {
  type: ActivityType;
  user: string;
  description: string;
  details?: string;
}

/**
 * Log an activity to Firestore
 */
export const logActivity = async (params: LogActivityParams) => {
  try {
    await addDoc(collection(db, 'activities'), {
      type: params.type,
      user: params.user,
      description: params.description,
      details: params.details || '',
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

/**
 * Log user login
 */
export const logUserLogin = async (userEmail: string) => {
  await logActivity({
    type: 'login',
    user: userEmail,
    description: `${userEmail} logged in`,
  });
};

/**
 * Log post creation
 */
export const logPostCreated = async (userName: string, postTitle: string, postId: string) => {
  await logActivity({
    type: 'post_created',
    user: userName,
    description: `Created post: ${postTitle}`,
    details: `Post ID: ${postId}`,
  });
};

/**
 * Log post publication
 */
export const logPostPublished = async (userName: string, postTitle: string, postId: string) => {
  await logActivity({
    type: 'post_published',
    user: userName,
    description: `Published post: ${postTitle}`,
    details: `Post ID: ${postId}`,
  });
};

/**
 * Log user creation
 */
export const logUserCreated = async (adminName: string, newUserEmail: string, newUserId: string) => {
  await logActivity({
    type: 'user_created',
    user: adminName,
    description: `Created user: ${newUserEmail}`,
    details: `User ID: ${newUserId}`,
  });
};

/**
 * Log settings update
 */
export const logSettingsUpdated = async (userName: string, settingsKey: string, newValue: string) => {
  await logActivity({
    type: 'settings_updated',
    user: userName,
    description: `Updated settings: ${settingsKey}`,
    details: `New value: ${newValue}`,
  });
};

/**
 * Log content deletion
 */
export const logContentDeleted = async (userName: string, contentTitle: string, contentId: string) => {
  await logActivity({
    type: 'content_deleted',
    user: userName,
    description: `Deleted content: ${contentTitle}`,
    details: `Content ID: ${contentId}`,
  });
};

/**
 * Log user deletion
 */
export const logUserDeleted = async (adminName: string, deletedUserEmail: string, deletedUserId: string) => {
  await logActivity({
    type: 'user_deleted',
    user: adminName,
    description: `Deleted user: ${deletedUserEmail}`,
    details: `User ID: ${deletedUserId}`,
  });
};
