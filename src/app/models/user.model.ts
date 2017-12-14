export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    profileName: string;
    constructor(obj: Object = {}) {
        Object.assign(this, obj);
    }
}
