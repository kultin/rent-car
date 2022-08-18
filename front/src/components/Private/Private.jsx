import React from "react";
import './private.modules.scss';
import { useState } from "react";
import Privateinfo from './Privatecomponents/Privateinfo'
import Privatebookings from './Privatecomponents/Privatebookings'
import Privatefavorites from './Privatecomponents/Privatefavorites'
import { getBookingsThunk, getUserThunk } from '../../store/userActions'
import { useDispatch, useSelector } from 'react-redux';
import AddCArForm from "./Privatecomponents/AddCarForm";
import PrivateCars from "./Privatecomponents/PrivateCars";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export default function Private() {

  const dispatch = useDispatch()

  const { user } = useSelector((store) => (store.user))

  React.useEffect(() => {
    dispatch(getBookingsThunk())
  }, [])

  const [tabIndex, setTabIndex] = useState(2);

  return ((user.role == 'lessor') ? (
    <>
      <div className="container">
        <div className="user__box">
          <Privateinfo />
          <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>Мои заказы</Tab>
              <Tab>Добавить авто</Tab>
              <Tab>Мои машины</Tab>
              <Tab>Избранное</Tab>
            </TabList>
            <TabPanel>
              <Privatebookings title="Мои заказы" />
            </TabPanel>
            <TabPanel>
              <AddCArForm setTabIndex={setTabIndex}/>
            </TabPanel>
            <TabPanel>
              <PrivateCars setTabIndex={setTabIndex}/>
            </TabPanel>
            <TabPanel>
              <Privatefavorites />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container">
        <div className="user__box">
          <Privateinfo />
          <Tabs>
            <TabList>
              <Tab>Мои заказы</Tab>
              <Tab>Избранное</Tab>
            </TabList>
            <TabPanel>
              <Privatebookings title="Мои бронирования" />
            </TabPanel>
            <TabPanel>
              <Privatefavorites />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  )
  )
}
