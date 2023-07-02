import React from 'react'
import {Box} from "@mui/material"
import "./Header.css"

import { Link} from "react-router-dom";

const Header = ({children}) => {

  return (
    <><Box className="header">
          <Link to={"/"}>
      <Box ><img src='/xlogo.png' alt='logo' /></Box></Link>
      {children}
 
    </Box>
    </>

  )
}

export default Header;