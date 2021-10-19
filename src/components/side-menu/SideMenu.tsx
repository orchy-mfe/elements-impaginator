import React, {useEffect, useState} from "react";
import {Sidebar} from "primereact/sidebar";

import {CatalogueItem} from "../catalogue-item/CatalogueItem";
import {BaseItem} from "../catalogue-item/BaseItem";
import {observableCatalogue} from "../../stores/custom-elements-catalogue";
import {CatalogueRegister} from "../catalogue-register/CatalogueRegister";

import Style from './SideMenu.module.css'

const noOp = () => {}

export const SideMenu = () => {
    const [currentCatalogue, setCurrentCatalogue] = useState<string[]>([])

    useEffect(() => {
        const subscription = observableCatalogue.subscribe(catalogue => setCurrentCatalogue([...catalogue]))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <Sidebar visible onHide={noOp} icons={() => <CatalogueRegister/>} showCloseIcon={false} className={Style.sideBar}>
            <b>{'Items catalogue'}</b>
            <BaseItem kind={"row"}/>
            <BaseItem kind={"column"}/>
            {
                currentCatalogue.map(item => <CatalogueItem itemName={item}/>)
            }
        </Sidebar>
    )
}
