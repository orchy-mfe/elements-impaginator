import React, {useState} from "react";
import {useDrop} from "react-dnd";

import {Configuration} from "../../models/Configuration";
import {styleConverter} from "../../lib/CssToJs";

const createStyle = (configuration: Configuration, isOver: boolean) => {
    const convertedStyle = styleConverter(configuration.attributes?.style)
    const isEmpty = configuration.content?.length || -1 <= 0
    return {
        style: {
            ...isEmpty ? {paddingBottom: '50px'} : undefined,
            ...isOver && !configuration.tag ? {background: 'yellow'} : undefined,
            ...convertedStyle
        }
    }
}

export const DroppableItem: React.FC<{ configuration: Configuration }> = ({configuration}) => {

    const [configurationState, setConfigurationState] = useState(configuration)
    const [children, setChildren] = useState<JSX.Element[]>()

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
                    setChildren(configuration.content?.map(configuration => <DroppableItem
                        configuration={configuration}/>))
                    setConfigurationState(configuration)
                }
            }
        })
    )

    return React.createElement(
        configurationState.tag || 'div',
        {
            ref: drop,
            ...configuration.attributes,
            ...createStyle(configuration, isOver)
        },
        children
    )
}
