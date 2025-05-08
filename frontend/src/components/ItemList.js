import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ItemList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/books/")
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <Link to="/create">+ Add New Book</Link>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <Link to={`/item/${book.id}`}>{book.title}</Link>
                        <p>Author: {book.author}</p>
                        <p>Published: {book.published_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ItemList;
