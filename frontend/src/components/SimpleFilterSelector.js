import React, { useEffect } from 'react';
import { useStore } from '../store/Store';
import { fetchDataTopic, fetchDataDepartment } from '../actions/fetchData';
import { Link } from 'react-router-dom';
import Map from './Map'

const DataDisplay = () => {
  const { state, dispatch } = useStore();
  const { dataTopic, dataDepartment, loading, error } = state;
  const roots = dataTopic?.filter(t=>t['pair:broader']===undefined)
  // const { prefix } = useParams();
  // const basePath = prefix ? `/${prefix}` : '';

  useEffect(() => {
    fetchDataTopic(dispatch);
    fetchDataDepartment(dispatch)
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1>Themes</h1>
      <div className="container">
        {roots.map(item => (
            <div className="card" key={item.id}>
              <Link to={`/search?refinementList[hasTopic][0]=${encodeURIComponent(item['pair:label'])}`}>{item['pair:label']}</Link>
            </div>
        ))}
      </div>
      <h1>Départements</h1>
      <Map/>
      <div className="container">
        {dataDepartment?.map(item => (
            <div className="card" key={item.id}>
              <Link to={`/search?refinementList[hasDepartment][0]=${encodeURIComponent(item['pair:label'])}`}>{item['pair:label']}</Link>
            </div>
        ))}
      </div>
    </>
  );
  
};

export default DataDisplay;
