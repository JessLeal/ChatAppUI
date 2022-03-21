import { Form, Field } from "react-final-form";
import { TextField, FormControl, Button } from "@mui/material";
import axiosBase from "../../API/axiosBase";

const MessageForm = ({ receiverUsername, sendMessage }) => {
  const onMessageSend = (values, form) => {
    const requestBody = { ...values };
    // const res = await axiosBase.post("/messages", requestBody);
    // console.log(res);
    sendMessage(requestBody);
    form.reset();
  };

  return (
    <Form
      onSubmit={onMessageSend}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} className='message-form'>
          <FormControl className='message-inputs'>
            <Field id='content' name='content' type='text'>
              {({ input: { name, type, onChange, value }, meta, ...rest }) => (
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
              )}
            </Field>
            <Button variant='contained' color='primary' type='submit' disabled={submitting}>
              Send
            </Button>
          </FormControl>
        </form>
      )}
    />
  );
};

export default MessageForm;
