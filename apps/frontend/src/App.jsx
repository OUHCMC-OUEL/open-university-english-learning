import './assets/css/App.css'
import Header from './pages/layout/Header.jsx'
import Footer from './pages/layout/Footer.jsx'
import AppRoutes from './routers/AppRoutes.jsx'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
       
       <main className="grow mt-25 mb-12">
          <AppRoutes />
        </main>

        <Footer />
    </div>
  )
}

export default App
