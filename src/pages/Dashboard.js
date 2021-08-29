import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fire from "../components/firebase";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";

const db = fire.firestore();

function Dashboard({ whosProfile }) {
  const { user } = useAuth0();
  const [ProfileCreated, isProfileCreated] = useState();
  var [Image, setProfileImage] = useState();

  useEffect(() => {
    const fetchFromDB = async () => {
      await db
        .collection("users")
        .doc(user.nickname)
        .get()
        .then((doc) => {
          setProfileImage(doc.data().picture);
          isProfileCreated(doc.data().isProfileCreated);
        });
    };
    fetchFromDB();
  }, [user.nickname]);

  return (
    <div className="h-91 w-full flex justify-center items-center bg-secondary-300 text-secondary-100">
      <div className="max-w-6xl w-full h-3/4 bg-white m-10 rounded-lg flex flex-row justify-center items-center shadow-xl mr:h-auto mr:flex-col">
        <div className="w-1/4 h-auto flex justify-center items-center m-5 mr:w-full">
          <img
            src={Image}
            alt="profile_image"
            className="w-40 h-40 rounded-full border-4 border-secondary-200 "
          ></img>
        </div>
        <div className="w-2/4 h-auto flex flex-col m-10 mr:w-3/4 mr:items-center">
          <h1 className="font-nunito text-3xl mr:text-2xl">{user.nickname}</h1>
          <h3 className="font-pop text-lg">{user.email}</h3>
          <div className="w-3/4 flex justify-between items-center mr:flex-col">
            <button className="w-32 h-10 font-pop bg-primary text-white rounded my-2">
              <Link
                onClick={() => {
                  if (ProfileCreated) {
                    whosProfile(user.nickname);
                  } else {
                    toast("Create Your Profile!", {
                      icon: "🧑‍💻",
                    });
                  }
                }}
                to={ProfileCreated ? "/profile" : "/dashboard"}
              >
                My Profile
              </Link>{" "}
            </button>
            <button className="w-32 h-10 font-pop bg-primary text-white rounded my-2">
              <Link to="/create-profile">
                {ProfileCreated ? "Edit Profile" : "Create Profile"}
              </Link>
            </button>
            <button
              className="w-36 h-10 font-pop bg-green text-white rounded my-2"
              onClick={() => {
                if (ProfileCreated === false) {
                  toast("Create Your Profile!", {
                    icon: "🧑‍💻",
                  });
                }
              }}
            >
              <Link to={ProfileCreated ? "/developers" : "/dashboard"}>
                DevConnect!
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
