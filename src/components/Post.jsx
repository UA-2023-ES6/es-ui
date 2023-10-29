import React from "react";

import '../styles/components.css'

export default function Post(info) {
    const {title, upvote, image, user, group, comment_count} = info.post
    return (
        <div className="post">
            <div className="post_left">
                <i className="fas fa-caret-up"></i>
                <span>{upvote}</span>
                <i className="fas fa-caret-down"></i>
            </div>
            <div className="post_center">
                <img src={image} />
            </div>
            <div className="post_right">
                <h3><a href={`/${group}/${title}`}>{title}</a></h3>
                <span className="post_info">
                    publicado há 1h atrás por 
                    {" "}<a href={{user}}>{user}</a>{" "}
                </span>
                <p className="post_info">
                    {comment_count} comentários | partilhar | reportar
                </p>
            </div>
        </div>
    )
}