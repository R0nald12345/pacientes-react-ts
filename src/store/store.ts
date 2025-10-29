// ...existing code...
import {create} from 'zustand'

import { DraftPatient, Patient } from '../types'

import { devtools,persist } from 'zustand/middleware'

import {v4 as uuidv4} from 'uuid'

//interface o type es similar
type PatientState = {
    patients: Patient[]
    //Para editar el Form 
    activeId: Patient['id']
    addPatient: (data:DraftPatient) => void
    deletePatient: (id:Patient['id']) =>void
    //Para editar
    getPatientById: (id:Patient['id'])=>void
    updatePatient: (data:DraftPatient ) =>void
}

const createPatient = (patient:DraftPatient):Patient=>{
    return { ...patient, id:uuidv4() }
}

export const usePatientStore = create<PatientState>()(
    devtools(
        persist((set) => ({   // <-- removed 'get' aquí
            patients: [],
            activeId: '',

            addPatient:(data)=>{
                const newPatient = createPatient(data)
                set((state) => ({
                    patients: [...state.patients, newPatient]
                }))
            },

            deletePatient: (id)=>{
                set((state) => ({ 
                    patients: state.patients.filter(patient => patient.id !== id)
                }))
            },

            getPatientById:(id)=>{
                set(() => ({
                    activeId: id
                }))
            },

            updatePatient: (data) =>{
                set((state) => ({
                    patients: state.patients.map(patient => 
                        patient.id === state.activeId ? { id: state.activeId, ...data } : patient
                    ),
                    activeId: ''
                }))
            }
        }), {
            name:'patient-storage',
            // storage:createJSONStorage(() => localStorage)
        })
    )
)
// ...existing code...