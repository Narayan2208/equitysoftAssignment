import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React from "react";
import authImage3 from "../Asset/Kraken Crypto Exchange _ Buy crypto with peace of mind.jpeg";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import { Link } from "react-router-dom";

const AuthenticationLayoutPage = () => {
  return (
    <>
    <Link to={"/"}>
      <Flex>
        <Box w={"50%"} h={"100vh"}>
          <Image
            src={authImage3}
            // w={"100%"}
            margin={"auto"}
            h={"100%"}
           
          />
        </Box>
       
        <Box w={"50%"} position={"relative"} bg={"#F7F7F9"}>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList
              display={"flex"}
              justifyContent={"space-between"}
              pt={"30px"}
              w={"30%"}
              margin={"auto"}
            >
              <Tab
                borderBottom={"2px solid green"}
                fontFamily={`'Schibsted Grotesk', sans-serif`}
              >
                SignUp
              </Tab>
              <Tab
                borderBottom={"2px solid green"}
                fontFamily={`'Schibsted Grotesk', sans-serif`}
              >
                LogIn
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SignUpForm />
              </TabPanel>
              <TabPanel>
                <LogInForm />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      </Link>
    </>
  );
};

export default AuthenticationLayoutPage;
