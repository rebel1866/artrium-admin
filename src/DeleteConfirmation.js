import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const DeleteConfirmation = ({openDelete, setOpenDelete, itemName, handleYes}) => {


    return (
        <div>
            <Dialog
                open={openDelete}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>"Are you sure you want to delete {itemName}?"</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'} id="alert-dialog-slide-description">
                   <div style={{textAlign:'center'}}>
                   <button className={'btn btn-danger me-3'} onClick={handleYes}>Yes</button>
                    <button className={'btn btn-success'} onClick={()=> setOpenDelete(false)}>No</button>
                   </div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export {DeleteConfirmation};