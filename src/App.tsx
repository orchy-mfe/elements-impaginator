import React from 'react';

import {SideMenu} from "./components/side-menu/SideMenu";
import {PageContent} from "./components/page-content/PageContent";

import Style from './App.module.css';

function App() {
    return (
        <>
            <SideMenu/>
            <div className={Style.pageContent}>
                <PageContent/>
            </div>
        </>
    );
}

export default App;
