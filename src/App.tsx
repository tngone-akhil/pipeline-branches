import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Verification from "./pages/Verification";
import NewPassword from "./pages/NewPassword";


import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import './index.css';
import Tasks from "./pages/Tasks";
import TaskManagement from "./pages/TaskManagement";
import SettingsPage from "./pages/Settings";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AddTask from "./pages/Tast-Management/AddTask";
import EditTask from "./pages/Tast-Management/EditTask";
function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      <Route element={<Login />} path="/login" />
      <Route element={<ForgotPassword />} path="/forgot-password" />
      <Route element={<Verification />} path="/verification" />
      <Route element={<NewPassword />} path="/change-password" />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/task-management" element={<TaskManagement/>}/>
        <Route path="/tasks/:status" element={<Tasks/>} />
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/task-management/add-task" element={<AddTask/>}/>
        <Route path="/task-management/edit-task/:id" element={<EditTask/>}/>
      </Route>
    </>
  ))

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
}

export default App;
