const { loginValidations } = require('../validations/validation');
const jwt = require('jsonwebtoken');
const Register = require('../models/registerRoleSchema');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokens')

exports.loginBasedRole = async (req, res) => {
    try {

        let { email, password } = req.body;
        let { error } = loginValidations(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await Register.findOne({ email });
        if (user) {
            let checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: '30m' });
                let authToken = new Token({
                    token: token,
                    roleId: user.id,
                    role: user.role
                });
                await authToken.save();

                let data = {
                    message: "Login Successfull",
                    status: '200',
                    roleId: user.id,
                    role: user.role,
                    token: token
                }
                return res.status(200).json({ data });
            }
        }
    }
    catch (err) {
        return res.status(400).send(err);
    }

}
