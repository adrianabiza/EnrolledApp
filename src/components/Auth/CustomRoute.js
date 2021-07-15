import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

export default function CustomRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  console.log(currentUser.email);

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser.email && currentUser.email.includes("@prof") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        );
      }}
    ></Route>
  );
}
