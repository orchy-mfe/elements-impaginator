import React, {ChangeEvent, useCallback, useState} from 'react'

import {Dialog} from 'primereact/dialog'
import {registerCustomElement} from '../../stores/custom-elements-catalogue'
import {FormattedMessage} from 'react-intl'
import {Button} from 'primereact/button'
import {InputText} from 'primereact/inputtext'

import {useModal} from '../../hooks/useModal'

import Style from './CatalogueRegister.module.css'

const plusIcon = `p-sidebar-close-icon pi pi-plus ${Style.showCatalogue}`

export const CatalogueRegister: React.FC = () => {

    const [currentLink, setCurrentLink] = useState('')

    const {showDialog, hideDialog, dialogVisible} = useModal()
    
    const setCatalogueLink = useCallback((event: ChangeEvent<HTMLInputElement>) => setCurrentLink(event.target.value), [])
    const registerCatalogue = useCallback(() => {
        registerCustomElement(currentLink)
        hideDialog()
    }, [currentLink, hideDialog])

    return (
        <>
            <span className={plusIcon} onClick={showDialog}/>
            <Dialog className={Style.dialogContainer}
                    footer={<CatalogueRegisterFooter registerCatalogue={registerCatalogue}/>}
                    header={<FormattedMessage id='catalogueRegistration'/>}
                    onHide={hideDialog}
                    visible={dialogVisible}
            >
                <div className={Style.dialogContent}>
                    <FormattedMessage id='catalogueRegistration.modal'/>
                    <InputText onChange={setCatalogueLink}/>
                </div>
            </Dialog>
        </>
    )
}

type CatalogueRegisterFooterProps = {
    registerCatalogue: () => void
}

const CatalogueRegisterFooter: React.FC<CatalogueRegisterFooterProps> = ({registerCatalogue}) => {
    return (
        <Button onClick={registerCatalogue}>
            <FormattedMessage id='catalogueRegistration.modal.register'/>
        </Button>
    )
}
