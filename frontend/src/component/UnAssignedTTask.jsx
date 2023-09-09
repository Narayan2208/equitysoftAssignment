import {
  Card,
  Checkbox,
  CardBody,
  CardFooter,
  Box,
  Stack,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react"

import AddComment from "./AddComment"
import "./TaskLayout.css"
export default function UnAssignedTTask({ task, setUpdate }) {
  return (
    
    <Card
      borderRadius={"0px 20px 0px 20px"}
      overflow="hidden"
      variant="outline"
      w={"90%"}
      mt={5}
      bg={"#AED2FF"}
      boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
    >
      <Stack>
        <CardBody p={10} mb={"-30px"}>
          <Heading
            size="md"
            lineHeight={10}
            fontFamily={`'Poppins', sans-serif`}
            color={"#2A2F4F"}
          >
            Task Name : {task.name}
          </Heading>
        
          <HStack spacing={0} justify={"space-between"}>
            <Box fontFamily={`'Poppins', sans-serif`}>
              <Text fontFamily={`'Poppins', sans-serif`} h="fit-content" mb={3} fontSize={"15px"} color={"#352F44"}>
                <Heading as="h3" size="sm" display={"inline"}>
                  Description :
                </Heading>{" "}
                {task.description}
              </Text>
              <Text h="fit-content" mb={3} color={"#4E4FEB"} display={"flex"} >
                <Heading as="h3" size="sm" display={"inline"}>
                  Labels :
                </Heading>{" "}
                {task.labels.map((label) => {
                  return (
                    <Text ml={"10px"} size="sm" mr={2} variant="outline" color={"#46458C"}>
                      {label}
                    </Text>
                  )
                })}
              </Text>
            
            </Box>

          </HStack>
            <HStack mr={20} mb={5}>
              <Text fontFamily={`'Poppins', sans-serif`}>Checklists : </Text>
              {task.checklist.map((elem) => {
                return (
                  <Checkbox colorScheme="green" defaultChecked={elem.completed}>
                    {elem.text}
                  </Checkbox>
                )
              })}
            </HStack>
          <HStack spacing={5} mb={4}>
            
            <Text fontFamily={`'Poppins', sans-serif`} color={"#102C57"}>
              <span fontFamily={`'Poppins', sans-serif`}>Due date:-</span>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </HStack>
        </CardBody>

        <CardFooter p={0}>
          <HStack spacing={100}>
            <AddComment task={task} setUpdate={setUpdate} />
            <Text fontFamily={`'Poppins', sans-serif`} color={"#C70039"} fontSize={"12px"} fontWeight={"bold"}>
              <span fontFamily={`'Poppins', sans-serif`} fontSize={"10px"}>Created by:-</span>{" "}
              {task.createdBy.name}
            </Text>
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  
  )
}
