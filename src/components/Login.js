import axios from 'axios';
import { useState } from 'react';
import Logo from "./Logo.js";
import Google from "./Google.js";
import Microsoft from './Microsoft.js';
import Apple from './Apple.js';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    
    const handleLogin = async (e) => {
        e.preventDefault();

        console.log(email, password);

        try {
            const response = await axios.post('http://localhost:3000/login',
            JSON.stringify({email, password}),
            {
               headers: { 'Content-Type': 'application/json' }
            }
       );

       console.log(response.data);
       setUser(response.data);

        } catch (error) {
            if (!error?.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status == 401) {
                setError('Usuário ou senha inválidos');
            }
        }
       
    };

    const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    setError('');
    };

    return (
            <div className="login-form-wrap" style={{marginTop: "4%" }}>
                {user == null ? (
            <div >
                <Logo />
              <span className='span-form0'>E-mail ou nome de usuário</span>
              <form className='login-form'>
                <input type="email"
                       name="email"
                       placeholder="" 
                       required
                       onChange={(e) => setEmail(e.target.value)}
                 />
                <span className='span-form1'>Senha</span>
        <input type="password"
                name="password"
                placeholder="" 
                required
                onChange={(e) => setPassword(e.target.value)}/>
                <span className='span-form2'><a>Redefinir senha</a></span>
        <button type="submit"
                className='btn-login'
                onClick={(e) => handleLogin(e)}>Entrar</button>
                <span className='span-form3'>ou</span>
                <div style={{}}>
                    <nav style={{display: "flex", justifyContent: "space-around", padding: "17px 0 17px 0"}}> 
                    
                    <Google />
                    <Microsoft />
                    <Apple />
                    </nav>
                     
                </div>
                <span className='span-form3'><a>Outros métodos de acesso </a></span>
              </form>
              <p>{error}</p>
              </div>
              
        ) : (
            <div>
            <h2>Olá, {user.name}</h2>
        <button type="button"
                className='btn-login'
                onClick={(e) => handleLogout(e)}>Logout</button>
         </div>

         
                )}
               
            </div>
);
}

export default Login
