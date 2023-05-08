const createuserToken = require('../db/create-user-token');
const User = require('../models/User');

const bcrypt = require('bcrypt');

module.exports = class UserController {

    static async register(req, res) {

        const { name, email, password, confirmpassword, phone } = req.body;

        const fields = [
            { name: name, message: 'Please insert the name' },
            { name: email, message: 'Please insert the email' },
            { name: phone, message: 'Please insert the phone' },
            { name: password, message: 'Please insert the password' },
            { name: confirmpassword, message: 'Please confirm the passoword' },
        ];

        for (const field of fields) {
            if (!field.name) {
                return res.status(422).json({ message: field.message });
            }
        }

        if (password !== confirmpassword) {
            return res.status(422).json({ message: "the password and confirm password must be the same" });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ message: 'please, choose a different email' });
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash
        });

        try {
            const newUser = await user.save();

            await createuserToken(newUser, req, res);

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    static async login(req, res) {

        const { email, password } = req.body;

        const fields = [
            { name: email, message: 'The email is required!' },
            { name: password, message: 'The password is required!' }
        ];

        for (const field of fields) {
            if (!field.name) {
                return res.status(422).json({ message: field.message });
            }
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(422).json({
                message: 'There is no user registered with that email'
            })
        }

        const checkPassword = await bcrypt.compareSync(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({
                message: 'Invalid password'
            });
        }

        await createuserToken(user, req, res);
    }
}