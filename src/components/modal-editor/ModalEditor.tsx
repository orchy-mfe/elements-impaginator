import { useEffect, useState } from 'react';
import * as React from 'react';
import {Dialog} from 'primereact/dialog'
import {FormattedMessage} from 'react-intl'
import Editor from '@monaco-editor/react'
import {Button} from 'primereact/button'

import Style from '../catalogue-register/CatalogueRegister.module.css'
import {Configuration} from '../../models/Configuration'

type ModalEditorProps = {
    configuration: any,
    isVisible: boolean,
    onHide: () => void,
    onSave: (configuration: Configuration) => void,
    header: string,
    footerButton: string
}

export const ModalEditor: React.FC<ModalEditorProps> = (props) => {

    const {configuration, isVisible, onHide, header, footerButton, onSave} = props

    const [currentConfiguration, setCurrentConfiguration] = useState<any>(configuration)

    useEffect(() => setCurrentConfiguration(configuration), [configuration])

    const footer = <ModalEditorFooter configuration={currentConfiguration} footerButton={footerButton} onSave={onSave}/>

    return (
        <Dialog className={Style.dialogContainer}
                footer={footer}
                header={<FormattedMessage id={header}/>}
                onHide={onHide}
                visible={isVisible}
        >
            <div className={Style.dialogContent}>
                <Editor height='70vh' language='json' onChange={setCurrentConfiguration}
                        value={currentConfiguration}/>
            </div>
        </Dialog>
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
    configuration: string,
    onSave: (configuration: Configuration) => void,
    footerButton: string
}

const ModalEditorFooter: React.FC<ConfigurationManagerFooterProps> = (props) => {

    const {configuration, footerButton, onSave} = props

    const parsedConfiguration = parseConfiguration(configuration)
    return (
        <Button disabled={!parsedConfiguration} onClick={() => onSave(parsedConfiguration)}>
            <FormattedMessage id={footerButton}/>
        </Button>
    )
}
