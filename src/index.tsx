import { StrictMode } from 'react';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom'
import {IntlProvider} from 'react-intl'
import App from './App'
import './index.css'

import messages from './intl'

const navigatorLanguage = navigator.language.substring(0, 2)

ReactDOM.render(
    <StrictMode>
        <IntlProvider locale={navigatorLanguage} messages={messages[navigatorLanguage] || messages['en']}>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </IntlProvider>
    </StrictMode>,
    document.getElementById('root')
)
