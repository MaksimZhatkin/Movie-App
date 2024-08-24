import React, { useState } from 'react';
import { Tabs } from 'antd';

import SearchTab from '../searchTab/SearchTab';
import RatedTab from '../ratedTab/RatedTab';
import GlobalProvider from '../../contexts/GlobalContext';

import './App.css';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTab, setSelectedTab] = useState('search');

  const handleTabChange = (key: string) => {
    setSelectedTab(key);
  };

  return (
    <div className="app-wrapper">
      <h1>Movie App</h1>
      <GlobalProvider>
        <Tabs
          destroyInactiveTabPane
          className="app-tabs"
          centered
          onChange={handleTabChange}
          items={[
            {
              label: 'Search',
              key: 'search',
              children: <SearchTab />,
            },
            {
              label: 'Rated',
              key: 'rated',
              children: <RatedTab />,
            },
          ]}
        />
      </GlobalProvider>
    </div>
  );
}

export default App;
