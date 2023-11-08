import { Link, useParams } from "react-router-dom"
import {Sidebar,SidebarGroup,SidebarElement} from "../components/Sidebar"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

const test = {
    id: 1,
    name: "UA",
    groups:
    [
        {
            id: 2,
            name:"turma1",
            groups:
            [
                // {
                // id: 1,
                // name: "grupo1",
                // usersIds: [
                //     {
                //     id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                //     name: "user1",
                //     email: "user1@mail.com"
                //     }
                // ]
                // },
                // {
                //     id: 2,
                //     name: "grupo2",
                //     usersIds: [
                //     {
                //         id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                //         name: "user1",
                //         email: "user1@mail.com"
                //     }
                //     ]
                // },
                // {
                //     id: 3,
                //     name: "grupo3",
                //     usersIds: [
                //     {
                //         id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                //         name: "user1",
                //         email: "user1@mail.com"
                //     }
                //     ]
                // }
            ] 
        }
    ]
}

const SERVER_API = "https://localhost:7217/api"

const Dummy = () => {
    const {"*": currentPath} = useParams()
    const [groupName,setGroupName] = useState("")
    const [path,setPath] = useState("/" + test.name)
    const [sidebarContent,setSidebarContent] = useState([])
    test.groups[0].groups = sidebarContent

    const [updateFlag,setUpdateFlag] = useState(false)
    const [id,setGroupID] = useState(-1)

    const [show,setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = (id) => { 
        setGroupID(id)
        setShow(true) 
    }

    const handleChange = (e) => setGroupName(e.target.value)
    const handleCreate = () => {
        console.log(groupName)
        const data = {
            name: groupName,
            classId: id
        }

        const t = JSON.stringify(data)
        console.log(t)

        // try {
        //     fetch(`${SERVER_API}/Group`,{
        //         method: "POST",
        //         mode: "cors",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: t
        //     })
        // }
        // catch {
        //     console.error("failed to post to API")
        // }
        handleClose()
        setUpdateFlag(!updateFlag)
    }


    // useEffect(() => {
    //     getGroups().then((data) => {
    //         setSidebarContent(data)
    //     })
    // },[updateFlag])

    if(currentPath === "") {
        return(
            <>
                <h1>Dummy page for testing</h1>
                <p>in the future replace this code with an automatic redirect to </p>
                <Link to={"/*"}>
                    <button>here</button>
                </Link>

                <p>if you're here to test the groups page go </p>
                <Link to={"Instituicao"}>
                    <button>here</button>
                </Link>
            </>
        )
    }

    return(
        <>
            <div className="d-flex flex-column" style={{height: "100%"}}>
                <CreateGroupModal show={show} handleClose={handleClose} onNameChange={handleChange} onCreate={handleCreate}/>
                <MySidebar content={test} onAddClick={handleShow} onElementClick={(path) => {setPath(path)}} activeLink={path} basePath={""}/>
            </div>
        </>
    )
}

async function getGroups() {
    try{
        const response = await fetch(`${SERVER_API}/Group?Take=100&Skip=0`)
        const data = await response.json()
        return data.data
    }
    catch {
        console.log("error")
        return []
    }
}

function MySidebar({content,onAddClick,onElementClick,activeLink,basePath}) {
    return(
        <Sidebar>
            <SidebarContent content={content} onAddClick={onAddClick} onElementClick={onElementClick} activeLink={activeLink} parentPath={basePath}/>
        </Sidebar>
    )
}

function SidebarContent({content,onAddClick,parentPath,onElementClick,activeLink}) {
    var innerContent = ""
    const path = parentPath + "/" + content.name
    if(content.constructor === Object && "groups" in content && content.groups.length > 0) {
        innerContent = <>
            <SidebarGroup header={<Header title={content.name} onAddClick={onAddClick} activeLink={activeLink} onElementClick={onElementClick} path={path} id={content.id}/>} headerKey={content.name}>
                {
                    content.groups.map((group) => {return <SidebarContent key={group.name} content={group} onAddClick={onAddClick} parentPath={path} onElementClick={onElementClick} activeLink={activeLink}/>})
                }
            </SidebarGroup>
        </>
    }
    else {
        innerContent = <>
            <SidebarElement>
                <LinkElement name={content.name} activeLink={activeLink} onAddClick={onAddClick} path={path} onElementClick={onElementClick} id={content.id}/>
            </SidebarElement>
        </>
    }

    return(
        <>
            {innerContent}
        </>
    )
}

function CreateGroupModal({show,handleClose,onNameChange,onCreate}) {
    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Group name</label>
                        <input type="text" className="form-control" id="formGroupName" onChange={onNameChange} />
                    </div>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

//sidebar helper functions
function Header({title,onAddClick,activeLink,onElementClick,path,id}) {
    return(
        <div className="d-flex add-btn-group align-items-center">
            <div className="d-flex align-items-center" style={{flex: "1"}}>
                <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + title.replace(/\s/g, "") + "-collapse"} aria-expanded="true"/>
                <LinkButton name={title} activeLink={activeLink} onElementClick={onElementClick} path={path}/>
            </div>
            <AddBtn onClick={onAddClick} id={id}/>
        </div>
    )
}

function LinkElement({activeLink,name,onAddClick,path,onElementClick,id}) {
    return(
        <div className="d-flex add-btn-group align-items-center">
            <div style={{flex: "1"}}>
                <LinkButton name={name} activeLink={activeLink} path={path} onElementClick={onElementClick}/>
            </div>
            <AddBtn onClick={onAddClick} id={id}/>
        </div>
    )
}

function LinkButton({name,activeLink,path,onElementClick}) {
    const active = activeLink === path
    return(
        <button className={"btn border-0 rounded p-2 " + (active ? "btn-primary" : "")} onClick={() => {onElementClick(path)}}>
            {name}
        </button>
    )
}

function AddBtn({onClick,id}) {
    return(
        <button className="btn add-btn" onClick={() => {onClick(id)}}/>
    )
}


export default Dummy