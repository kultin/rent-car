import React from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
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


function createData(id, start, finish, location, auto, coast, status, contact) {

  return { id, start, finish, location, auto, coast, status, contact };
}

export default function Privatebookings() {

  const dispatch = useDispatch()

  const [sendValues, setSendValues] = React.useState({})

  const [open, setOpen] = React.useState(false)

  // const [rows, setRows] = React.useState([])

  // const [page, setPage] = React.useState(0);

  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const user = useSelector((store) => (store.user.user))

  const bookings = useSelector((store) => store.user.bookings);

  const messages = useSelector((store) => store.user.messages);

  // React.useEffect(() => {
  //   const abc = tableRows()
  //   setRows(abc)
  // }, [bookings.length])

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
      // rows2.push(createData(bookings[i].booking_id, bookings[i].date_start, bookings[i].date_end, bookings[i].pick_up, `${bookings[i]['Car.brand']} ${bookings[i]['Car.model']}`, `${bookings[i].price} р`, status, 'Чат'))
    }
    console.log('Status', bookings);
    return bookings
  }
  statusDisplay()
  // const columns = [
  //   { id: 'start', label: 'Начало аренды', minWidth: 150 },
  //   { id: 'finish', label: 'Завершение аренды', minWidth: 150 },
  //   {
  //     id: 'location',
  //     label: 'Локация',
  //     minWidth: 150,
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: 'auto',
  //     label: 'Автомобиль',
  //     minWidth: 150,
  //     format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: 'coast',
  //     label: 'Стоимость аренды',
  //     minWidth: 150,
  //     format: (value) => value.toFixed(2),
  //   },
  //   {
  //     id: 'status',
  //     label: 'Статус',
  //     minWidth: 150,
  //     format: (value) => value.toFixed(2),
  //   },
  //   {
  //     id: 'contact',
  //     label: '',
  //     minWidth: 150,
  //     format: (value) => value.toFixed(2),
  //   },
  // ];


  const onApplyHandler = (id) => {
    dispatch(applyBookingThunk(id))
  };


  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

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

  console.log('Bookings', bookings);

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
        <h2 className="title bookings__title">Мои заказы</h2>
        <div className="bookings__inner">
          {bookings.map((booking) => (
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
          ))}

        </div>
      </div>
      {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return ((value == 'Подтвердить') ? (
                          <TableCell key={column.id} align={column.align} onClick={() => onApplyHandler(row.id)}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        ) : (value == 'Чат') ? (
                          <TableCell key={column.id} align={column.align} onClick={() => handleClickOpen(row.id)}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        )

                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper> */}
    </>
  )
}
