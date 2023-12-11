import React, { useState, useEffect } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import {postData,getData} from "../utils/httpRequests";
import { Button, Modal } from 'react-bootstrap';

const SERVER_API = `${process.env.REACT_APP_SERVER_API}api`

const UserListItem = ({ user, invite, setCheckedUsers }) => {

    return (
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
            <div>
                <div className='fw-bold'>{user.name}</div>
                <div className='text-muted'>{user.email}</div>
            </div>
            {invite && (
                <input
                    type='checkbox'
                    onChange={(e) => setCheckedUsers(user, e.target.checked)}
                />
            )}
        </MDBListGroupItem>
    );
};

const UserList = ({ groupUsers, invite, setCheckedUsers }) => {
    const [checkedUsers, setLocalCheckedUsers] = useState([]);

    useEffect(() => {
        setCheckedUsers(checkedUsers);
    }, [checkedUsers, setCheckedUsers]);

    const handleUserCheckboxChange = (user,isChecked) => {
        setLocalCheckedUsers((prevCheckedUsers) => {
            if (isChecked) {
                return [...prevCheckedUsers, user];
            } else {
                return prevCheckedUsers.filter((u) => u.id !== user.id);
            }
        });
    };

    return (
        <MDBListGroup style={{ minWidth: '22rem' }} light>
            {groupUsers.map((user) => (
                <UserListItem
                    key={user.id}
                    user={user}
                    invite={invite}
                    setCheckedUsers={handleUserCheckboxChange}
                />
            ))}
        </MDBListGroup>
    );
};

const GroupConfiguration = ({ showModal, closeModal, groupUsers, parentGroupUsers, groupId, token }) => {
    const [justifyActive, setJustifyActive] = useState('tab1');
    const [checkedUsers, setCheckedUsers] = useState([]);
  
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
  
    return (
    <>
    <Modal show={showModal} onHide={closeModal}>
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
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane open={justifyActive === 'tab1'}>
            <UserList groupUsers={groupUsers} invite={false} setCheckedUsers={setCheckedUsers}/>
            </MDBTabsPane>
            <MDBTabsPane open={justifyActive === 'tab2'}>
            <UserList
                groupUsers={parentGroupUsers.filter((parentUser) => {
                return !groupUsers.some((groupUser) => groupUser.id === parentUser.id);
                })}
                invite={true}
                setCheckedUsers={setCheckedUsers}
            />
            </MDBTabsPane>
        </MDBTabsContent>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
            Close
        </Button>
        {justifyActive === 'tab2' && (
            <Button variant="primary" onClick={handleInvite}>
                Invite Checked Users
            </Button>
        )}
        </Modal.Footer>
    </Modal>
    </>
);
};

export {GroupConfiguration};
