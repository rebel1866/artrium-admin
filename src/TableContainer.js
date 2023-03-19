import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import Table from "./Table";

const TableContainer = () => {

    const [paintings, setPaintings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
        }).then(() => {
            let paintings1 = [...paintings];
            paintings1.push(newPaint);
            setPaintings(paintings1);
            document.querySelector('.btn-close').click();
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
        <div id="tableContainer" className={'container mt-3'}>
            <AddModal handleChange={handleChange} newPaint={newPaint} handleSubmit={handleSubmit} />
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} handleDelete={handleDelete} handleEdit={handleEdit} />}
        </div>

    );
}

export default TableContainer;