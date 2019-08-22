import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import ThreadsIndex from "../Pages/Threads/ThreadsIndex";
import ThreadShow from "../Pages/Threads/ThreadShow"

import Header from "../Pages/Layouts/Header";
import Footer from "../Pages/Layouts/Footer";

import AuthLayoutRoutes from './AuthLayoutRoutes';
import ThreadLayoutRoutes from './ThreadLayoutRoutes';
import SignUp from "../Pages/Auth/Signup";
import Login from "../Pages/Auth/Login";
import Flash from "../Components/Utils/Flash";
import RequireAuth from "../Components/AuthMiddleware/RequireAuth";
import CreateThread from "../Pages/Threads/CreateThread";

const Routes = () => (
    <Router>
        <Header />

        <div className="container mt-4">

            <ThreadLayoutRoutes path="/" exact component={ ThreadsIndex } name="threads.index" />
            <ThreadLayoutRoutes path="/:category/:thread" component={ ThreadShow } name="threads.show" exact/>
            <ThreadLayoutRoutes path="/categories/:category/posts" component={ ThreadsIndex } />

            <AuthLayoutRoutes path="/signup" component={ SignUp } middleware={ RequireAuth } exact />
            <AuthLayoutRoutes path="/login" component={ Login } exact middleware={ RequireAuth }/>
        </div>

        <CreateThread />

        <Footer/>

        <Flash/>

    </Router>
);

export default Routes;
