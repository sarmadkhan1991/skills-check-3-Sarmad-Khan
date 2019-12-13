module.exports = {
    getAll: async (req, res, next) => {
        const db = req.app.get('db');
        const listings = await db.get_all_listings();
        console.log(listings);
        res.status(200).send(listings);
    }
}