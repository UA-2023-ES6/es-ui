import React from 'react';
import { MDBListGroupItem } from 'mdb-react-ui-kit';

const PermissionsListItem = ({ permission, selectedPermissions, setCheckedPermissions }) => {
  const isChecked = selectedPermissions.some((p) => p.id === permission.id);

  const handleCheckboxChange = (e) => {
    setCheckedPermissions(permission, e.target.checked);
  };

  return (
    <MDBListGroupItem className='d-flex justify-content-between align-items-center' style={{marginLeft:"10px"}}>
      <div>
        <div className='fw-bold'>{permission.name}</div>
        <div className='text-muted'>{permission.description}</div>
      </div>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </MDBListGroupItem>
  );
};

export { PermissionsListItem };
