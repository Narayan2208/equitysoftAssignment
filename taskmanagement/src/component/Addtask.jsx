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
  Stack,
} from "@chakra-ui/react";
const Addtask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
             
              <Input className="task" placeholder="Enter your task name" size="lg" />
              <Input placeholder="Description" size="lg" />
              <Input placeholder="due date" size="lg" />
             
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Submit Task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Addtask;
