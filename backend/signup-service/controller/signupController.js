const  userDB = require("../model/userModel");
const {getChannel} = require("../config/rabbitmq");

const signup = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const checkUser = await userDB.findOne({email});
        if(checkUser){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        const user = await userDB.create({email, password});

        const channel = getChannel();
        await channel.assertQueue('user_created');

        channel.sendToQueue('user_created', Buffer.from(JSON.stringify({
            _id: user._id,
            email: user.email,
            password: user.password
        })));

        res.status(201).json({success: true, message: "User created successfully"});


    } catch (error) {

        res.status(500).json({message: error.message});
        
    }
}


module.exports = {signup}