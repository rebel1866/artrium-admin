import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import Table from "./Table";
import AlertSuccess from "./AlertSucess";


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
    const [isSuccessVisisble, setIsSuccessVisisble] = useState(false);
    const [newPaint, setNewPaint] = useState(defaultNewPaint);
    const [validation, setValidation] = useState(defaultV);


    const handleEdit = (id) => {

    }
    const handleChange = (e) => {
        let name = e.target.name;
        setNewPaint(values => ({ ...values, [name]: e.target.value }));
    }
    const handleSubmit = () => {
        let isNotValid = false;
        if (newPaint.name === '') {
            setValidation(values => ({ ...values, name: 'Name must not be blank' }));
            isNotValid = true;
        }
        if (newPaint.price <= 0) {
            setValidation(values => ({ ...values, price: 'Price must be greater than 0' }));
            isNotValid = true;
        }
        if (newPaint.year <= 0) {
            setValidation(values => ({ ...values, year: 'Year must be greater than 0' }));
            isNotValid = true;

        }
        if (newPaint.year > 3000) {
            setValidation(values => ({ ...values, year: 'I doubt you could live so long' }));
            isNotValid = true;
        }
        if (isNotValid) return;

        fetch('http://localhost:3000/paintings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newPaint)
        }).then(res => res.json())
            .then((data) => {
                let paintings1 = [...paintings];
                paintings1.push(data);
                setPaintings(paintings1);
                document.querySelector('.modal-header .btn-close').click();
                setIsSuccessVisisble(true);
                setTimeout(() => {
                    document.querySelector('.alert .btn-close').click();
                    setIsSuccessVisisble(false);
                }, 1000);
            });
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/paintings/${id}`, {
            method: 'DELETE'
        })
        //handle error
        let paintingsUpdated = paintings.filter(p => p.id !== id);
        setPaintings(paintingsUpdated);
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:3000/paintings')
                .then((res) => res.json())
                .then((paintings => {
                    setPaintings(paintings);
                    setIsLoading(false);
                }));
        }, 500)
    }, []);

    const loseFocus = (name) => {
        setValidation(values => ({ ...values, [name]: '' }));
    }

    const clearValidation = () => {
        setValidation(defaultV);
        setNewPaint(defaultNewPaint);
    }

    return (
        <div id="tableContainer" className={'container mt-3'} style={{ position: 'relative' }}>
            {isSuccessVisisble && <AlertSuccess />}
            {paintings != null && <AddModal handleChange={handleChange} newPaint={newPaint} handleSubmit={handleSubmit}
                validation={validation} loseFocus={loseFocus} clearValidation={clearValidation} />}
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} handleDelete={handleDelete} handleEdit={handleEdit} />}
        </div>

    );
}

export default TableContainer;