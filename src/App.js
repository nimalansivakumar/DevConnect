import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./pages/Navbar";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";
import ShowProfile from "./pages/ShowProfile";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard";
import toast, { Toaster } from "react-hot-toast";
import fire from "./components/firebase";

const db = fire.firestore();

function App() {
  const { user, isAuthenticated } = useAuth0();
  const [viewProfile, whosProfile] = useState("");

  if (isAuthenticated === true) {
    try {
      db.collection("users")
        .doc(user.nickname)
        .get()
        .then((doc) => {
          if (doc.data() === undefined) {
            addNewUser();
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  const addNewUser = async () => {
    await db
      .collection("users")
      .doc(user.nickname)
      .set({
        username: user.nickname,
        email: user.email,
        picture: user.picture,
        isProfileCreated: false,
      })
      // .then(console.log("Document Added Successfully"));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Signed In Successfully!");
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Toaster></Toaster>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/dashboard"
          component={() => <Dashboard whosProfile={whosProfile}></Dashboard>}
        ></PrivateRoute>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/profile"
          component={() => (
            <ShowProfile viewProfile={viewProfile}></ShowProfile>
          )}
        ></PrivateRoute>
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          path="/create-profile"
          component={CreateProfile}
        ></PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
