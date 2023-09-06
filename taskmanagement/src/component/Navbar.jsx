import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../ContextProvider/AppcontextProvider";
import { FiLogOut } from 'react-icons/fi';
import "./TaskLayout.css"
const Navbar = () => {
  const [username, setUsername] = useState(""); // State to store the username
  const navigate = useNavigate();
  let { isauth, setisauth } = useContext(Appcontext);
  useEffect(() => {
    // Fetch the username from local storage when the component mounts
    const storedUsername = localStorage.getItem("userName");

    // Update the state with the retrieved username
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleLogout = () => {
    // Clear user-related data from local storage
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setisauth(false)
   
    // navigate("/");
  };

  return (
    <>
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        bg={"#0C356A"}
        position={"sticky"}
        top={"0"}
        h={"10vh"}
        zIndex={1000}
      >
        <Text
          color={"#F6F4EB"}
          fontWeight={"500"}
          fontSize={"30px"}
          margin={"auto"}
          fontFamily={`'Poppins', sans-serif`}
        >
          Task Management
        </Text>
        <Flex w={"30%"} justifyContent={"space-around"}>
          <Text
            color={"white"}
            fontSize={"25px"}
            fontWeight={"bolder"}
            fontFamily={`'Schibsted Grotesk', sans-serif`}
          >
            {"Welcome 😊"}
            <Badge ml="1" fontSize="0.8em" colorScheme="green" fontFamily={`'Poppins', sans-serif`}>
              {username}
            </Badge>
          </Text>
          <Button  onClick={handleLogout} bg={"#BB2525"} color={"white"} fontWeight={"bold"} rightIcon={<FiLogOut/>}>Log Out</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
