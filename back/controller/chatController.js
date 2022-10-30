
// controller file contains these fxn -  jjj

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Chat = require("../models/chatmodel");

// responsible for creating and fetching 1 to 1 chat
const accessChat = asyncHandler(async(req, res) => {
    const { userId }  = req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    // cjjhatmodel
    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: {$eq: req.user._id}}},
            { users: {$elemMatch: {$eq: userId }}},
        ]
    }).populate("users", "-password").populate("latestMessage").populate("")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    })

    if(isChat.length > 0){
        res.send(isChat[0]);
    } else{
        var chatData = {
            chatName:  "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try{
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users", "-password"
            );
            res.status(200).send(FullChat);
        }
        catch (error){
            res.status(400); 
            throw new Error(error.message);
        }
    }
});

const fetchChats = asyncHandler(async(req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async(results) => {
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email",
            });
            res.status(200).send(results);
        })
        // .then( (result) => res.send(result));  // to find all the chat sths user is part of
        // users array me se select those where id is req.user._id
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
})

const createGroupChat = asyncHandler(async(req, res) => {
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message : "Please Fill all details"}) ;
    }
    var users = JSON.parse(req.body.users);
    if(users.length < 2){ return res.status(400).send("More than 3 users are req. for group");}

    users.push(req.user);
    try {
        const groupChat  = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await Chat.findOne({ _id: groupChat._id})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400)
         throw new Error(error.message);
    }
})

module.exports = {accessChat, fetchChats, createGroupChat};
