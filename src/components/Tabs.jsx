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

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (value) => {
    if (value === activeTab) {
      return;
    }

    setActiveTab(value);
  };

  return (
    <>
      <MDBTabs pills justify className='mb-3 custom-tabs'>
        <MDBTabsItem className='custom-tabs-item'>
          <MDBTabsLink onClick={() => handleTabClick('tab1')} active={activeTab === 'tab1'} className='custom-tabs-link'>
            Messages
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem className='custom-tabs-item'>
          <MDBTabsLink onClick={() => handleTabClick('tab2')} active={activeTab === 'tab2'} className='custom-tabs-link'>
            Events
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={activeTab === 'tab1'}>
          <UserChat />
        </MDBTabsPane>
        <MDBTabsPane open={activeTab === 'tab2'}>
          Insert events
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export {Tabs};
