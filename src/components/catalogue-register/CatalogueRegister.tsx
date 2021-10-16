import React, {useState} from "react";

import {registerCustomElement} from "../../custom-elements-catalogue";

export const CatalogueRegister = () => {

    const [currentLink, setCurrentLink] = useState('')

    return (
        <>
            <input type='text' onChange={event => setCurrentLink(event.target.value)}/>
            <button onClick={() => registerCustomElement(currentLink)}>{'Register custom element'}</button>
        </>
    )
}
