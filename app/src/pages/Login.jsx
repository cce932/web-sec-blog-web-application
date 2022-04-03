import React, { useState } from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import api from "../api";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });

  const submit = () => {
    api.post("/login", data).then(() => {});
  };

  return (
    <Box>
      <Box component="form">
        <Stack spacing={3} sx={{ maxWidth: "60%", margin: "auto" }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={data.username}
          />
          <TextField
            id="password"
            type="password"
            label="Passowrd"
            variant="outlined"
            value={data.password}
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
