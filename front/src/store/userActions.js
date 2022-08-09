import {UTypes} from "./types";

export const editUserUA = (id, name, email) => ({type: UTypes.EDIT_USER,  payload: {  id, name, email }});

export const getBookingsUA = (bookings) => ({type: UTypes.GETBOOKINGS_USER,  payload: {  bookings }});

export const editUserThunk = (id, changes) => async(dispatch) => {
    // try {
    //     const response = await fetch("http://localhost:3005/editUser", {
    //         method: "post",
    //         credentials: 'include',
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ id: id, name: changes.name, email: changes.email }),
    //     });
        
    //     if (response.status === 200) dispatch(editUserUA( id, changes.name, changes.email ))
       
        
    // } catch (err) {
    //     console.error('err', err);
    // }
}

export const getBookingsThunk = (id, changes) => async(dispatch) => {
    try {
        const response = await fetch("http://localhost:3005/getBooking", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id}),
        });
        const bookings = await response.json()
         dispatch(getBookingsUA(bookings))
       
        
    } catch (err) {
        console.error('err', err);
    }
}