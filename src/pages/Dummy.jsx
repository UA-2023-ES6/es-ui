import {Sidebar,SidebarGroup,SidebarElement} from "../components/Sidebar"
import {Tabs} from "../components/Tabs"
import { Link, useParams, useLocation } from "react-router-dom"
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import {postData,getData} from "../utils/httpRequests";
import SuccessMessage from '../components/SuccessMessage'
import { GroupConfiguration } from "../components/GroupConfiguration"

const test = {
    data: [
      {
        id: 1,
        name: "Default Institution",
        usersIds: [],
        subGroup: [
          {
            id: 2,
            name: "5",
            usersIds: [],
            subGroup: [
              {
                id: 3,
                name: "Group 1.1",
                usersIds: [],
                subGroup: [
                  {
                    id: 4,
                    name: "Group 1.1.1",
                    usersIds: [],
                    subGroup: []
                  },
                  {
                    id: 7,
                    name: "5",
                    usersIds: [],
                    subGroup: []
                  }
                ]
              },
              {
                id: 5,
                name: "Group 1.2",
                usersIds: [],
                subGroup: []
              }
            ]
          },
          {
            id: 6,
            name: "Group 2",
            usersIds: [],
            subGroup: []
          }
        ]
      }
    ]
  }

const SERVER_API = `${process.env.REACT_APP_SERVER_API}api`

const Dummy = ({token,username}) => {
  
    const {state} = useLocation()
    const [success] = useState(state ? state.success : null)

    if (state) {
        window.history.replaceState(null, "", window.location.pathname); //remove the state to prevent the success message from showing up again on refresh
      }
    
    const {"*": currentPath} = useParams();
    const [groupName, setGroupName] = useState("");
    const [path, setPath] = useState("/" + test.name);
    const [sidebarContent, setSidebarContent] = useState([]);
    const [id, setGroupID] = useState(-1);
    const [show, setShow] = useState(false);
    const [pathIdMapping, setPathIdMapping] = useState({});
    const [selectedId, setSelectedId] = useState(1);
    const [selectedParentId, setSelectedParentId] = useState(null);

    const handleClose = () => setShow(false);

    const handleShow = (id) => {
        setGroupID(id);
        setShow(true);
    };

    const handleChange = (e) => setGroupName(e.target.value);

    const handleCreate = async () => {
        const data = {
            name: groupName,
            parentGroupId: id
        }

        await postData(`${SERVER_API}/Group`,token,data)
        .catch(err => console.log(err))
        setSelectedId(1);
        handleClose();
    }

    const onElementClick = (path) => {
        setPath(path);
        setSelectedId(pathIdMapping[path.substring(1)]);
        setSelectedParentId(pathIdMapping[path.substring(1, path.lastIndexOf('/'))])
    };
      


    useEffect(() => {
        if(token !== null && token !== "") {
            getData(`${SERVER_API}/Group`,token)
            .then((response) => {
                setPathIdMapping(buildPathIdMapping(response.data))
                setSidebarContent(response.data)
            }).catch(err => console.log(err))
        }
    },[token])

    
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
            <div className="d-flex" style={{height: "100%"}}>
                <div className="d-flex flex-column">
                    <CreateGroupModal show={show} handleClose={handleClose} onNameChange={handleChange} onCreate={handleCreate}/>
                    <MySidebar content={sidebarContent} onAddClick={handleShow} onElementClick={onElementClick} activeLink={path} basePath={""} groupId={selectedId} parentGroupId={selectedParentId} token={token}/>
                </div>
                <div className="flex-grow-1">
                    {success ? <SuccessMessage message={success}/> : null}
                    <Tabs id={selectedId} token={token} username={username}/> 
                </div>
            </div>
        </>
    )
}

