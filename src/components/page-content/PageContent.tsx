import React, {useState} from "react";
import {useDrop} from "react-dnd";

import {Configuration} from "../../models/Configuration";
import {DroppableItem} from "../droppable-item/DroppableItem";

import Style from './PageContent.module.css'

export const PageContent = () => {

    const [droppedContent, setDroppedContent] = useState<JSX.Element>()
    const [, setConfiguration] = useState<Configuration>()

    const [{isOver}, drop] = useDrop<Configuration, unknown, { isOver: boolean }>(
        () => ({
            accept: 'element',
            collect: monitor => ({
                isOver: monitor.isOver({shallow: true})
            }),
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (!droppedContent && droppedOnMe) {
                    setConfiguration(item)
                    setDroppedContent(<DroppableItem configuration={item} />)
                }
            }
        })
    )

    return (
        <div ref={drop} className={Style.pageContent} style={{background: isOver ? 'yellow' : 'white'}}>
            {droppedContent}
        </div>
    )
}
