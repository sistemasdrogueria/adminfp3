import {useState} from 'react'

export default function TableSelecteShedule() {
      const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const [schedule, setSchedule] = useState(daysOfWeek.map(day => ({
        day,
        isActive: false,
        startTime: '',
        endTime: ''
    })));

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

    const handleSubmit = () => {
        console.log('Schedule:', schedule);
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
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mb-3 rounded focus:outline-none focus:shadow-outline">
                Guardar
            </button>
            </div>
        </div>
  )
}
