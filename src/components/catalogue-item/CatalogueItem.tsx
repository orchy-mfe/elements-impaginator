import React from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {Configuration} from "../../models/Configuration";

type CatalogueItemProps = {
    itemName: string
}

const opacityManager = (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    opacity: monitor.isDragging() ? 0.5 : 1
})

export const CatalogueItem: React.FC<CatalogueItemProps> = ({itemName}) => {

    const configuration: Configuration = {
        type: 'element',
        tag: itemName
    }

    const [{opacity}, dragRef] = useDrag(
        () => ({
            type: 'element',
            item: configuration,
            collect: opacityManager
        }),
        []
    )
    return (
        <div ref={dragRef} style={{opacity}}>
            {itemName}
        </div>
    )
}
