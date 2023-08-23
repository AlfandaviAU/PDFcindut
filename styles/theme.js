import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    pink: {
      50: "#ffe4e6",
      100: "#ffb5ba",
      200: "#ff858f",
      300: "#ff5765",
      400: "#ff273b",
      500: "#ff0015",
      600: "#cc0011",
      700: "#99000c",
      800: "#660007",
      900: "#330003",
    },
  },
  components: {
    // Customize Chakra UI components if needed
  },
});

export default theme;
