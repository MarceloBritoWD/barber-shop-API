const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

const security = {
    isAuthenticated: (req, res, next) => {
        if(!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer') {
            return res.status(401).send({ auth: false,  message: 'You have to be logged to perform this action' });
        }

        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, constants.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(500).send({ auth: false, messsage: 'Token not authenticated.' })
            }

            req.user = {
                username: decoded.payload.username,
                roles: decoded.payload.roles,
                email: decoded.payload.email,
                hasRole: (necessaryRole) => {
                    return decoded.payload.roles.find(item => item === necessaryRole);
                }
            };

            next();
        })

    }
}

module.exports = security;