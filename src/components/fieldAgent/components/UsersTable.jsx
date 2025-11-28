import React from "react";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { TbPhoneCall } from "react-icons/tb";

const SortIcon = ({ active, dir }) => (
  <span className="flex flex-col leading-none -space-y-1 text-slate-500">
    <FaAngleUp
      className={`h-4.5 w-4.5 ${
        active && dir === "asc" ? "text-slate-900" : ""
      }`}
    />
    <FaAngleDown
      className={`h-4.5 w-4.5 -mt-1 ${
        active && dir === "desc" ? "text-slate-900" : ""
      }`}
    />
  </span>
);

const UsersTable = ({ t, data, sortKey, sortDir, onSortChange }) => {
  const columns = [
    {
      key: "customerList",
      label: t("dashboard.fieldAgent.tableHeader.CustomerList"),
      sortable: true,
    },
    {
      key: "role",
      label: t("dashboard.fieldAgent.tableHeader.Role"),
      sortable: true,
    },
    {
      key: "registrationCommission",
      label: t("dashboard.fieldAgent.tableHeader.RegistrationCommission"),
      sortable: true,
    },
    {
      key: "firstOrderCommission",
      label: t("dashboard.fieldAgent.tableHeader.FirstOrderCommission"),
      sortable: true,
    },
    {
      key: "effectiveDate",
      label: t("dashboard.fieldAgent.tableHeader.EffectiveDate"),
      sortable: true,
    },
    {
      key: "registrationDate",
      label: t("dashboard.fieldAgent.tableHeader.RegistrationDate"),
      sortable: true,
    },
    {
      key: "customerType",
      label: t("dashboard.fieldAgent.tableHeader.CustomerType"),
      sortable: true,
    },
    {
      key: "nextFollowUpDate",
      label: t("dashboard.fieldAgent.tableHeader.NextFollowUpDate"),
      sortable: true,
    },
    {
      key: "serviceInterest",
      label: t("dashboard.fieldAgent.tableHeader.ServiceInterest"),
      sortable: true,
    },
    {
      key: "quickActions",
      label: t("dashboard.fieldAgent.tableHeader.QuickActions"),
      sortable: false,
    },
  ];

  return (
    <table className="w-full lg:w-[1800px] text-left">
      <thead className="bg-[#F5F7FA]">
        <tr>
          {columns.map((col) => {
            const active = sortKey === col.key;
            const aria = col.sortable
              ? active
                ? sortDir === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
              : undefined;

            return (
              <th
                key={col.key}
                className="w-64 text-left text-sm md:text-base font-semibold text-black px-6 py-4 whitespace-nowrap"
                aria-sort={aria}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => onSortChange(col.key)}
                    className="flex gap-2 items-center"
                  >
                    <span>{col.label}</span>
                    <SortIcon active={active} dir={sortDir} />
                  </button>
                ) : (
                  <span>{col.label}</span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className="hover:bg-gray-50 transition-colors border-b border-gray-100"
          >
            <td className="py-4 px-6 text-sm text-black">{row.customerList}</td>
            <td className="py-4 px-6 text-sm text-black">{row.role}</td>
            <td className="py-4 px-6 text-sm text-black">
              {row.registrationCommission}
            </td>
            <td className="py-4 px-6 text-sm text-black">
              {row.firstOrderCommission}
            </td>
            <td className="py-4 px-6 text-sm text-black">
              {row.effectiveDate}
            </td>
            <td className="py-4 px-6 text-sm text-black">
              {row.registrationDate}
            </td>
            <td className="py-4 px-6 text-sm">
              <span
                className={
                  row.customerType === "Active"
                    ? "bg-[#F7FFE5] text-green-700 px-3 py-1 rounded-full text-xs font-semibold"
                    : row.customerType === "Suspended"
                    ? "bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-semibold"
                    : row.customerType === "Inactive"
                    ? "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                    : ""
                }
              >
                {row.customerType}
              </span>
            </td>
            <td className="py-4 px-6 text-sm text-black">
              {row.nextFollowUpDate}
            </td>
            <td className="py-4 px-6 text-sm text-black">
              {row.serviceInterest}
            </td>
            <td className="py-4 px-6 text-sm text-black"><button><TbPhoneCall onClick={()=>alert("Clicked")} className="size-5" /></button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
