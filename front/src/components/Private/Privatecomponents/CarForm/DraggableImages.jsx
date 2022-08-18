import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteCarPhotoThunk } from '../../../../store/action';

export const DraggableImages = (props) => {
  const dispatch = useDispatch()

  const { files, setFiles } = props

  const removeFile = file => async () => {    
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
    
    dispatch(deleteCarPhotoThunk(file))
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
                  <Draggable 
                  key={file.name ? file.path : file.id}
                  draggableId={file.name ? file.path : file.id.toString()} 
                  index={index}>
                    {(provided, snapshot) => {
                      if (snapshot.isDragging) {
                        provided.draggableProps.style.left = undefined;
                        provided.draggableProps.style.top = undefined;
                      }
                        return (
                        <li 
                          
                          className='addcar__item-list-item'
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                           ref={provided.innerRef}
                          >
                            <img className="addcar__item-list-img"  src={file.preview ? file.preview : file.img_url} alt='car'/>
                          <button className="addcar__item-list-btn" onClick={removeFile(file)}></button>
                        </li>
                        )
                    }}
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

