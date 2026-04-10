import { Skeleton } from "@chakra-ui/react";
import DashboardCard from "./DashboardCard";

interface Props {
  h?: string | number;
}

const DashboardCardSkeleton = ({ h = "100%" }: Props) => {
  return (
    <DashboardCard>
      <Skeleton h={h} borderRadius={10} />
    </DashboardCard>
  );
};

export default DashboardCardSkeleton;