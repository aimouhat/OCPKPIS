import { Card, type CardProps } from "@chakra-ui/react";
import React from "react";

interface Props extends CardProps {
    children: React.ReactNode;
}

const DashboardCard = ({ children, ...rest }: Props) => {
  return (
    <Card bg="#1B213B" color="white" p={4} borderRadius="lg" h="100%" {...rest}>
      {children}
    </Card>
  );
};

export default DashboardCard;
