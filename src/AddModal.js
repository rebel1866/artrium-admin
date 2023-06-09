import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AddModal = ({ properties }) => {
    const {handleChange, newPaint, handleSubmit, validation, loseFocus, handleClickOpen, handleClose, open, isEdit, handleUpdate} = properties;

    let eStyle = { border: '1px solid red' }

    function getMessage(message) {
        return (<div style={{ color: 'red', marginTop: '-17px' }}>{message}</div>);
    }

    return (
        <div>
            <button className={'btn btn-success'} onClick={handleClickOpen}>
                Add painting
            </button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullWidth
                maxWidth="md"
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogTitle>{ isEdit ? "Edit painting" :"Add new painting"}</DialogTitle>
                <DialogContent>
                    <DialogContentText component={'span'} id="alert-dialog-slide-description">
                        <div onChange={(e) => handleChange(e)}>
                            <div className={"row"}>
                                <div className={"col"}>
                                    <input type="text" className={"form-control mb-3"} onFocus={(e) => { loseFocus(e.target.name) }} placeholder="Enter name" name="name" style={validation.name ? eStyle : {}} value={newPaint.name}></input>
                                    {validation.name && getMessage(validation.name)}
                                    <input type="text" className={"form-control mb-3"} onFocus={(e) => { loseFocus(e.target.name) }} placeholder="Enter price" name="price" style={validation.price ? eStyle : {}} value={newPaint.price}></input>
                                    {validation.price && getMessage(validation.price)}
                                    <input type="text" className={"form-control mb-3"} placeholder="Enter image path" value={newPaint.path} name="path"></input>
                                    <input type="text" className={"form-control mb-3"} placeholder="Enter category" value={newPaint.category} name="category"></input>
                                </div>
                                <div className={"col"}>
                                    <input type="text" className={"form-control mb-3"} onFocus={(e) => { loseFocus(e.target.name) }} style={validation.year ? eStyle : {}} placeholder="Enter year" value={newPaint.year} name="year"></input>
                                    {validation.year && getMessage(validation.year)}
                                    <input type="text" className={"form-control mb-3"} placeholder="Enter state" name="state" value={newPaint.state}></input>
                                    <input type="text" className={"form-control mb-3"} placeholder="Enter author" name="author" value={newPaint.author}></input>
                                    <input type="text" className={"form-control mb-3"} placeholder="Enter amount" name="amount" value={newPaint.amount}></input>
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={isEdit ? handleUpdate : handleSubmit} className={'btn btn-primary'} style={{ width: '100px' }}>{isEdit ? 'Update': "Save"}</button>
                        </div>

                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}

export default AddModal;