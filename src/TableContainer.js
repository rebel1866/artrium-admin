import { useEffect, useState } from "react";
import Table from "./Table";

const TableContainer = () => {

    const [paintings, setPaintings] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
        <div id="tableContainer">
            {isLoading && 'Please, wait...'}
            {paintings != null && <Table paintings={paintings} />}
        </div>

    );
}

export default TableContainer;