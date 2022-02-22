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
import axiosBase from "../API/axiosBase";

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
  const onLogin = async (values) => {
    try {
      const res = await axiosBase.post("/accounts/login", values);
      const user = res.data;
      if (res.status === 200) {
        const userString = await JSON.stringify(user);
        await localStorage.setItem("Token", userString);
        dispatch(
          login({
            username: user.username,
            token: user.token,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form
      onSubmit={onLogin}
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
