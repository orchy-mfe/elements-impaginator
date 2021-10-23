import React, {MouseEvent, RefObject, useCallback, useRef, useState} from "react";
import {useDrop} from "react-dnd";
import ReactDOM from "react-dom";
import {ContextMenu} from "primereact/contextmenu";

import {Configuration} from "../../models/Configuration";
import {styleConverter} from "../../lib/CssToJs";
import {buildMenuItems} from "../../models/ItemContextMenu";
import {baseStyle} from "../catalogue-item/BaseItem";
import {ModalEditor} from "../modal-editor/ModalEditor";

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
            ...shouldInsertPaddingBottom(configuration) ? {paddingBottom: '20px'} : undefined,
            ...isOver && !configuration.tag ? {background: 'yellow'} : undefined,
            ...convertedStyle
        }
    }
}

type DroppableItemProps = {
    configuration: Configuration,
    deleteItem: () => void
}

export const DroppableItem: React.FC<DroppableItemProps> = ({configuration, deleteItem}) => {

    const [, setConfigurationState] = useState(configuration)
    const [dialogVisible, setDialogVisible] = useState(false)

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

    const onRefChange = useCallback((ref: RefObject<any>) => {
        if(ref) {
            drop(ref)
            const domNode = ReactDOM.findDOMNode(ref.current) || ref
            if(domNode) {
                for (const property in configuration.properties) {
                    // @ts-ignore
                    domNode[property] = configuration.properties[property]
                }
            }
        }
    }, [drop, configuration.properties])

    const deleteChild = useCallback((itemNumber: number) => () => {
        configuration.content?.splice(itemNumber, 1)
        setConfigurationState({...configuration})
    }, [configuration])

    const hideDialog = useCallback(() => setDialogVisible(false), [])
    const showDialog = useCallback(() => setDialogVisible(true), [])
    const updateConfig = useCallback((newConfiguration: Configuration) => {
        Object.assign(configuration, newConfiguration)
        setConfigurationState({...configuration})
        hideDialog()
    }, [configuration, hideDialog])

    const droppableChildren = (configuration.content || [])
        .map((configuration, key) => <DroppableItem configuration={configuration} deleteItem={deleteChild(key)}/>)

    return React.createElement(
        configuration.tag || 'div',
        {
            ref: onRefChange,
            onContextMenu: openContextMenu,
            ...configuration.attributes,
            ...createStyle(configuration, isOver)
        },
        [
            <ContextMenu model={buildMenuItems({deleteItem, showDialog})} ref={contextMenuRef}/>,
            <ModalEditor
                configuration={JSON.stringify({...configuration, content: undefined}, null, 2)}
                isVisible={dialogVisible}
                onHide={hideDialog}
                onSave={updateConfig}
                header={`${configuration.tag || configuration.type}`}
                footerButton='configuration.update'
            />
        ].concat(droppableChildren)
    )
}
