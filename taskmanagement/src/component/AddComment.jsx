import React from "react"
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
} from "@chakra-ui/react"
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react"

import { useState } from "react"
import { useEffect } from "react"
import {AiOutlineComment } from 'react-icons/ai';
import axios from "axios"
const AddComment = ({ task, setUpdate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [input, setInput] = useState("")

  function addComment() {
    if (input !== "") {
      axios
        .post(
          `http://localhost:8000/api/tasks/${task._id}/comments`,
          {
            text: input,
            name: localStorage.getItem("userName"),
          },
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem("token")
              }`,
            },
          }
        )
        .then((res) => {
          setUpdate((prev) => !prev)
          setInput("")
        })
        .catch((err) => {
          alert(err.message)
        })
    } else {
      alert("fill the commments field")
    }
  }

  return (
    <>
      <Button onClick={onOpen} rightIcon={<AiOutlineComment/>} >View Comments</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Comments</ModalHeader>
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
                          <Heading size="xs" textTransform="uppercase">
                            {comment.name}
                          </Heading>
                          <Text pt="2" fontSize="sm">
                            {comment.text}
                          </Text>
                        </Box>
                      )
                    })}
                    <Box>
                      <Input
                        type="text"
                        value={input}
                        placeholder="Add your Comments"
                        onChange={(e) => {
                          setInput(e.target.value)
                        }}
                      />
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={addComment}>
              Add Comment
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddComment