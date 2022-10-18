const asyncHandler = require("express-async-handler");

// responsible for creating and fetching 1 to 1 chat
const accessChat = asyncHandler(async(req, res) => {
    const {userId} = req.body;
    if(!userId){
        console.log("")
    }
})