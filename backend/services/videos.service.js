const  Videos  = require("../models/video.model");
const httpStatus = require("http-status");
const ApiError= require("../utils/ApiError")
class videoService{
   getVideoById = async (id) => {
        return Videos.findById(id);
    };
    postVideo=async(body)=>{
        const video=Videos.create(body);
        return video;
    }
    increaseViews=async(id)=>{
        const video=await Videos.findById(id);
        if(!video){
            throw new ApiError(httpStatus.BAD_REQUEST, "\"\"videoId\"\" must be a valid id")
        }
        const newView=video.viewCount+1;
        video.viewCount=newView;
        await video.save();
    }
    updateVotes=async(id,body)=>{
        const video=await Videos.findById(id);
        if(!video){
            throw new ApiError(httpStatus.BAD_REQUEST, "\"\"videoId\"\" must be a valid id")
        }
        if(body.vote==="upVote"){
            if(body.change==="increase"){
                const increasedUpVote=video.votes.upVotes+1;
                video.votes.upVotes=increasedUpVote
            }else{
                const decreasedUpVote=video.votes.upVotes-1;
                video.votes.upVotes=decreasedUpVote 
            }
        }else{
            if(body.change==="increase"){
                const increasedDownVote=video.votes.downVotes+1;
                video.votes.downVotes=increasedDownVote
            }else{
                const decreasedDownVote=video.votes.downVotes-1;
                video.votes.downVotes=decreasedDownVote 
            }
        }
        await video.save();
    }
    filteredVideos = async (q, sortBy) => {
        let videos = Videos.find(q).sort({ [sortBy]: -1 })
        return videos
    }
    
    getVideos = async (sortBy) => {
        console.log(sortBy);
        const videos= Videos.find({}).sort({ [sortBy]: -1});
        return videos
    };
    
}
module.exports=videoService;