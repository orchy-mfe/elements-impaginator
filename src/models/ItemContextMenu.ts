import {MenuItem} from 'primereact/menuitem'

type BuildMenuItemsParams = {
    deleteItem: () => void,
    showDialog: () => void
}

type BuildMenuItemType = ({deleteItem}: BuildMenuItemsParams) => MenuItem[]

export const buildMenuItems: BuildMenuItemType = ({deleteItem, showDialog}: BuildMenuItemsParams) => [{
    label: 'Delete',
    icon: 'pi pi-minus-circle',
    command: deleteItem,
}, {
    label: 'Edit component',
    icon: 'pi pi-cog',
    command: showDialog
}]
