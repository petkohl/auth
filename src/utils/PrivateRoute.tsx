import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { selectCurrentUser } from "../features/auth/authSlice";

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const user = useSelector(selectCurrentUser);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
