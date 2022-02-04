import * as React from 'react';
import styles from './App.module.scss';
import Router from './Router';

function App() {

  return (
    <div className={styles.container}>
        <Router/>
    </div>
  );
}

export default App;
