import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { applyBookingThunk, sendMessegeThunk, getMessagesThunk, readMessagesThunk, cancelBookingThunk, closedBookingThunk } from '../../../store/userActions'
import '../private.modules.scss';
import socketIOClient from "socket.io-client";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getMessagesUA } from '../../../store/userActions';


export default function Privatebookings({ title }) {

  const dispatch = useDispatch()

  const [sendValues, setSendValues] = React.useState({ id: 0, text: ' ' })

  const [open, setOpen] = React.useState(false)

  const user = useSelector((store) => (store.user.user))

  const bookings = useSelector((store) => store.user.bookings);

  const messages = useSelector((store) => store.user.messages);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient("http://localhost:3011", {
      query: { roomId: sendValues.id },
    });

    socketRef.current.on("newChatMessage", (message) => {
      dispatch(getMessagesThunk(sendValues.id))
    });

    return () => {
      socketRef.current.disconnect();
    };

  }, [sendValues.id]);

  React.useEffect(() => {
    if (sendValues.id != undefined) {
      dispatch(getMessagesThunk(sendValues.id))
    }

  }, [open])

  const statusDisplay = () => {
    for (let i = 0; i < bookings.length; i++) {
      if (user.role == 'lessor' && bookings[i].status == 'Подтвержден') {
        bookings[i].status = 'ПодтвержденВами'
      } else if (user.role == 'lessor' && bookings[i].status == 'pre-booking') {
        bookings[i].status = 'Подтвердить'
      } else if (user.role == 'lessee' && bookings[i].status == 'pre-booking') {
        bookings[i].status = 'Ожидает подтверждения'
      } else if (bookings[i].status == 'closed') {
        bookings[i].status = 'Закрыт'
      } else if (bookings[i].status == 'canceled') {
        bookings[i].status = 'Отменен'
      } else if (user.role == 'lessee' && bookings[i].status == 'booked') {
        bookings[i].status = 'Подтвержден'
      }

    }
    return bookings
  }

  statusDisplay()

  const onApplyHandler = (id) => {
    dispatch(applyBookingThunk(id))
  };

  const onCancelHandler = (id) => {
    dispatch(cancelBookingThunk(id))
  };

  const onClosedHandler = (id) => {
    dispatch(closedBookingThunk(id))
  };

  const inputHandler = (e) => {
    console.log(sendValues);
    setSendValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    });
  }

  const handleClickOpen = (id) => {
    dispatch(readMessagesThunk(id))

    setSendValues((prev) => {
      return { ...prev, ['id']: id }
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sendHandler = () => {
    dispatch(sendMessegeThunk(sendValues))

    socketRef.current.emit("newChatMessage", {
      senderId: socketRef.current.id,
    });

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
              type="text" Подтвердить
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
                  <div>
                    <button className="bookings__item-chat-value bookings__box-btn" onClick={() => onCancelHandler(booking.booking_id)}>Отменить</button>
                    <button className="bookings__item-chat-value bookings__box-btn" onClick={() => onApplyHandler(booking.booking_id)}>Подтвердить</button>
                  </div>
                ) : (booking.status == 'ПодтвержденВами') ? (
                  <button className="bookings__item-chat-value bookings__box-btn" onClick={() => onClosedHandler(booking.booking_id)}>Закрыть</button>
                ) : (
                  <p className="bookings__item-status-value bookings__box-value">{booking.status}</p>
                )}
              </div>
              <div className="bookings__item-chat bookings__box">
                <p className="bookings__item-chat-title bookings__box-title">Чат</p>
                <button className="bookings__item-chat-value bookings__box-btn" onClick={() => handleClickOpen(booking.booking_id)}>Чат</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
