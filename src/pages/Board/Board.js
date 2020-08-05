import React, { useEffect, useContext, useState } from 'react';
import Board  from 'react-trello'
import Header from '../components/Header'
import CardModal from './CardModal'
import { AppContext } from '../../context/AppContext';
import './Board.css'
import { useHistory } from 'react-router-dom';


const UserBoard = () => {
  
  

  const { user } = useContext(AppContext)
  const {push} = useHistory()
  const [ tasks, setTasks ] = useState([])
  const [ currentTask, setCurrentTask ] = useState(null)
  const [ openModal, setOpenModal ] = useState(false)
  
  if(!user){
    push('/')
  }
  
  useEffect( () => {
    if(!user) return
    fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/user/${user.id}`)
    .then( response => response.json() )
    .then( data => { 
      setTasks(data)
      
    })
  }, [user])

  const makeData = () => {
    const openTask = tasks.filter( item => item.status === 'open' )
    const doingTask = tasks.filter( item => item.status === 'doing' )
    const doneTask = tasks.filter( item => item.status === 'done' )
    
    const data = {
      lanes:[ 
        {
          id:'open',
          title: 'Open tasks',
          cards: openTask
        },
        {
          id:'doing',
          title: 'Doing tasks',
          cards: doingTask
        },
        {
          id:'done',
          title: 'Done tasks',
          cards: doneTask
        }
      ]
    }

    return data
  }

  const openCreateModal = () => {
    setCurrentTask(null)
    setOpenModal(true)
  }

  const openEditModal = (id, meta, laneId) => {
    const task = tasks.filter(item => item.id ===  id)
    setCurrentTask(task[0])
    setOpenModal(true)

  }

  const closeModal = () =>{
    setOpenModal(false)
  }

  const onSubmitModal = async (values) => {

    if(!currentTask){
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/`, {
        method:"POST",
        body: JSON.stringify({...values, userId: user.id}),
        headers:{
          "Content-type": "application/json"
        }
      })
      const data = await response.json()
      setTasks([...tasks, data])
    }else{
        const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/${currentTask.id}`, {
        method:"PUT",
        body: JSON.stringify(values),
        headers:{
          "Content-type": "application/json"
        }
      })
      const data = await response.json()
      setTasks(tasks.map ( it => {
        if(it.id === data.id) return data
        else return it
      }))
      
      
    }

    
    setCurrentTask(null)
    setOpenModal(false)
  }

  const dragEndHandle = async (cardId, source, target, details ) => {
    const card = {
      ...details,
      status: target
    }

    const response = await fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/${cardId}`, {
      method:"PUT",
      body: JSON.stringify(card),
      headers:{
        "Content-type": "application/json"
      }
    })
  }
   
  const onCardDelete = async(cardId) => {
    await fetch(`${process.env.REACT_APP_ENDPOINT}/tasks/${cardId}`, {
      method:"DELETE",
      headers:{
        "Content-type": "application/json"
      }
    })
  }

  return (
      <>
        <Header />
        <div>
          <button onClick={ openCreateModal } className="board__add_button">New task</button>
        </div>
        <Board data={makeData()} onCardClick={ openEditModal } draggable handleDragEnd={dragEndHandle} laneDraggable={false} onCardDelete={onCardDelete}/>
        <CardModal onSubmit={onSubmitModal} isOpen={openModal} task={currentTask} closeModal={closeModal}/>
      </>
    )
}

export default UserBoard