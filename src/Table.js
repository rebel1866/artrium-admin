

function Table({ paintings }) {


    return (
        <div className="container mt-3">
            <table id="table" className={'table table-dark table-hover'}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Year</th>
                        <th>State</th>
                        <th>Brand</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {paintings.map((painting) => (
                        <tr key={painting.id}>
                            <td>{painting.name}</td>
                            <td>{painting.author}</td>
                            <td>{painting.price}</td>
                            <td>{painting.category}</td>
                            <td>{painting.year}</td>
                            <td>{painting.state}</td>
                            <td>{painting.brand}</td>
                            <td>{painting.amount}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default Table;