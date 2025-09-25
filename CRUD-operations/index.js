
const express = require("express");
const app = express();
const PORT = 3000

// middleware for parsing the data
app.use(express.json());

// manually creating books array to add, retrive or delete
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];


// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  const createId = books.length ? books[books.length - 1].id + 1 : 1;
  const newBook = { id: createId, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update a book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// DELETE a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted successfully" });
});

// make the server running on port 3000
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

