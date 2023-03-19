const AddModal = ({handleChange}) => {
   
    return (
        <div>
            <button className={'btn btn-success ms-3'} data-bs-toggle="modal" data-bs-target="#myModal">Add painting</button>
            <div class="modal fade" id="myModal">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Add new painting</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <form onChange={(e)=> handleChange(e)}>
                                <div class="row">
                                    <div class="col">
                                        <input type="text" class="form-control mb-3" placeholder="Enter name" name="name"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter price" name="price"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter image path" name="path"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter category" name="category"></input>
                                    </div>
                                    <div class="col">
                                        <input type="text" class="form-control mb-3" placeholder="Enter year" name="year"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter state" name="state"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter brand" name="brand"></input>
                                        <input type="text" class="form-control mb-3" placeholder="Enter amount" name="amount"></input>
                                    </div>
                                </div>
                            </form>
                            <div style={{ textAlign: 'center' }}>
                                <button className={'btn btn-primary'} style={{ width: '100px' }}>Save</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddModal;