import React from "react";
import { FaTrophy } from "react-icons/fa";

const RankCard = ({ rank }) => {
  const styles = {
    Gold: {
      color: "#FFD700",
      shadow: "drop-shadow(0 6px 8px rgba(255, 215, 0, 0.3))",
    },
    Silver: {
      color: "#C0C0C0",
      shadow: "drop-shadow(0 8px 16px rgba(192, 192, 192, 0.4))",
    },
    Bronze: {
      color: "#CD7F32",
      shadow: "drop-shadow(0 8px 16px rgba(205, 127, 50, 0.4))",
    },
  };
  const s = styles[rank] ?? styles.Silver;

  return (
    <div className="bg-white p-2 sm:p-4 rounded-2xl w-full max-w-xl border border-gray-100">
      <div className="flex justify-center mb-1">
        <FaTrophy
          className="text-8xl"
          style={{ color: s.color, filter: s.shadow }}
          aria-label={`${rank} Trophy Icon`}
        />
      </div>
      <p className="md:text-2xl font-medium tracking-wider text-green-600 text-center">
        {rank}
      </p>
    </div>
  );
};

export default RankCard;
