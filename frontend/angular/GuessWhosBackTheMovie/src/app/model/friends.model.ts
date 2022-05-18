
    export interface FriendRequest {
        id: number;
        sender: number;
        receiver: number;
    }

    export interface FriendRequestData {
        request: Request;
        message: string;
    }

    export interface NewRequest {
        sender: number;
        receiver: number;
    }
    