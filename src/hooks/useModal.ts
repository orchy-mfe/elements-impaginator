import {useCallback, useState} from 'react'

export const useModal = () => {
    const [dialogVisible, setDialogVisible] = useState(false)

    const hideDialog = useCallback(() => setDialogVisible(false), [])
    const showDialog = useCallback(() => setDialogVisible(true), [])

    return {dialogVisible, hideDialog, showDialog}
}