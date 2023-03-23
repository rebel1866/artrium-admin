

function Table({ paintings, handleEdit, handleDelete }) {


    return (
        <div className="container mt-3">
            <table id="table" style={{borderRadius: '4px', overflow:"hidden"}} className={'table table-dark table-hover'}>
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
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paintings.map((painting) => (
    
                        <tr key={painting.id}>
                            {/* {console.log(painting)} */}
                            <td>{painting.name}</td>
                            <td>{painting.author}</td>
                            <td>{painting.price}</td>
                            <td>{painting.category}</td>
                            <td>{painting.year}</td>
                            <td>{painting.state}</td>
                            <td>{painting.brand}</td>
                            <td>{painting.amount}</td>
                            <td><button onClick={()=> handleEdit(painting.id)} className={'btn btn-primary'}>Edit</button></td>
                            <td><button onClick={()=> handleDelete(painting.id)} className={'btn btn-danger'}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
}

export default Table;