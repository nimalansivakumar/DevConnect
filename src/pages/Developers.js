import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import fire from "../components/firebase";

const db = fire.firestore();

function Developers({ whosProfile }) {
  const { user } = useAuth0();
  const [ProfileCreated, isProfileCreated] = useState();
  const [collectionList, setCollection] = useState([]);

  useEffect(() => {
    const fetchFromDB = async () => {
      await db
        .collection("users")
        .doc(user.nickname)
        .get()
        .then((doc) => {
          isProfileCreated(doc.data().isProfileCreated);
        });

      await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setCollection((prevArray) => [
              ...prevArray,
              {
                username: doc.data().username,
                email: doc.data().email,
                picture: doc.data().picture,
                name: doc.data().name,
                currentPosition: doc.data().currentPosition,
                isProfileCreated: doc.data().isProfileCreated,
              },
            ]);
          });
        });
    };

    fetchFromDB();
  }, [user.nickname]);
  return (
    <div>
      <div className="w-full h-auto flex flex-col items-center justify-center">
        <nav className="w-full h-auto text-secondary-100 flex flex-row justify-between items-center bg-secondary-300">
          <h2 className="text-3xl font-nunito  mx-10">Profiles</h2>
        </nav>

        {ProfileCreated === true ? (
          <RenderProfiles
            collectionList={collectionList}
            whosProfile={whosProfile}
          ></RenderProfiles>
        ) : (
          <div>
            <h1 className="w-full text-center font-pop text-2xl m-10">
              Create Your profile!
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

function RenderProfiles({ collectionList, whosProfile }) {
  return (
    <div
      className="w-full min-h-91 h-full grid grid-cols-3 justify-items-center items-start mr:grid-cols-1"
      id="users"
    >
      {collectionList.map((item, i) => (
        <div
          className="max-w-sm w-full h-48 bg-white border-2 border-secondary-200 flex flex-col rounded m-5 shadow-2xl hover:shadow-2xl"
          key={i}
        >
          <div className="w-full h-3/4 bg-secondary-300 flex flex-row justify-start items-center">
            <img
              alt="profileImage"
              src={item.picture}
              className="w-20 h-20 mx-5 rounded-full"
            ></img>
            <div className="text-secondary-100">
              <h3 className="font-nunito text-2xl">{item.name}</h3>
              <h4 className="font-pop text-lg">{item.currentPosition}</h4>
            </div>
          </div>

          <div className="w-full h-1/4 flex justify-end items-center">
            <button
              className="mx-5 text-md font-pop text-white bg-primary rounded h-7 w-32 transition hover:bg-primary"
              id={item.username}
            >
              <Link
                onClick={(e) => {
                  whosProfile(e.target.id);
                }}
                to="/profile"
                id={item.username}
              >
                View Profile
              </Link>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Developers;
