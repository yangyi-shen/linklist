import { initializeApp } from 'firebase/app';
import {
    getDatabase,
    ref,
    set,
    get,
    push,
} from 'firebase/database';
import 'dotenv/config';

import { InitUserData, User } from './schemas/User';

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
        return newUserRef.key;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function getUser(userId: string): Promise<User | null> {
    try {
        const snapshot = await get(ref(db, `users/${userId}`));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error('Error reading user:', error);
        throw error;
    }
}