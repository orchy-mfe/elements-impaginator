import React, {useCallback, useEffect, useState} from "react";
import {useDrop} from "react-dnd";

import {Configuration} from "../../models/Configuration";
import {DroppableItem} from "../droppable-item/DroppableItem";

import Style from './PageContent.module.css'
import {observableConfiguration} from "../../stores/configuration";

export const PageContent = () => {

    const [droppedContent, setDroppedContent] = useState<JSX.Element>()
    const [configuration, setConfiguration] = useState<Configuration>()

    const updateConfiguration = useCallback((configuration?: Configuration) => {
        if(configuration) {
            setConfiguration(configuration)
            setDroppedContent(<DroppableItem configuration={configuration}/>)
        }
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
            canDrop: () => droppedContent === undefined,
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    updateConfiguration(item)
                }
            }
        }), [droppedContent]
    )

    const background = {background: !droppedContent && isOver ? 'yellow' : 'white'}

    return (
        <div ref={drop} className={Style.pageContent} style={background}>
            {droppedContent}
        </div>
    )
}
