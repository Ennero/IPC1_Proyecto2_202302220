import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Inicio } from '../Inicio';
import { Registro } from '../Registro';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/inicio" />} />
                <Route path='/inicio' element={<Inicio/>} />
                <Route path='/registro' element={<Registro/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
