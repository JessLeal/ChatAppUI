import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

export const SenderChatMessage = ({ message }) => {
  const { senderUsername, content } = message;
  return (
    <Grid container item xs={12} sx={{ justifyContent: "right" }}>
      <Paper elevation={3} sx={{ width: "max-content" }}>
        <Typography variant='body1'>{senderUsername}</Typography>
        <Typography variant='body2'>{content}</Typography>
      </Paper>
    </Grid>
  );
};

export const ReceiverChatMessage = ({ message }) => {
  const { senderUsername, content } = message;
  return (
    <Grid container item xs={12}>
      <Paper elevation={3} sx={{ width: "max-content" }}>
        <Typography variant='body1'>{senderUsername}</Typography>
        <Typography variant='body2'>{content}</Typography>
      </Paper>
    </Grid>
  );
};
