import React from "react";
import { Redirect, Route } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

function PrivateRoute(props) {
  const { isAuthenticated, path, component } = props;
  return (
    <>
      <Toaster></Toaster>
      {isAuthenticated === true ? (
        <Route path={path} exact component={component}></Route>
      ) : (
        <Redirect to="/" exact>
          {toast.error("Sign In First!")}
        </Redirect>
      )}
    </>
  );
}

export default PrivateRoute;
