import { UTypes } from "./types";

export const setErrorUA = (msg) => ({ type: UTypes.ERROR, payload: { msg: msg } });

export const setLoadingUA = (isLoading) => ({ type: UTypes.SET_LOADING, payload: { isLoading: isLoading } });

export const editUserUA = (user) => ({ type: UTypes.EDIT_USER, payload: { user: user } });

export const loginUserUA = (user) => ({ type: UTypes.EDIT_USER, payload: { user: user } });

export const registrationUserUA = (user) => ({ type: UTypes.REGISTRATION_USER, payload: { user: user } });

export const getBookingsUA = (bookings) => ({ type: UTypes.GETBOOKINGS_USER, payload: { bookings } });

export const getUserUA = (user) => ({ type: UTypes.GETUSER_USER, payload: { user } });

export const logoutUA = () => ({ type: UTypes.LOGOUT_USER });

export const editAvatar = (url) => ({ type: UTypes.EDIT_AVATAR, payload: { url } })

export const getMessagesUA = (messages) => ({ type: UTypes.GETMESSAGES_USER, payload: { messages } });



export const logoutThunk = () => async (dispatch) => {
    dispatch(setLoadingUA(true));
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/auth/logout", {
            method: "get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status == 200) { dispatch(logoutUA()) }

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    } finally {
        dispatch(setLoadingUA(false));
    }
}


export const getUserThunk = () => async (dispatch) => {
    dispatch(setLoadingUA(true));
    try {
        const response = await fetch("http://localhost:3005/auth/getuser", {
            method: "get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status == 201) { return }
        const user = await response.json()
        dispatch(getUserUA(user))

    } catch (err) {
        console.error('err', err);
    } finally {
        dispatch(setLoadingUA(false));
    }
}


export const registrationThunk = (values) => async (dispatch) => {
    dispatch(setLoadingUA(true));
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/auth/registration", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: values.role,
                    tel: values.tel
                }),
        });

        if (response.status === 201) { return dispatch(setErrorUA('Такой пользователь уже существует!')) }

        const user = await response.json()
        dispatch(registrationUserUA(user))

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    } finally {
        dispatch(setLoadingUA(false));
    }
}

export const logInThunk = (values) => async (dispatch) => {
    dispatch(setLoadingUA(true));
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/auth/login", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email, password: values.password }),
        });

        if (response.status == 201) { return dispatch(setErrorUA('Неверное имя пользователя или пароль!')) }

        const user = await response.json()
        dispatch(loginUserUA(user))

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    } finally {
        dispatch(setLoadingUA(false));
    }
}
export const editUserThunk = (id, changes) => async (dispatch) => {
    dispatch(setLoadingUA(true));
    dispatch(setErrorUA(false));
    console.log('EDITUSER', id,changes);
    try {
        const response = await fetch("http://localhost:3005/editUser", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id, name: changes.name, tel: changes.tel }),
        });

        const user = await response.json()
        dispatch(editUserUA(user))

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    } finally {
        dispatch(setLoadingUA(false));
    }
}

export const getBookingsThunk = (id, changes) => async (dispatch) => {
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/bookings", {
            method: "get",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status == 201) { return dispatch(setErrorUA('Не удалось получить список заказов!')); }

        const bookings = await response.json()
        dispatch(getBookingsUA(bookings))

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    }
}


export const applyBookingThunk = (id) => async (dispatch) => {
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/bookings/applyBooking", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        if (response.status == 201) { return dispatch(setErrorUA('Не удалось изменить статус заказа!')); }

        if (response.status == 200) { return dispatch(getBookingsThunk()) }

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    }
}

export const cancelBookingThunk = (id) => async (dispatch) => {
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/bookings/cancelBooking", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        if (response.status == 201) { return dispatch(setErrorUA('Не удалось изменить статус заказа!')); }

        if (response.status == 200) { return dispatch(getBookingsThunk()) }

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    }
}

export const closedBookingThunk = (id) => async (dispatch) => {
    dispatch(setErrorUA(false));
    try {
        const response = await fetch("http://localhost:3005/bookings/closedBooking", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        if (response.status == 201) { return dispatch(setErrorUA('Не удалось изменить статус заказа!')); }

        if (response.status == 200) { return dispatch(getBookingsThunk()) }

    } catch (err) {
        console.error('err', err);
        dispatch(setErrorUA(err.message));
    }
}

export const getMessagesThunk = (id) => async (dispatch) => {

    try {
        const response = await fetch("http://localhost:3005/messages/getmessages", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });

        const messages = await response.json()
        dispatch(getMessagesUA(messages))


    } catch (err) {
        console.error('err', err);
    }
}


export const sendMessegeThunk = (values) => async (dispatch) => {
    
    try {
        const response = await fetch("http://localhost:3005/messages/sendmessage", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ values }),
        });

    } catch (err) {
        console.error('err', err);
    }
}


export const readMessagesThunk = (id) => async (dispatch) => {
    try {

        const response = await fetch("http://localhost:3005/messages/readmessages", {
            method: "post",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        });

    } catch (err) {
        console.error('err', err);
    }
}
