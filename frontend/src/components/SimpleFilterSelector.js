import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import { fetchDataTopic, fetchDataDepartment } from '../actions/fetchData';
import { Link } from 'react-router-dom';
import Map from './Map';
import { ReactComponent as ThematiqueIcon } from '../assets/logos/common/SVG/thématique.svg';
import { ReactComponent as DepartementIcon } from '../assets/logos/common/SVG/departement.svg';
import './SimpleFilterSelector.css';

const DataDisplay = () => {
  const { state, dispatch } = useStore();
  const { dataTopic, dataDepartment, loading, error } = state;
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'cards'
  const roots = dataTopic?.filter(t => t['pair:broader'] === undefined);
  const orderedDataDepartment = dataDepartment.sort((a, b) => {
    const numA = parseInt(a['pair:departmentNb'], 10);
    const numB = parseInt(b['pair:departmentNb'], 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    } else {
      return a['pair:departmentNb'].localeCompare(b['pair:departmentNb']);
    }
  });

  useEffect(() => {
    fetchDataTopic(dispatch, () => state);
    fetchDataDepartment(dispatch, () => state);
  }, [dispatch, state]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className="title">
        <h1> Explorer par thématique ou par région</h1>
        <hr className="title-underline" />
      </div>
      <div className="content" style={{flexShrink:1}}>
        <div className="themes-container">
          <div className="themes-header">
            <div className="header-left">
              <span><ThematiqueIcon /></span>
              <span className='body2 margin-left'>Thematiques</span>
            </div>
          </div>
          <div className="container">
            {roots.map(item => (
              <Link to={`/search?refinementList[hasTopic][0]=${encodeURIComponent(item['pair:label'])}`} className="card" key={item.id}>
                <div className="body3">{item['pair:label']}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="departments-container">
          <div className="departments-header">
            <div className="header-left">
              <span><DepartementIcon /></span>
              <span className='body2 margin-left'>Départements</span>
            </div>
            <div className="switch-container">
              <span className="switch-label">Carte</span>
              <label className="switch">
                <input type="checkbox" checked={viewMode === 'cards'} onChange={() => setViewMode(viewMode === 'map' ? 'cards' : 'map')} />
                <span className="slider round"></span>
              </label>
              <span className="switch-label">liste</span>
            </div>
          </div>
          {viewMode === 'map' ? (
            <Map />
          ) : (
            <div className="container">
              {orderedDataDepartment?.map(item => (
                <Link to={`/search?refinementList[hasDepartment][0]=${encodeURIComponent(item['pair:label'])}`} className="card" key={item.id}>
                  <div>{item['pair:label']} ({item['pair:departmentNb']})</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;
