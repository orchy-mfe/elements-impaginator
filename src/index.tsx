import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import {IntlProvider} from "react-intl";

import reportWebVitals from './reportWebVitals';
import messages from './intl'

const navigatorLanguage = navigator.language.substring(0, 2)

ReactDOM.render(
    <React.StrictMode>
        <IntlProvider locale={navigatorLanguage} messages={messages[navigatorLanguage] || messages['en']}>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </IntlProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
