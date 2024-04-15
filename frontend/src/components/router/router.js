import {BrowserRouter as Router, Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import inicio from "../inicio";
import registro from "../registro";

const router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/inicio" />}/>  
            <Route path='/inicio' element={<inicio />} />
            <Route path='/login' element={<registro />} />
        </Routes>
    </BrowserRouter>
  );
}
export default router
