import './App.css';
import TasksContainer from './containers/TasksContainer';
import NotFound from './components/NotFound';
import Login from './components/Login'
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "not-found", element: <NotFound /> },
    { path: "/tasks", element: <TasksContainer /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;