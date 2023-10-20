const Footer = () => {
    return(
        <div className="container-fluid border-top">
            <footer className="py-3 my-4">
                <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} ES Project</p>
            </footer>
        </div>
    )
}

export default Footer