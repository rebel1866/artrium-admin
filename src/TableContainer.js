import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import Table from "./Table";
import AlertSuccess from "./AlertSucess";


const TableContainer = () => {

    const [paintings, setPaintings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessVisisble, setIsSuccessVisisble] = useState(false);
    const [newPaint, setNewPaint] = useState({
        name: '',
        price: '',
        path: '',
        category: '',
        year: '',
        state: '',
        author: '',
        amount: '',
        brand: 'ARTRIUM'
    });


    const handleEdit = (id) => {

    }
    const handleChange = (e) => {
        let name = e.target.name;
        setNewPaint(values => ({ ...values, [name]: e.target.value }));
    }
    const handleSubmit = () => {
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


    return (
        <div id="tableContainer" className={'container mt-3'} style={{ position: 'relative' }}>
            {isSuccessVisisble && <AlertSuccess />}
            {paintings != null && <AddModal handleChange={handleChange} newPaint={newPaint} handleSubmit={handleSubmit} />}
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} handleDelete={handleDelete} handleEdit={handleEdit} />}
        </div>

    );
}

export default TableContainer;