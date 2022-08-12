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
import '../private.modules.scss';


function createData(start, finish, location, auto, coast, status, contact) {

  return { start, finish, location, auto, coast, status, contact };
}

export default function Privatebookings() {

  const dispatch = useDispatch()

  const [rows, setRows] = React.useState([])

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const user = useSelector((store) => (store.user.user))

  const bookings = useSelector((store) => store.user.bookings);

  React.useEffect(() => {
    const abc = tableRows()
    setRows(abc)
  }, [bookings.length])

  const tableRows = () => {
    const rows2 = []
    for (let i = 0; i < bookings.length; i++) {
      rows2.push(createData(bookings[i].date_start, bookings[i].date_end, bookings[i].pick_up, `${bookings[i]['Car.brand']} ${bookings[i]['Car.model']}`, `${bookings[i].price} р`, bookings[i].status, 'Связь с арендодателем'))
    }
    return rows2
  }


  const columns = [
    { id: 'start', label: 'Начало аренды', minWidth: 150 },
    { id: 'finish', label: 'Завершение аренды', minWidth: 150 },
    {
      id: 'location',
      label: 'Локация',
      minWidth: 150,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'auto',
      label: 'Автомобиль',
      minWidth: 150,
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'coast',
      label: 'Стоимость аренды',
      minWidth: 150,
      format: (value) => value.toFixed(2),
    },
    {
      id: 'status',
      label: 'Статус',
      minWidth: 150,
      format: (value) => value.toFixed(2),
    },
    {
      id: 'contact',
      label: '',
      minWidth: 150,
      format: (value) => value.toFixed(2),
    },
  ];





  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
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
      </Paper>
    </>
  )
}
