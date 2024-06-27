import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { State } from './_types';
export default function DeleteDialog({state, setState, index}: {state: State, setState: any, index: number}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
        const newFormData = [...state.formData];
        newFormData.splice(index, 1);
        setState((prev: State) => ({...prev, formData: newFormData}))
    
  }
  return (
    <React.Fragment>
        <DeleteIcon onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Διαγραφή;
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Θέλετε σίγουρα να προχωρήσετε σε διαγραφή;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ακύρωση</Button>
          <Button onClick={handleDelete} autoFocus>
            Διαγραφή
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}