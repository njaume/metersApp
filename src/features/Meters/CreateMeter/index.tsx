import { useNavigate } from "react-router-dom";
import { addMeter } from "../../../redux/meterSlice";
import { useAppDispatch } from "../../../hooks";
import MeterForm from "../MeterForm";
import { IMeterBody } from "../../../types";

const CreateMeter = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (payload: IMeterBody) => {
    console.log("payload", payload);
    await dispatch(addMeter(payload));
    navigate(-1)
  };
  return (
    <div className="relative overflow-x-auto">
      <MeterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateMeter;
