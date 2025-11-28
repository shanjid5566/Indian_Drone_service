import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({
  t: tProp,
  currentPage,
  totalPages,
  totalUsers,
  currentCount,
  onChangePage,
  onPageChange,
  onPrev,
  onNext,
}) => {
  const { t: i18nT } = useTranslation();
  const t = typeof tProp === "function" ? tProp : i18nT;
  // support both prop names for page change handlers
  const onChange = onChangePage ?? onPageChange ?? (() => {});
  const handlePrev = onPrev ?? (() => onChange(Math.max(1, currentPage - 1)));
  const handleNext = onNext ?? (() => onChange(Math.min(totalPages, currentPage + 1)));
  const visiblePages = [];
  const totalToShow = 3;
  const lastToShow = 3;

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) visiblePages.push(i);
  } else {
    if (currentPage <= totalToShow) {
      for (let i = 1; i <= totalToShow; i++) visiblePages.push(i);
      visiblePages.push("dots");
      for (let i = totalPages - lastToShow + 1; i <= totalPages; i++)
        visiblePages.push(i);
    } else if (currentPage > totalPages - lastToShow) {
      for (let i = 1; i <= totalToShow; i++) visiblePages.push(i);
      visiblePages.push("dots");
      for (let i = totalPages - lastToShow + 1; i <= totalPages; i++)
        visiblePages.push(i);
    } else {
      visiblePages.push(
        1,
        "dots",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "dots",
        totalPages
      );
    }
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-2 md:pb-3">
        <p className="text-sm text-black px-4 md:px-6">
          {t("dashboard.fieldAgent.pagination.showing")} {currentCount} of{" "}
          {totalUsers} {t("dashboard.fieldAgent.pagination.users")}
        </p>

      <div className="flex flex-row flex-wrap items-center gap-0.5 sm:gap-2 px-3 sm:px-4 md:px-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t("dashboard.fieldAgent.pagination.previous")}
        </button>

        {visiblePages.map((number, index) =>
          number === "dots" ? (
            <span key={`dots-${index}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
              <button
                key={number}
                onClick={() => onChange(number)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                currentPage === number
                  ? "bg-[#28A844] text-white font-medium"
                  : "!bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {number}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {t("dashboard.fieldAgent.pagination.next")}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
