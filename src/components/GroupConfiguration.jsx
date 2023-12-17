import React, { useState} from 'react';
import {MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import {postData,getData,deleteData} from "../utils/httpRequests";
import { Button, Modal } from 'react-bootstrap';
import { EditPermissions } from './EditPermissions';
import { UserList } from './UserList';
import { Permissions } from './Permissions';


const SERVER_API = `${process.env.REACT_APP_SERVER_API}/api`

const GroupConfiguration = ({ username, showModal, closeModal, groupUsers, parentGroupUsers, groupId, token }) => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [checkedUsers, setCheckedUsers] = useState([]);
    const [CheckedUsersPermissions, setCheckedUsersPermissions] = useState([]);
    const [checkedPermissions, setCheckedPermissions] = useState([]);
  
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
      setJustifyActive(value);
    };
  
    const handleInvite = () => {
        const data = {
            }
        
        checkedUsers.forEach((user) => {
            postData(`${SERVER_API}/Group/${groupId}/user/${user.id}`, token, data)
                .catch((err) => console.log(err));
        });
    
        setCheckedUsers([]);
        closeModal()
    };

    const fetchPermissions = (user) => {
        const data = {};
        return getData(`${SERVER_API}/Permission/group/${groupId}/user/${user.id}`, token, data)
    }

    const handleEditPermissions = async () => {
        
        try{

            for (const user of CheckedUsersPermissions) {
                const response = await fetchPermissions(user);
                    
                console.log("Response:", response.data || []);

                const responsePermissions = response.data.permissions || [];
                const checkedPermissionsIds = checkedPermissions.map((permission) => permission.id);
                
                console.log(responsePermissions)

                if (Array.isArray(responsePermissions)) {
                    
                    const toAdd = checkedPermissionsIds.filter((id) => !responsePermissions.some((permission) => permission.id === id));
                    const toDelete = responsePermissions.filter((permission) => !checkedPermissionsIds.includes(permission)).map((permission) => permission);            

                    console.log("toAdd:",toAdd)
                    console.log("toDelete:",toDelete)

                    
                    postData(`${SERVER_API}/Permission/group/${groupId}/user/${user.id}`, token, { "permissions": toAdd })
                    .then((res) => {
                        console.log("Permission added:", toAdd);
                    })
                    .catch((err) => {
                        console.error("Error adding permission:", err);
                    });
                    
                    deleteData(`${SERVER_API}/Permission/group/${groupId}/user/${user.id}`, token, { "permissions": toDelete })
                    .then((res) => {
                        console.log("Permission deleted:", toDelete);
                    })
                    .catch((err) => {
                        console.error("Error deleting permission:", err);
                    });
                    
                
                } else {
                    console.error("Invalid response format for permissions.");
                }
            
            }
            setCheckedUsersPermissions([]);
            closeModal();
            //console.log(checkedPermissions);
            //console.log(CheckedUsersPermissions);
            //console.log(username);

        } catch(error) {
        console.error('Error fetching user permissions:', error);
        };
          
      };
  
    return (
    <>
    <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
        <Modal.Title>Group Configurations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <MDBTabs justify className='mb-3'>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                User List
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                Invite Users
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                Edit Permissions
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane open={justifyActive === 'tab1'}>
                {justifyActive === 'tab1' && (
                    <UserList groupUsers={groupUsers} invite={false} setCheckedUsers={setCheckedUsers}/>
                )}
            </MDBTabsPane>
            <MDBTabsPane open={justifyActive === 'tab2'}>
                {justifyActive === 'tab2' && (
                    <UserList
                        groupUsers={parentGroupUsers.filter((parentUser) => {
                            return !groupUsers.some((groupUser) => groupUser.id === parentUser.id);
                        })}
                        invite={true}
                        setCheckedUsers={setCheckedUsers}
                    />
                )}
            </MDBTabsPane>
            <MDBTabsPane open={justifyActive === 'tab3'} style={{ display: 'flex' }}>
                <div style={{ flex: '1', borderRight: '1px solid #ccc', paddingRight: '10px' }}>
                    {justifyActive === 'tab3' && (
                    <EditPermissions groupUsers={groupUsers.filter((user) => user.id !== username)} setCheckedUsersPermissions={setCheckedUsersPermissions} />
                    )}
                </div>
                <div style={{ flex: '1', paddingLeft: '10px' }}>
                    {justifyActive === 'tab3' && (
                    <Permissions selectedPermissions={checkedPermissions} setSelectedPermissions={setCheckedPermissions} />
                    )}
                </div>
            </MDBTabsPane>
        </MDBTabsContent>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        {justifyActive === 'tab2' && (
            <Button variant="primary" onClick={handleInvite}>
                Invite Users
            </Button>
        )}
        {justifyActive === 'tab3' && (
            <Button variant="primary" onClick={handleEditPermissions}>
                Edit Permissions
            </Button>
        )}
        </Modal.Footer>
    </Modal>
    </>
);
};

export {GroupConfiguration};
