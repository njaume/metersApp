import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMeter, selectedMeter } from "../../../redux/meterSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { TABLE_COLUMNS } from "../../../constants";

const MeterDetail = () => {
  const { meterId } = useParams();
  const meter = useAppSelector(selectedMeter(meterId || ""));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (meterId: string) => {
    navigate(`/meters/${meterId}/edit`);
  };

  const handleDelete = () => {
    dispatch(deleteMeter(meterId || ""));
    navigate(`/meters`);
  };
  return (
    <div className="relative overflow-x-auto">
      <div className="flex gap-10">
        <Link to={`/meters/${meterId}/edit`}>
          <button className="btn btn-primary">Edit</button>
        </Link>

        <button className="btn btn-primary" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {TABLE_COLUMNS.map((column) => (
              <th key={column.key} scope="col" className="px-6 py-3">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() => handleClick(meter?.id || "")}
            key={`${meter?.id}_${meter?.created_time}`}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:cursor-pointer"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {meter?.display_name}
            </th>
            <td className="px-6 py-4">{meter?.api_name}</td>
            <td className="px-6 py-4">{meter?.active ? "True" : "False"}</td>
            <td className="px-6 py-4">
              {meter?.used_for_billing ? "True" : "False"}
            </td>
            <td className="px-6 py-4">{meter?.type}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MeterDetail;
