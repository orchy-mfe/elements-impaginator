import React from "react";
import {useDrag} from "react-dnd";
import {DragSourceMonitor} from "react-dnd/dist/types/types";
import {Configuration} from "../../models/Configuration";

const rowStyle = 'display: flex; flex-direction: column;'
const columnStyle = 'display: flex; flex-direction: row;'

type BaseItemProps = {
    kind: 'row' | 'column'
}

const opacityManager = (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    opacity: monitor.isDragging() ? 0.5 : 1
})

export const BaseItem: React.FC<BaseItemProps> = ({kind}) => {

    const configuration: Configuration = {
        type: kind,
        attributes: {
            style: kind === 'row' ? rowStyle : columnStyle
        }
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
            {kind}
        </div>
    )
}
