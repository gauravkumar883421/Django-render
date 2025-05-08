import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function ItemDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/books/${id}/`)
            .then(res => setBook(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Published Date:</strong> {book.published_date}</p>
            <Link to="/">Back to List</Link>
        </div>
    );
}

export default ItemDetail;
