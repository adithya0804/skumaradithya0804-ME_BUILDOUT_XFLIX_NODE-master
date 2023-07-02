import {useEffect,useState,React, useCallback}from 'react'
import Header from "./Header"
import {Box, CircularProgress, Card, Typography, CardMedia, CardContent, Button} from "@mui/material"
import "./videopage.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { SentimentDissatisfied } from '@mui/icons-material'
import Video from './Video'
import CircleIcon from '@mui/icons-material/Circle'
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import {useSnackbar} from "notistack"


export const VideoPage = () => {
  const[videos,setVideos]=useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [video,setVideo]=useState();
  const[buttonState,setButtonState]=useState("none");
  const[loading,setLoading]=useState(true);
  const[notFound,setNotFound]=useState(false);
  const params=useParams();
  const endpoint="https://a9135574-ff28-4d5e-9ce9-730f3a590e30.mock.pstmn.io/v1/videos";
  const fetchVideos=async ()=>{
   try{
    const response=await axios.get(endpoint);
    setVideos(response.data.videos);
   }catch(e){
    console.log(e);
    enqueueSnackbar(e.message,{variant:"error"})
   }
  }
  const fetchVideo=useCallback(async()=>{
    try{
      setLoading(true);
      const response= await axios.get(`${endpoint}/${params.id}`)
      setVideo(response.data);
      setLoading(false);
      }catch(e){
      console.log(e)
      enqueueSnackbar(e.message,{variant:"error"})
      setLoading(false);
      setNotFound(true);
    }
  },[params.id])
  const increaseView=useCallback(async()=>{
    try{
      await axios.patch(`${endpoint}/${video._id}/views`)
    }catch(e){
      console.log(e)
      enqueueSnackbar(e.message,{variant:"error"})
    }
  },[params.id])
useEffect(()=>{
  fetchVideos();
  fetchVideo();
  increaseView();
},[fetchVideo, increaseView])
const handleUpVote=async()=>{
  let upVotes=video.votes.upVotes;
  let downVotes=video.votes.downVotes;
  try{
 if(buttonState==="none")
{setButtonState("up");
setVideo({
  ...video,
  votes: { ...video.votes, "upVotes": upVotes + 1 },
});
axios.patch(`${endpoint}/${video._id}/votes`,{vote:"upVote",change:"increase"})
}else if(buttonState==="up"){
  setButtonState("none");
  setVideo({
    ...video,
    votes: { ...video.votes, "upVotes": upVotes - 1 },
  });
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"upVote",change:"decrease"})
}else{
  setButtonState("up");
  setVideo({
    ...video,
    votes: {"downVotes":downVotes-1, "upVotes": upVotes + 1 },
  });
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"upVote",change:"increase"})
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"downVote",change:"decrease"})
}
  }catch(e){
    console.log(e);
    enqueueSnackbar(e.message,{variant:"error"})
  }
}
const handleDownVote=async()=>{
  let upVotes=video.votes.upVotes;
  let downVotes=video.votes.downVotes;
  try{
 if(buttonState==="none")
{setButtonState("down");
setVideo({
  ...video,
  votes: { ...video.votes, "downVotes": downVotes + 1 },
});
axios.patch(`${endpoint}/${video._id}/votes`,{vote:"downVote",change:"increase"})
}else if(buttonState==="down"){
  setButtonState("none");
  setVideo({
    ...video,
    votes: { ...video.votes, "downVotes": downVotes - 1 },
  });
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"downVote",change:"decrease"})
}else{
  setButtonState("down");
  setVideo({
    ...video,
    votes: {"downVotes":downVotes+1, "upVotes": upVotes - 1 },
  });
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"upVote",change:"decrease"})
  axios.patch(`${endpoint}/${video._id}/votes`,{vote:"downVote",change:"increase"})
}
  }catch(e){
    console.log(e);
    enqueueSnackbar(e.message,{variant:"error"})
  }
}
  return (

    <div className='secondbody'>
<Header/>
<Box className="videopage">
{loading?(<Box className="loading"><CircularProgress style={{'color': 'white'}}/>Loading Video...</Box>):notFound?(<Box className="loading"><SentimentDissatisfied style={{'color': 'white'}}/>Video Not Found</Box>):
      ( <Box>
           <Card raised={false} className="video-card">
             <CardMedia
          component="iframe"
          className="i-frame"
          sx={{borrder:0}}
          image={`https://www.${video.videoLink}`}
          alt={video.title}
        />
        <CardContent className="video-card-body">
        <Box>
                <Typography gutterBottom variant="h5" component="div">
                  {video.title}
                </Typography>
                <Box>
                  <Typography className="card-subtitle" component="span">
                    {video.contentRating}
                  </Typography>
                  <Typography className="card-subtitle" component="span">
                    <CircleIcon
                      sx={{
                        width: "12px",
                        height: "5px",
                        mb: "2px",
                        mx: "3px",
                      }}
                      fontSize="small"
                    />
                  </Typography>
                  <Typography className="subtitle" component="span">
                    {video.releaseDate}
                  </Typography>
                </Box>
              </Box>
              <Box className="button-grp">
               <Button onClick={handleUpVote} size="small" variant="contained" className={buttonState==="up"?"active-btn":"inactive-btn"}><ThumbUpIcon fontSize="small" className={buttonState==="up"?"active-icon":"inactive-icon"}/> &nbsp;&nbsp;<span className='btn-text'> {video.votes.upVotes}</span></Button>
               <Button onClick={handleDownVote}  size="small" variant="contained" className={buttonState==="down"?"active-btn":"inactive-btn"}><ThumbDownIcon fontSize="small" className={buttonState==="down"?"active-icon":"inactive-icon"}/> &nbsp;&nbsp;<span className='btn-text'> {video.votes.downVotes}</span></Button>
              </Box>
        </CardContent>
       </Card>
    <hr className="line" />
    <Box className="videobox">
    <Video data={videos.filter(item=>item._id!==params.id)}/>
    </Box>
      </Box>)}
</Box>

    </div>
  )
}
