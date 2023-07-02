import { Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { VideoCard } from './VideoCard'

const Video = ({data}) => {
  return (
    <div>
   <Grid container spacing={2} >
{data.map(video=>{
  return (     <Grid item xs={6} md={3}  key={video["_id"]} >
    <Link to={`/videos/${video._id}`} className="link">
    <VideoCard videoItem={video}/>
    </Link>
    </Grid>)
})}
   </Grid>

</div>  )
}

export default Video