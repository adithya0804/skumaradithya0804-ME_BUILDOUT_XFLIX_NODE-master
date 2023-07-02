const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const  videoService  = require("../services/videos.service");
const videoServiceInstance=new videoService();

const getVideoById = catchAsync(async (req, res) => {
    const video = await videoServiceInstance.getVideoById(req.params.videoId);
    if (!video) {
        throw new ApiError(httpStatus.NOT_FOUND, "Video Not Found");
    };
    res.send(video);
});
const postVideoItem=catchAsync(async(req,res)=>{
    const video=await videoServiceInstance.postVideo(req.body);
    if(!video){
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR);
    }
    res.status(201).json(video);
})
const increaseViews=catchAsync(async(req,res)=>{
    const video=await videoServiceInstance.increaseViews(req.params.videoId);
    res.sendStatus(204);
})
const updateVotes=catchAsync(async(req,res)=>{
    const video=await videoServiceInstance.updateVotes(req.params.videoId, req.body);
    res.sendStatus(204);
})
const getVideos=catchAsync(async(req,res)=>{
    let sortValues = ["releaseDate", "viewCount"];
    let sortBy;
    if (req.query.sortBy) {
        sortBy = req.query.sortBy;
    } else {
        sortBy = sortValues[0];
    };
    let query = req.query;

    if (!query.genres && !query.contentRating && !query.title) {
        let videos = await videoServiceInstance.getVideos(sortBy);
        if (!videos) {
            throw new ApiError(httpStatus.NOT_FOUND)
        };
        res.send({videos:videos});
    }

    else {
        let filter = {};
        if (query.title != null) {
            let title= new RegExp("^" + query.title, "i")
            filter.title = title;
        };
        if (query.genres != null && !(query.genres.includes("All"))) {
        
           const genres = query.genres.split(',');
           console.log(genres)
            filter.genre = genres;
        };
        if (query.contentRating != null) {
            const ratings = ["Anyone", "7+", "12+", "16+", "18+"];
            const filterRatings = [];
            for (let i = 0; i <= ratings.indexOf(query.contentRating); i++) {
                filterRatings.push(ratings[i]);
            };
            console.log(filterRatings);
            filter.contentRating = query.contentRating;
        };
        let videos = await videoServiceInstance.filteredVideos(filter, sortBy);
        if (!videos) {
            throw new ApiError(httpStatus.NOT_FOUND)
        };
        res.send({videos: videos})
    }
})
module.exports={getVideoById, postVideoItem, increaseViews,updateVotes, getVideos}