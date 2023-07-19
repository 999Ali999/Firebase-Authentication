import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Divider } from "@mui/material";

import PropTypes from "prop-types";
import Login from "./Login";
import SignUp from "./SignUp";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const LoginPage = (props) => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "480px",
          height: "530px",
          padding: "11px",
          borderRadius: "6px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
            borderColor: "divider",
          }}
        >
          <Tabs value={value} onChange={handleChange} centered>
            <Divider />
            <Tab
              label="Sign up"
              sx={{ textTransform: "initial" }}
              {...a11yProps(1)}
            />
            <Tab
              label="Log in"
              sx={{ textTransform: "initial" }}
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={1}>
          <SignUp />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Login />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
};

export default LoginPage;
