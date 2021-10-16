import React, {useEffect, useState} from "react";

import {observableCatalogue} from "../../custom-elements-catalogue";
import {CatalogueItem} from "../catalogue-item/CatalogueItem";

import Style from './SideMenu.module.css'
import {BaseItem} from "../catalogue-item/BaseItem";


export const SideMenu = () => {
    const [currentCatalogue, setCurrentCatalogue] = useState<string[]>([])

    useEffect(() => {
        const subscription = observableCatalogue.subscribe(catalogue => setCurrentCatalogue([...catalogue]))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className={Style.sidenav}>
            <b>{'Items catalogue'}</b>
            <BaseItem kind={"row"}/>
            <BaseItem kind={"column"}/>
            {
                currentCatalogue.map(item => <CatalogueItem itemName={item}/>)
            }
        </div>
    )
}
