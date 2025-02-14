import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Guest from './pages/Guest/Guest'
import Main from './pages/Main/Main'
import Welcome from './pages/Main/Welcome/Welcome'
import Form from './pages/Main/Form/Form'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/guest" element={<Guest />} />

        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="form" element={<Form />} />
        </Route>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
