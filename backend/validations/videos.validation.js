const Joi = require("joi");
const { objectId } = require("./custom.validtaion");


const getVideo = {
  params: Joi.object().keys({
    videoId:Joi.string().custom(objectId)
  }),
};

const postVideo= {body: Joi.object().keys({
    votes: Joi.object({
        upVotes: Joi.number(),
        downVotes: Joi.number(),
      }),
      previewImage: Joi.string()
        .required(),
      viewCount: Joi.number(),
      videoLink: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string()
        .valid('Education', 'Sports', 'Movies', 'Comedy', 'Lifestyle', 'All')
        .required()
        ,
      contentRating: Joi.string()
        .valid('Anyone', '7+', '12+', '16+', '18+')
        .required()
        ,
      releaseDate: Joi.date().required(),
})};
const voteUpdateObj={
  body: Joi.object().keys({
    vote:Joi.string().required().valid("upVote", "downVote"),
    change:Joi.string().required().valid("increase", "decrease"),
  })}
  const queryValidation={
query:Joi.object().keys({
title:Joi.string(),
genres:Joi.string(),
sortBy:Joi.string().valid("viewCount","releaseDate"),
contentRating:Joi.string().valid("Anyone","7+","12+","16+","18+")
})
  }

module.exports={getVideo, postVideo, voteUpdateObj, queryValidation}