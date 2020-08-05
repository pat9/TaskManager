import React, { useEffect, useContext } from 'react';
import Board  from 'react-trello'
import Header from '../components/Header'
import { AppContext } from '../../context/AppContext';

const UserBoard = () => {
  const [ tasks, setTasks ] = useContext
  const { user } = useContext(AppContext)
  useEffect( () => {
    fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/user/${user.id}`)
      .then( response => response.json() )
      .then( data => setTasks(data) )
  }, [])

  return (
      <>
        <Header />
        {/* <Board data={data} draggable handleDragEnd={ (...params) => console.log(params) } /> */}
      </>
    )
}

export default UserBoard