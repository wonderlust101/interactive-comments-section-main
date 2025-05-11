import { useSelector } from "@/app/store";
import Button from "@/components/Button";
import "./AddComment.scss";
import { useState } from "react";

type AddCommentProps = {
    buttonText: String;
    handleSubmit: (comment: string) => void;
}

export default function AddComment({buttonText, handleSubmit}: AddCommentProps) {
    const userData = useSelector(state => state.comment.userData)
    const [commentText, setCommentText] = useState<string>('');

    return (
        <div className="add-comment">
            <img className="add-comment__image" src={userData.image.webp} alt={`Profile image for ${userData.username}`}/>

            <textarea
                placeholder="Add a comment..."
                className="add-comment__text-box"
                name="addComment"
                id="addComment"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                cols={30}
                rows={5}
            />

            <Button color="purple" size="medium" onClick={()=> handleSubmit(commentText)}>{buttonText}</Button>
        </div>
    );
}