import React from "react"

import '../styles/components.css'
import Post from './Post'

export default function Feed() {
    const posts = [
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        },
        {
            upvote: 47,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe80VxIBuL3zQfDqgaSkt08wuuOhCnvw2PSw&usqp=CAU",
            title: "Qualquer coisa",
            user: "Alberto Caeiro",
            user: "Alberto Caeiro",
            group: "Universidade de Aveiro",
            comment_count: 4,
        }, 
    ]
    return (
        <div className="feed">
            {posts.map(post => (
                <Post post={post} />
            ))}
        </div>
    )
}