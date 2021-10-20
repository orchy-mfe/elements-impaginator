import React, {MouseEvent, useCallback, useRef, useState} from "react";
import {useDrop} from "react-dnd";

import {Configuration} from "../../models/Configuration";
import {styleConverter} from "../../lib/CssToJs";
import {menuItems} from "../../models/ItemContextMenu";
import {ContextMenu} from "primereact/contextmenu";
import {baseStyle} from "../catalogue-item/BaseItem";

const shouldInsertPaddingBottom = (configuration: Configuration) => {
    const showForRow = configuration.type === "row"
    const showForColumn = configuration.type === "column" && (configuration.content?.length || -1) <= 0
    return showForRow || showForColumn
}

const createStyle = (configuration: Configuration, isOver: boolean) => {
    const convertedStyle = styleConverter(configuration.attributes?.style)
    // @ts-ignore
    const initialStyle = configuration.tag ? undefined : styleConverter(baseStyle[configuration.type])
    return {
        style: {
            ...initialStyle,
            ...configuration.tag ? undefined : {border: '1px dotted'},
            ...shouldInsertPaddingBottom(configuration) ? {paddingBottom: '50px'} : undefined,
            ...isOver && !configuration.tag ? {background: 'yellow'} : undefined,
            ...convertedStyle
        }
    }
}

const droppableItemMapper = (configuration: Configuration) => <DroppableItem configuration={configuration}/>

export const DroppableItem: React.FC<{ configuration: Configuration }> = ({configuration}) => {

    const [, setConfigurationState] = useState(configuration)

    const contextMenuRef = useRef(null)

    const openContextMenu = useCallback((event: MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        contextMenuRef.current?.show(event)
    }, [])

    const [{isOver}, drop] = useDrop<Configuration, unknown, { isOver: boolean }>(
        () => ({
            accept: 'element',
            collect: monitor => ({
                isOver: monitor.isOver({shallow: true})
            }),
            canDrop: () => !configuration.tag,
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    configuration.content = [...configuration.content || [], item]
                    setConfigurationState(configuration)
                }
            }
        })
    )

    return React.createElement(
        configuration.tag || 'div',
        {
            ref: drop,
            onContextMenu: openContextMenu,
            ...configuration.attributes,
            ...createStyle(configuration, isOver)
        },
        [<ContextMenu model={menuItems} ref={contextMenuRef}/>].concat(
            (configuration.content || []).map(droppableItemMapper)
        )
    )
}
