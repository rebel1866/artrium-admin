const AddModal = ({ handleChange, newPaint, handleSubmit, validation, loseFocus, clearValidation }) => {

    let eStyle = { border: '1px solid red' }

    function getMessage(message) {
        return (<div style={{ color: 'red', marginTop: '-17px' }}>{message}</div>);
    }

    return (
        <div>
            <button className={'btn btn-success ms-3'} data-bs-toggle="modal" onClick={clearValidation} data-bs-target="#myModal">Add painting</button>
            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Add new painting</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <form onChange={(e) => handleChange(e)}>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control mb-3" onFocus={(e)=>{loseFocus(e.target.name)}} placeholder="Enter name" name="name" style={validation.name ? eStyle : {}} value={newPaint.name}></input>
                                        {validation.name && getMessage(validation.name)}
                                        <input type="text" class="form-control mb-3" onFocus={(e)=>{loseFocus(e.target.name)}}  placeholder="Enter price" name="price" style={validation.price ? eStyle : {}} value={newPaint.price}></input>
                                        {validation.price && getMessage(validation.price)}
                                        <input type="text" class="form-control mb-3" placeholder="Enter image path" value={newPaint.path} name="path"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter category" value={newPaint.category} name="category"></input>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control mb-3" onFocus={(e)=>{loseFocus(e.target.name)}} style={validation.year ? eStyle : {}}  placeholder="Enter year" value={newPaint.year} name="year"></input>
                                        {validation.year && getMessage(validation.year)}
                                        <input type="text" class="form-control mb-3" placeholder="Enter state" name="state" value={newPaint.state}></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter author" name="author" value={newPaint.author}></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter amount" name="amount" value={newPaint.amount}></input>
                                    </div>
                                </div>
                            </form>
                            <div style={{ textAlign: 'center' }}>
                                <button onClick={handleSubmit} className={'btn btn-primary'} style={{ width: '100px' }}>Save</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddModal;