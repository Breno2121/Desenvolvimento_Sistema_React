'use client'

import { FormEvent, useState } from "react";
import Avatar from "../Avatar";
import "./Style.css";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";

type Author = {
    name: string;
    role: string;
    avatarUrl: string;
}
type PostProps = {
    post: {
        id: number;
        author: Author;
        publishedAt: Date;
        content: string;
    }
}

export default function Post({ post }: PostProps) {
    const [newComment, setNewComment] = useState<string>('');

    async function handleCreateNewComment(event: FormEvent) {
        event.preventDefault();
        alert(newComment)

        const comment = {
            comment: newComment,
            publishedAt: new Date().toISOString(),
            author: {
                name: "Breninho",
                role: "Desocupado",
                avatarUrl: "http://github.com/breno2121.png"
            }
        }

        await axios.patch(`http://localhost:3001/posts${post.id}`, {
            comments: comment
        })


    }

    const dateformat = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    return (
        <article className="post">
            <header>
                <div className="author">
                    <Avatar src={post.author.avatarUrl} hasBorder />
                    <div className="author-info">
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>
                <time>
                    {dateformat}
                </time>
            </header>
            <div className="content">
                <p>
                    {post.content}
                </p>
            </div>
            <form className="form" onSubmit={handleCreateNewComment}>
                <strong>Deixe um comentario</strong>
                <textarea
                    placeholder="Deixe um comentario"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <footer>
                    <button className="button-public" disabled={false}>
                        Publicar
                    </button>
                </footer>
            </form>
        </article>

    )
}