import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginRegistration from './components/LoginRegistration'
import Profile from './components/Profile'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginRegistration />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
