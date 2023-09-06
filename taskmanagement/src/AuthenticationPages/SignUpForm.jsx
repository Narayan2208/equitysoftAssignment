import React, { useState } from "react";
import {
  Button,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SiGmail } from "react-icons/si";
import { MdPassword } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import "./SignUpForm.css";
import axios from "axios";
const SignUpForm = () => {
  let signinUsers = {
    name: "",
    email: "",
    password: "",
  };
  let toast = useToast();

  let [signinUser, setSignInUser] = useState(signinUsers);
 
  let handleSubmit = async (e) => {
    
    try {
      // Make a POST request to your backend
      const response = await axios.post("http://localhost:8000/api/register", 
        signinUser,
        
      );

      // Handle the response
      console.log(response.data);

      // Clear the form fields
      setSignInUser({ name: "", email: "", password: "" });

      // Show a toast message for successful signup
      toast({
        title: "Signup Success",
        description: "You have successfully signed up!",
        status: "success",
        duration: 5000, // The toast message will be displayed for 5 seconds
        isClosable: true,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Box
        w={"70%"}
        p={"10px 20px 30px 20px"}
        position={"absolute"}
        top={"15rem"}
        left={"8rem"}
        bg={"white"}
        box-shadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px"}
       
      >
        <Text
          textAlign={"center"}
          fontSize={"30px"}
          fontWeight={"bold"}
          mb={5}
          fontFamily={`'Schibsted Grotesk', sans-serif`}
        >
          Sign Up
        </Text>
        <Stack w={"100%"} spacing={4} >
      
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <BsFillPersonFill color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Enter your name"
              onChange={(e) =>
                setSignInUser({ ...signinUser, name: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SiGmail color="gray.300" />
            </InputLeftElement>
            <Input
              type="gmail"
              placeholder="Enter your Phone number"
              onChange={(e) =>
                setSignInUser({ ...signinUser, email: e.target.value })
              }
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdPassword color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              placeholder="Enter your password"
              onChange={(e) =>
                setSignInUser({ ...signinUser, password: e.target.value })
              }
            />
          </InputGroup>

          <Box>
            <Button
              bg={"#1273EB"}
              w={"100%"}
              color={"white"}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default SignUpForm;
