import React, {useEffect, useState} from "react";
import {useDrag} from "react-dnd";
import {DragSourceMonitor} from "react-dnd/dist/types/types";

const rowStyle = 'display: flex; flex-direction: column;'
const columnStyle = 'display: flex; flex-direction: row;'

type BaseItemProps = {
    kind: 'row' | 'column'
}

const opacityManager = (monitor: DragSourceMonitor) => ({
    isDragging: monitor.isDragging(),
    opacity: monitor.isDragging() ? 0.5 : 1
})

const createConfiguration = (kind: "row" | "column") => ({
    type: kind,
    attributes: {
        style: kind === 'row' ? rowStyle : columnStyle
    }
})

export const BaseItem: React.FC<BaseItemProps> = ({kind}) => {

    const [configuration, setConfiguration] = useState(createConfiguration(kind))

    const [{opacity, isDragging}, dragRef] = useDrag(
        () => ({
            type: 'element',
            item: configuration,
            collect: opacityManager
        }),
        [configuration]
    )

    useEffect(() => {
        if (!isDragging) {
            setConfiguration(createConfiguration(kind))
        }
    }, [kind, isDragging, setConfiguration])

    return (
        <div ref={dragRef} style={{opacity}}>
            {kind}
        </div>
    )
}
