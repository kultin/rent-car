import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './DropZone.css'

const style = {
  bgcolor: 'red',
  width: '300px'
}

function MyDropzone(props) {
  const { files } = props
  const {setFiles} = props

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log('ACCEPTED FILES', acceptedFiles)
      const acc = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      if(acc.length > 1) setFiles(...files, acc)
      else setFiles([...files, acc[0]])
    }})


  return (
    <div className='dnd' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default MyDropzone;
