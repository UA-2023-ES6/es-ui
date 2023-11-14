const SuccessMessage = ({ message }) => {
    return(
        <div className="alert alert-success alert-dismissible">
            <i className="fa fa-check-circle me-3"></i>
            {message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default SuccessMessage