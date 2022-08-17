import React, {useCallback, useMemo } from 'react'
import {useDropzone} from 'react-dropzone'
import './DropZone.css'

import { DraggableImages } from './DraggableImages';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};



function MyDropzone(props) {
  const { files } = props
  const {setFiles} = props

  const selectFiles = (e) => {
    setFiles(e.target.files)
  }

  const {getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject} = useDropzone({
    onDrop: (acceptedFiles) => {
      const acc = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      if(acc.length > 1) setFiles(...files, acc)
      else setFiles([...files, acc[0]])
    }})

    const style = useMemo(() => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [
      isFocused,
      isDragAccept,
      isDragReject
    ]);  


  return (
    <div className='dnd' {...getRootProps({style})}>
      <input {...getInputProps()} />
      {
        files.length ?
        <DraggableImages files={files} setFiles={setFiles} /> :
          <p>Drag 'n' drop some files here, or <button onClick={selectFiles}>click</button> to select files</p>
          
      }
    </div>
  )
}

export default MyDropzone;
