module.exports = (req, res, next) => {
    const secret = req.headers['secret']

    if (!secret || secret !== "random123") {
        return res.status(401).json({ message: "permission denied. valid secret token is required" })
    }

    next()
}