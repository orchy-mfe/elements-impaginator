import React, {useCallback, useEffect, useState} from "react";

import {observableConfiguration} from "../../stores/configuration";
import {ModalEditor} from "../modal-editor/ModalEditor";
import {Configuration} from "../../models/Configuration";

import Style from "../catalogue-register/CatalogueRegister.module.css";

const sideBarIcon = `p-sidebar-close-icon pi pi-sliders-v ${Style.showCatalogue}`

export const ConfigurationManager = () => {

    const [dialogVisible, setDialogVisible] = useState(false)
    const hideDialog = useCallback(() => setDialogVisible(false), [])
    const showDialog = useCallback(() => setDialogVisible(true), [])

    const [currentConfiguration, setCurrentConfiguration] = useState<any>()

    useEffect(() => {
        const subscription = observableConfiguration.subscribe((configuration) => setCurrentConfiguration(configuration))
        return () => subscription.unsubscribe()
    }, [])

    const onSave = (configuration: Configuration) => {
        observableConfiguration.next(configuration)
        hideDialog()
    }

    return (
        <>
            <span className={sideBarIcon} onClick={showDialog}/>
            <ModalEditor
                configuration={JSON.stringify(currentConfiguration, null, 2)}
                isVisible={dialogVisible}
                onHide={hideDialog}
                onSave={onSave}
                header='configuration.manage'
                footerButton='configuration.update'
            />
        </>
    )
}
