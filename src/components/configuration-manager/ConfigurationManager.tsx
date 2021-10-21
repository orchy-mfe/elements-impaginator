import React, {useCallback, useEffect, useState} from "react";
import {Dialog} from "primereact/dialog";
import {FormattedMessage} from "react-intl";
import Editor from "@monaco-editor/react";

import Style from "../catalogue-register/CatalogueRegister.module.css";
import {Button} from "primereact/button";
import {observableConfiguration} from "../../stores/configuration";

const sideBarIcon = `p-sidebar-close-icon pi pi-sliders-v ${Style.showCatalogue}`

export const ConfigurationManager = () => {

    const [dialogVisible, setDialogVisible] = useState(false)
    const hideDialog = useCallback(() => setDialogVisible(false), [])
    const showDialog = useCallback(() => setDialogVisible(true), [])

    const [currentConfiguration, setCurrentConfiguration] = useState<any>()

    useEffect(() => {
        const subscription = observableConfiguration.subscribe((configuration) => setCurrentConfiguration(JSON.stringify(configuration, null, 2)))
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
                    <Editor height='70vh' language='json' value={currentConfiguration}
                            onChange={setCurrentConfiguration}/>
                </div>
            </Dialog>
        </>
    )
}

const parseConfiguration = (toParse: string) => {
    try {
        return JSON.parse(toParse)
    } catch (error) {
        return undefined
    }
}

type ConfigurationManagerFooterProps = {
    configuration: string
}

const ConfigurationManagerFooter: React.FC<ConfigurationManagerFooterProps> = ({configuration}) => {
    const parsedConfiguration = parseConfiguration(configuration)
    return (
        <Button disabled={!parsedConfiguration} onClick={() => observableConfiguration.next(parsedConfiguration)}>
            <FormattedMessage id='configuration.update'/>
        </Button>
    )
}
