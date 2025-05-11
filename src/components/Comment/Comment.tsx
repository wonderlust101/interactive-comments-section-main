import { useSelector } from "@/app/store";
import AddComment from "@/components/AddComment";
import Button from "@/components/Button";
import CommentActions from "@/components/Comment/components/CommentActions";
import LikesCounter from "@/components/Comment/components/LikesCounter";
import { addReply, deleteComment, updateComment } from "@/components/CommentsList/commentSlice";
import type { CommentType, ReplyType } from "@/types/userComments";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Comment.scss";

type CommentProps = {
    comments: CommentType|ReplyType;
    originalCommentId?: number;
}

function isReply(comment: CommentType|ReplyType): comment is ReplyType {
    return "replyingTo" in comment;
}

export default function Comment({comments, originalCommentId}: CommentProps) {
    const [addComment, setAddComment] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [editCommentText, setEditCommentText] = useState('');

    const dispatch = useDispatch();
    const numOfComments = useSelector(state => state.comment.numOfComments);
    const userData = useSelector(state => state.comment.userData);

    function handleToggleAddComment() {
        setAddComment(!addComment);
    }

    function handleAddReply(comment: string) {
        const newComment: ReplyType = {
            id        : numOfComments + 1,
            content   : comment,
            createdAt : "Today",
            score     : 0,
            replyingTo: comments.user.username,
            user      : userData
        };

        dispatch(addReply({commentId: originalCommentId || comments.id, reply: newComment}));
        setAddComment(false);
    }

    function handleDeleteComment() {
        dispatch(deleteComment(comments.id));
    }

    function handleEditComment() {
        setEditComment(!editComment);
    }

    function handleUpdateComment() {
        dispatch(updateComment({commentId: comments.id, newContent: editCommentText}))
        setEditComment(false);
    }

    return (
        <>
            <div className="comment">
                <LikesCounter postLikes={comments.score}/>

                <section className="comment__main-content">
                    <header className="comment__header">
                        <div className="comment__info">
                            <img className="comment__user-image" src={comments.user.image.webp} alt={`Profile for Amy Robson`}/>
                            <h2 className="heading-md text-black">{comments.user.username}</h2>

                            {comments.user.username === userData.username && (
                                <p className="comment__user-indicator">you</p>
                            )}

                            <p className="text-grey">{comments.createdAt}</p>
                        </div>

                        <CommentActions
                            actions={{handleToggleAddComment, handleDeleteComment, handleEditComment}}
                            commentUser={comments.user.username}
                        />
                    </header>

                    {editComment ? (
                        <div style={{ display: "grid", justifyItems: "flex-end", gap: "1rem" }}>
                               <textarea
                                   placeholder="Add a comment..."
                                   className="add-comment__text-box"
                                   name="addComment"
                                   id="addComment"
                                   value={editCommentText}
                                   onChange={(e) => setEditCommentText(e.target.value)}
                                   cols={100}
                                   rows={5}
                               />

                            <Button color="purple" size="medium" onClick={handleUpdateComment}>Update</Button>
                        </div>
                    ) : (
                        <p className="text-md text-grey">
                            {isReply(comments) && <span className="text-purple medium">@{comments.replyingTo} </span>}
                            {comments.content}
                        </p>
                    )}
                </section>
            </div>

            {addComment && (
                <AddComment buttonText="Reply" handleSubmit={(comment) => handleAddReply(comment)}/>
            )}
        </>
    );
}