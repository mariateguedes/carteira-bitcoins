import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Option } from "../../api/Models";

interface Type {
  value: string;
  name: string;
}

const types: Type[] = [
  {
    value: "real",
    name: "Real",
  },
  {
    value: "bitcoin",
    name: "Bitcoin",
  },
  {
    value: "brita",
    name: "Brita",
  },
];

interface CurrencySelectionProps {
  onChange: (name: any, value: any) => void;
  value: Option;
  label: string;
  name: string;
}

const CurrencySelection: React.FunctionComponent<CurrencySelectionProps> = ({
  onChange,
  value,
  label,
  name
}) => {
  return (
    <FormControl>
      <InputLabel>{label}</InputLabel>
      <Select
        autoWidth
        value={value}
        name={name}
        onChange={(event) => onChange(event.target.value, event.target.name)}
      >
        {types.map((type: Type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelection;
