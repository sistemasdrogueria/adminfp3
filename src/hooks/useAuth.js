import { useEffect } from "react"
import useSWR, { mutate } from "swr"
import { useNavigate } from "react-router-dom"
import clienteAxios from "../config/axios"
import { toast } from "react-toastify"
export const useAuth = ({middleware, url })=> {

const token = localStorage.getItem('AUTH_TOKEN')
const navigate = useNavigate();
const { data: user, error, mutate } = useSWR(
    token ? '/api/user' : null,
    () =>
      clienteAxios('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.data)
        .catch((error) => {
          throw Error(error?.response?.data?.errors);
        })
  );

  const isLoading = !user && !error;

const login = async (datos, setErrores) => {
 try {
          
          const {data} = await  clienteAxios.post('/api/loginAdmin', datos) 
          localStorage.setItem('AUTH_TOKEN', data.token)
            toast.success('Ingreso Exitoso');
      setErrores([])
      await mutate()
       

        } catch (error) {
           
        if (error.response && error.response.data && error.response.data.errors) {
      // Si hay errores de validación en la respuesta del servidor, mostrarlos
      const errores = Object.values(error.response.data.errors);
      setErrores(errores);
    } else {
      // Si ocurre otro tipo de error, mostrar un mensaje genérico
      toast.error('Se produjo un error al procesar la solicitud.');
    }
        }

}

const logout = async () => {
        
try {
    await clienteAxios.post('/api/auth/logout', null, {
          headers:{
        Authorization:`Bearer ${token}`
    }
    })
    
    localStorage.removeItem('AUTH_TOKEN')
     await mutate(undefined)
} catch (error) {
    throw Error(error?.response?.data?.errors)
    
}

}

    useEffect(() => {

           if (isLoading) {
      return; // Evita redirecciones prematuras mientras se está cargando
    }

         if (!user) {
        navigate('/auth/login');
    } else {
        if (middleware === 'guest' && user) {
            navigate('/admin');
        }
        if (middleware === 'adminfarmacia' && user && parseInt(user.type_id) === 3) {
           if (!window.location.pathname.startsWith('/admin/farmacia')) {
                navigate('/admin/farmacia');
            }
        }
        if (middleware === 'auth' && error) {
           
            navigate('/auth/login');
        }
    }
    }, [middleware, user, error, navigate,isLoading]);

return {
    login,
    logout,
    user,error
}
console.log(user)
}