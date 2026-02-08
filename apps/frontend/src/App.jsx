import './assets/css/App.css'
import Header from './pages/layout/Header.jsx'
import Footer from './pages/layout/Footer.jsx'
import AppRoutes from './routers/AppRoutes.jsx'

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Header />
       
       <main className="grow container mx-auto px-4 py-8  pt-16 flex flex-col items-center justify-center min-h-[calc(100vh-160px)]">
          <AppRoutes />
        </main>

        <Footer />
    </div>
  )
}

export default App
