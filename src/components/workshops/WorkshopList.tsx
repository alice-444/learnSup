import { WorkshopStrict } from "@/lib/types";
import { WorkshopCard } from "./WorkshopCard";

export const WorkshopList = ({
  workshops,
  isUpcoming,
}: {
  workshops: WorkshopStrict[];
  isUpcoming: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workshops.map((w) => (
        <WorkshopCard key={w.id} workshop={w} isUpcoming={isUpcoming} />
      ))}
    </div>
  );
};
