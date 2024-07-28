const  userDB = require("../model/userModel");
const {getChannel} = require("../config/rabbitmq");

const signup = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const user = await userDB.create({email, password});

        const channel = getChannel();
        await channel.assertQueue('user_created');

        channel.sendToQueue('user_created', Buffer.from(JSON.stringify({
            _id: user._id,
            email: user.email,
            password: user.password
        })));

        res.status(201).json({message: "User created successfully"});


    } catch (error) {

        res.status(500).json({message: error.message});
        
    }
}


module.exports = {signup}