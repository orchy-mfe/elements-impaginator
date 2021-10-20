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
            canDrop: () => droppedContent === undefined,
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    setConfiguration(item)
                    setDroppedContent(<DroppableItem configuration={item}/>)
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
