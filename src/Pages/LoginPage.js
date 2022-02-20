import {
  TextField,
  FormControl,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";

import { paperStyles } from "./LoginPage.styles";

const LoginPage = () => {
  return (
    <div className="login-form">
      <Grid>
        <Paper elevation={3} style={paperStyles}>
          <div className="login-title">
            <Avatar sx={{ width: 56, height: 56 }}>
              <PersonIcon />
            </Avatar>
            <Typography
              variant="h2"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Login
            </Typography>
          </div>
          <FormControl className="login-inputs">
            <TextField
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
            />
            <Button variant="contained">Submit</Button>
          </FormControl>
        </Paper>
      </Grid>
    </div>
  );
};

export default LoginPage;
