import React, { useState, useEffect } from 'react';
import { MDBListGroup } from 'mdb-react-ui-kit';
import { PermissionsListItem } from './PermissionsListItem';

const Permissions = ({ selectedPermissions, setSelectedPermissions }) => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  const permissionsList = [
                          {id:1,name:"Create a Subgroup"},
                          {id:2,name:"Send Messages"},
                          {id:3,name:"Post Questions"},
                          {id:4,name:"Submit Answers"},
                          {id:5,name:"View and Invite Other Users"},
                          {id:6,name:"Edit Other Users' Permissions"}]

  useEffect(() => {
    setSelectedPermissions(checkedPermissions);
  }, [checkedPermissions, setSelectedPermissions]);

  const handlePermissionCheckboxChange = (permission, isChecked) => {
    setCheckedPermissions((prevCheckedPermissions) => {
      if (isChecked) {
        return [...prevCheckedPermissions, permission];
      } else {
        return prevCheckedPermissions.filter((p) => p.id !== permission.id);
      }
    });
  };

  return (
    <MDBListGroup style={{ minWidth: '22rem' }} light>
      {permissionsList.map((permission) => (
        <PermissionsListItem
          key={permission.id}
          permission={permission}
          selectedPermissions={selectedPermissions}
          setCheckedPermissions={handlePermissionCheckboxChange}
        />
      ))}
    </MDBListGroup>
  );
};

export {Permissions};