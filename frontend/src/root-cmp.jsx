import './assets/styles/styles.scss'

import { HashRouter as Router, Route, Routes } from "react-router-dom";
// import { AboutUs } from "./pages/about-us";
// import { HomePage } from './pages/home-page';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ResponsiveAppBar } from './cmps/responsive-app-bar';
import { AppFooter } from './cmps/app-footer';
import { ToyApp } from './pages/toy-app';
import { ToyEdit } from './pages/toy-edit';
import { ToyDetails } from './pages/toy-details';
import { Dashboard } from './pages/dashboard';
import { AboutUs } from './pages/about-us';
import { HomePage } from './pages/home-page';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';



export default function App() {

    return (
        <Provider store={store}>
            <Router>
                    <ResponsiveAppBar/>
                    <main>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<ToyApp />} path="/toy" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" />
                            <Route element={<ToyEdit />} path="/toy/edit" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId" /> 
                            <Route element={<SignIn />} path="/signin" />
                            <Route element={<SignUp />} path="/signup" />


                        </Routes>
                    </main>
                    <AppFooter />
            </Router>
        </Provider>
    )
}