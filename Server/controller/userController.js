const generateToken = require('../config/jwtToken');
const User = require('../models/usermodel')
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validatemongodbld');
const  generateRefreshToken  = require('../config/refreshToken')
const jwt = require('jsonwebtoken');


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
        // Create new user
        try {
            const newUser = await User.create(req.body);
            res.status(201).json({ newUser, msg: "User Created Successfully" });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        throw new Error("User Already Exists")
    }
}) 


const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Check if user exists or not
    const findUser = await User.findOne({email});
        
    if (findUser && (await findUser.isPasswordMatch(password))) {
        const refreshToken = await generateRefreshToken(findUser._id)
        const updateUser = await User.findOneAndUpdate(findUser._id, {
            refreshToken: refreshToken,
        },{
            new : true
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72*60*60*1000,
        });

        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            email: findUser.email,
            mobile: findUser.mobile,
            token: await generateToken(findUser._id)
        });
        
    } else {
        throw new Error("Invalid Credentials");
    }
});

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in Cookies");
    }
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });
    if (!user) {
        throw new Error("No refresh token present in db or matched");
    }
    
    jwt.verify(refreshToken, process.env.jwt_Secret, async (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error("There is something wrong with refresh token");
        } else {
            const accessToken = await generateToken(user._id);
            console.log("Jackson", accessToken);
            res.json({ accessToken: accessToken });
        }
    });
});


//logout function
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No Refresh Token in Cookies");
    }
    const refreshToken = cookie.refreshToken;

    const user = await User.findOne({ refreshToken });

    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });

        return res.sendStatus(204); //forbidden
    }

    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }); // Corrected the variable name here

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });

    res.sendStatus(204); //forbidden
});



//Get all Users

const GetAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        throw new Error(error);
    }
});

//Ger Single User

const GetSingleUser = asyncHandler(async (req, res)=>{
    const { id } = req.params
    validateMongoDbId(id)

    try{
        const GetUser = await User.findById(id);
        res.json(GetUser)
    }
    catch(error){
        throw new Error("Couldn't find user", error)
    }
})

//Update a User

const UpdateUser = asyncHandler(async (req, res)=>{
    const { id } = req.user
    validateMongoDbId(id)

    try{
        const UpdateUser = await User.findByIdAndUpdate(id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }, {
            new: true,
        }
        );        
        res.status(201).json({ UpdateUser, msg: "User Updated Successfully" });
    }
    catch(error){
        throw new Error("Couldn't find user", error)
    }
})


//Remove a User

const RemoveUser = asyncHandler(async (req, res)=>{
    const { id } = req.params
    validateMongoDbId(id)

    try{
        const DeleteUser = await User.findByIdAndDelete(id);
        res.status(201).json({ DeleteUser, msg: "User Removed Successfully" });
    }
    catch(error){
        throw new Error("Couldn't find user", error)
    }
})

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)

    try {
        // Find and update the user by id
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        );

        if (!user) {
            return res.json({ msg: "User not found" });
        }

        
        res.json({ msg: "User blocked", user });
        
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params // Access the id parameter from req.params
    validateMongoDbId(id)

    try {
        // Find and update the user by id
        const user = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        );

        // Check if the user is not found
        if (!user) {
            return res.json({ msg: "User not found" });
        }

        // Check if the user is already unblocked

        res.json({ msg: "User unblocked", user });
        
    } catch (error) {
        throw new Error(error);
    }
});



module.exports = { createUser, loginUserController, GetAllUsers, GetSingleUser, UpdateUser, RemoveUser, blockUser, unblockUser, handleRefreshToken, logout}