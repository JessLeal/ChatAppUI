import { Form, Field } from 'react-final-form';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const MessageForm = ({ sendMessage }) => {
  const onMessageSend = (values, form) => {
    const requestBody = { ...values };
    sendMessage(requestBody);
    form.reset();
  };

  return (
    <Form
      onSubmit={onMessageSend}
      render={({ handleSubmit, form, submitting }) => (
        <form onSubmit={handleSubmit} className='message-form'>
          <Field
            name='content'
            render={({ input, meta }) => (
              <>
                <input
                  type='text'
                  {...input}
                  placeholder='Enter message...'
                  className='message-send-input'
                />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </>
            )}
          />
          <button type='submit' disabled={submitting} className='message-send-button' title='Send'>
            <SendOutlinedIcon />
          </button>
        </form>
      )}
    />
  );
};

export default MessageForm;

// {
/* <FormControl className='message-inputs'>
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
          </FormControl> */
// }
