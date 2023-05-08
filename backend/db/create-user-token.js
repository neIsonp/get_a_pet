const jwt = require('jsonwebtoken');

const createuserToken = async (user, req, res) => {

    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, "nossoSecret");

    res.status(200).json({
        message: 'You are authenticated',
        token: token,
        userId: user._id,
    });
};

module.exports = createuserToken;