import { Link, useNavigate } from "react-router-dom";
import { TABLE_COLUMNS } from "../../constants";
import { useAppSelector } from "../../hooks";
import { selectMeters } from "../../redux/meterSlice";
import { IMeter } from "../../types";
import { useMemo, useState } from "react";

const MetersTable = () => {
  const [sortOrder, setSortOrder] = useState("");
  const [sortColumn, setSortColumn] = useState("");

  const meters = useAppSelector(selectMeters);
  const navigate = useNavigate();

  const handleRowClick = (meterId: string) => {
    navigate(`/meters/${meterId}`);
  };

  const handleColumnClick = (column: string) => {
    let newSortOrder = "asc";

    if (sortColumn === column && sortOrder === "asc") {
      newSortOrder = "desc";
    }

    setSortOrder(newSortOrder);
    setSortColumn(column);
  };
  const sortTable = (data: IMeter[], column: string, sortOrder: string) => {
    const sorted = [...data].sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  };

  const sortedData = useMemo(() => {
    return sortTable(meters, sortColumn, sortOrder);
  }, [meters, sortColumn, sortOrder]);
  return (
    <div className="relative overflow-x-auto">
      <Link to={`/meters/new`}>
        <button className="btn btn-primary">Add</button>
      </Link>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3"
                onClick={() => handleColumnClick(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData?.map((meter: IMeter) => (
            <tr
              onClick={() => handleRowClick(meter.id)}
              key={`${meter.id}_${meter.created_time}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {meter.display_name}
              </th>
              <td className="px-6 py-4">{meter.api_name}</td>
              <td className="px-6 py-4">{meter.active ? "True" : "False"}</td>
              <td className="px-6 py-4">
                {meter.used_for_billing ? "True" : "False"}
              </td>
              <td className="px-6 py-4">{meter.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MetersTable;
