import { useEffect, useState } from "react";
import NumericalDisplay from "../components/NumericalDisplay";
import SimpleLineGraph from "../components/SimpleLineGraph";
import { Box, Button, Container, Flex, Grid, GridItem } from "@chakra-ui/react";

// Config included here for simplicity but we can easily adapt this config and move it somewhere else as required.
// Set the tag names and units.
const tags = [
  { tag: "temperature", units: "°C" },
  { tag: "humidity", units: "%" },
  { tag: "pressure", units: "mbar" },
];

// Set where the data coming from (in my example it comes via a Cloudflare worker linked to an InfluxDB database)
const dataEndpoint = "REPLACE WITH YOUR CLOUDFLARE ENDPOINT";

// Refresh button delay (in ms)
const refreshDelay = 5000;

// Data is expected in the following format (a timestamp field called "time" and any number of keys for the measurements)
interface Data {
  [key: string]: number | string | boolean;
  time: string;
}

const Dashboard = () => {
  const [sensorData, setSensorData] = useState<Data[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    fetchWorkerEndpoint()
      .then((result) => {
        setSensorData(result);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  async function fetchWorkerEndpoint() {
    try {
      const response = await fetch(dataEndpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the worker endpoint");
      }
      const data = await response.json();

      // Reformat the timestamps so they are more readable
      const formattedData = data
        .slice(0, -1)
        .map((obj: Record<string, any>) => {
          const formattedObject: Record<string, any> = {};
          Object.keys(obj).forEach((key) => {
            if (key === "time") {
              const timestamp = new Date(obj[key]);
              const formattedTimestamp = timestamp.toLocaleString();
              formattedObject[key] = formattedTimestamp;
            } else {
              formattedObject[key] = obj[key];
            }
          });
          return formattedObject;
        });

      return formattedData;
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return [];
    }
  }

  // Handles refresh button press (includes a delay to prevent spamming of the refresh button)
  function handleRefresh() {
    setIsButtonDisabled(true);

    fetchWorkerEndpoint()
      .then((result) => {
        setSensorData(result);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });

    // Enable the button after a delay
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, refreshDelay);
  }

  return (
    <>
      <Container py={5}>
        <Box position="fixed" bottom="4" right="4" zIndex="25">
          <Flex justify="flex-end">
            <Button
              isDisabled={isButtonDisabled}
              onClick={handleRefresh}
              bgColor="#000000"
              color="#ffffff"
              p="20px"
              variant="outline"
              fontSize={18}
              size="lg"
              w="100%"
              border="none"
              borderRadius={0}
              _hover={{ bg: "white", color: "black", border: "solid black" }}
            >
              Refresh Data
            </Button>
          </Flex>
        </Box>

        {/* An array of numerical displays */}
        <Grid
          templateColumns={"repeat(3, 1fr)"}
          gap={4}
          justifyItems="center"
          py={"25px"}
        >
          {tags.map((m, k) => {
            return (
              <GridItem
                key={k}
                colSpan={[3, 3, 1]}
                width={["100%", "100%", "100%"]}
              >
                <NumericalDisplay
                  key={k}
                  title={m.tag}
                  value={
                    sensorData.length > 0
                      ? sensorData[sensorData.length - 1][m.tag]
                      : 0.0
                  }
                  units={m.units}
                />
              </GridItem>
            );
          })}
        </Grid>

        {/* Single parameter line charts to display each data series */}
        {tags.map((m, k) => {
          return (
            <SimpleLineGraph key={k} data={sensorData} measurement={m.tag} />
          );
        })}
      </Container>
    </>
  );
};

export default Dashboard;
