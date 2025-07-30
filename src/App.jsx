import { useUsuario } from "./context/UsuarioContext";
import {
  
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import TestFetch from "./components/TestFetch";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Home from "./page/home/Home";
import Overlay from "./components/overlay/Overlay";
import Background from "./components/background/Background";
import Vtos from "./page/Vtos/Vtos";
import Listavtos from "./page/listaVtos/Listavtos";
import WpPage from "./page/watsapp/WpPage";



function App() {
 const { usuario, login,logout,isLoading } = useUsuario();
 
  const isLoggedin = usuario !== null;
  const location=useLocation();
  if (isLoading) return <div>cargando...</div>

  return (
     
      
      <div className="app-container">
     
        {!isLoggedin && location.pathname==="/Login"&&<Overlay />}
        <Navbar isLoggedin={isLoggedin} />
        <main className="main-container">

        
  {!isLoggedin && <Background/>} 



          <Routes>
            <Route
              path="/Login"
              element={ <Login/>
              
              }
            />
            <Route
              path="/Register"
              element={
                !isLoggedin ? <Register /> : <Navigate to="/" replace />
              }
            />
            {/*ruta privada si no estas logueado te dirige al login*/}
            <Route
              path="/"
              element={isLoggedin ? <Home /> : <Navigate to="/Login" replace />}
            />
            <Route path="/Vtos" element={isLoggedin ? <Vtos/> : <Navigate to="/Login" replace />}/>
            <Route path="/listavtos" element={<Listavtos/>}/>
            <Route path="/watsapp" element={<WpPage/>}>
              
            </Route>
          
            
          </Routes>
        </main>
        <Footer/>
      </div>
    

    /*<div className="app-container">
      <Navbar />
      <main className="main-container">
        {<TestFetch />}
        {<Register/>}
        {<Login/>}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>*/
  );
}

export default App;
