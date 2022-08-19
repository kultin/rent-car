import React, {useCallback, useMemo } from 'react'
import {useDropzone} from 'react-dropzone'
import './DropZone.css'

import { DraggableImages } from './DraggableImages';

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


  const {getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject} = useDropzone({
    onDrop: (acceptedFiles) => {
      const acc = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      if(acc.length > 1) setFiles(files.concat(acc))
      else setFiles([...files, acc[0]])
    }})

    const style = useMemo(() => ({
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
    </div>
  )
}

export default MyDropzone;
