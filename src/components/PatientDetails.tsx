import { usePatientStore } from "../store/store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

import {toast} from 'react-toastify'

//interface == type
interface patientDetailsProps{
  patient:Patient
}

const PatientDatails = ({patient}:patientDetailsProps) => {

  const {id} = patient;
  const deletePatient = usePatientStore( (state)=> state.deletePatient )
  const getPatientById = usePatientStore( (state)=> state.getPatientById )
  
  const handleClick = () =>{
    deletePatient(id)
    toast.error('Paciente eliminado')
  }

  return (

    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">

        <PatientDetailItem label="ID" data = {patient.id}/>

        <PatientDetailItem label="Nombre" data = {patient.name}/>

        <PatientDetailItem label="Propietario" data = {patient.caretaker}/>

        <PatientDetailItem label="Email" data = {patient.email}/>

        <PatientDetailItem label="Fecha Alta" data = {patient.date.toString()} />

        <PatientDetailItem label="Síntomas" data = {patient.symptoms}/>


        <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
          
          <button 
            type="button" 
            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
            onClick={()=>getPatientById(id)}
          >
            Editar
          </button>

          <button 
            type="button" 
            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
            onClick={()=>handleClick()}
          >
            Eliminar
          
          </button>
        </div>

    </div>
    
  )
}

export default PatientDatails