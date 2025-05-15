import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import routesConfig from './routes/routes-config';
import Auth from '@/pages/auth/auth';
import ProtectedRoute from './context/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />

        {/* {routesConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path || ""}
            element={
              route.requireRoles ? (
                <ProtectedRoute requireRoles={route.requireRoles}>
                  <route.element />
                </ProtectedRoute>
              ) : (
                <route.element />
              )
            }
          />
        ))} */}
      </Routes>
    </Router>
  );
};
export default App;
