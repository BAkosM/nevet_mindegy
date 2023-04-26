import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { FormEvent, useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  publish_year: number;
  page_count: number;
}

function App() {
  const [books, setBooks] = useState([] as Book[]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publish_year, setPublishYear] = useState(0);
  const [page_count, setPageCount] = useState(0);
  const [error, setError] = useState("");

  async function getData() {
    const response = await fetch("http://localhost:3000/api/books");
    const data = (await response.json()) as Book[];
    setBooks(data);
  }

  async function addBook(e: FormEvent) {
    e.preventDefault;
    const book = {
      title,
      author,
      publish_year,
      page_count,
    };
    const response = await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(book),
    });

    if(response.ok){
      setTitle("");
      setAuthor("");
      setPublishYear(0);
      setPageCount(0);
      setError("");
      getData();
    } else {
      const errorObj = await response.json();
      const errors = errorObj.message as string[];
      setError(errors.join("; "));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        {books.map((book) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-4 book">
            <h1>{book.title}</h1>
            <p>{book.author}</p>
            <p>{book.publish_year}</p>
            <p>{book.page_count}</p>
            <p>
              <img src={"/picture/" + book.author + ".jpg"} alt={book.author} />
            </p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={addBook}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <br />
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.currentTarget.value)}
          />
          <br />
          <label>Publish year:</label>
          <input
            type="number"
            value={publish_year}
            onChange={(e) => setPublishYear(parseInt(e.currentTarget.value))}
          />
          <br />
          <label>Page Count:</label>
          <input
            type="number"
            value={page_count}
            onChange={(e) => setPageCount(parseInt(e.currentTarget.value))}
          />
          <br />
          <input type="submit" value={"Submit"} />
        </form>
      </div>
    </div>
  );
}

export default App;
