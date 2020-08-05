import React from 'react'
import Modal from 'react-modal';
import * as Yup from 'yup'
import './CardModal.css'
import { useFormik } from 'formik';

Modal.setAppElement('#root')

const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    status: Yup.string().required("Required")
  });

const CardModal = ({ isOpen, onSubmit, task, closeModal }) => {
    

    const { handleSubmit, errors, values, handleChange, setValues } = useFormik({
        initialValues:{
            title: task ? task.title : '',
            description : task ?  task.description : '',
            status: task ?  task.status : 'open'
        },
        validationSchema,
        onSubmit,
        enableReinitialize:true,
    })

    

    const customStyles = {
        content : { 
          top: '50%',
          left: '50%',
          right: '80%',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)'
        }
      };

    return(
        <Modal
          isOpen={isOpen}
          style={customStyles}
        >
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <h3>{ task ? 'Edit' : 'Create'} a Card</h3>
                    <label>Title</label>
                    <input type="text" name="title" value={values.title} onChange={handleChange} />
                    { errors.title ? errors.title :null }
                    <label>Description</label>
                    <input type="text" name="description"  value={values.description}  onChange={handleChange}/>
                    { errors.description ? errors.description :null }
                    <label>Status</label>
                    <select name="status"  value={values.status}  onChange={handleChange}>
                        <option value="open" > Open </option>
                        <option value="doing"> Doing </option>
                        <option value="done"> Done </option>
                    </select>
                    { errors.status ? errors.status :null }
                    <button type="submit">Save</button>
                    <button onClick={closeModal}>Close</button>
                </form>
            </div>
        </Modal>
    )
}

export default CardModal