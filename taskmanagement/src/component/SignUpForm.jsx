import React from "react";
import {

  Button,
  
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
} from "@chakra-ui/react";
import { SiGmail } from "react-icons/si";
import { MdPassword } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import "./SignUpForm.css"
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {

  return (
    <>
      <Box
        w={"70%"}
        p={"10px 20px 30px 20px"}
        position={"absolute"}
        top={"15rem"}
        left={"8rem"}
        bg={"white"}
        box-shadow= {"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
      >
        <Text textAlign={"center"} fontSize={"30px"} fontWeight={"bold"} mb={5} fontFamily={`'Schibsted Grotesk', sans-serif`}>Sign Up</Text>
        <Stack w={"100%"} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsFillPersonFill color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="Enter your name" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SiGmail color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="Enter your Phone number" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdPassword color="gray.300" />
            </InputLeftElement>
            <Input type="tel" placeholder="Enter your password" />
          </InputGroup>

          <Box  >
            <Button bg={"#1273EB"} w={"100%"} color={"white"} >Submit</Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default SignUpForm;
