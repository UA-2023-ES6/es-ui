import React, { useState, useEffect } from 'react';
import { MDBListGroup} from 'mdb-react-ui-kit';
import { UserListItem } from './UserListItem';

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

export {UserList};
