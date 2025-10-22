import React from 'react';
import { StoreProvider } from './store/Store';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchComponents from './components/SearchComponents';
import SimpleFilterSelector from './components/SimpleFilterSelector';
import Sidebar from './components/SideBar';
import HomePage from './components/HomePage';
import AgentPage from './components/AgentPage';

const DefaultRedirect = () => {
  return <Navigate to={'/search'} />;
};


const App = () => {




  return (
    <StoreProvider>
      <Router>
        <div className="appContainer">
          <Sidebar />
          <div className="mainContent">
            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<SimpleFilterSelector />} />
              <Route path="/search" element={<SearchComponents />} />
              <Route path="/agent" element={<AgentPage />} />
              <Route path="/*" element={<DefaultRedirect />} />
            </Routes>
          </div>
        </div>

      </Router>

    </StoreProvider>
  );
};

export default App;
