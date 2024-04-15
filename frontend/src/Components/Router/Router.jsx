import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Admin from '../Admin';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                {/* las rutas y lo que llamarán */}
                <Route path='/' element={<Navigate to="/login" />} />
                <Route path='/login' element={<Login/>} />
                <Route path='/admin' element={<Admin/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;