import { MDBListGroup } from 'mdb-react-ui-kit';
import React, { useState, useEffect } from 'react';
import { PermissionsUserListItem } from './PermissionsUserListItem';

const EditPermissions = ({ groupUsers, setCheckedUsersPermissions }) => {
    const [checkedUsersPermissions, setLocalCheckedUsersPermissions] = useState([]);

    useEffect(() => {
        setCheckedUsersPermissions(checkedUsersPermissions);
    }, [checkedUsersPermissions, setCheckedUsersPermissions]);

    const handleUserCheckboxChange = (user,isChecked) => {
        console.log("groupUsers:",groupUsers)
        setLocalCheckedUsersPermissions((prevCheckedUsers) => {
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
                <PermissionsUserListItem
                    key={user.id}
                    user={user}
                    setCheckedUsers={handleUserCheckboxChange}

                />
            ))}
        </MDBListGroup>
    );
};

export {EditPermissions};