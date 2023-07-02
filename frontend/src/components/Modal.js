import React from 'react'
import {FormHelperText,InputLabel,FormControl, Select, MenuItem, IconButton,Typography, Box, Dialog, DialogTitle, TextField, DialogContent, DialogActions,Button } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const Modal = ({  modalOpen,
  handleClose,
  formData,
  handleFormInputs,
  handleSave,}) => {
  return (
    <div> <Dialog open={modalOpen} onClose={handleClose}  maxWidth="lg"
    className="dialogue-container">
    <DialogTitle>
      <Box sx={{display:"flex", justifyContent:"space-between"}}>
      <Typography gutterBottom variant="h5" component="div">
                  Upload Video
                </Typography>
                <IconButton aria-label="close" onClick={handleClose}  sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "rgba(255,255,255,.87)",
          }}>
<CloseIcon/>
                </IconButton>
      </Box>
    </DialogTitle>
    <DialogContent >
    <FormControl onChange={handleFormInputs}>
      <TextField
        margin="normal"
        id="videoLink"
        label="Video Link"
        type="text"
        name="videoLink"
        value={formData.videoLink}
        fullWidth
        variant="outlined"
        helperText="This Link will be used to derive the video"
      />
          <TextField
        margin="normal"
        id="previewImage"
        label="Thumbnail Image Link"
        type="text"
        name="previewImage"
        value={formData.previewImage}
        fullWidth
        variant="outlined"
        helperText=" This link will be used to preview the thumbnail image"
      />
       <TextField
        margin="normal"
        id="title"
        label="Title"
        type="text"
        name="title"
        value={formData.title}
        fullWidth
        variant="outlined"
        helperText=" The title will be the representative text for video"
      />
     <FormControl variant="outlined" margin="normal" fullWidth>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre"
                value={formData.genre}
                name="genre"
                onChange={handleFormInputs}
                label="Genre"
                helperText="hi"
              >
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                <MenuItem value="Movies">Movies</MenuItem>
              </Select>
              <FormHelperText sx={{ ml: 2 }}>
                Genre will help in categorizing your videos
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel id="rating-label">Suitable age group for the clip</InputLabel>
              <Select
                labelId="rating-label"
                value={formData.contentRating}
                label="Suitable age group for the clip"
                name="contentRating"
                margin="none"
                fullWidth
                onChange={handleFormInputs}
              >
                <MenuItem value="Anyone">Anyone</MenuItem>
                <MenuItem value="12+">12+</MenuItem>
                <MenuItem value="18+">18+</MenuItem>
                <MenuItem value="16+">16+</MenuItem>
                <MenuItem value="7+">7+</MenuItem>
              </Select>
            <FormHelperText sx={{ ml: 2,mb:2.5 }}>
            This will be used to filter videos on age group suitability
            </FormHelperText>
          </FormControl>
          <DatePicker
              disableFuture
              label="Release Date"
              openTo="year"
              views={["year", "month", "day"]}
              inputFormat="DD/MM/YYYY"
              onChange={(e) => {
                handleFormInputs(e);
              }}
              value={formData.releaseDate}
                           renderInput={(params) => (
                <TextField margin="normal" {...params} />
              )}
            />
            <FormHelperText sx={{ ml: 2 }}>
              This will be used to sort videos
            </FormHelperText>
            </FormControl>
    </DialogContent>
    <DialogActions sx={{ justifyContent: "flex-start" ,pb:3}}>
      <Button varaint="filled"  sx={{
            backgroundColor: "#EE1520",
            color:"white",
            "&:hover": { backgroundColor: "#EE1520" },
          }}onClick={handleSave} >UPLOAD VIDEO</Button>
      <Button sx={{color:"white"}}onClick={handleClose}>CANCEL</Button>
    </DialogActions>
  </Dialog></div>
  )
}

export default Modal