const moongoose = require('mongoose')
const User = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



//SIGNUP
exports.SignUp = async (req, res) => {
    //signup logic
    try {

        //get user input
        const { first_name, last_name, email, password } = req.body

        //validate user inputs
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input field is require")
        }

        //checking if user already exists
        const oldUser = await User.findOne({ email })

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");

        }

        //Encrypt user pass

        hashedPassword = await bcrypt.hash(password, 10)

        //create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: hashedPassword
        })

        //create tokens
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "3h",
            }
        )
        //save user token
        user.token = token

        //return new user

        res.status(201).json(user);

    }
    catch (err) {
        console.log(err);
    }
}

//LOGIN

exports.Login = async (req, res) => {

    //login logic
    try {

        //get user input

        const { email, password } = req.body

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        //validate if user exists in db
        const user = await User.findOne({ email })

        //then decrypt password so we can compare
        const decodedPassword = await bcrypt.compare(password, user.password)

        if (user && decodedPassword) {
            //create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '3h'
                }

            )

            //save user token
            user.token = token

            // user
            res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
}


//Test API
exports.testApp = function (req, res) {
    res.send("This is Test Controllers")
}