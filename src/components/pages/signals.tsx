import React from "react";
import SignalsPage from "../signals/SignalsPage";
import DashboardLayout from "../dashboard/layout/DashboardLayout";

export default function Signals() {
  return (
    <DashboardLayout activeItem="Signals">
      <SignalsPage />
    </DashboardLayout>
  );
}
