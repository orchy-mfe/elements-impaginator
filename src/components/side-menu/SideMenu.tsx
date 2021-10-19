import React, {useEffect, useState} from "react";

import {CatalogueItem} from "../catalogue-item/CatalogueItem";
import {BaseItem} from "../catalogue-item/BaseItem";
import {observableCatalogue} from "../../stores/custom-elements-catalogue";
import {CatalogueRegister} from "../catalogue-register/CatalogueRegister";

import Style from './SideMenu.module.css'


export const SideMenu = () => {
    const [currentCatalogue, setCurrentCatalogue] = useState<string[]>([])

    useEffect(() => {
        const subscription = observableCatalogue.subscribe(catalogue => setCurrentCatalogue([...catalogue]))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <div className={Style.sidenav}>
            <CatalogueRegister/>
            <b>{'Items catalogue'}</b>
            <BaseItem kind={"row"}/>
            <BaseItem kind={"column"}/>
            {
                currentCatalogue.map(item => <CatalogueItem itemName={item}/>)
            }
        </div>
    )
}
