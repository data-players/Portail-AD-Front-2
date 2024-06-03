export const fetchDataTopic = async (dispatch) => {
    try {
      const response = await fetch('https://data.portail-alimentation-durable.data-players.com/themes',{
        headers: {
          'Accept': 'application/ld+json'
        }
      });
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS_Topic', payload: data['ldp:contains'] });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

export const fetchDataDepartment = async (dispatch) => {
  try {

    const response = await fetch('https://data.portail-alimentation-durable.data-players.com/departments',{
      headers: {
        'Accept': 'application/ld+json'
      }
    });
    const data = await response.json();
    dispatch({ type: 'FETCH_SUCCESS_Department', payload: data['ldp:contains'] });
  } catch (error) {
    dispatch({ type: 'FETCH_ERROR', payload: error.message });
  }
};

  