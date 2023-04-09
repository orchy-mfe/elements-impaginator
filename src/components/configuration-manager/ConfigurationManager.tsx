import {useEffect, useState} from 'react'

import {useModal} from '../../hooks/useModal'
import {Configuration} from '../../models/Configuration'
import {observableConfiguration} from '../../stores/configuration'
import {ModalEditor} from '../modal-editor/ModalEditor'

import Style from '../catalogue-register/CatalogueRegister.module.css'

const sideBarIcon = `p-sidebar-close-icon pi pi-sliders-v ${Style.showCatalogue}`

export const ConfigurationManager = () => {

    const {showDialog, hideDialog, dialogVisible} = useModal()

    const [currentConfiguration, setCurrentConfiguration] = useState<any>()

    useEffect(() => {
        const subscription = observableConfiguration.subscribe(setCurrentConfiguration)
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
                footerButton='configuration.update'
                header='configuration.manage'
                isVisible={dialogVisible}
                onHide={hideDialog}
                onSave={onSave}
            />
        </>
    )
}
