
import './App.css';
import {Routes,Route} from "react-router-dom";
import { Main } from './components/Main';
import { VideoPage } from './components/VideoPage';



function App() {
  return (
    <div className="App">
       <Routes>
             <Route path="/videos/:id" element={<VideoPage/>} />
     <Route exact path="/" element={<Main/>}/>
      </Routes>
      
        </div>
  );
}

export default App;