function MySidebar({content,onAddClick,onElementClick,activeLink,basePath,groupId,parentGroupId,token}) {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedParentGroupId, setSelectedParentGroupId] = useState(null);
    const [groupUsers, setGroupUsers] = useState([]);
    const [parentGroupUsers, setParentGroupUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setSelectedGroupId(groupId)
        setSelectedParentGroupId(parentGroupId)
        setShowModal(true)
        fetchGroupUsers(groupId)
        fetchParentGroupUsers(parentGroupId)
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const fetchGroupUsers = (groupId) => {
        
        getData(`${SERVER_API}/Group/${groupId}/user?take=${100}&skip=${0}`, token)
            .then((response) => {
            setGroupUsers(response.data || []);
            })
            .catch((error) => {
            console.error('Error fetching group users:', error);
            });
    };

    const fetchParentGroupUsers = (parentGroupId) => {
        
        if (parentGroupId == null){
            setParentGroupUsers([]);
            return;
        }
        getData(`${SERVER_API}/Group/${parentGroupId}/user?take=${100}&skip=${0}`, token)
            .then((response) => {
            setParentGroupUsers(response.data || []);
            })
            .catch((error) => {
            console.error('Error fetching group users:', error);
            });
    };

    useEffect(() => {
        if (selectedGroupId) {
            fetchGroupUsers(selectedGroupId);
            fetchParentGroupUsers(selectedParentGroupId)
        }
        }, [selectedGroupId]);
  


    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center',backgroundColor:"#f8f9fa",marginTop:"8px"}}>
            <button class="btn btn-primary" onClick={() => openModal(groupId)}>Group Configurations</button>
        </div>
        <GroupConfiguration showModal={showModal} closeModal={closeModal} groupUsers={groupUsers} parentGroupUsers={parentGroupUsers} groupId={selectedGroupId} token={token}></GroupConfiguration>

        <Sidebar>
            {content.map((institution) => (
            <SidebarContent
                key={institution.name}
                content={institution}
                onAddClick={onAddClick}
                onElementClick={onElementClick}
                activeLink={activeLink}
                parentPath={basePath}
            />
            ))}
        </Sidebar>
        
        </>
    );
}

function SidebarContent({content,onAddClick,parentPath,onElementClick,activeLink}) {
    var innerContent = ""
    const path = parentPath + "/" + content.name
    if(content.constructor === Object && "subGroup" in content && content.subGroup.length > 0) {
        innerContent = <>
            <SidebarGroup>
                <Group title={content.name} onAddClick={onAddClick} activeLink={activeLink} onElementClick={onElementClick} path={path} id={content.id} headerKey={"g" + content.id}>
                    {
                        content.subGroup.map((group) => {return <SidebarContent key={group.name} content={group} onAddClick={onAddClick} parentPath={path} onElementClick={onElementClick} activeLink={activeLink}/>})
                    }
                </Group>
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

function buildPathIdMapping(data, basePath = "") {
    const mapping = {};
    
    function traverse(group, path) {
      const currentPath = path === "" ? group.name : `${path}/${group.name}`;
      mapping[currentPath] = group.id;
  
      if (group.subGroup && group.subGroup.length > 0) {
        group.subGroup.forEach((subGroup) => {
          traverse(subGroup, currentPath);
        });
      }
    }
  
    data.forEach((group) => {
      traverse(group, basePath);
    });
  
    return mapping;
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
function Group({title,onAddClick,activeLink,onElementClick,path,id,headerKey,children}) {
    return(
        <>
            <div className="d-flex add-btn-group align-items-center">
                <div className="d-flex align-items-center" style={{flex: "1"}}>
                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target={"#" + headerKey + "-collapse"} aria-expanded="true"/>
                    <LinkButton name={title} activeLink={activeLink} onElementClick={onElementClick} path={path}/>
                </div>
                <AddBtn onClick={onAddClick} id={id}/>
            </div>
            <div className="collapse show" style={{paddingLeft: "2rem"}} id={headerKey + "-collapse"}>
                <ul className="btn-toggle-nav list-unstyled">
                    {children}
                </ul>
            </div>
        </>
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
