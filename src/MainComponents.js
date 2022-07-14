import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import FormDetails from "./Form/FormDetails";
import Forms from "./Form/Forms";
import Login from "./Account/Login/Login";
import ForgetPassword from "./Account/ForgetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import Member from "./SuperAdmin/Member";
import { Calendar } from "antd";
import AdminCalendar from "./Calendar/Calendar";

export default function MainComponents() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/Member" element={<Member />} />
          <Route path="/Form" element={<Forms />} />
          <Route path="/FormDetails/:id" element={<FormDetails />} />
          <Route path="/Calendar" element={<AdminCalendar />} />

        </Route>
        <Route
          path="*"
          element={<Navigate to="/Form" replace />}
        />
      </Routes>
    </>
  );
}
