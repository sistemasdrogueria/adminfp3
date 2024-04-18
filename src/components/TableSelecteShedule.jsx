import {useState,useEffect} from 'react'
import clienteAxios from '../config/axios';
import { toast } from 'react-toastify';


export default function TableSelecteShedule({schedules,cliente_id}) {
   
     const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  const [errores,setErrores]= useState([]);
const [isLoading, setIsLoading] = useState(false); 

    const [idSchedules,setIdSchedules]= useState([]);
    const [schedule, setSchedule] = useState(daysOfWeek.map(day => ({
        day,
        isActive: false,
        startTime: '',
        endTime: ''
    })));

  useEffect(() => {
        if (schedules && schedules.length > 0) {
         
            const firstSchedules = schedules[0]; // Tomando el primer horario de la primera farmacia
            const newSchedule = daysOfWeek.map(day => {
                let isActive = false;
                let startTime = '';
                let endTime = '';

                if (day === 'Miércoles') {
                    isActive = firstSchedules['mi_inicio'] !== null && firstSchedules['mi_cierre'] !== null;
                    startTime = firstSchedules['mi_inicio'] || '';
                    endTime = firstSchedules['mi_cierre'] || '';
                } else {
                    isActive = firstSchedules[day.toLowerCase()] === 1;
                           const firstLetter = day.charAt(0).toLowerCase();
                    startTime = firstSchedules[firstLetter + '_inicio'] || '';
                    endTime = firstSchedules[firstLetter + '_cierre'] || '';
                }
                
                return {
                    day,
                    isActive,
                    startTime,
                    endTime
                };
            });

            setSchedule(newSchedule);
            setIdSchedules(firstSchedules.id)
        }
    }, [schedules]);

    const handleCheckboxChange = (index) => {
        const newSchedule = [...schedule];
        newSchedule[index].isActive = !newSchedule[index].isActive;
        setSchedule(newSchedule);
    };

    const handleTimeChange = (index, field, value) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
    };

    const handleSubmit =  async (e) => {
  e.preventDefault();
   setIsLoading(true);
     const idcliente = cliente_id;
           const formattedData = {
            cliente_id:parseInt(idcliente),
            lunes: schedule[0].isActive ? 1 : 0,
            martes: schedule[1].isActive ? 1 : 0,
            miercoles: schedule[2].isActive ? 1 : 0,
            jueves: schedule[3].isActive ? 1 : 0,
            viernes: schedule[4].isActive ? 1 : 0,
            sabado: schedule[5].isActive ? 1 : 0,
            domingo: schedule[6].isActive ? 1 : 0,
            l_inicio: schedule[0].startTime,
            l_cierre: schedule[0].endTime,
            m_inicio: schedule[1].startTime,
            m_cierre: schedule[1].endTime,
            mi_inicio: schedule[2].startTime,
            mi_cierre: schedule[2].endTime,
            j_inicio: schedule[3].startTime,
            j_cierre: schedule[3].endTime,
            v_inicio: schedule[4].startTime,
            v_cierre: schedule[4].endTime,
            s_inicio: schedule[5].startTime,
            s_cierre: schedule[5].endTime,
            d_inicio: schedule[6].startTime,
            d_cierre: schedule[6].endTime,
        };


   try {
        let response;
        if (schedules && schedules.length > 0) {
            
                const token = localStorage.getItem("AUTH_TOKEN");
                
            response = await clienteAxios.put(`/api/updateSchedulesFarmaciasAdmin/${idSchedules}`, formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } else {
                const token = localStorage.getItem("AUTH_TOKEN");
            response = await clienteAxios.post('/api/adminPharmacies/perfile/saveSchedules', formattedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        toast.success('Registro Modificado');
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
            const errores = Object.values(error.response.data.errors);
            setErrores(errores);
        } else {
            toast.error('Se produjo un error al procesar la solicitud.');
        }
    } finally {
            setIsLoading(false); // Establecer isLoading a false al finalizar la solicitud
        }
        // Here you could also post this data to a server

    };

  return (
     <div className="w-full mx-auto bg-gray-100  shadow-md rounded-lg">
            <table className="min-w-full table-fixed">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="w-1/4 px-4 py-2">Días</th>
                        <th className="w-1/4 px-4 py-2">Horario de Inicio</th>
                        <th className="w-1/4 px-4 py-2">Horario de Cierre</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((day, index) => (
                        <tr key={index} className={day.isActive ? 'bg-green-100' : 'bg-white'}>
                            <td className="border px-4 py-2 ">
                                <label className='text-black'>
                                    <input className='me-1' type="checkbox" checked={day.isActive} onChange={() => handleCheckboxChange(index)} />
                                    {day.day}
                                </label>
                            </td>
                            <td className="border px-4 py-2 text-center">
                                <input
                                    type="time"
                                    value={day.startTime}
                                    onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                                    disabled={!day.isActive}
                                    className="px-2 py-1 rounded focus:outline-none"
                                />
                            </td>
                            <td className="border px-4 py-2 text-center">
                                <input
                                    type="time"
                                    value={day.endTime}
                                    onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                                    disabled={!day.isActive}
                                    className="px-2 py-1 rounded focus:outline-none"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='text-center mb-3'>
            <button onClick={handleSubmit}  disabled={isLoading}  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mb-3 rounded focus:outline-none focus:shadow-outline">
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            </div>
        </div>
  )
}
