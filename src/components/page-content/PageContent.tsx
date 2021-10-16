import React, {useRef} from "react";
import {useDrop} from "react-dnd";

import Style from './PageContent.module.css'
import {elementCreator} from "../../lib/elementCreator";

type DragObject = {
    tagName: string
}

export const PageContent = () => {

    const contentRef = useRef<HTMLDivElement>(null)

    const [, drop] = useDrop<DragObject, unknown, unknown>(
        () => ({
            accept: 'element',
            collect: monitor => ({
                isOver: monitor.isOver({shallow: true})
            }),
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    contentRef.current?.appendChild(elementCreator(item.tagName))
                }
            }
        })
    )

    return (
        <div ref={drop} className={Style.pageContent}>
            <div ref={contentRef}/>
        </div>
    )
}
