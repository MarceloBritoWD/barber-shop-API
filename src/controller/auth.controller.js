const express = require('express');
const router = express.Router();
const userRepository = require('../repository/user.repository.js');
const jwt = require('jsonwebtoken');
const constants = require('../config/constants');
const TWO_HOURS_IN_SECONDS = 7200;

router.post('/login', (req, res) => {

    const user = userRepository.getByUsername(req.body.username);

    if(!user || (user && user.password !== req.body.password)) {
        return res.status(401).send({ error: 'Wrong username or passsword, try again!' });
    }

    const payload = {
        username: user.username,
        roles: user.roles,
        email: user.email
    }

    let token = jwt.sign({ payload }, constants.JWT_SECRET, {
        expiresIn: TWO_HOURS_IN_SECONDS
    });

    res.status(200).send({ auth: true, token: token })
})

module.exports = router;