import { createRef, useState } from "react";
import Alerta from "../components/Alerta";
import { useAuth } from "../hooks/useAuth";

export default function Login() {

    
    const emailRef = createRef();
    const passwordRef = createRef();

    const [errores,setErrores]= useState([]);
    const { login } = useAuth({
    middleware:'guest',
     url:'/admin',
    });

  const handleSubmit = async e => {

        e.preventDefault();
        
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

       login(datos, setErrores)
    }
  return (
    <>


      <div className="bg-white shadow-md border rounded-lg mt-10 px-10 py-10 flex-col  justify-center">
        <form onSubmit={handleSubmit} noValidate >
             {errores ? errores.map((error,i )=> <Alerta key={i}>{error}</Alerta>) 
                  : null }
              <div className="mb-4">
                <label 
                className="text-slate-800 "
                htmlFor="email"
                >
                Email: </label>
                <input 
                    type="email" 
                    id="email"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="email"
                    placeholder="Tu email"
                    ref={emailRef}
                />
            </div>
                    <div className="mb-4">
                <label 
                className="text-slate-800 "
                htmlFor="password"
                >
                Password: </label>
                <input 
                    type="password" 
                    id="password"
                    className="mt-2 w-full  p-3 bg-gray-50"
                    name="password"
                    placeholder="Tu password"
                     ref={passwordRef}
                />
            </div>
             <div className="text-center">
            <input
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-800
             text-white w-72  mt-5 p-3 uppercase font-bold cursor-pointer"
            value="Iniciar sessión"
            />

</div>
        </form>
<nav className="mt-5">

</nav>
      </div>
    </>
  )
}
