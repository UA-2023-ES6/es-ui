import "../styles/sidebar.css"

const Sidebar = ({children}) => {
    return(
        <div className="d-flex flex-column p-3 bg-body-tertiary" style={{width: "280px",flex: "1"}}>
            <ul className="nav nav-pills flex-column mb-auto">
                {children}
            </ul>
        </div>
    )
}

const SidebarGroup = ({children}) => {
    return(
        <>
        <li className="nav-item ps-3" >
            <div className="d-flex flex-column">
                <ul className="nav nav-pills flex-column mb-auto">
                    {children}                  
                </ul>
            </div>
        </li>
    </>
    )
}

const SidebarElement = ({children}) => {
    return(
        <li className="ps-4">
            {children}
        </li>
    )
}

export {Sidebar,SidebarGroup,SidebarElement}