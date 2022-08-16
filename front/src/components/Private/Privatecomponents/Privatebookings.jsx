import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { applyBookingThunk, sendMessegeThunk, getMessagesThunk, readMessagesThunk } from '../../../store/userActions'
import '../private.modules.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Privatebookings({ title }) {

  const dispatch = useDispatch()

  const [sendValues, setSendValues] = React.useState({ text: ' ' })

  const [open, setOpen] = React.useState(false)

  const user = useSelector((store) => (store.user.user))

  const bookings = useSelector((store) => store.user.bookings);

  const messages = useSelector((store) => store.user.messages);

  React.useEffect(() => {
    if (sendValues.id != undefined) {
      dispatch(getMessagesThunk(sendValues.id))
    }
  }, [open])

  const statusDisplay = () => {

    for (let i = 0; i < bookings.length; i++) {
      let status
      if (bookings[i].status == 'booked') {
        bookings[i].status = 'Подтвержден'
      }

      if (user.role == 'lessor' && bookings[i].status == 'pre-booking') {
        bookings[i].status = 'Подтвердить'
      }
      if (user.role == 'lessee' && bookings[i].status == 'pre-booking') {
        bookings[i].status = 'Ожидает подтверждения'
      }
    }
    console.log('Status', bookings);
    return bookings
  }

  statusDisplay()

  const onApplyHandler = (id) => {
    dispatch(applyBookingThunk(id))
  };

  const inputHandler = (e) => {
    console.log(sendValues);
    setSendValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  const handleClickOpen = (id) => {
    setSendValues((prev) => {
      return { ...prev, ['id']: id }
    });

    dispatch(readMessagesThunk(id))
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendHandler = () => {
    dispatch(sendMessegeThunk(sendValues))
    setSendValues((prev) => {
      return { ...prev, text: '' }
    });
  }

  return (
    <>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Чат</DialogTitle>
          <DialogContent>
            {messages.map((message) => (<DialogContentText key={message.id}>{`${message.sender?.name} : ${message.text}`}</DialogContentText>))}

            <TextField
              autoFocus
              margin="dense"
              id="text"
              name="text"
              label="Введите сообщение"
              type="text"
              value={sendValues.text}
              fullWidth
              variant="standard"
              onChange={inputHandler}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button onClick={() => sendHandler()}>Отправить</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="bookings">
        <h2 className="title bookings__title">{title}</h2>
        <div className="bookings__inner">
          {bookings.map((booking) => (
            (booking.status == 'Подтвердить' || booking.status == 'Ожидает подтверждения') ? (
              <div className="bookings__item-pre-booking" key={booking.booking_id}>
                <div className="bookings__item-start bookings__box">
                  <p className="bookings__item-start-title bookings__box-title">Начало аренды</p>
                  <p className="bookings__item-start-value bookings__box-value">{booking.date_start}</p>
                </div>
                <div className="bookings__item-finish bookings__box">
                  <p className="bookings__item-finish-title bookings__box-title">Завершение аренды</p>
                  <p className="bookings__item-finish-value bookings__box-value">{booking.date_end}</p>
                </div>
                <div className="bookings__item-auto bookings__box">
                  <p className="bookings__item-auto-title bookings__box-title">Автомобиль</p>
                  <p className="bookings__item-auto-value bookings__box-value">{`${booking['Car.brand']} ${booking['Car.model']}`}</p>
                </div>
                <div className="bookings__item-price bookings__box">
                  <p className="bookings__item-price-title bookings__box-title">Стоимость аренды</p>
                  <p className="bookings__item-price-value bookings__box-value">{`${booking.price} р.`}</p>
                </div>
                <div className="bookings__item-status bookings__box">
                  <p className="bookings__item-status-title bookings__box-title">Статус</p>
                  {(booking.status == 'Подтвердить') ? (
                    <p className="bookings__item-status-value bookings__box-value" onClick={() => onApplyHandler(booking.booking_id)}>{booking.status}</p>
                  ) : (
                    <p className="bookings__item-status-value bookings__box-value">{booking.status}</p>
                  )}
                </div>
                <div className="bookings__item-chat bookings__box">
                  <p className="bookings__item-chat-title bookings__box-title">Чат</p>
                  <p className="bookings__item-chat-value bookings__box-value" onClick={() => handleClickOpen(booking.booking_id)}>Кнопка</p>
                </div>
              </div>

            ) : (
              <div className="bookings__item" key={booking.booking_id}>
                <div className="bookings__item-start bookings__box">
                  <p className="bookings__item-start-title bookings__box-title">Начало аренды</p>
                  <p className="bookings__item-start-value bookings__box-value">{booking.date_start}</p>
                </div>
                <div className="bookings__item-finish bookings__box">
                  <p className="bookings__item-finish-title bookings__box-title">Завершение аренды</p>
                  <p className="bookings__item-finish-value bookings__box-value">{booking.date_end}</p>
                </div>
                <div className="bookings__item-auto bookings__box">
                  <p className="bookings__item-auto-title bookings__box-title">Автомобиль</p>
                  <p className="bookings__item-auto-value bookings__box-value">{`${booking['Car.brand']} ${booking['Car.model']}`}</p>
                </div>
                <div className="bookings__item-price bookings__box">
                  <p className="bookings__item-price-title bookings__box-title">Стоимость аренды</p>
                  <p className="bookings__item-price-value bookings__box-value">{`${booking.price} р.`}</p>
                </div>
                <div className="bookings__item-status bookings__box">
                  <p className="bookings__item-status-title bookings__box-title">Статус</p>
                  <p className="bookings__item-status-value bookings__box-value">{booking.status}</p>
                </div>
                <div className="bookings__item-chat bookings__box">
                  <p className="bookings__item-chat-title bookings__box-title">Чат</p>
                  <p className="bookings__item-chat-value bookings__box-value" onClick={() => handleClickOpen(booking.booking_id)}>Кнопка</p>
                </div>
              </div>

            )


          ))}

        </div>
      </div>
    </>
  )
}
