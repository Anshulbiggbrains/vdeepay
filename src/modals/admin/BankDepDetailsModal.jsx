/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  Modal,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ApiEndpoints from "../../network/ApiEndPoints";
import ModalHeader from "../ModalHeader";
import { currencySetter } from "../../utils/Currencyutil";
import ApiPaginate from "../../component/ApiPaginate";
import { massegetable } from "../../component/CustomStyle";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { capitalize1 } from "../../utils/TextUtil";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  fontFamily: "Poppins",
  p: 3,
};
let refresh;
ChartJS.register(ArcElement, Tooltip, Legend);

const BankDepDetailsModal = ({
  bank_id,
  id,
  usedInUserTable = false,
  width = "max-content",
  icon,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [query, setQuery] = useState();
  const [pieData, setPieData] = useState();
  const [type, setType] = useState("TODAY");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newType) => {
    setType(newType);
  };

  const columnsProd = [
    {
      name: "MOP",
      selector: (row) => (row?.mop ? row?.mop : "NA"),
    },
    {
      name: "Total",
      selector: (row) => currencySetter(row?.Total),
      width: "130px",
    },
  ];
  const options = {
    responsive: true,
    scales: {
      y: {
        title: { display: true, text: "Amount in ₹" },
      },
      x: {
        title: { display: true, text: "Date" },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        // text: "All Services Data",
      },
      subtitle: {
        display: false,
        // text: "All Services Data",
      },
    },
    transitions: {
      hide: {
        animations: {
          x: {
            to: 0,
          },
          y: {
            to: 0,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (type) setQuery(`type=${type}&bank_id=${bank_id}`);
    return () => {};
  }, [type]);

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Box
        variant="text"
        size="small"
        sx={{
          fontSize: "12px",
          fontWeight: "normal",
          "&:hover": {
            cursor: "pointer",
          },
          minWidth: width,
        }}
        onClick={handleOpen}
      >
        {icon}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="sm_modal">
          <ModalHeader
            title={`${name}'s Deposite Report`}
            handleClose={handleClose}
          />
          <Box
            component="form"
            id="add_books"
            validate
            autoComplete="off"
            sx={{
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Card
                  sx={{
                    textAlign: "center",
                    p: 2,
                  }}
                >
                  <ToggleButtonGroup
                    color="primary"
                    value={type}
                    exclusive
                    onChange={handleChange}
                    aria-label="type"
                  >
                    <ToggleButton value="TODAY">Today</ToggleButton>
                    <ToggleButton value="THIS">This</ToggleButton>
                    <ToggleButton value="LAST">Last</ToggleButton>
                  </ToggleButtonGroup>
                </Card>
                <ApiPaginate
                  apiEnd={ApiEndpoints.BANK_DETAILS}
                  columns={columnsProd}
                  apiData={apiData}
                  tableStyle={massegetable}
                  setApiData={setApiData}
                  queryParam={query ? query : ""}
                  returnRefetch={(ref) => {
                    refresh = ref;
                  }}
                  ExpandedComponent={null}
                  paginateServer={false}
                  paginate={false}
                />
              </Grid>
              <Grid item md={5} xs={12}></Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default BankDepDetailsModal;
