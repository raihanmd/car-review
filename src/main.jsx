import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./styles/index.css";

import RootLayout from "./layouts/root-layout";
import BlankLayout from "./layouts/blank-layout";
import MainLayout from "./layouts/main-layout";
import Home from "./pages/Home/index.jsx";
import Signin from "./pages/Signin/index.jsx";
import Signup from "./pages/Signup";
import CreateReview from "./pages/CreateReview";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PrivateLayout from "./layouts/private-layout";
import AuthLayout from "./layouts/auth-layout";
import ReviewDetail from "./pages/ReviewDetail";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import EditReview from "./pages/EditReview";
import CreateCar from "./pages/CreateCar";
import Car from "./pages/Car";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="auth/" element={<BlankLayout />}>
            <Route
              path="signin"
              element={<AuthLayout children={<Signin />} />}
            />
            <Route
              path="signup"
              element={<AuthLayout children={<Signup />} />}
            />
            <Route
              path="forgot-password"
              element={<AuthLayout children={<ForgotPassword />} />}
            />
            <Route
              path="reset-password"
              element={<AuthLayout children={<ResetPassword />} />}
            />
          </Route>

          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/review/create"
              element={<PrivateLayout children={<CreateReview />} />}
            />
            <Route path="/review/:id" element={<ReviewDetail />} />
            <Route
              path="/review/:id/edit"
              element={<PrivateLayout children={<EditReview />} />}
            />
            <Route
              path="/car/create"
              element={
                <PrivateLayout role={"admin"} children={<CreateCar />} />
              }
            />
            <Route path="/car" element={<Car />} />
            <Route
              path="/profile"
              element={<PrivateLayout children={<Profile />} />}
            />
            <Route path="/user/:id" element={<ProfileDetail />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
