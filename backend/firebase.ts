import { initializeApp } from 'firebase/app';
import {
    getDatabase,
    ref,
    set,
    get,
    push,
} from 'firebase/database';
import 'dotenv/config';

import { UserData, InitUserData } from './schemas/User';
import { LinkData } from './schemas/Link';
import { LinkListData } from './schemas/LinkList';

// initialize Firebase
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "linklist-309a5",
    storageBucket: "linklist-309a5.firebasestorage.app",
    appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// user operations
export async function createUser(data: InitUserData): Promise<string> {
    try {
        const newUserRef = push(ref(db, `users`));
        await set(newUserRef, {
            ...data,
            linkLists: { // initialize every new account with a 'main' linklist containing a rickroll
                'main': {
                    links: {
                        'welcome to the linklist platform': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                    }
                }
            }
        });
        return newUserRef.key;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUser(userId: string): Promise<UserData | null> {
    try {
        const snapshot = await get(ref(db, `users/${userId}`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error('Error reading user:', error);
        throw error;
    }
}

// linklist operations
export async function createLinkList(userId: string, data: LinkListData) {
    try {
        const newLinkListRef = push(ref(db, `users/${userId}/linklists`))
        await set(newLinkListRef, data);
        return newLinkListRef.key;
    } catch (error) {
        console.error('Error creating link list:', error);
        throw error;
    }
}

// link operations
export async function createLink(userId: string, linkListId: string, data: LinkData): Promise<string> {
    try {
        const newLinkRef = push(ref(db, `users/${userId}/linklists/${linkListId}/links`))
        await set(newLinkRef, data);
        return newLinkRef.key;
    } catch (error) {
        console.error('Error creating link:', error);
        throw error;
    }
}