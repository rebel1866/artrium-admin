import * as React from 'react';
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import Table from "./Table";
import AlertSuccess from "./AlertSucess";
import { AddErrorModal } from './AddErrorModal';
import { DeleteConfirmation } from './DeleteConfirmation';
import Pagination from '@mui/material/Pagination';


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


    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const handleChangePage = (event, value) => {
        setPage(value);
    };


    function isValid() {
        let isValid = true;
        if (newPaint.name === '') {
            setValidation(values => ({ ...values, name: 'Name must not be blank' }));
            isValid = false;
        }
        if (newPaint.price <= 0) {
            setValidation(values => ({ ...values, price: 'Price must be greater than 0' }));
            isValid = false;
        }
        if (newPaint.year <= 0) {
            setValidation(values => ({ ...values, year: 'Year must be greater than 0' }));
            isValid = false;

        }
        if (newPaint.year > 3000) {
            setValidation(values => ({ ...values, year: 'I doubt you could live so long' }));
            isValid = false;
        }
        return isValid;
    }
    const handleEdit = (id) => {

    }
    const handleChange = (e) => {
        let name = e.target.name;
        setNewPaint(values => ({ ...values, [name]: e.target.value }));
    }
    const handleSubmit = () => {
        if (!isValid()) return;

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
                console.log(data + ' hhh');
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

    useEffect(() => {
        let countItems;
        setTimeout(() => {
            fetch(`http://localhost:3000/paintings?_page=${page}&_limit=10`)
                .then((res) => {
                    countItems = Math.ceil(res.headers.get('X-Total-Count')/10);
                    return res.json()
                })
                .then((paintings => {
                    setPaintings(paintings);
                    setIsLoading(false);
                    setCount(countItems);
                }));
        }, 500)
    }, [page]);

    const loseFocus = (name) => {
        setValidation(values => ({ ...values, [name]: '' }));
    }

    const clearValidation = () => {
        setValidation(defaultV);
        setNewPaint(defaultNewPaint);
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        clearValidation();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div id="tableContainer" className={'container mt-3'} style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', width: '100%' }}>
                {<AlertSuccess openSucess={openSuccess} />}
            </div>
            {openError && <AddErrorModal openError={openError} setOpenError={setOpenError} eMessage={eMessage} />}
            {openDelete && <DeleteConfirmation openDelete={openDelete} setOpenDelete={setOpenDelete} itemName={itemName} handleYes={handleYes} />}
            {paintings != null && <AddModal handleChange={handleChange} newPaint={newPaint} handleSubmit={handleSubmit}
                validation={validation} loseFocus={loseFocus}
                handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />}
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} handleDelete={handleDelete} handleEdit={handleEdit} />}
            {paintings != null && <Pagination count={count} page={page} onChange={handleChangePage} />}
        </div>
    );
}

export default TableContainer;