import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundePage from "./pages/NotFoundePage";

function App() {
  return (

    
    <>
      <Routes>
        <Route path='/' element={<HomePage />} exact />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/me' element={<ProfilePage />} />
        <Route path='*' element={<NotFoundePage />} />
      </Routes>
    </>
  );
}

export default App;
