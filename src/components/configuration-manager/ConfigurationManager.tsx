import React, {useCallback, useState, useEffect} from "react";
import {Dialog} from "primereact/dialog";
import {FormattedMessage} from "react-intl";

import Style from "../catalogue-register/CatalogueRegister.module.css";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {observableConfiguration} from "../../stores/configuration";
import {Configuration} from "../../models/Configuration";

const sideBarIcon = `p-sidebar-close-icon pi pi-sliders-v ${Style.showCatalogue}`

export const ConfigurationManager = () => {

    const [dialogVisible, setDialogVisible] = useState(false)
    const hideDialog = useCallback(() => setDialogVisible(false), [])
    const showDialog = useCallback(() => setDialogVisible(true), [])

    const [currentConfiguration, setCurrentConfiguration] = useState<any>()

    const setConfiguration = useCallback(event => setCurrentConfiguration(event.target.value), [])

    useEffect(() => {
        const subscription = observableConfiguration.subscribe((configuration) => setCurrentConfiguration(configuration))
        return () => subscription.unsubscribe()
    }, [])

    return (
        <>
            <span className={sideBarIcon} onClick={showDialog}/>
            <Dialog footer={<ConfigurationManagerFooter configuration={currentConfiguration}/>}
                    header={<FormattedMessage id='configuration.manage'/>}
                    visible={dialogVisible}
                    onHide={hideDialog}
                    className={Style.dialogContainer}
            >
                <div className={Style.dialogContent}>
                    <InputTextarea value={currentConfiguration} onChange={setConfiguration}/>
                </div>
            </Dialog>
        </>
    )
}

const parseConfiguration = (toParse: string) => {
    let configuration: Configuration = {type: 'row'}
    try {
        configuration = JSON.parse(toParse)
    } catch (error) {}
    return configuration
}

type ConfigurationManagerFooterProps = {
    configuration: string
}

const ConfigurationManagerFooter: React.FC<ConfigurationManagerFooterProps> = ({configuration}) => {
    const parsedConfiguration = parseConfiguration(configuration)
    return (
        <Button onClick={() => observableConfiguration.next(parsedConfiguration)}>
            <FormattedMessage id='configuration.update'/>
        </Button>
    )
}
