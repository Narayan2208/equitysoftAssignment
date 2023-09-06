import React from 'react'
import Navbar from './Navbar'
import Addtask from './Addtask'
import { Box } from '@chakra-ui/react'
import ShowTask from './ShowTask'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Box width={"10%"} margin={"30px auto"}>

    <Addtask/>

    </Box>
    <ShowTask  />
    </>
  )
}

export default Home