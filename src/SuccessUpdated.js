import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const SuccessUpdated = ({updated, close}) => {


    return (
        <div>
            <Dialog
                open={updated}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>{'Success'}</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'} id="alert-dialog-slide-description">
                    Successfully updated.
                    <div style={{textAlign: 'center'}} className={'mt-2'}><button className='btn btn-success' onClick={close}>Ok</button></div>
                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export {SuccessUpdated};