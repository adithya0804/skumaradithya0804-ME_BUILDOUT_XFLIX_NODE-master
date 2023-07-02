import React, { useEffect, useState,useCallback } from 'react';
import Header from './Header';
import './Header.css';
import './Main.css';
import { useSnackbar } from 'notistack';
import { Box, CircularProgress,TextField,Button,InputAdornment } from '@mui/material';
import CustomDropdown from './CustomDropdown';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import Video from './Video';
import axios from "axios";
import Modal from './Modal';
import{ SentimentDissatisfied }from "@mui/icons-material";
import dayjs from "dayjs"

export const Main = () => {
  const endpoint="https://a9135574-ff28-4d5e-9ce9-730f3a590e30.mock.pstmn.io/v1/videos";
  const [genre, setGenre] = useState([]);
const[rating,setRating]=useState("");
const[videos,setVideos]=useState([])
const [loading,setLoading]=useState(false);
const [notFound,setNotFound]=useState(false);
const[sort,setSort]=useState('');
const[search,setSearch]=useState("");
const [modalOpen,setModalOpen]=useState(false)
const { enqueueSnackbar } = useSnackbar();
const initialData={
  videoLink: "",
  previewImage: "",
  title: "",
  genre: "",
  contentRating: "",
  releaseDate: dayjs(new Date()),
}
const [formData,setFormData]=useState(initialData);


let timer;
const debounceSearch = (e, debounceTimeout) => {
  clearTimeout(timer);
 timer = setTimeout(()=>{
    setSearch(e.target.value)
 } ,debounceTimeout)
};

const fetchVideos=async()=>{
try{
  setLoading(true);
let response= await axios.get(endpoint);
setVideos(response.data.videos);
setLoading(false);
}catch(e){
console.log(e.message);
enqueueSnackbar(e.message,{variant:"error"})
setLoading(false);
setNotFound(true);
}
}
useEffect(()=>{
  fetchVideos();
  },[])
  const modifyRating=(e)=>{
    let selected=e.target.value
    if(selected===rating){
      setRating("");
    }else{
      setRating(selected);
    }
  }
  const modifyGenre = (e) => {
    let selected = e.target.value;
    if(selected==="All"){
   
      setGenre(["All"])}
    else{
      if(genre.includes("All")){
     setGenre((prevVal)=>prevVal.filter((item=>item!=="All")))}
     else if(genre.length===1){
      if (genre.includes(selected)) {
      setGenre(["All"]);
      }
     }
    if (genre.includes(selected)) {
      setGenre((prevVal) => prevVal.filter((item) => item !== selected));
    } else {
      setGenre((prevVal) => [...prevVal, selected]);
    }}
  };
const handleSelect=(option)=>{
  if(option==="Release Date"){
setSort("releaseDate");
  }else if(option==="View Count"){
    setSort("viewCount");
  }else{
    setSort("")
  }
}

const filtercontent=useCallback(async()=>{
  const params = {
    ...(search.length && {title:encodeURIComponent(search.toString())}),...(genre.length && {genres:genre}),...(rating.length && {contentRating:encodeURI(rating)}),...(sort.length && {sortBy:encodeURIComponent(sort.toString())})
}
setLoading(true);
try {

    const res = await axios.get(endpoint ,{params})
    setVideos(res.data.videos)
    setLoading(false);
} catch(err) {
    console.log(err)
    enqueueSnackbar(err.message,{variant:"error"})
    setNotFound(true);
setLoading(false);
}
//    }

},[search,rating,sort,genre]);

useEffect(()=>{
  filtercontent()
},[filtercontent])
const handleClose=()=>{
  setFormData(initialData);
 setModalOpen(false);
}
const validateInput=(data)=>{
if(!data.videoLink){
  enqueueSnackbar("Please input a video link",{variant:"warning"})
  return false;
}if(!(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/.test(data.videoLink))){
  enqueueSnackbar("The video link must be in this specific format - youtube.com/embed/<video-specific-identifier>",{variant:"warning"})
  return false;
}if(!data.previewImage){
  enqueueSnackbar("Please input a preview image link",{variant:"warning"})
  return false;
}if(!data.title){
  enqueueSnackbar("Please input title for the video",{variant:"warning"})
  return false;
}if(!data.genre){
  enqueueSnackbar("Please select an appropriate genre",{variant:"warning"})
  return false;
}if(!data.contentRating){
  enqueueSnackbar("Please select an appropriate rating",{variant:"warning"})
  return false;}
  return true;
}
const performSubmit=async(data)=>{
if(validateInput(data)){
try{
   await axios.post(`${endpoint}`,data);
  handleClose();
  await fetchVideos();
  enqueueSnackbar("Video uploaded Successfully",{variant:"success"});
}catch(e){
  enqueueSnackbar(e.message,{variant:"error"})
}
}
}
const handleSave=()=>{
 let videoDate=formData.releaseDate.format("DD MMM YYYY")
 let submitData={...formData,releaseDate:videoDate};
 performSubmit(submitData);
}
const handleFormInputs=(e)=>{
  if(dayjs.isDayjs(e)){
   setFormData({...formData, releaseDate:e})
  }else{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  }
  return (
    <div className="body">
             <Header >
             <Box sx={{ width: 1 / 2 }}>
            <TextField
              className="search-desktop"
                 fullWidth
              placeholder="Search"
              variant="outlined"
              size="small"
              onChange={(e) => debounceSearch(e,1000)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="adornment">
                    <SearchIcon className="SearchIcon" />
                  </InputAdornment>
                ),
              }}
                          
            />
           </Box>

          {/* upload button */}
          <Box>
            <Button
            onClick={()=>{setModalOpen(true)}}
              sx={{
                color: "white",
                textTransform: "none",
                mr: 0.8,
                backgroundColor: "#4CA3FC",
              }}
              variant="contained"
              
              size="small"
              startIcon={<UploadIcon />}
                      >
              Upload
            </Button>
            <Modal
            modalOpen={modalOpen}
            handleClose={handleClose}
            formData={formData}
            handleFormInputs={handleFormInputs}
            handleSave={handleSave}
            />
            </Box>
             </Header>
             <TextField
          className="search-mobile"
          fullWidth
          placeholder="Search"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="adornment">
                <SearchIcon className="SearchIcon" />
              </InputAdornment>
            ),
          }}
              onChange={(e) => debounceSearch(e, 1000)}
        />
            <Box className="filterPanel">
      <Box className="panel">
        {/* <Stack direction="row" spacing={2}>
        <Stack direction="row" spacing={2} className="genre"> */}
        <Box className="genreList">
          <button
            value="All"
            onClick={modifyGenre}
            className={genre.includes('All') ? 'button' : 'btn'}
          >
            All Genre
          </button>
          <button
            value="Education"
            onClick={modifyGenre}
            className={genre.includes('Education') ? 'button' : 'btn'}
          >
            Education
          </button>
          <button
            value="Sports"
            onClick={modifyGenre}
            className={genre.includes('Sports') ? 'button' : 'btn'}
          >
            Sports
          </button>
          <button
            value="Comedy"
            onClick={modifyGenre}
            className={genre.includes('Comedy') ? 'button' : 'btn'}
          >
            Comedy
          </button>
          <button
            value="Lifestyle"
            onClick={modifyGenre}
            className={genre.includes('Lifestyle') ? 'button' : 'btn'}
          >
            Lifestyle
          </button>
          </Box>
          {/* </Stack> */}
          <Box className="dropdown"><CustomDropdown options={["Release Date","View Count"]} onSelect={handleSelect} /></Box>
</Box>
{/* </Stack> */}
             
          
        <Box className="ratingList">
        <button
        value="Anyone"
        className={(rating==="Anyone")?"button":"btn"}
        onClick={modifyRating}
        variant="text">Any age group</button>
            <button
        value="7+"
        className={(rating==="7+")?"button":"btn"}
        onClick={modifyRating}
        variant="text">7+</button>
            <button
        value="12+"
        className={(rating==="12+")?"button":"btn"}
        onClick={modifyRating}
        variant="text">12+</button>
            <button
        value="16+"
        className={(rating==="16+")?"button":"btn"}
        onClick={modifyRating}
        variant="text">16+</button>
            <button
        value="18+"
        className={(rating==="18+")?"button":"btn"}
        onClick={modifyRating}
        variant="text">18+</button>
        </Box>
        </Box>
        <Box className="videoGrid">
        {loading?(<Box className="loading"><CircularProgress style={{'color': 'white'}}/>Loading Videos...</Box>):notFound?(<Box className="loading"><SentimentDissatisfied style={{'color': 'white'}}/>No Videos Found</Box>):
      ( <Video data={videos} />)}
        </Box>
        
    </div>
  );
};
