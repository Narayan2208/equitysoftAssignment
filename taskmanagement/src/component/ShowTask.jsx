import React, { useEffect } from 'react'
import axios from "axios";
const ShowTask = () => {
    const ShowTask = () => {
        useEffect(() => {
          getAllTasks();
        }, []);
      
        let getAllTasks = async () => {
          try {
            // Retrieve the user's token from localStorage
            const userToken = localStorage.getItem("token");
      
            // Check if the user is authenticated
            if (!userToken) {
              console.error("User not authenticated");
              // Handle this error as needed (e.g., redirect to login)
              return;
            }
      
            // Send the token in the Authorization header
            const headers = {
              Authorization: `Bearer ${userToken}`,
            };
      
            let tasks = await axios.get("http://localhost:8000/api/tasks/unassigneds", {
              headers: headers,
            });
      
            console.log(tasks.data, "task");
          } catch (error) {
            console.error("Error fetching tasks:", error);
          }
        }}
  return (
    <div>ShowTask</div>
  )
}

export default ShowTask