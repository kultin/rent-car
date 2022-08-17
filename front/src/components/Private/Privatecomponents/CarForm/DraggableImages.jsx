import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const DraggableImages = (props) => {

  const { files, setFiles } = props

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = files.slice()
    const [reorderedItem] =items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  }

  return (
     <DragDropContext  onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='characters'>
          {(provided) => (
            <ul style={{width: '100%', height: '150px' , display: 'flex'}} {...provided.droppableProps} ref={provided.innerRef}>
              {files && 
                files.map((file, index) => {
                  return (
                    <Draggable key={file.name} draggableId={file.name} index={index}>
                      {(provided) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                          <img key={file.name} src={file.preview} alt='car' style={{width: '100px', height: '150px'}}/>
                        </li>
                      )}
                    </Draggable>
                  )
                }
                )
              }
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
  )
}

