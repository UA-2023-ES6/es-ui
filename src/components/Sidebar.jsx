import { Link } from "react-router-dom"
import "../styles/sidebar.css"

var _activeLink = ""
//exemplo de activeLink: Instituicao/test/subturma1

const Sidebar = ({content,activeLink="",baseLink="",onClick=(name,parentLink) => {}}) => {
    _activeLink = activeLink
    var x = ""
    if(content != null) {
        x = <SidebarEntry content={content} baseLink={baseLink} onClick={onClick}/>
    }
    return(
        <>
            {x}
        </>
    )
}

function SidebarEntry({content,baseLink,onClick=(name,parentLink) => {}}) {
    return(
        <div className="d-flex flex-column p-3 bg-body-tertiary" style={{width: "280px",flex: "1"}}>
            <ul className="nav nav-pills flex-column mb-auto">
                {
                    Object.entries(content).map(([_name,_content]) => {
                        return(
                            <li className="nav-item ps-3" key={_name}>
                                <LinkElement name={_name} parentLink={baseLink} includeAddBtn={true} onClick={onClick}/>
                                <div className="d-flex flex-column">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        {
                                            <CollapsableGroup content={_content} parent={_name.replace(/\s/g) + "/"} onClick={onClick}/>
                                        }
                                    </ul>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

function CollapsableGroup({content= null,parent,onClick=(name,parentLink) => {}}) {
    var x = ""

    if(content != null) {
        if(content.constructor == Object) {
            x = Object.entries(content).map(([_name,_content]) => {
                return <Group name={_name} content={_content} parent={parent} key={_name} onClick={onClick}/>
            })
        }
        else {
            x = content.map((_name) => {
                return <ListElement text={_name} parent={parent} key={_name} onClick={onClick}/>
            })
        }
    }


    return(
        <>
            {x}
        </>
    )
}

function Group({name,content,parent,onClick=(name,parentLink) => {}}) {
    return(
        <>
            <div className="d-flex add-btn-group align-items-center">
                <div className="d-flex align-items-center" style={{flex: "1"}}>
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + name.replace(/\s/g, "") + "-collapse"} aria-expanded="true"/>
                    <LinkElement name={name} parentLink={parent}/>
                </div>
                <button className="btn add-btn" onClick={() => {onClick(name,parent)}}/>
            </div>
            <div className="collapse show" style={{paddingLeft: "2rem"}} id={name.replace(/\s+/g, "") + "-collapse"}>
                <ul className="btn-toggle-nav list-unstyled">
                    {
                        <CollapsableGroup content={content} parent={parent + name.replace(/\s+/g, "") + "/"} onClick={onClick}/>
                    }
                </ul>
            </div>
        </>
    )
}

function ListElement({text,parent,onClick=(name,parentLink) => {}}) {
    return(
        <li className="ps-4">
            <LinkElement name={text} parentLink={parent} includeAddBtn={true} onClick={onClick}/>
        </li>
    )
}

function LinkElement({name,parentLink,includeAddBtn=false,onClick=(name,parentLink) => {}}) {
    var link = parentLink + name.replace(/\s+/g, "")
    var active = link == _activeLink
    const x = <LinkButton link={link} name={name} active={active} />
    return(
        <>
            <div className="d-flex add-btn-group align-items-center">
                {
                    includeAddBtn ? <><div style={{flex: "1"}}>
                                {x}
                            </div>
                            <button className="btn add-btn" onClick={() => {onClick(name,parentLink)}}/>
                            </>
                            : <>{x}</>
                }
            </div>
        </>
    )
}

function LinkButton({link,name,active}) {
    return(
        <Link to={link}>
            <button className={"btn border-0 rounded p-2 " + (active ? "btn-primary" : "")}>
                {name}
            </button>
        </Link>
    )
}

export default Sidebar