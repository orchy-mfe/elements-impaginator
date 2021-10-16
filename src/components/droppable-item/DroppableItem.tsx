import React, {useState} from "react";
import {useDrop} from "react-dnd";

import {Configuration} from "../../models/Configuration";

export const DroppableItem: React.FC<{ configuration: Configuration }> = ({configuration}) => {

    const [configurationState, setConfigurationState] = useState(configuration)
    const [children, setChildren] = useState<JSX.Element[]>()

    const [{isOver}, drop] = useDrop<Configuration, unknown, { isOver: boolean }>(
        () => ({
            accept: 'element',
            collect: monitor => ({
                isOver: monitor.isOver({shallow: true})
            }),
            drop: (item, monitor) => {
                const droppedOnMe = !monitor.didDrop()
                if (droppedOnMe) {
                    configuration.content = [...configuration.content || [], configuration]
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
            style: {height: '100px', background: isOver ? 'yellow' : 'white'}
        },
        children
    )
}
