
const ErrorMessage = ({message}) => {
    return(
        <div className="alert alert-danger alert-dismissible">
            <i className="fa fa-times-circle me-3"></i>
            {message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}

export default ErrorMessage