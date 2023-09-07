import React, { useEffect, useState } from "react"
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
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import axios from "axios"
import { FaPlus } from "react-icons/fa"
const Addtask = ({ setTasks, tasks }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    checklist: "",
    labels: "",
    creatorName: "",
  })
  const [userToken, setUserToken] = useState("")
  const [userName, setUserName] = useState("")
  let toast = useToast()
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setUserToken(localStorage.getItem("token"))
    setUserName(localStorage.getItem("userName"))
  }, [])

  useEffect(() => {
    setFormData({ ...formData, creatorName: userName })
  }, [userName])

  const handleSubmit = async () => {
    let { description, name, checklist, labels, dueDate, creatorName } =
      formData
    console.log(formData)
    if (
      name !== "" &&
      dueDate !== "" &&
      description !== "" &&
      checklist !== "" &&
      labels !== "" &&
      creatorName !== ""
    ) {
      let labelarr = labels.split(",")
      let checkarr = checklist.split(",")
      let mcheckarr = []
      for (let elem of checkarr) {
        let melem = { text: elem, completed: false }
        mcheckarr.push(melem)
      }
      // console.log(token)
      let response = await axios.post(
        `http://localhost:8000/v1/createtask`,
        {
          description,
          name,
          checklist: mcheckarr,
          labels: labelarr,
          dueDate,
          creatorName,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )
      console.log("created", response.data)
      console.log("created", tasks)
      toast({
        title: "Task Added",
        description: "Your task added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      console.log("tasks", tasks)
      onClose()
    } else {
      alert("please fill all fields")
    }
  }

  return (
    <>
      <Button
        onClick={onOpen}
        rightIcon={<FaPlus />}
        bg={"#FF3FA4"}
        color={"#F8FF95"}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        Add a task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={5}>
              <Input
                placeholder="Enter your task name"
                size="lg"
                value={formData.name}
                type="text"
                name="name"
                onChange={handleChange}
              />
              <Textarea
                placeholder="Description"
                size="lg"
                value={formData.description}
                type="text"
                name="description"
                onChange={handleChange}
              />
              <Input
                placeholder="Enter checklist, separate by commas"
                size="lg"
                type="text"
                name="checklist"
                onChange={handleChange}
              />
              <Input
                type="date"
                placeholder="due date"
                size="lg"
                value={formData.dueDate}
                name="dueDate"
                onChange={handleChange}
              />
              <Input
                placeholder="Author Name"
                size="lg"
                value={formData.createdBy}
                type="text"
                name="labels"
                onChange={handleChange}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              Submit Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Addtask
