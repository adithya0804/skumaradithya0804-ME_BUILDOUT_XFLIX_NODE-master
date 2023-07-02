const express = require("express");
const router = express.Router();
const validate=require("../middlewares/validate");
const {getVideo, postVideo, voteUpdateObj,queryValidation }=require("../validations/videos.validation");
const{getVideoById, postVideoItem, increaseViews, updateVotes, getVideos}=require("../controllers/videos.controller")
router.get("/",validate(queryValidation),getVideos)
router.post("/",validate(postVideo), postVideoItem)
router.patch("/:videoId/votes",validate(voteUpdateObj), updateVotes)
router.patch("/:videoId/views", increaseViews)
router.get("/:videoId",validate(getVideo),getVideoById)

module.exports=router