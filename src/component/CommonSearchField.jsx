/* eslint-disable react-hooks/exhaustive-deps */
import {
  Autocomplete,
  Box,
  FormControl,
  TextField,
  Typography,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BackspaceIcon from "@mui/icons-material/Backspace";

import useDebounce from "../utils/Debounce";
import Loader from "./loading-screen/Loader";
const CommonSearchField = ({
  list,
  label,
  placeholder,
  labelKey,
  valKey,
  valueGetter,
  defaultVal = "",
  filterCardStyle = false,
  onFocus,
  loading = false,
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option[labelKey],
  });

  const [value, setValue] = useState({ label: "", value: null });

  const debouncedValue = useDebounce(value?.label, 500);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (onFocus) onFocus();
  }, []);

  useEffect(() => {
    if (debouncedValue) {
      if (list && list.length > 0) {
        const arr =
          list &&
          list
            .filter((item) =>
              item?.name?.toLowerCase().includes(debouncedValue.toLowerCase())
            )
            .map((item) => ({ id: item.id, name: item.name }));
        setSearchResult(arr);
      }
    }
  }, [debouncedValue]);

  const handleChange = (e) => {
    if (e.target.value) {
      setValue({ ...value, label: e.target.value, value: e.target.value });
      valueGetter({ ...value, label: e.target.value, value: e.target.value });
    } else {
      setValue({ label: "", value: null });
      valueGetter({ label: "", value: null });
    }
  };

  return (
    <div className="position-relative">
      <div
        style={{
          position: "absolute",
        }}
        hidden={defaultVal === "" || defaultVal === null}
      >
        {`${placeholder}`}: {defaultVal ? defaultVal : ""}
      </div>
      <FormControl
        sx={{
          width: "100%",
          position: "relative",
        }}
      >
        {list && (
          <Autocomplete
            loading={loading}
            filterOptions={filterOptions}
            className={filterCardStyle ? "filter-input" : ""}
            id="search_particular"
            freeSolo
            size="small"
            options={
              list.length < 100 ? list : searchResult ? searchResult : ""
            }
            value={value}
            onChange={(event, newValue) => {
              if (newValue) {
                setValue({
                  ...value,
                  label: newValue[labelKey],
                  value: newValue[valKey],
                });
                valueGetter({
                  ...value,
                  label: newValue[labelKey],
                  value: newValue[valKey],
                });
              } else {
                setValue({ label: "", value: null });
                valueGetter({ label: "", value: null });
              }
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  "& > img": { mr: 2, flexShrink: 0 },
                  fontSize: "12px", // Set font size for the dropdown items
                }}
                {...props}
              >
                <Typography sx={{ fontSize: "12px" }}>
                  {option[labelKey]}
                </Typography>
              </Box>
            )}
            renderInput={(params) => (
              <FormControl fullWidth>
                <TextField autoComplete="off"
                  {...params}
                  size="small"
                  className="filter-input"
                  variant={"standard" }
                  multiline
                  label={label}
                  placeholder={placeholder}
                  
                  sx={{
                   
                    "& .MuiInputLabel-root": {
                      fontSize: "13px",
                      fontFamily:"inherit", // Set font size for label
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "13px", // Set font size for input text
                      color: "black",
                      fontFamily:"inherit", // Set text color to black to match placeholder
                    },
                    "& .MuiInputBase-input::placeholder": {
                      // color: "#000000", // Set placeholder color to solid black
                      fontWeight: "540",
                      opacity: 1, 
                      fontFamily:"inherit",// Make placeholder text bold
                      // opacity: 4, // Ensure opacity is 1 to see the bold effect
                    },
                  }}
                  maxRows={4}
                  value={value}
                  onChange={handleChange}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Loader loading={loading} params={params} />
                    ),
                  }}
                />
              </FormControl>
            )}
            clearIcon={
              <BackspaceIcon
                sx={{ fontSize: "15px", mr: 2.4 }}
                onClick={() => {
                  setValue({ label: "", value: null });
                }}
              />
            }
          />
        )}
      </FormControl>
    </div>
  );
};

export default CommonSearchField;
