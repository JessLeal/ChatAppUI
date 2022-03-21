import { Form, Field } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { TextField, FormControl, Typography, Button, Grid, Paper, Avatar } from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { paperStyles } from "./LoginPage.styles";
import { login } from "../Features/userSlice";
import axiosBase from "../API/axiosBase";

const renderTextField = ({ input: { name, type, onChange, value }, meta, ...rest }) => (
  <TextField
    {...rest}
    type={type}
    variant='outlined'
    margin='normal'
    name={name}
    helperText={meta.touched ? meta.error : undefined}
    error={meta.error && meta.touched}
    onChange={onChange}
    value={value}
  />
);

const LoginPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const onLogin = async (values) => {
    const res = await axiosBase.post("/accounts/login", values);
    if (res.status === 200) {
      const userResult = res.data;
      const userString = await JSON.stringify(userResult);
      dispatch(
        login({
          username: userResult.username,
          token: userString,
        })
      );

      return await localStorage.setItem("Token", userString);
    }

    const errorMessageFx = () => {
      if (res.data.errors) {
        const modalStateErrors = [];
        for (const key in res.data.errors) {
          if (res.data.errors[key]) {
            modalStateErrors.push(res.data.errors[key]);
          }
        }
        return modalStateErrors.map((msg) => {
          return enqueueSnackbar(msg, {
            variant: "error",
          });
        });
      }
      return enqueueSnackbar(res.data, {
        variant: "error",
      });
    };

    return errorMessageFx();
  };

  return (
    <>
      {!user ? (
        <>
          <Form
            onSubmit={onLogin}
            render={({ handleSubmit, form, submitting, values }) => (
              <form onSubmit={handleSubmit} className='login-form'>
                <Grid>
                  <Paper elevation={3} style={paperStyles}>
                    <div className='login-title'>
                      <Avatar sx={{ width: 56, height: 56 }}>
                        <PersonIcon />
                      </Avatar>
                      <Typography
                        variant='h2'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
                        Login
                      </Typography>
                    </div>
                    <FormControl className='login-inputs'>
                      <Field
                        id='username'
                        name='username'
                        label='Username'
                        type='text'
                        component={renderTextField}
                      />
                      <Field
                        id='password'
                        name='password'
                        label='Password'
                        type='password'
                        component={renderTextField}
                      />
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        disabled={submitting}>
                        Submit
                      </Button>
                    </FormControl>
                  </Paper>
                </Grid>
              </form>
            )}
          />
        </>
      ) : (
        <Navigate to='/' />
      )}
      ;
    </>
  );
};

export default LoginPage;
