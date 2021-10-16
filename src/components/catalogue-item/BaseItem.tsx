import React from "react";
import {useDrag} from "react-dnd";
import {DragSourceMonitor} from "react-dnd/dist/types/types";



type BaseItemProps = {
    kind: 'row' | 'column'
}

const opacityManager = (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    opacity: monitor.isDragging() ? 0.5 : 1
})

export const BaseItem: React.FC<BaseItemProps> = ({kind}) => {

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type: 'element',
            item: { tagName: kind},
            collect: opacityManager
        }),
        []
    )
    return (
        <div ref={dragRef} style={{ opacity }}>
            {kind}
        </div>
    )
}
