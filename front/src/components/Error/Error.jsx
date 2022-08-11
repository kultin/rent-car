import { useSelector } from "react-redux";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Error = () => {
  const error = useSelector((state) => state.user.error);
  return (
    <div>
      {error && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
    </Stack>}
    </div>
    )
 }

export default Error;
