const mongoose = require("mongoose")

const validateId = (req, res, next) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid MongoDB Object ID format" })
    }
    next()
}

module.exports = validateId