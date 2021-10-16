import React from "react";
import {useDrag} from "react-dnd";
import {DragSourceMonitor} from "react-dnd/dist/types/types";

type CatalogueItemProps = {
    itemName: string
}

const opacityManager = (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    opacity: monitor.isDragging() ? 0.5 : 1
})

export const CatalogueItem: React.FC<CatalogueItemProps> = ({itemName}) => {
    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'element',
            item: { tagName: itemName },
            collect: opacityManager
        }),
        []
    )
    return (
        <div ref={dragRef} style={{ opacity }}>
            {itemName}
        </div>
    )
}
