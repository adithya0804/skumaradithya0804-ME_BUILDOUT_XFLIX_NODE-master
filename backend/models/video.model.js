const mongoose = require('mongoose');

// TODO: CRIO_TASK_MODULE_CART - Complete cartSchema, a Mongoose schema for "carts" collection
const videoSchema = mongoose.Schema(
  { votes: {
    upVotes: {type:Number, required:true, default:0},
    downVotes:{type:Number, required:true, default:0}
},
previewImage: {
    type:String, required:true,trim: true,
    validate:(value)=>{
        if(!value.match( /\.(jpeg|jpg|gif|png|svg)$/))
        throw new Error("Invalid image URL ")
    }
},
viewCount: {type:Number, default:0},
videoLink:  {
    type:String, required:true,trim: true,
    validate:(value)=>{
        if(!value.match( /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/embed\/|youtu\.be\/)[a-zA-Z0-9_-]+$/))
        throw new Error("Invalid YouTube video format. It should be in the format 'https://www.youtube.com/embed/<youtube-video-id>' or 'youtube.com/embed/<youtube-video-id>'.")
    },
},
title:{type: String,trim: true,required: true},
genre:  {
    type: String,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"],
    required: true,
    trim: true,
  },
contentRating: {
    type: String,
    enum: ["Anyone", "7+", "12+", "16+", "18+"],
    required: true,
    trim: true,
  },
releaseDate: {
    type: Date,
    required: true,
    trim: true,
  },
  }
);


/**
 * @typedef Videos
 */
const Videos = mongoose.model('Videos', videoSchema);

module.exports = Videos;