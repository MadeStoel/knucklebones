import { signInWithEmailAndPassword, signOut as firebaseSignOut, type User, type UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../firebase";

const { subscribe, set, update } = writable<{ isLoading: boolean, user: User | null }>({ isLoading: true, user: null });

function setLoading(isLoading: boolean = true): void {
    update(state => {
        return { ...state, isLoading }
    })
}

function signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
}

function register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
}

function signOut(): Promise<void> {
    return firebaseSignOut(auth);
}

export const userStore = {
    subscribe,
    set,
    update,
    signIn,
    signOut,
    setLoading,
    register
}