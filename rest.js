app.get("/api/books", (req, res) => {
    let filteredBooks = books;

    const { author, year } = req.query;

    if (author) {
        filteredBooks = filteredBooks.filter(book =>
            book.author.toLowerCase() === author.toLowerCase()
        );
    }

    if (year) {
        filteredBooks = filteredBooks.filter(book =>
            book.year === Number(year)
        );
    }

    res.json(filteredBooks);
});
middleware.jsonfunction validateYear(req, res, next) {
    const { year } = req.body;

    if (year) {
        if (isNaN(year)) {
            return res.status(400).json({ message: "Year must be a number" });
        }

        if (year < 1000 || year > new Date().getFullYear()) {
            return res.status(400).json({ message: "Year out of valid range" });
        }
    }

    next();
}
