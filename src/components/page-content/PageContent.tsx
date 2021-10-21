import React, {useCallback, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import ReactDOM from "react-dom";

import {Configuration} from "../../models/Configuration";
import {DroppableItem} from "../droppable-item/DroppableItem";
import {observableConfiguration} from "../../stores/configuration";

import Style from './PageContent.module.css'

export const PageContent = () => {

    const [configuration, setConfiguration] = useState<Configuration>()

    const updateConfiguration = useCallback((configuration?: Configuration) => {
        setConfiguration(configuration)
    }, [])

    useEffect(() => observableConfiguration.next(configuration), [configuration])

    useEffect(() => {
        const subscription = observableConfiguration.subscribe(updateConfiguration)
        return () => subscription.unsubscribe()
    }, [])

    const [{isOver}, drop] = useDrop<Configuration, unknown, { isOver: boolean }>(
        () => ({
            accept: 'element',
            collect: monitor => ({
                isOver: monitor.isOver({shallow: true})
            }),
            canDrop: () => !configuration,
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    updateConfiguration(item)
                }
            }
        }), [configuration]
    )

    const onRefChange = useCallback((ref: any) => {
        if (ref) {
            drop(ref)
            const domNode = ReactDOM.findDOMNode(ref.current) || ref
            if (domNode) {
                for (const property in configuration?.properties) {
                    // @ts-ignore
                    domNode[property] = configuration.properties[property]
                }
            }
        }
    }, [drop, configuration?.properties])

    const deleteItem = useCallback(() => {
        setConfiguration(undefined)
    }, [])

    const background = {background: !configuration && isOver ? 'yellow' : 'white'}

    return (
        <div ref={onRefChange} className={Style.pageContent} style={background}>
            {configuration && <DroppableItem configuration={configuration} deleteItem={deleteItem}/>}
        </div>
    )
}
