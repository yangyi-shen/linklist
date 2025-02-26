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
import { InitLinkListData, LinkListData } from './schemas/LinkList';

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
        await set(newUserRef, data);
        const newUserId = newUserRef.key;

        const newUserLinkListData: InitLinkListData = {
            userId: newUserId,
            name: 'main',
        }
        const newUserLinkListId = await createLinkList(newUserLinkListData);

        const newUserLinkData: LinkData = {
            userId: newUserId,
            linkListId: newUserLinkListId,
            name: 'welcome to the linklist platform',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        }
        await createLink(newUserLinkData);

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
export async function createLinkList(data: InitLinkListData) {
    try {
        const newLinkListRef = push(ref(db, `linklists`))
        await set(newLinkListRef, data);
        return newLinkListRef.key;
    } catch (error) {
        console.error('Error creating link list:', error);
        throw error;
    }
}

export async function getLinklist(linkListId: string): Promise<LinkListData | null> {
    try {
        const snapshot = await get(ref(db, `linklists/${linkListId}`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error('Error reading link list:', error);
        throw error;
    }
}

// link operations
export async function createLink(data: LinkData): Promise<string> {
    try {
        const newLinkRef = push(ref(db, `links`))
        await set(newLinkRef, data);
        return newLinkRef.key;
    } catch (error) {
        console.error('Error creating link:', error);
        throw error;
    }
}