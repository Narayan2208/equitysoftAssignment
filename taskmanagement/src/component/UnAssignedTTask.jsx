import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Checkbox,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
const UnAssignedTTask = () => {
  let [unassignedTasks, setUnassignedTask] = useState([]);
  useEffect(() => {
    getAllTasks();
  }, []);

  let getAllTasks = async () => {
    try {
      const userToken = localStorage.getItem("token");

      if (!userToken) {
        console.error("User not authenticated");

        return;
      }

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      let tasks = await axios.get(
        "http://localhost:8000/api/tasks/unassigned",
        {
          headers: headers,
        }
      );
      setUnassignedTask(tasks.data);
      console.log(tasks.data, "task");
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  return (
    <>
      {unassignedTasks.map((e, id) => {
        return (
          <Card
            // direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            w={"100%"}
            mt={5}
          >
            <Stack>
              <CardBody p={10} mb={"-30px"}>
                <Heading size="md">{e.name}</Heading>
                <HStack spacing={5} mb={10}>
                  <Text>
                    <span>Created by:-</span>{" "}
                    {e.createdBy.name === undefined
                      ? "Annonymous"
                      : `${e.createdBy.name}`}
                  </Text>
                  <Text>
                    <span>Due date:-</span>{" "}
                    {new Date(e.dueDate).toLocaleDateString()}
                  </Text>
                </HStack>
                <HStack spacing={36} justify={"space-between"}>
                  <Box>
                    <Text h="fit-content" mb={3}>
                      <Heading as="h3" size="sm" display={"inline"}>
                        Description :
                      </Heading>{" "}
                      {e.description}
                    </Text>
                    <Text h="fit-content" mb={3}>
                      <Heading as="h3" size="sm" display={"inline"}>
                        Labels :
                      </Heading>{" "}
                      {e.labels.map((label) => {
                        return (
                          <Button size="sm" mr={2} variant="outline">
                            {label}
                          </Button>
                        );
                      })}
                    </Text>
                    <Text>
                      <Heading as="h3" size="sm" display={"inline"}>
                        Assigned Users :
                      </Heading>{" "}
                      {e.assignedUsers.map((elem) => {
                        return (
                          <Button size="sm" mr={2} variant="outline">
                            {elem.name}{" "}
                          </Button>
                        );
                      })}
                    </Text>
                  </Box>

                  <VStack mr={20}>
                    {e.checklist.map((elem) => {
                      return (
                        <Checkbox
                          colorScheme="red"
                          defaultChecked={elem.completed}
                        >
                          {elem.text}
                        </Checkbox>
                      );
                    })}
                  </VStack>
                </HStack>
              </CardBody>

              <CardFooter p={10}>
                <HStack spacing={10}>
                  {/* <AddMember task={task} setUpdate={setUpdate} />
            <AddComment task={task} setUpdate={setUpdate} /> */}
                </HStack>
              </CardFooter>
            </Stack>
          </Card>
        );
      })}
    </>
  );
};

export default UnAssignedTTask;
