import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BookingPage } from './pages/BookingPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/atl" element={<BookingPage doorBookingRoute="atl" />} />
        <Route
          path="/atl-only"
          element={<BookingPage doorBookingRoute="atl-only" />}
        />
        <Route path="/" element={<Navigate to="/atl" replace />} />
        <Route path="*" element={<Navigate to="/atl" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
