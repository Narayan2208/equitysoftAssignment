import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
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
          <Card>
            <CardHeader>
              <Heading size="md">{e.name}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    {e.description}
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {e.labels}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        );
      })}
    </>
  );
};

export default UnAssignedTTask;
