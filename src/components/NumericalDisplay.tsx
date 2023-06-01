/*
Displays a numerical value of a sensor along with a title and units of the measurement
*/

import { Box, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  value: number | string | boolean;
  units: string;
}

const NumericalDisplay = (props: Props) => {
  return (
    <>
      <Box
        textAlign="center"
        border="1px solid"
        borderRadius="md"
        py={4}
        _hover={{ bg: "black", color: "white" }}
      >
        <Text fontSize="xl" fontWeight="bold" mb={2}>
          {props.title}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" mb={2}>
          {Math.round(Number(props.value) * 100) / 100}
        </Text>
        <Text fontSize="lg">{props.units}</Text>
      </Box>
    </>
  );
};

export default NumericalDisplay;
