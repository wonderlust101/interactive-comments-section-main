import ReplyIcon from "/src/assets/images/icon-reply.svg?react";
import DeleteIcon from "/src/assets/images/icon-delete.svg?react";
import EditIcon from "/src/assets/images/icon-edit.svg?react";
import { useSelector } from "@/app/store";
import type { ReactNode } from "react";
import "./CommentActions.scss";

type CommentActionsType = {
    actions: {
        handleToggleAddComment: () => void;
        handleDeleteComment: () => void;
        handleEditComment: () => void;
    };
    commentUser: string;
};

type ActionButtonProps = {
    icon: ReactNode;
    color: string;
    text: string;
    action: () => void;
}

export default function CommentActions({actions, commentUser}: CommentActionsType) {
    const userData = useSelector(state => state.comment.userData);

    return (
        <div className="comment-actions">
            {commentUser === userData.username ? (
                <>
                    <ActionButton
                        icon={<DeleteIcon/>}
                        color="pink"
                        text="Delete"
                        action={actions.handleDeleteComment}
                    />

                    <ActionButton
                        icon={<EditIcon/>}
                        color="purple"
                        text="Edit"
                        action={actions.handleEditComment}
                    />
                </>
            ) : (
                <ActionButton
                    icon={<ReplyIcon/>}
                    color="purple"
                    text="Reply"
                    action={actions.handleToggleAddComment}
                />
            )}
        </div>
    );
}

function ActionButton({icon, color, text, action}: ActionButtonProps) {
    return (
        <button className={`comment-action-button comment-action-button--${color}`} onClick={action}>
            {icon}
            <div className="medium">{text}</div>
        </button>
    );
}