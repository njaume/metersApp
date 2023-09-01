import { ChangeEvent, useState } from "react";
import SelectInput from "../../components/SelectInput";
import TextInput from "../../components/TextInput";
import {
  ACTIVE_OPTIONS,
  TYPE_OPTIONS,
  USED_FOR_BILLING_OPTIONS,
} from "../../constants";
import { IMeter, IMeterBody } from "../../types";

const MeterForm = ({
  meter,
  onSubmit,
}: {
  meter?: IMeter | undefined;
  onSubmit: (payload: IMeterBody) => void;
}) => {
  const normalizeInitValues = (meter: IMeter | undefined) => {
    return meter
      ? {
          ...meter,
          active: meter?.active,
          used_for_billing: meter?.used_for_billing,
        }
      : {
          display_name: "",
          api_name: "",
          active: "true",
          type: TYPE_OPTIONS[0].value,
          used_for_billing: USED_FOR_BILLING_OPTIONS[0].value,
        };
  };
  const [values, setValues] = useState(normalizeInitValues(meter));

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newValue = value === "true";
    setValues((prev) => {
      return { ...prev, [name]: newValue };
    });
  };
  const handleSubmit = (event: any) => {
    event?.preventDefault && event?.preventDefault();
    const payload = {
      ...values,
      active: !!values.active,
      type: values.type,
      used_for_billing: !!values.used_for_billing,
    };
    onSubmit(payload);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <TextInput
        name="display_name"
        placeholder="Name"
        value={values?.display_name}
        onChange={handleChange}
        required
      />
      <TextInput
        name="api_name"
        placeholder="Api Name"
        value={values?.api_name}
        onChange={handleChange}
        required
      />
      <SelectInput
        name="type"
        options={TYPE_OPTIONS}
        required
        value={values?.type}
        onChange={handleChange}
      />
      <SelectInput
        name="active"
        options={ACTIVE_OPTIONS}
        required
        value={values?.active}
        onChange={handleSelectChange}
      />
      <SelectInput
        name="used_for_billing"
        options={USED_FOR_BILLING_OPTIONS}
        required={true}
        value={values?.used_for_billing}
        onChange={handleSelectChange}
      />
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default MeterForm;
