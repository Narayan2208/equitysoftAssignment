import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Addtask from "./Addtask";
import { Alert, AlertIcon, Box } from "@chakra-ui/react";
import axios from "axios";
import TaskViewer from "./TaskLayout";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [assignedtasks, setAssignedTasks] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoding] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/tasks/unassigned`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => alert(err.message));
  }, [update]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/tasks/assigned`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setAssignedTasks(res.data);
        // setLoding(false)
      })
      .catch((err) => alert(err.message));
  }, [update]);
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
        <TaskViewer
          setTasks={setTasks}
          tasks={tasks}
          setUpdate={setUpdate}
          setAssignedTasks={setAssignedTasks}
          assignedtasks={assignedtasks}
          isLoading={isLoading}
        />
      </Box>
    </>
  );
};

export default Home;
