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
            const hash = await bcrypt.hashSync(password, salt);
            const registeredUser = await db.register_user([username, hash]);
            const user = registeredUser[0];
            req.session.user = {
                id: user.user_id,
                username: user.user_name,
            };
            res.status(201).send(req.session.user);
        };
    },
    login: async (req, res, next) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        const foundUser = await db.get_user(username);
        const user = foundUser[0];
        if (!user){
            res.status(401).send('User not found, please register before logging in!');
        } else {
            const isAuthenticated = bcrypt.compareSync(password, user.hash);
            if(!isAuthenticated){
                res.status(403).send('Incorrct username/password.')
            } else {
                req.session.user = {
                    id: user.user_id,
                    username: user.user_name
                };
                res.status(200).send(req.session.user);
            };
        };
    },
    logout: async (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}