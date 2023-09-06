import React, { useState } from "react";
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
  Checkbox,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import axios from "axios";

const Addtask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    checklist: [], // Initialize checklist as an empty array
    dueDate: "",
    createdBy: "",
  });

  // State to capture a new checklist item
  const [newChecklistItem, setNewChecklistItem] = useState("");

  // Function to add a new checklist item
  const addChecklistItem = () => {
    if (newChecklistItem.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        checklist: [
          ...prevData.checklist,
          { text: newChecklistItem, completed: false },
        ],
      }));
      setNewChecklistItem("");
    }
  };

  // Function to remove a checklist item
  const removeChecklistItem = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      checklist: prevData.checklist.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      // Retrieve the user's token from localStorage
      const userToken = localStorage.getItem("token");

      // Check if the user is authenticated
      if (!userToken) {
        console.error("User not authenticated");
        // You can display an error message or redirect the user to the login page.
        return;
      }

      // Make a POST request to your backend with the user's token in the headers
      const response = await axios.post(
        "http://localhost:8000/api/tasks",
        {
          ...formData, // Include other form data
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // Check if the response status is OK (201)
      if (response.status === 201) {
        // Handle the successful response here
        console.log("Task created:", response.data);

        // Close the modal after successful submission
        onClose();
      } else {
        // Handle other response statuses (e.g., 400, 401, etc.) here
        console.error("Error creating task. Status:", response.status);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add a task</Button>

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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                size="lg"
                value={formData.description}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <VStack align="start" spacing={2}>
                {formData.checklist.map((item, index) => (
                  <HStack key={index}>
                    <Checkbox
                      colorScheme="green"
                      isChecked={item.completed}
                      onChange={() => {
                        const updatedChecklist = [...formData.checklist];
                        updatedChecklist[index].completed = !item.completed;
                        setFormData({
                          ...formData,
                          checklist: updatedChecklist,
                        });
                      }}
                    >
                      {item.text}
                    </Checkbox>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => removeChecklistItem(index)}
                    >
                      Remove
                    </Button>
                  </HStack>
                ))}
                <HStack>
                  <Input
                    placeholder="New checklist item"
                    size="sm"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                  />
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={addChecklistItem}
                  >
                    Add
                  </Button>
                </HStack>
              </VStack>
              <Input
                type="date"
                placeholder="due date"
                size="lg"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
              <Input
                name="authorName"
                placeholder="Author Name"
                size="lg"
                value={formData.createdBy}
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, createdBy: e.target.value })
                }
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
  );
};

export default Addtask;
