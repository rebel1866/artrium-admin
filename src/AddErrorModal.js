import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const AddErrorModal = ({openError, setOpenError, eMessage}) => {


    return (
        <div>
            <Dialog
                open={openError}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>{"Error has occured"}</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'} id="alert-dialog-slide-description">
                    <div>{eMessage}</div>
                    <button className={'btn btn-primary'} onClick={()=> setOpenError(false)}>Close</button>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export {AddErrorModal};