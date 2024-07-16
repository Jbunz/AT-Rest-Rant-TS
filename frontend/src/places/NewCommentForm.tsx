import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Author {
    userId: number;
    firstName: string;
    lastName: string;
}

interface Comment {
    content: string;
    stars: number;
    rant: boolean;
    authorId: number | string;
}

interface Place {
    placeId: number;
}

interface NewCommentFormProps {
    place: Place;
    onSubmit: (comment: Comment) => void;
}

function NewCommentForm({ place, onSubmit }: NewCommentFormProps) {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [comment, setComment] = useState<Comment>({
        content: '',
        stars: 3,
        rant: false,
        authorId: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:5000/users`);
            const users: Author[] = await response.json();
            setAuthors(users);
            if (users.length > 0) {
                setComment((prevComment) => ({
                    ...prevComment,
                    authorId: users[0].userId,
                }));
            }
        };
        fetchData();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const isChecked = (e.target as HTMLInputElement).checked;
            setComment((prevComment) => ({
                ...prevComment,
                [name]: isChecked,
            }));
        } else {
            setComment((prevComment) => ({
                ...prevComment,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(comment);
        setComment({
            content: '',
            stars: 3,
            rant: false,
            authorId: authors.length > 0 ? authors[0].userId : '',
        });
    };

    const authorOptions = authors.map((author) => (
        <option key={author.userId} value={author.userId}>
            {author.firstName} {author.lastName}
        </option>
    ));

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="form-group col-sm-12">
                    <label htmlFor="content">Content</label>
                    <textarea
                        required
                        value={comment.content}
                        onChange={handleChange}
                        className="form-control"
                        id="content"
                        name="content"
                    />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-sm-4">
                    <label htmlFor="authorId">Author</label>
                    <select
                        className="form-control"
                        value={comment.authorId}
                        onChange={handleChange}
                        id="authorId"
                        name="authorId"
                    >
                        {authorOptions}
                    </select>
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="stars">Star Rating</label>
                    <input
                        value={comment.stars}
                        onChange={handleChange}
                        type="range"
                        step="0.5"
                        min="1"
                        max="5"
                        id="stars"
                        name="stars"
                        className="form-control"
                    />
                </div>
                <div className="form-group col-sm-4">
                    <label htmlFor="rant">Rant</label>
                    <input
                        checked={comment.rant}
                        onChange={handleChange}
                        type="checkbox"
                        id="rant"
                        name="rant"
                        className="form-control"
                    />
                </div>
            </div>
            <input className="btn btn-primary" type="submit" value="Add Comment" />
        </form>
    );
}

export default NewCommentForm;
