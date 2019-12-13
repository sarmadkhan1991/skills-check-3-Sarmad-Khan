const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const result = await db.get_user(username);
        const existingUser = result[0];
        if (existingUser){
            res.status(409).send('Username already taken');
        } else {
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(password, salt);
            const registeredUser = await db.register_user([username, hash]);
            const user = registeredUser[0];
            req.session.user = {
                id: user.user_id,
                username: user.user_name,
            };
            res.status(201).send(req.session.user);
        };
    }
}