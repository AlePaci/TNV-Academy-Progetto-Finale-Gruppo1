
    export interface FriendRequest {
        id: number;
        sender: number;
        receiver: number;
    }

    export interface FriendRequestData {
        request: FriendRequest;
        message: string;
    }

    export interface NewRequest {
        sender: number;
        receiver: number;
    }
    export interface StoreFriend{
        id: number;
        name: string;
    }

    export interface Friend {
        id: number;
        friendA: number;
        friendB: number;
    }

    export interface FriendData {
        friend: Friend;
        message: string;
    }

    export interface NewFriend{
        friendA: number;
        friendB: number;
    }
    