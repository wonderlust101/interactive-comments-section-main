import { useState } from "react";
import MinusIcon from "/src/assets/images/icon-minus.svg?react";
import PlusIcon from "/src/assets/images/icon-plus.svg?react";
import "./LikesCounter.scss";

type LikesCounterProps = {
    postLikes: number;
}

export default function LikesCounter({postLikes}: LikesCounterProps) {
    const [likes, setLikes] = useState(postLikes);

    function handleAddLike() {
        setLikes(likes + 1);
    }

    function handleRemoveLike() {
        setLikes(likes - 1);
    }

    return (
        <div className="likes-counter">
            <button className="likes-counter__like-button" onClick={handleAddLike}>
                <PlusIcon/>
            </button>

            <p className='text-purple medium'>{likes}</p>

            <button className="likes-counter__like-button" onClick={handleRemoveLike}>
                <MinusIcon/>
            </button>
        </div>
    );
}