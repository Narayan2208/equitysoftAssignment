import { Box, Heading, Highlight, Divider } from "@chakra-ui/react";

import UnAssignedTTask from "./UnAssignedTTask";
import "./TaskLayout.css"
export default function TaskLayout({
  
  tasks,
  setUpdate,
  assignedtasks,
}) {
  // font-family: 'Poppins', sans-serif;
  return (
    <Box w={"80%"} margin={"auto"}>
      <Heading mb={10} fontSize={50} fontFamily={`'Poppins', sans-serif`}>Tasks</Heading>
        <Divider/>

      <Heading as="h4" size="md">
        <Highlight
          query={["Assigned Tasks"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          Assigned Tasks
        </Highlight>
      </Heading>
      {assignedtasks.map((task) => {
        return <UnAssignedTTask task={task} setUpdate={setUpdate} />;
      })}
      <Divider/>
      <Heading as="h4" size="md" mt={10}>
        <Highlight
          query={["Created Tasks"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          Created Tasks
        </Highlight>
      </Heading>
      {tasks.map((task) => {
        return <UnAssignedTTask task={task} setUpdate={setUpdate} />;
      })}
    </Box>
  );
}
