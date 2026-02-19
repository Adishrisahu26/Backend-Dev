app.get("/api/books", (req, res) => {
    let { page = 1, limit = 5 } = req.query;

    page = Number(page);
    limit = Number(limit);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
        total: books.length,
        page,
        limit,
        data: paginatedBooks
    });
});
