import React from 'react'

const ImgLoader = () => {
  return (
    <>
      <form action="editUser/upload-avatar" enctype="multipart/form-data" method="post">
          <div className="form-group">
            <input type="file" className="form-control-file" name="avatar" />
            <input type="text" className="form-control" placeholder="Number of speakers" name="nspeakers" />
            <input type="submit" value="Get me the stats!" className="btn btn-default" />            
          </div>
      </form>
    </>
  )
}

export default ImgLoader
