import * as React from 'react';
import styles from './App.module.scss';
import Welcome from './view/Welcome';

function App() {

  return (
    <div className={styles.container}>
        <Welcome/>
    </div>
  );
}

export default App;
