import './assets/style/main.css'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { AboutUs } from "./pages/about-us";
// import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppHeader } from './cmps/app-header';
import { AppFooter } from './cmps/app-footer';
import { ToyApp } from './pages/toy-app';
import { ToyEdit } from './pages/toy-edit';
import { ToyDetails } from './pages/toy-details';
import { Dashboard } from './pages/dashboard';
import { AboutUs } from './pages/about-us';



export default function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout app">
                    <AppHeader />
                    <main style={{paddingTop: '64px'}}>
                        <Routes>
                            {/* <Route element={<HomePage />} path="/" /> */}
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyApp />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />

                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}