import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "../styles/theme"; // Create this file in the next step

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="pink.50" minHeight="100vh">
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
