const httpStatus = require("http-status");
const videoService=require("../services/videos.service");
const videoServiceInstance=new videoService();
const ApiError= require("../utils/ApiError")

const validateVideoId=async(req,res,next)=>{
    const video=videoServiceInstance.getVideoById(req.params.videoId);
    if(video){
        next();
    }
    else{
    throw new ApiError(httpStatus.BAD_REQUEST, "\"\"videoId\"\" must be a valid id")
    }
}
module.exports={validateVideoId};