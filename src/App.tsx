import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/backoffice/auth/Login';
import Index from './pages/landing/Index';
import Registration from './pages/backoffice/auth/Registration';
import Dashboard from './pages/backoffice/dashboard/Dashboard';
import PrivateRoute from './PrivateRoute';
import UserIndex from './pages/backoffice/user/Index';
import PostIndex from './pages/backoffice/post/Index';
import PostCreate from './pages/backoffice/post/Create';
import PostDetail from './pages/backoffice/post/Detail';
import PostEdit from './pages/backoffice/post/Edit';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Index} />

        <Route path="/backoffice/registration" Component={Registration} />
        <Route path="/backoffice" Component={Login} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/backoffice/dashboard" element={<Dashboard />} />
          <Route path="/backoffice/users" element={<UserIndex />} />
          <Route path="/backoffice/posts" element={<PostIndex />} />
          <Route path="/backoffice/posts/create" element={<PostCreate />} />
          <Route path="/backoffice/posts/:id" element={<PostDetail />} />
          <Route path="/backoffice/posts/:id/edit" element={<PostEdit />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
