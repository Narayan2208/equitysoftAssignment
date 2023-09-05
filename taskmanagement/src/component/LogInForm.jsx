import React, { useState, useContext } from "react";
import {
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { SiGmail } from "react-icons/si";
import { MdPassword } from "react-icons/md";
import "./SignUpForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Appcontext } from "../ContextProvider/AppcontextProvider";
const LogInForm = () => {
  let toast = useToast();

  let [loginobj, setloginobj] = useState({
    email: "",
    password: "",
  });
  let { isauth, setisauth } = useContext(Appcontext);
  let handleLogin = (e) => {
    setloginobj({ ...loginobj, [e.target.name]: e.target.value });
  };

  let doLogin = async (e) => {
    try {
      // Make a POST request to your backend
      let res = await axios.post("http://localhost:8000/api/login", loginobj);
      console.log(res);

      // Clear the form fields
      setloginobj({ email: "", password: "" });

      // Show a toast message for successful signup
      toast({
        title: "Signup Success",
        description: "You have successfully signed up!",
        status: "success",
        duration: 5000, // The toast message will be displayed for 5 seconds
        isClosable: true,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.name);
      setisauth(true);
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
          Log In
        </Text>
        <Stack w={"100%"} spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SiGmail color="gray.300" />
            </InputLeftElement>
            <Input
              type="email"
              name="email"
              onChange={handleLogin}
              placeholder="Enter your Email"
              required={true}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <MdPassword color="gray.300" />
            </InputLeftElement>
            <Input
              type="password"
              name="password"
              onChange={handleLogin}
              placeholder="Enter your password"
              required={true}
            />
          </InputGroup>
          <Box>
            <Link to={"/home"}>
              <Button
                onClick={() => {
                  doLogin();
                }}
                bg={"#1273EB"}
                w={"100%"}
                color={"white"}
              >
                Submit
              </Button>
            </Link>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default LogInForm;
