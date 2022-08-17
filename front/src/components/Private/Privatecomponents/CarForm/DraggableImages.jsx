import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const DraggableImages = (props) => {

  const { files, setFiles } = props

  const removeFile = file => () => {
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return
    const items = files.slice()
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFiles(items)
  }

  console.log('FILES FROM DRAGGABLE', files)

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='characters'>
        {(provided) => (
          <ul className="addcar__item-list" {...provided.droppableProps} ref={provided.innerRef}>
            {files &&
              files.map((file, index) => {
                return (
                  <Draggable key={file.name} draggableId={file.name} index={index}>
                    {(provided) => (
                      <li className='addcar__item-list-item'{...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        <img className="addcar__item-list-img" key={file.name} src={file.preview ? file.preview : file.img_url} alt='car'/>
                        <button className="addcar__item-list-btn" onClick={removeFile(file)}></button>
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

