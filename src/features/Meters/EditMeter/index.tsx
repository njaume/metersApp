import { useNavigate, useParams } from "react-router-dom";
import { editMeter, selectedMeter } from "../../../redux/meterSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import MeterForm from "../MeterForm";
import { IMeterBody } from "../../../types";

const EditMeter = () => {
  const { meterId } = useParams();
  const meter = useAppSelector(selectedMeter(meterId || ""));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (payload: IMeterBody) => {
    await dispatch(editMeter(meterId || "", payload));
    navigate(-1)
  };
  return (
    <div className="relative overflow-x-auto">
      <MeterForm meter={meter} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditMeter;
