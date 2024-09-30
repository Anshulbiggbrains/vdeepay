import { FormControl, MenuItem, TextField } from "@mui/material";
import React from "react";

const FilterDropdownFunc = ({ onchangeValue, menue, title }) => {
  console.log(menue);
  return (
    <FormControl className="customized-textfield " fullWidth>
      <TextField autoComplete="off"
        select
        defaultValue={title}
        onChange={(e) => {
          onchangeValue(e);
        }}
        sx={{ color: "#fff" }}
      >
        {menue &&
          menue.map((item) => {
            return (
              <MenuItem dense value={item.id}>
                {console.log("item ", item.id)}
                {item.name}
              </MenuItem>
            );
          })}
      </TextField>
    </FormControl>
  );
};

export default FilterDropdownFunc;
