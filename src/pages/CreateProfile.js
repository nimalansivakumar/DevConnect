import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";
import fire from "../components/firebase";
import Form from "./Form";

const db = fire.firestore();

function CreateProfile() {
  const { user } = useAuth0();
  const [showImage, setImage] = useState(false);
  const [ImageUploaded, isImageUploaded] = useState();
  const [ProfilePicture, SetProfilePicture] = useState();
  const [profileData, profileSetter] = useState({
    name: "",
    currentPosition: "",
    tags: [],
    lastUpdated: "",
    status: "",
    techSkills: [],
    projects: [
      {
        projectID: 1,
        name: "",
        desc: "",
        link: "",
      },
      {
        projectID: 2,
        name: "",
        desc: "",
        link: "",
      },
    ],
    blogs: [
      {
        blogID: 1,
        name: "",
        link: "",
      },
      {
        blogID: 2,
        name: "",
        link: "",
      },
    ],
    socialMedia: [
      {
        name: "twitter",
        link: "",
      },
      {
        name: "instagram",
        link: "",
      },
      {
        name: "github",
        link: "",
      },
      {
        name: "linkedin",
        link: "",
      },
      {
        name: "youtube",
        link: "",
      },
      {
        name: "facebook",
        link: "",
      },
      {
        name: "medium",
        link: "",
      },
      {
        name: "codepen",
        link: "",
      },
    ],
  });

  const techStack = [
    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",
    "Javascript",
    "React",
    "Vue",
    "Angular",
    "Typescript",
    "NodeJS",
    "ExpressJS",
    "XML",
    "Java",
    "Python",
    "C",
    "C++",
    "Git",
    "GitHub",
    "UI/UX",
    "Firebase",
    "MongoDB",
  ];

  useEffect(() => {
    toast(
      "Make sure you fill all the fields for proper display of your profile.",
      {
        duration: 3000,
      }
    );
  }, []);

  //function to manipulate Profile Picture
  function readURL(e) {
    var imageFile = e.target.files[0];
    //display image in the DOM on uploading
    const ImageURL = URL.createObjectURL(imageFile);
    isImageUploaded(ImageURL);

    //renaming the file name to the username
    const renamedImageFile = new File([imageFile], user.nickname, {
      type: imageFile.type,
    });

    //save file  to state
    const reader = new FileReader();
    if (imageFile) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          SetProfilePicture(renamedImageFile);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    setImage(true);
  }

  // logic to update state
  const stateFuntions = {
    updateObjectState: function (title, objectName, id, value) {
      let copyState, indexOfObject;
      if (title === "projects") {
        copyState = [...profileData.projects];
        indexOfObject = profileData.projects.findIndex(
          (item) => item.projectID === id
        );
        copyState[indexOfObject] = {
          ...copyState[indexOfObject],
          [objectName]: value,
        };
        profileSetter({ ...profileData, projects: copyState });
      } else if (title === "blogs") {
        copyState = [...profileData.blogs];
        indexOfObject = profileData.blogs.findIndex(
          (item) => item.blogID === id
        );
        copyState[indexOfObject] = {
          ...copyState[indexOfObject],
          [objectName]: value,
        };
        profileSetter({ ...profileData, blogs: copyState });
      }
    },

    updateSocialLinks: function (socialMediaName, value) {
      let copyState = [...profileData.socialMedia];
      let findingIndex = profileData.socialMedia.findIndex(
        (item) => item.name === socialMediaName
      );
      copyState[findingIndex] = {
        ...copyState[findingIndex],
        link: value,
      };
      profileSetter({
        ...profileData,
        socialMedia: copyState,
      });
    },
  };

  async function handleSubmit() {
    //store user profileData
    try {
      if (ProfilePicture) {
        var storageRef = fire.storage().ref();
        var fileRef = storageRef.child(user.nickname);
        await fileRef.put(ProfilePicture).then((snapshot) => {
          console.log("Image Uploaded");
        });

        await db
          .collection("users")
          .doc(user.nickname)
          .update({
            picture: await fileRef.getDownloadURL(),
            name: profileData.name,
            currentPosition: profileData.currentPosition,
            isProfileCreated: true,
          })
          .then(() => {
            console.log("Doc Updated");
          });

        await db
          .collection(user.nickname)
          .doc("profile")
          .set(profileData)
          .then(() => {
            console.log("Profile Saved");
          });
      } else {
        toast("Upload Profile Picture", {
          icon: "👨🏻",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function GenerateDate() {
    let today = new Date();
    return today.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <div>
      <Toaster></Toaster>
      <Form
        stateFuntions={stateFuntions}
        profileData={profileData}
        profileSetter={profileSetter}
        techStack={techStack}
        readURL={readURL}
        handleSubmit={handleSubmit}
        ImageUploaded={ImageUploaded}
        showImage={showImage}
        GenerateDate={GenerateDate}
      />
    </div>
  );
}

export default CreateProfile;
