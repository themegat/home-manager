export class User {
    uid: string;
    email: string;
    photoUrl?: string;
    displayName?: string;
    token: string;
    refreshToken: string;
    lastSignInTime: string;

    constructor(uid: string, email: string, photoUrl: string, displayName: string, token: string, refreshToken: string, lastSignInTime: string) {
        this.uid = uid;
        this.email = email;
        this.photoUrl = photoUrl;
        this.displayName = displayName;
        this.token = token;
        this.refreshToken = refreshToken;
        this.lastSignInTime = lastSignInTime;
    }
}