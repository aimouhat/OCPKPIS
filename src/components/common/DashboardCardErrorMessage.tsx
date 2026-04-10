import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";

interface Props {
  message?: string;
}

const DashboardCardErrorMessage = ({ message }: Props) => {
  return (
    <DashboardCard>
      <Alert status="error" h="100%" flexDirection="column" justifyContent="center" textAlign="center">
        <AlertIcon boxSize="40px" />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Data Fetch Error
        </AlertTitle>
        <AlertDescription>{message || "Could not retrieve data for this widget."}</AlertDescription>
      </Alert>
    </DashboardCard>
  );
};

export default DashboardCardErrorMessage;