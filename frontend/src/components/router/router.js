import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Inicio } from '../Inicio';
import { Registro } from '../Registro';
import { Home } from '../Home';
import Admin from '../Admin';
function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/inicio" />} />
                <Route path='/inicio' element={<Inicio/>} />
                <Route path='/registro' element={<Registro/>} />
                <Route path='/home' element={<Home/>} />
                <Route path='/admin' element={<Admin/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
