import React from 'react';
import { Card, CardActionArea, CardMedia,CardContent,Typography,Box,Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./videocard.css";

export const VideoCard = ({videoItem}) => {
  const getDuration=(releaseDate)=>{
    const date2 = new Date(); // Current date
const date1=new Date(releaseDate)
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Total number of days
    
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    if(years>=1){
      return `${years} years ago`
    }else if(months>=1){
      return `${months} months ago`
    }else{
      return `${days} days ago`
    }
  }
  return(
    <Card sx={{ maxWidth: 270, maxHeight: 220 }} className="card">
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={videoItem.previewImage}
          alt="green iguana"
        />
        <CardContent sx={{ p: 1 }} className="cardBody">
          <Typography variant="subtitle2" className="title">
            {videoItem.title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="subtitle"
          >
            <Typography variant="body3" color="text.secondary">
              {getDuration(videoItem.releaseDate)}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{alignItems: "center"}}>
              <VisibilityIcon fontSize="small" />
              <Typography variant="body3" color="text.secondary">
                {videoItem.viewCount}
              </Typography>
            </Stack>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
