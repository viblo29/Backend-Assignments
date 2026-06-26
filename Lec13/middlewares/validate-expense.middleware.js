module.exports = (req, res, next) => {
    if (!req.body || !req.body.title || !req.body.amount) {
        return res.status(400).json({ message: "valid title and amount are required" })
    }
    next()
}