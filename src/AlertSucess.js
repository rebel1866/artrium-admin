const AlertSuccess = () => {

    return (
        <div class="alert alert-success alert-dismissible fade show" style={{ position: 'absolute', width: '100%' }}>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Success!</strong> New painting has been added.
        </div>
    )
}
export default AlertSuccess;