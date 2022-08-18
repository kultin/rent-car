import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import AddCArForm from '../Private/Privatecomponents/AddCarForm';
import "./carcard.modules.scss"

export default function EditCarModal({car}) {
  
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [edit, setEdit] = React.useState(false);
  
  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
    setEdit(true)
  };

  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <Button onClick={handleClickOpen('paper')}>Редактировать</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={scroll === 'paper'}>

          <AddCArForm edit={edit} car={car}/> 
          
        </DialogContent>
      </Dialog>  
    </div>
  );
}
