import './App.css';
import TasksContainer from './containers/TasksContainer';
import NotFound from './components/NotFound';
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <TasksContainer /> },
    { path: "not-found", element: <NotFound /> },
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