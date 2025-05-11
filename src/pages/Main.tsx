import "./Main.scss";
import CommentsList from "@/components/CommentsList";

export default function Main() {
    return (
        <div className="main grid-bleed">
            <main className="main__content">
                <CommentsList/>
            </main>
        </div>
    );
}