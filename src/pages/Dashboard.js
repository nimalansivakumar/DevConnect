import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fire from "../components/firebase";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";

const db = fire.firestore();
const storageRef = fire.storage();

function Dashboard({ whosProfile }) {
  const { user } = useAuth0();
  const [ProfileCreated, isProfileCreated] = useState(false);
  const [collectionList, setCollection] = useState([]);
  var [Image, setProfileImage] = useState();

  console.log(ProfileCreated);
  useEffect(() => {
    const fetchFromDB = async () => {
      var currentPicture = async (pictureId) => {
        try {
          var path = storageRef.ref(pictureId);
          var url = await path.getDownloadURL();
          setProfileImage(url);
        } catch (err) {
          setProfileImage(user.picture);
        }
      };

      currentPicture(user.nickname);

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
  }, []);

  return (
    <div className="min-h-homeheight h-full w-full flex flex-col items-center bg-white text-secondary-100">
      <div className="max-w-4xl w-full min-h-300 h-full border-2 border-secondary-200 bg-secondary-300 my-10 rounded flex justify-start items-center shadow-md mr:flex-col">
        <div className="w-1/4 flex justify-center items-center mr:w-full">
          <img
            src={Image}
            alt="profile_image"
            className="w-40 h-40 m-5 rounded-full"
          ></img>
        </div>
        <div className="w-3/4 h-full flex flex-col mr:w-3/4 mr:items-center">
          <h1 className="font-nunito text-3xl mr:text-2xl">{user.nickname}</h1>
          <h3 className="font-pop text-lg">{user.email}</h3>
          <button className="w-32 h-10 font-pop bg-primary text-white rounded my-2">
            <Link to="/create-profile">
              {ProfileCreated ? "Edit Profile" : "Create Profile"}
            </Link>
          </button>
        </div>
      </div>
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
      className="w-full h-96 grid grid-cols-3 justify-items-center items-center mr:grid-cols-1"
      id="users"
    >
      {collectionList.map((item, i) => (
        <div
          className="max-w-sm w-full h-48 border-2 border-secondary-200 flex flex-col rounded m-4"
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

          <div className="w-full h-1/4 flex justify-end">
            <button
              className="mx-5 text-lg font-pop text-primary"
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

export default Dashboard;
