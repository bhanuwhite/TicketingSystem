exports.authorizeProtected = async (req, res) => {
    try {
        res.send("Successfully authorized");

    }
    catch (err) {
        return res.status(400).send(err);
    }

}