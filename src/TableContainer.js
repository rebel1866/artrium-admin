import * as React from 'react';
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import Table from "./Table";
import AlertSuccess from "./AlertSucess";
import { AddErrorModal } from './AddErrorModal';
import { DeleteConfirmation } from './DeleteConfirmation';
import Pagination from '@mui/material/Pagination';
import isValid from './Validator';
import WaitSpinner from './WaitSpinner';
import { SuccessUpdated } from './SuccessUpdated';


const TableContainer = () => {
    const defaultNewPaint = {
        name: '',
        price: '',
        path: '',
        category: '',
        year: '',
        state: '',
        author: '',
        amount: '',
        brand: 'ARTRIUM'
    };
    const defaultV = {
        name: '',
        price: '',
        year: ''
    };

    const [paintings, setPaintings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [newPaint, setNewPaint] = useState(defaultNewPaint);
    const [validation, setValidation] = useState(defaultV);
    const [openError, setOpenError] = useState(false);
    const [eMessage, setEMessage] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [itemName, setItemName] = useState('default');
    const [idToDelete, setIdDelete] = useState(0);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [waitSpinner, setWaitSpinner] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [updatedDialog, setUpdatedDialog] = useState(false);


    useEffect(() => {
        let countItems;
        setTimeout(() => {
            fetch(`http://localhost:3000/paintings?_page=${page}&_limit=10`)
                .then((res) => {
                    countItems = Math.ceil(res.headers.get('X-Total-Count') / 10);
                    return res.json()
                })
                .then((paintings => {
                    setPaintings(paintings);
                    setIsLoading(false);
                    setCount(countItems);
                    setWaitSpinner(false);
                }));
        }, 500)
    }, [page]);

    const handleChangePage = (event, value) => {
        setWaitSpinner(true);
        setPage(value);
    };

    const handleEdit = (id) => {
        clearValidation();
        setOpen(true);
        setIsEdit(true);
        let p = paintings.filter((painting) => painting.id === id);
        setNewPaint(...p);
    }
    const handleUpdate = () => {
        if (!isValid(newPaint, setValidation)) return;

        fetch(`http://localhost:3000/paintings/${newPaint.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPaint)
        }).then(res => {
            return res.json()
        })
            .then((data) => {
                let paintings1 = [...paintings];
                for (let i = 0; i < paintings1.length; i++) {
                    if (paintings1[i].id === newPaint.id) {
                        paintings1[i] = data;
                    }
                }
                console.log(paintings1);
                setPaintings(paintings1);
                setOpen(false);
                setUpdatedDialog(true);
            })
    }

    const handleChange = (e) => {
        let name = e.target.name;
        setNewPaint(values => ({ ...values, [name]: e.target.value }));
    }
    const handleSubmit = () => {
        if (!isValid(newPaint, setValidation)) return;

        fetch('http://localhost:3000/paintings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPaint)
        }).then(res => {
            if (!res.ok) {
                throw Error('Fail');
            }
            return res.json()
        })
            .then((data) => {
                let paintings1 = [...paintings];
                paintings1.push(data);
                setPaintings(paintings1);
                setOpen(false);
                setOpenSuccess(true);
                setTimeout(() => {
                    setOpenSuccess(false);
                }, 1000);
            })
            .catch(err => {
                setOpenError(true);
                setEMessage(err.message);
            });
    }
    const handleDelete = (id, itemName) => {
        setOpenDelete(true);
        setIdDelete(id);
        setItemName(itemName);
    }
    const handleYes = () => {
        fetch(`http://localhost:3000/paintings/${idToDelete}`, {
            method: 'DELETE'
        })
        let paintingsUpdated = paintings.filter(p => p.id !== idToDelete);
        setPaintings(paintingsUpdated);
        setOpenDelete(false);
    }



    const loseFocus = (name) => {
        setValidation(values => ({ ...values, [name]: '' }));
    }

    const clearValidation = () => {
        setValidation(defaultV);
        setNewPaint(defaultNewPaint);
    }


    const handleClickOpen = () => {
        clearValidation();
        setOpen(true);
        setIsEdit(false);

    };


    return (
        <div id="tableContainer" className={'container mt-3'} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', width: '100%' }}>
                {<AlertSuccess openSucess={openSuccess} />}
            </div>
            {openError && <AddErrorModal openError={openError} setOpenError={setOpenError} eMessage={eMessage} />}
            {openDelete && <DeleteConfirmation openDelete={openDelete} setOpenDelete={setOpenDelete} itemName={itemName} handleYes={handleYes} />}
            {paintings != null && <AddModal properties={{
                handleChange: handleChange, newPaint: newPaint, handleSubmit: handleSubmit,
                validation: validation, loseFocus: loseFocus, handleClickOpen: handleClickOpen, handleClose: () => setOpen(false), open: open,
                isEdit: isEdit, handleUpdate: handleUpdate
            }} />}
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} handleDelete={handleDelete} handleEdit={handleEdit} />}
            {paintings != null && <Pagination count={count} page={page} onChange={handleChangePage} />}
            {waitSpinner && <WaitSpinner />}
            {updatedDialog && <SuccessUpdated updated={updatedDialog} close={() => setUpdatedDialog(false)}/>}
        </div>
    );
}

export default TableContainer;