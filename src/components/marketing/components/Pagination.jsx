// src/components/ui/Pagination.jsx
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  currentPage = 1,
  totalPages = 0,
  onPageChange = () => {},
  variant = "ellipsis", // "ellipsis" | "full" | "simple"
  labels = {},
  showCount, 
  className = "",
}) => {
  const { t } = useTranslation();
  const mergedLabels = {
    prev: t("dashboard.marketing.Previous"),
    next: t("dashboard.marketing.Next", "Next"),
    ...labels,
  };

  const getPageNumbersFull = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage, "...", totalPages);
    }
    return pages;
  };

  const getVisiblePagesEllipsis = () => {
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
    return visiblePages;
  };

  const goPrev = () => onPageChange(Math.max(1, currentPage - 1));
  const goNext = () => onPageChange(Math.min(totalPages || 1, currentPage + 1));

  const renderPages = (
    pages,
    {
      activeClass = "bg-[#28A844] text-white font-medium",
      baseClass = "!bg-gray-100 text-black hover:bg-gray-200",
      dotClass = "px-2 text-gray-500",
      btnClass = "px-3 py-1.5 text-sm rounded transition-colors",
    } = {}
  ) =>
    pages.map((p, idx) =>
      p === "dots" ? (
        <span key={`dots-${idx}`} className={dotClass}>
          ...
        </span>
      ) : (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`${btnClass} ${
            currentPage === p ? activeClass : baseClass
          }`}
        >
          {p}
        </button>
      )
    );

  const PrevNext = ({
    btnClass = "px-2 sm:px-3 py-1.5 text-sm text-gray-600 !bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
    wrapClass = "flex flex-row flex-wrap items-center gap-0.5 sm:gap-2 px-3 sm:px-4 md:px-6",
    pagesUI,
  }) => (
    <div className={wrapClass}>
      <button
        onClick={goPrev}
        disabled={currentPage === 1}
        className={btnClass}
      >
        {mergedLabels.prev}
      </button>
      {pagesUI}
      <button
        onClick={goNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className={btnClass}
      >
        {mergedLabels.next}
      </button>
    </div>
  );

  // Layout wrapper with optional "Showing" text (Field Agent style)
  const Layout = ({ children }) => (
    <div className={` md:py-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-1 md:gap-3 lg:gap-4  border-gray-200 pb-2 md:pb-3">
        {showCount ? (
          <p className="text-sm text-black px-4 md:px-6"></p>
        ) : (
          <span className="sr-only">pagination</span>
        )}
        {children}
      </div>
    </div>
  );

  if (variant === "simple") {
    return (
      <div
        className={`flex items-center justify-center gap-2 mt-6 ${className}`}
      >
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack size={20} />
        </button>
        <span className="text-gray-600 text-xs md:text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    );
  }

  if (variant === "full") {
    const pages = getPageNumbersFull();
    return (
      <div
        className={`flex items-center justify-center gap-2 mt-6 ${className}`}
      >
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="p-1 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowBack size={20} />
        </button>
        {renderPages(pages, {
          activeClass: "bg-yellow-400 text-white font-semibold",
          baseClass: "hover:bg-gray-100",
          dotClass: "px-2 text-gray-500",
          btnClass: "w-8 h-8 rounded",
        })}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="p-1 bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    );
  }

  // Default: Field Agent–style ellipsis
  const pages = getVisiblePagesEllipsis();
  return (
    <Layout>
      <PrevNext pagesUI={renderPages(pages)} />
    </Layout>
  );
};

export default Pagination;
