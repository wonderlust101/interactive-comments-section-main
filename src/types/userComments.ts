type UserImageType = {
    png: string;
    webp: string;
};

export type UserType = {
    image: UserImageType;
    username: string;
};

export type ReplyType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: UserType;
};

export type CommentType = {
    id: number;
    content: string;
    createdAt: string;
    score: number;
    user: UserType;
    replies: ReplyType[];
};

export type CommentsDataType = {
    currentUser: UserType;
    comments: CommentType[];
};