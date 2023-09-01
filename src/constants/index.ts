export const TABLE_COLUMNS = [
  {
    key: "display_name",
    label: "Display Name",
  },
  {
    key: "api_name",
    label: "Api Name",
  },
  {
    key: "active",
    label: "Active",
  },
  {
    key: "used_for_billing",
    label: "Used for billing",
  },
  {
    key: "type",
    label: "Type",
  },
];

export enum TYPE_KEYS {
  sum = "sum",
  max = "max",
  unique_count = "unique_count",
}

export const TYPE_OPTIONS = [
  {
    value: TYPE_KEYS.sum,
    label: "sum",
  },
  {
    value: TYPE_KEYS.max,
    label: "max",
  },
  {
    value: TYPE_KEYS.unique_count,
    label: "unique_count",
  },
];

export const ACTIVE_OPTIONS = [
  {
    value: "true",
    label: "true",
  },
  {
    value: "false",
    label: "false",
  },
];

export const USED_FOR_BILLING_OPTIONS = [
  {
    value: "true",
    label: "true",
  },
  {
    value: "false",
    label: "false",
  },
];
