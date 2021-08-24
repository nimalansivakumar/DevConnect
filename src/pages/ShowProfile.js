import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { SocialIcon } from "react-social-icons";
import { Link } from "react-router-dom";
import fire from "../components/firebase";

const db = fire.firestore();

function Profile({ viewProfile }) {
  const [fetchedProfile, setFetchedProfile] = useState();
  const [updateDOM, canUpdateDOM] = useState(false);
  const [ProfileImage, setProfileImage] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (viewProfile) {
          await db
            .collection("users")
            .doc(viewProfile)
            .get()
            .then((doc) => {
              setProfileImage(doc.data().picture);
            });

          await db
            .collection(viewProfile)
            .doc("profile")
            .get()
            .then((result) => {
              setFetchedProfile(result.data());
              console.log(result.data());
              canUpdateDOM(true);
            });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDetails();
  }, [viewProfile]);

  return (
    <div className="w-full h-auto bg-secondary-300 flex items-center justify-center">
      {updateDOM === true ? (
        <div className="max-w-7xl w-full h-auto text-secondary-100 flex flex-col items-center bg-white mx-5 my-10 rounded-2xl shadow-md">
          <div className="w-full h-14 flex justify-between">
            <Link to="/dashboard">
              <ArrowLeftIcon className="w-8 text-secondary-100 m-2" />
            </Link>
          </div>

          <img
            alt="ProfileImage"
            src={ProfileImage}
            className="max-w-200 w-full rounded-full m-10"
          ></img>

          <h1 className="font-nunito text-4xl">{fetchedProfile.name}</h1>
          <h3 className="font-pop text-xl">{fetchedProfile.currentPosition}</h3>

          <div className="max-w-xs w-full h-10 font-pop text-secondary-200 flex justify-evenly items-center">
            {fetchedProfile.tags.map((tagName, key) => (
              <p className="bg-secondary-300 h-auto p-1 rounded-2xl" key={key}>
                #{tagName}
              </p>
            ))}
          </div>

          <div className="max-w-md w-full min-h-200 h-full rounded-lg bg-secondary-300 m-10 text-secondary-100 font-pop flex flex-col justify-evenly text-center items-center">
            <p className="text-secondary-200">
              Last Updated: {fetchedProfile.lastUpdated}
            </p>
            <p className="px-10 text-2xl">{fetchedProfile.status}</p>
          </div>

          <h1 className="font-nunito text-secondary-100 text-3xl">
            Tech Skills
          </h1>
          <div className="font-pop max-w-lg w-full h-auto my-10 flex flex-wrap justify-center ">
            {fetchedProfile.techSkills.map((skill, key) => (
              <p className="h-full p-1 m-1 rounded bg-secondary-300" key={key}>
                {skill}
              </p>
            ))}
          </div>

          <h1 className="font-nunito text-secondary-100 text-3xl">Projects</h1>
          <div className="max-w-2xl w-full h-auto my-10 grid grid-cols-2 justify-items-center mr:grid-cols-1">
            {fetchedProfile.projects.map((project, key) => (
              <a
                key={key}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="w-64 h-24 border-2 border-secondary-200 text-secondary-100 my-3 flex flex-col bg-white rounded transform cursor-pointer hover:bg-secondary-300 hover:scale-105 transition-all"
              >
                <h2 className="font-nunito text-2xl p-2">{project.name}</h2>
                <h3 className="font-pop text-sm px-2">{project.desc}</h3>
              </a>
            ))}
          </div>

          <h1 className="font-nunito text-secondary-100 text-3xl">Blogs</h1>
          <div className="max-w-2xl w-full h-auto my-10 grid grid-cols-2 justify-items-center mr:grid-cols-1">
            {fetchedProfile.blogs.map((blog, key) => (
              <a
                key={key}
                href={blog.link}
                target="_blank"
                rel="noreferrer"
                className="w-64 min-h-30 h-full border-2 border-secondary-200 text-secondary-100 my-3 text-center bg-white rounded transform cursor-pointer hover:bg-secondary-300 hover:scale-105 transition-all"
              >
                <h2 className="font-pop text-xl p-2">{blog.name}</h2>
              </a>
            ))}
          </div>

          <h1 className="font-nunito text-primary text-3xl py-1">
            DevConnect.
          </h1>
          <h2 className="font-nunito text-secondary-100 text-xl">
            Connect with me!
          </h2>
          <div className="max-w-sm w-full h-auto my-10 grid grid-cols-4 justify-items-center mr:grid-cols-3">
            {fetchedProfile.socialMedia.map((item, key) => (
              <SocialIcon
                key={key}
                className="m-5"
                network={item.name}
                url={item.link}
                target="_blank"
                bgColor={item.name === "instagram" ? "#833AB4" : null}
              ></SocialIcon>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
