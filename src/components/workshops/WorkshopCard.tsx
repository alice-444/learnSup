import { FiVideo } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { WorkshopStrict } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const WorkshopCard = ({
  workshop,
  isUpcoming,
}: {
  workshop: WorkshopStrict;
  isUpcoming: boolean;
}) => {
  return (
    <div className="bg-gray-900/65 rounded-2xl shadow-lg p-4 flex flex-col gap-2 max-w-sm w-full border border-white/10 backdrop-blur-sm">
      <div className="flex flex-row gap-4">
        <div className="flex-shrink-0 relative w-20 h-20 flex items-start justify-center">
          <img
            src={workshop.avatar}
            alt={workshop.name}
            className="w-20 h-20 rounded-full object-cover shadow"
          />
          <span
            className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              workshop.online ? "bg-green-400" : "bg-gray-400"
            } translate-x-1/2 -translate-y-1/2`}
            title={workshop.online ? "En ligne" : "Occupé"}
          />
        </div>
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-white leading-tight">
              {workshop.name}
            </span>
            <span className="text-gray-300 text-base font-medium">
              • {workshop.level}
            </span>
          </div>
          <div className="text-gray-200 text-base mb-1 font-normal">
            {workshop.status}
          </div>
          <div className="flex items-center gap-2 text-yellow-400 text-lg mb-1">
            <span className="font-bold">{workshop.rating.toFixed(1)}</span>
            <FaStar className="h-5 w-5 text-yellow-300" />
            <span className="text-gray-300 text-base font-normal">
              ({workshop.evaluations} évaluations)
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 my-2 w-full" />
      <div className="text-gray-100 text-lg mb-1 font-semibold">
        <span>Atelier donné :</span> {workshop.course}
      </div>
      <div className="text-gray-300 text-base">{workshop.date}</div>
      <div className="text-gray-300 text-base">{workshop.time}</div>
      <div className="text-gray-400 text-base italic mt-1">
        {workshop.description}
      </div>
      {isUpcoming && (
        <Button
          variant="default"
          size="sm"
          className="rounded-full h-10 px-2 bg-white text-[#3B82F6] font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 shadow-lg shadow-white/10 mt-3 w-full justify-center hover:bg-[#2563eb] hover:text-white hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-100"
        >
          <span className="text-lg">Participer</span>
          <FiVideo className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
};
