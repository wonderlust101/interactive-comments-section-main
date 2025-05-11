import type {CommentType} from "@/types/userComments";
import Comment from "@/components/Comment";
import './ReplyList.scss'

type ReplyListProps = {
    comment: CommentType;
}

export default function ReplyList({comment}: ReplyListProps) {
    return (
        <ul className="reply-list">
            {comment.replies.map((reply) => (
                <li style={{display: "contents"}}>
                    <Comment key={reply.id} comments={reply} originalCommentId={comment.id} />
                </li>
            ))}
        </ul>
    );
}