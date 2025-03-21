import { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentContextProvider = (props) => {
    
    const [comment, setComment] = useState(false);
    const [commentText, setCommentText] = useState("");
    const [activeBlogId, setActiveBlogId] = useState(null);

    const value = {
        comment, setComment,
        commentText, setCommentText,
        activeBlogId, setActiveBlogId
    }

    return (
        <CommentContext.Provider value={value}>
            {props.children}
        </CommentContext.Provider>
    )
}