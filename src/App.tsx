import React, {useEffect, useState} from 'react';
import './App.css';
import {registerCustomElement, observableCatalogue} from "./custom-elements-catalogue";

function App() {

    const [currentLink, setCurrentLink] = useState('')
    const [currentCatalogue, setCurrentCatalogue] = useState<string[]>([])

    useEffect(() => {
        const subscription = observableCatalogue.subscribe(catalogue => setCurrentCatalogue([...catalogue]))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <>
            <input type='text' onChange={event => setCurrentLink(event.target.value)}/>
            <button onClick={() => registerCustomElement(currentLink)}>{'Register custom element'}</button>
            {
                currentCatalogue
            }
        </>
    );
}

export default App;
