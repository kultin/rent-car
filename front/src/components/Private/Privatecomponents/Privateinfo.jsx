import React from "react";
import '../private.modules.scss';



export default function Privateinfo() {

  const [condition, setCondotion] = React.useState(true)

  const [changes, setChanges] = React.useState('')

  
  const editHandler = () => {
    setCondotion(true);



    
}

const applyHandler = () => {
  setCondotion(false);

}

  const inputHandler = (e) => {
    setChanges((prev) => {
        return { ...prev, [e.target.name]: e.target.value }
    });
}

  return (condition) ? (
    <>
    <div className="info"> 
      <img className='info_photo' src="./imagesPrivate/avpic.jpeg" alt="photo" />
      <div className='info_text'>
      <input type='text' name='name' value={changes.name} onChange={inputHandler}/>
      <input type='text' name='email' value={changes.email} onChange={inputHandler}/>
      <button onClick={applyHandler}>Применить</button>
      </div>
      </div>
  </>
  ) : (
    <>
    <div className="info"> 
      <img className='info_photo' src="./imagesPrivate/avpic.jpeg" alt="photo" />
      <div className='info_text'>
      <p>Имя</p>
      <p>Email</p>
      <button onClick={editHandler}>Редактировать</button>
      </div>
      </div>
  </>
  )
  
}
