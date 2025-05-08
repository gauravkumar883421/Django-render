import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateItemForm() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        published_date: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch authors when component mounts
        axios.get("http://localhost:8000/api/authors/")
            .then(res => {
                console.log("Authors fetched:", res.data);
                setAuthors(res.data);
            })
            .catch(err => {
                console.error("Failed to fetch authors:", err);
                setError("Failed to load authors");
            });
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Format the date to YYYY-MM-DD
        const formattedData = {
            ...formData,
            author: parseInt(formData.author), // Convert author ID to integer
            published_date: formData.published_date // Make sure date is in YYYY-MM-DD format
        };

        // Debug log
        console.log('Sending data:', formattedData);

        try {
            await axios.post("http://localhost:8000/api/books/", formattedData);
            navigate("/");
        } catch (err) {
            console.error(err.response?.data);
            setError(err.response?.data?.detail || "An error occurred while creating the book");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h2>Add New Book</h2>
                {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div>
                    <label htmlFor="author">Author:</label>
                    <select
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Select an author</option>
                        {authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="published_date">Publication Date:</label>
                    <input
                        type="date"
                        id="published_date"
                        name="published_date"
                        value={formData.published_date}
                        onChange={handleChange}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: isLoading ? "not-allowed" : "pointer"
                        }}
                    >
                        {isLoading ? "Creating..." : "Create Book"}
                    </button>
                    <Link
                        to="/"
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#6c757d",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "4px"
                        }}
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default CreateItemForm;
