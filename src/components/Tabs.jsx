import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import "../styles/tabs.css";
import { UserChat } from "./UserChat"
import { Forum } from "./Forum"

const Tabs = ({id,token,username}) => {
  const [activeTab, setActiveTab] = useState('tab1');
  //console.log(selected_id)
  const handleTabClick = (value) => {
    if (value === activeTab) {
      return;
    }

    setActiveTab(value);
  };

  return (
    <>
      <MDBTabs pills justify className='custom-tabs' >
        <MDBTabsItem className='custom-tabs-item' style={{borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc'}}>
          <MDBTabsLink onClick={() => handleTabClick('tab1')} active={activeTab === 'tab1'} className='custom-tabs-link'>
            Messages
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className='custom-tabs-item' style={{borderBottom: '1px solid #ccc', borderRight: '1px solid #ccc'}}>
          <MDBTabsLink onClick={() => handleTabClick('tab2')} active={activeTab === 'tab2'} className='custom-tabs-link'>
            Forum
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={activeTab === 'tab1'}>
          <UserChat id={id} token={token} username={username}/>
        </MDBTabsPane>
        <MDBTabsPane open={activeTab === 'tab2'}>
          <Forum id={id} token={token} username={username}/>
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export {Tabs};
