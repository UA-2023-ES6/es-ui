import React, { useState, useEffect } from 'react';
import { MDBListGroup } from 'mdb-react-ui-kit';
import { PermissionsListItem } from './PermissionsListItem';

const Permissions = ({ selectedPermissions, setSelectedPermissions }) => {
  const [checkedPermissions, setCheckedPermissions] = useState([]);

  const permissionsList = [
                          {id:1,name:"CreateSubGroup"},
                          {id:2,name:"CreateMessage"},
                          {id:3,name:"CreateQuestion"},
                          {id:4,name:"CreateAnswer"},
                          {id:5,name:"ManageUsers"},
                          {id:6,name:"ManageUsersPermission"}]

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