import React from 'react';

const HomePage = () => {
  return (
    <div >
      <header style={styles.header}>
        <h1>Cette page devrait faire une redirection vers landing page mais sert de page par defaut pour le moment.</h1>
        <h1>Si c'est une redirection, quel serait la apge par defaut?</h1>
      </header>
    </div>
  );
};

const styles = {
  header: {
    background: '#4CAF50',
    color: 'white',
    padding: '1em',
  },
};

export default HomePage;
