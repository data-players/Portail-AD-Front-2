let isFetchingTopic = false;
let isFetchingDepartment = false;
let isFetchingGeoData = false;

export const fetchDataTopic = async (dispatch, getState) => {
  const { loadingTopic } = getState();

  if (loadingTopic || isFetchingTopic) return;
  isFetchingTopic = true;
  console.log('loadingTopic', loadingTopic);
  dispatch({ type: 'FETCH_START_Topic' });
  try {
    const response = await fetch('https://data.portail-alimentation-durable.data-players.com/themes', {
      headers: { 'Accept': 'application/ld+json' }
    });
    const data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS_Topic', payload: data['ldp:contains'] });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  } finally {
    isFetchingTopic = false;
  }
};

export const fetchDataDepartment = async (dispatch, getState) => {
  const { loadingDepartment } = getState();
  // console.log('loadingDepartment', loadingDepartment);
  if (loadingDepartment || isFetchingDepartment) return;
  isFetchingDepartment = true;
  
  dispatch({ type: 'FETCH_START_Department' });
  try {
    const response = await fetch('https://data.portail-alimentation-durable.data-players.com/departments', {
      headers: { 'Accept': 'application/ld+json' }
    });
    const data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS_Department', payload: data['ldp:contains'] });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  } finally {
    isFetchingDepartment = false;
  }
};

export const fetchGeoData = async (dispatch, getState) => {
  const { loadingGeoData } = getState();
  if (loadingGeoData || isFetchingGeoData) return;
  isFetchingGeoData = true;
  console.log('fetchGeoData');
  
  // Utiliser une promesse pour garantir l'ordre d'exécution
  await new Promise((resolve) => {
    dispatch({ type: 'FETCH_START_GeoData' });
    resolve();
  });

  try {
    const response = await fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements.geojson');
    const data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS_GeoData', payload: data });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  } finally {
    isFetchingGeoData = false;
  }
};
