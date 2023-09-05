import { Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";


const Navbar = () => {
  return (
    <>
      <Flex
        justifyContent={"flex-end"}
        alignItems={"center"}
        bg={"#0C356A"}
        position={"sticky"}
        top={"0"}
        h={"10vh"}
      >
        <Text
          color={"#F6F4EB"}
          fontWeight={"500"}
          fontSize={"30px"}
          margin={"auto"}
        >
          Task Management
        </Text>
        <Flex w={"20%"} justifyContent={"space-around"}>
          <Text
            color={"white"}
            fontSize={"25px"}
            fontWeight={"bolder"}
            fontFamily={`'Schibsted Grotesk', sans-serif`}
          >
            {" "}
            <Badge ml="1" fontSize="0.8em" colorScheme="green">
              Narayan
            </Badge>
          </Text>
          <Button>Log Out</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
