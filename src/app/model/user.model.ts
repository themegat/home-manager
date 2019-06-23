export class User {
    uid: string;
    email: string;
    photoUrl?: string;
    displayName?: string;

    constructor(uid: string, email: string, photoUrl: string, displayName: string) {
        this.uid = uid;
        this.email = email;
        this.photoUrl = photoUrl;
        this.displayName = displayName;
    }
}