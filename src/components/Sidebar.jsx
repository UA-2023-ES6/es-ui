import { Link } from "react-router-dom"
import "../styles/sidebar.css"

var _activeLink = ""
//exemplo de activeLink: Instituicao/test/subturma1

const Sidebar = ({content,activeLink="",baseLink=""}) => {
    _activeLink = activeLink
    var x = ""
    if(content != null) {
        x = <SidebarEntry content={content} baseLink={baseLink}/>
    }
    return(
        <>
            {x}
        </>
    )
}

function SidebarEntry({content,baseLink}) {
    return(
        <div className="d-flex flex-column p-3 bg-body-tertiary" style={{width: "280px",flex: "1"}}>
            <ul className="nav nav-pills flex-column mb-auto">
                {
                    Object.entries(content).map(([_name,_content]) => {
                        return(
                            <li className="nav-item ps-3" key={_name}>
                                <LinkButton name={_name} parentLink={baseLink}/>
                                <div className="d-flex flex-column">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        {
                                            <CollapsableGroup content={_content} parent={_name.replace(/\s/g) + "/"} />
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

function CollapsableGroup({content= null,parent}) {
    var x = ""

    if(content != null) {
        if(content.constructor == Object) {
            x = Object.entries(content).map(([_name,_content]) => {
                return <Group name={_name} content={_content} parent={parent} key={_name} />
            })
        }
        else {
            x = content.map((_name) => {
                return <ListElement text={_name} parent={parent} key={_name} />
            })
        }
    }


    return(
        <>
            {x}
        </>
    )
}

function Group({name,content,parent}) {
    return(
        <>
            <div className="d-flex align-items-center">
                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + name.replace(/\s/g, "") + "-collapse"} aria-expanded="true"/>
                <LinkButton name={name} parentLink={parent}/>
            </div>
            <div className="collapse show" style={{paddingLeft: "2rem"}} id={name.replace(/\s+/g, "") + "-collapse"}>
                <ul className="btn-toggle-nav list-unstyled">
                    {
                        <CollapsableGroup content={content} parent={parent + name.replace(/\s+/g, "") + "/"}/>
                    }
                </ul>
            </div>
        </>
    )
}

function ListElement({text,parent}) {
    return(
        <li className="ps-4">
            <LinkButton name={text} parentLink={parent} />
        </li>
    )
}

function LinkButton({name,parentLink}) {
    var link = parentLink + name.replace(/\s+/g, "")
    var active = link == _activeLink
    return(
        <>
            <Link to={link}>
                <button className={"btn border-0 rounded p-2 " + (active ? "btn-primary" : "")}>
                    {name}
                </button>
            </Link>
        </>
    )
}

export default Sidebar