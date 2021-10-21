import {MenuItem} from "primereact/menuitem";

type BuildMenuItemsParams = {
    deleteItem: () => void
}

type BuildMenuItemType = ({deleteItem}: BuildMenuItemsParams) => MenuItem[]

export const buildMenuItems: BuildMenuItemType = ({deleteItem}: BuildMenuItemsParams) => [{
    label: 'Delete',
    icon: 'pi pi-minus-circle',
    command: deleteItem,
}]

export const menuItems: MenuItem[] = [{
    label: 'Delete',
    icon: 'pi pi-minus-circle'
}]
