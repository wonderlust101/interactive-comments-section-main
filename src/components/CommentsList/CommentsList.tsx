import { useSelector } from "@/app/store";
import AddComment from "@/components/AddComment";
import Comment from "@/components/Comment";
import { addComment } from "@/components/CommentsList/commentSlice";
import ReplyList from "@/components/ReplyList";
import "./CommentsList.scss";
import type { CommentType } from "@/types/userComments";
import { useDispatch } from "react-redux";

export default function CommentsList() {
    const dispatch = useDispatch();
    const commentsData = useSelector(state => state.comment.comments)
    const numOfComments = useSelector(state => state.comment.numOfComments)
    const userData = useSelector(state => state.comment.userData)

    function handleAddComment(comment: string) {
        const newComment: CommentType = {
            id: numOfComments + 1,
            content: comment,
            createdAt: "Today",
            score: 0,
            user: userData,
            replies: [],
        }

        dispatch(addComment(newComment));
    }

    return (
        <>
            <ul className="comments-list">
                {commentsData.map((comment) => (
                    <li style={{display: "contents"}}>
                        <Comment key={comment.id} comments={comment}/>

                        {comment.replies.length > 0 && <ReplyList comment={comment}/>}
                    </li>
                ))}
            </ul>

            <AddComment buttonText='Send' handleSubmit={(comment) => handleAddComment(comment)} />
        </>
    );
}