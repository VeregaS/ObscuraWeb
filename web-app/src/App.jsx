import React, {Suspense} from "react";
import { Helmet } from 'react-helmet';
import styles from "./App.module.css"
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className={styles.version}>ObscuraWeb v0.1a</div>
      <Suspense>
        {<NavBar is_visible={true}/>}
      </Suspense>
    </div>
  );
}

export default App;
