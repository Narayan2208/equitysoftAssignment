import { Box, Heading, Highlight, Divider, Flex } from "@chakra-ui/react"

import UnAssignedTTask from "./UnAssignedTTask"
import "./TaskLayout.css"
export default function AllTask({ tasks, setUpdate }) {
  // font-family: 'Poppins', sans-serif;
  return (
    <Box w={"80%"} margin={"auto"} >
      <Heading mb={10} fontSize={50} fontFamily={`'Poppins', sans-serif`}>
        All Tasks
      </Heading>
      <Divider />

      <Heading as="h4" size="md" mt={10}>
        <Highlight
          query={["My Tasks"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
        >
          My Tasks
        </Highlight>
      </Heading>
      <Box display={"grid"} gridTemplateColumns={"repeat(2,1fr)"}>

      {tasks.map((task) => {
        return (
          

            <UnAssignedTTask task={task} setUpdate={setUpdate} />
          
        ) 
      })}
      </Box>
     
    </Box>
  )
}
