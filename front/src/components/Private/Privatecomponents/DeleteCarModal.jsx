import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { deleteCarThunk } from '../../../store/action';


export default function DeleteCarModal({ car }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false)

  const deleteHandler = () => {
    dispatch(deleteCarThunk(car.id))
    setOpen(false);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Удалить
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Вы уверены?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Не надо</Button>
        <Button onClick={() => deleteHandler()}>Да</Button>
      </DialogActions>
    </Dialog>
    </>

  )
}
