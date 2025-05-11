import data from "/data/data.json";
import type { CommentType, ReplyType, UserType } from "@/types/userComments";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CommentSlice = {
    comments: CommentType[];
    userData: UserType;
    numOfComments: number;
}

type AddReplyPayload = {
    commentId: number;
    reply: ReplyType;
}

type UpdateCommentPayload = {
    commentId: number;
    newContent: string;
};

const initialState = (): CommentSlice => {
    const storedComments = localStorage.getItem("commentsData");
    const storedUser = localStorage.getItem("userData");
    const numOfComments = localStorage.getItem("numOfComments");

    if (storedComments && storedUser && numOfComments) {
        return {
            comments     : JSON.parse(storedComments),
            userData     : JSON.parse(storedUser),
            numOfComments: JSON.parse(numOfComments)
        };
    }

    localStorage.setItem("commentsData", JSON.stringify(data.comments));
    localStorage.setItem("userData", JSON.stringify(data.currentUser));
    localStorage.setItem("numOfComments", JSON.stringify(4));

    return {
        comments     : data.comments,
        userData     : data.currentUser,
        numOfComments: 4
    };
};

const commentSlice = createSlice({
    name    : "comments",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<CommentType>) => {
            action.payload.id = state.numOfComments + 1;
            state.numOfComments = action.payload.id;
            state.comments.push(action.payload);

            localStorage.setItem("commentsData", JSON.stringify(state.comments));
            localStorage.setItem("numOfComments", JSON.stringify(state.numOfComments));
        },
        addReply  : (state, action: PayloadAction<AddReplyPayload>) => {
            action.payload.reply.id = state.numOfComments + 1;
            state.numOfComments = action.payload.reply.id;

            const comment = state.comments.find(comment => comment.id === action.payload.commentId);
            if (comment) {
                comment.replies.push(action.payload.reply);
            } else {
                console.log("Comment not found");
            }

            localStorage.setItem("commentsData", JSON.stringify(state.comments));
            localStorage.setItem("numOfComments", JSON.stringify(state.numOfComments));
        },
        deleteComment: (state, action: PayloadAction<number>) => {
            const topLevelIndex = state.comments.findIndex(comment => comment.id === action.payload);

            if (topLevelIndex !== -1) {
                state.comments.splice(topLevelIndex, 1);
            } else {
                for (const comment of state.comments) {
                    const replyIndex = comment.replies.findIndex(reply => reply.id === action.payload);

                    if (replyIndex !== -1) {
                        comment.replies.splice(replyIndex, 1);
                        break;
                    }
                }
            }
            state.numOfComments =- 1;

            localStorage.setItem("commentsData", JSON.stringify(state.comments));
            localStorage.setItem("numOfComments", JSON.stringify(state.numOfComments));
        },
        updateComment(state, action: PayloadAction<UpdateCommentPayload>) {
            const { commentId, newContent } = action.payload;

            const topLevelIndex = state.comments.findIndex(comment => comment.id === commentId);
            if (topLevelIndex !== -1) {
                state.comments[topLevelIndex].content = newContent;
            } else {
                for (const comment of state.comments) {
                    const replyIndex = comment.replies.findIndex(reply => reply.id === commentId);

                    if (replyIndex !== -1) {
                        comment.replies[replyIndex].content = newContent;
                        break;
                    }
                }
            }

            localStorage.setItem("commentsData", JSON.stringify(state.comments));
            localStorage.setItem("numOfComments", JSON.stringify(state.numOfComments));
        }
    }
});

export const {addComment, addReply, deleteComment, updateComment} = commentSlice.actions;
export default commentSlice.reducer;