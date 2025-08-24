import { userJwtClaims } from "./auth";

export class User {
    public socket: WebSocket;
    public isGuest?: boolean;
    public userId: string;
    public name: string;

    constructor(socket: WebSocket, userJwtClaims: userJwtClaims) {
        this.socket = socket;
        this.userId = userJwtClaims.userId;
        this.name = userJwtClaims.name;
        this.isGuest = userJwtClaims.isGuest;
    }
}

class SocketManager {
    private static instance: SocketManager
}