import React from 'react'
import Navbar from './Navbar'
import Addtask from './Addtask'
import { Box } from '@chakra-ui/react'
import AssignedTask from './AssignedTask'
import UnAssignedTTask from './UnAssignedTTask'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Box width={"10%"} margin={"30px auto"}>

    <Addtask/>

    </Box>
    {/* <AssignedTask  /> */}
    <UnAssignedTTask/>
    </>
  )
}

export default Home