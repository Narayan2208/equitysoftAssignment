import React, { useEffect, useState } from "react"
import Navbar from "./Navbar"
import Addtask from "./Addtask"
import { Alert, AlertIcon, Box } from "@chakra-ui/react"
import axios from "axios"
import AllTask from "./TaskLayout"
const Home = () => {
  const [tasks, setTasks] = useState([])
 
  const [update, setUpdate] = useState(false)
  const [isLoading, setLoding] = useState(true)
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("token in home", token)
    axios
      .get(`http://localhost:8000/v1/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("tasks", tasks)
        setTasks(res.data)
      })
      .catch((err) => alert(err.message))
  }, [update])

 
  return (
    <>
      <Box bg={"#E4F1FF"}>
        <Navbar />
        <Alert status="info">
          <AlertIcon />
          Each time, After Adding a task, you have to refresh the whole page
        </Alert>
        <Box width={"10%"} margin={"30px auto"}>
          <Addtask />
        </Box>
        <AllTask tasks={tasks} setUpdate={setUpdate}  />
      </Box>
    </>
  )
}

export default Home
