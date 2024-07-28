const  userDB = require("../model/userModel");


const login = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        const user = await userDB.findOne({email, password});

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        res.status(201).json({ success: true, message: "authenticated successfully"});


    } catch (error) {

        res.status(500).json({message: error.message});
        
    }
}


module.exports = {login}