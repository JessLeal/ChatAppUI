import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
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

import { login } from "../Features/userSlice";

const renderTextField = ({
  input: { name, type, onChange, value },
  meta,
  ...rest
}) => (
  <TextField
    {...rest}
    type={type}
    variant="outlined"
    margin="normal"
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    onChange={onChange}
    value={value}
  />
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    );
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, values }) => (
        <form onSubmit={handleSubmit} className="login-form">
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
                <Field
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  component={renderTextField}
                />
                <Field
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  component={renderTextField}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                >
                  Submit
                </Button>
              </FormControl>
            </Paper>
          </Grid>
        </form>
      )}
    />
  );
};

export default LoginPage;
