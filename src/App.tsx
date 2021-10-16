import React from 'react';

import {SideMenu} from "./components/side-menu/SideMenu";
import {CatalogueRegister} from "./components/catalogue-register/CatalogueRegister";
import {PageContent} from "./components/page-content/PageContent";

import Style from './App.module.css';

function App() {
    return (
        <>
            <SideMenu/>
            <div className={Style.pageContent}>
                <CatalogueRegister/>
                <PageContent/>
            </div>
        </>
    );
}

export default App;
