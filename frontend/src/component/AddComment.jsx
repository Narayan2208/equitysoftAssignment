import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  Heading,
  StackDivider,
  Box,
  Text,
  Stack,
  Highlight,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";

import { useState } from "react";

import { AiOutlineComment } from "react-icons/ai";
import axios from "axios";
const AddComment = ({ task, setUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState("");

  function addComment() {
    if (input !== "") {
      axios
        .post(
          `http://localhost:8000/v1/tasks/comment/${task._id}`,
          {
            text: input,
            name: localStorage.getItem("userName"),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setUpdate((prev) => !prev);
          setInput("");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("fill the commments field");
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"#379237"}
        color={"white"}
        _hover={{ bg: "#FF8400" }}
        rightIcon={<AiOutlineComment />}
      >
        View Comments
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Highlight
              query="View Comments"
              styles={{
                px: "2",
                py: "1",
                rounded: "full",
                bg: "#FB2576",
                color: "white",
              }}
            >
              View Comments
            </Highlight>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Card>
                <CardHeader>
                  <Heading size="md">Comments</Heading>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    {task.comments.map((comment) => {
                      return (
                        <Box>
                          <Heading size="xs" color={"#425F57"}>
                            {comment.name}
                          </Heading>

                          <Text
                            pt="2"
                            fontSize="sm"
                            fontWeight={"bold"}
                            color={"#749F82"}
                          >
                            {comment.text}
                          </Text>
                        </Box>
                      );
                    })}
                    <Box>
                      <Input
                        type="text"
                        value={input}
                        placeholder="Add your Comments"
                        onChange={(e) => {
                          setInput(e.target.value);
                        }}
                      />
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              bg={"#DC0000"}
              _hover={{ bg: "#850000" }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={addComment}
              bg={"#337CCF"}
              color="white"
              _hover={{ bg: "#191D88", color: "white" }}
            >
              Add Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComment;
