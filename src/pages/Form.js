import React from "react";
import { ArrowLeftIcon, PlusIcon, CameraIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Form({
  stateFuntions,
  readURL,
  techStack,
  profileSetter,
  profileData,
  handleSubmit,
  ImageUploaded,
  showImage,
  GenerateDate,
}) {
  return (
    <div className="w-full h-auto bg-secondary-300 flex items-center justify-center">
      <Toaster></Toaster>
      <div className="max-w-7xl w-full h-auto text-secondary-100 flex flex-col items-center bg-white mx-5 my-10 rounded-2xl shadow-md">
        <div className="w-full h-14 flex justify-between">
          <Link to="/dashboard">
            <ArrowLeftIcon className="w-8 text-secondary-100 m-2" />
          </Link>
          <button
            className="w-24 h-10 m-3 flex bg-primary rounded text-white font-pop justify-around items-center cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="w-44 h-44 m-5 bg-fade flex flex-col justify-center items-center cursor-pointer rounded-full">
          <CameraIcon className="w-10" />
          {showImage === true ? (
            <img
              alt="profile_pic"
              className="w-44 h-44  rounded-full absolute"
              id="profileImage"
              src={ImageUploaded}
            ></img>
          ) : null}
          <input
            type="file"
            accept="image/*"
            className="w-44 h-44 absolute cursor-pointer bg-transparent rounded-full opacity-0 bg-primary"
            onChange={readURL}
          ></input>
        </div>

        <input
          className="max-w-xs w-full font-nunito text-4xl bg-fade text-secondary-100 outline-none text-center m-2 rounded-lg"
          placeholder="Name"
          onChange={(e) =>
            profileSetter({ ...profileData, name: e.target.value })
          }
        ></input>
        <input
          className="font-pop text-xl bg-fade text-secondary-100 outline-none text-center m-2 rounded-lg"
          placeholder="designation"
          onChange={(e) =>
            profileSetter({ ...profileData, currentPosition: e.target.value })
          }
        ></input>
        <div
          className="max-w-xs w-full h-10 font-pop text-secondary-200 flex justify-evenly items-center"
          id="tags"
        >
          <input
            className="font-pop text-xl bg-fade text-secondary-100 outline-none text-center m-2 rounded-lg"
            placeholder="Add tags(max 3)"
            id="tagInput"
          ></input>
          <button
            className="w-7 h-7 bg-secondary-300 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              if (profileData.tags.length < 3) {
                var tagName = document.getElementById("tagInput");
                profileSetter({
                  ...profileData,
                  tags: [...profileData.tags, tagName.value],
                });
                toast.success(`${tagName.value} added.`);
                tagName.value = "";
              } else {
                toast.error("Maximum 3 tags are allowed.");
              }
            }}
          >
            <PlusIcon className="w-7" />
          </button>
        </div>

        <div className="max-w-md w-full min-h-200 h-full rounded-lg bg-secondary-300 m-10 text-secondary-100 font-pop flex flex-col justify-around text-center items-center">
          <p className="text-secondary-200">{GenerateDate()}</p>
          <textarea
            className="px-2 text-xl text-center bg-transparent outline-none rounded-lg"
            cols="40"
            rows="5"
            placeholder="Descirbe your status"
            onChange={(e) =>
              profileSetter({
                ...profileData,
                status: e.target.value,
                lastUpdated: GenerateDate(),
              })
            }
          ></textarea>
        </div>

        <h1 className="font-nunito text-secondary-100 text-3xl">Tech Skills</h1>
        <div
          className="font-pop max-w-lg w-full h-auto my-10 flex flex-wrap justify-center "
          id="tech-list"
        >
          <select
            type="list"
            className="w-1/2 font-pop text-xl bg-fade text-secondary-100 outline-none text-center m-2 rounded-lg"
            placeholder="Your Skills"
            id="tech-name"
            onChange={(e) => {
              e.preventDefault();
              var techVal = document.getElementById("tech-name").value;
              if (profileData.techSkills.indexOf(techVal) === -1) {
                profileSetter({
                  ...profileData,
                  techSkills: [...profileData.techSkills, techVal],
                });
                toast.success(`${techVal} added.`);
              } else {
                toast.error(`${techVal} already added.`);
              }
            }}
          >
            <option value="none" defaultValue>
              None
            </option>
            {techStack.map((tech) => {
              return (
                <option value={tech} key={tech}>
                  {tech}
                </option>
              );
            })}
          </select>
        </div>

        <h1 className="font-nunito text-secondary-100 text-3xl">Projects</h1>
        <div className="max-w-2xl w-full  h-auto my-10 grid grid-cols-2 justify-items-center items-center mr:grid-cols-1">
          <div className="w-auto h-auto text-secondary-100 my-3 flex flex-col bg-white rounded">
            <input
              className="w-full h-10 font-nunito text-2xl p-2 bg-fade outline-none my-1 rounded-lg"
              placeholder="Project Name"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "name",
                  1,
                  e.target.value
                );
              }}
            ></input>
            <textarea
              className="w-full h-10 font-pop text-sm p-2 bg-fade outline-none rounded-lg"
              rows="5"
              placeholder="Project Description"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "desc",
                  1,
                  e.target.value
                );
              }}
            ></textarea>
            <input
              className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
              placeholder="Project Link"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "link",
                  1,
                  e.target.value
                );
              }}
            ></input>
          </div>

          <div className="w-auto h-auto text-secondary-100 my-3 flex flex-col bg-white rounded">
            <input
              className="w-full h-10 font-nunito text-2xl p-2 bg-fade outline-none my-1 rounded-lg"
              placeholder="Project Name"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "name",
                  2,
                  e.target.value
                );
              }}
            ></input>
            <textarea
              className="w-full h-10 font-pop text-sm p-2 bg-fade outline-none rounded-lg"
              rows="5"
              placeholder="Project Description"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "desc",
                  2,
                  e.target.value
                );
              }}
            ></textarea>
            <input
              className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
              placeholder="Project Link"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "projects",
                  "link",
                  2,
                  e.target.value
                );
              }}
            ></input>
          </div>
        </div>
        <h1 className="font-nunito text-secondary-100 text-3xl">Blogs</h1>
        <div className="max-w-2xl w-full  h-auto my-10 grid grid-cols-2 justify-items-center items-center mr:grid-cols-1">
          <div className="w-auto h-auto text-secondary-100 my-3 flex flex-col bg-white rounded">
            <input
              className="w-full h-10 font-nunito text-2xl p-2 bg-fade outline-none my-1 rounded-lg"
              placeholder="Blog Name"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "blogs",
                  "name",
                  1,
                  e.target.value
                );
              }}
            ></input>
            <input
              className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
              placeholder="Blog Link"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "blogs",
                  "link",
                  1,
                  e.target.value
                );
              }}
            ></input>
          </div>

          <div className="w-auto h-auto text-secondary-100 my-3 flex flex-col bg-white rounded">
            <input
              className="w-full h-10 font-nunito text-2xl p-2 bg-fade outline-none my-1 rounded-lg"
              placeholder="Blog Name"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "blogs",
                  "name",
                  2,
                  e.target.value
                );
              }}
            ></input>
            <input
              className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
              placeholder="Blog Link"
              onChange={(e) => {
                stateFuntions.updateObjectState(
                  "blogs",
                  "link",
                  2,
                  e.target.value
                );
              }}
            ></input>
          </div>
        </div>
        <h1 className="font-nunito text-primary text-3xl py-1">DevConnect.</h1>
        <h2 className="font-nunito text-secondary-100 text-xl">
          Connect with me!
        </h2>
        <div className="max-w-sm w-full h-auto m-10 flex flex-col mr:grid-cols-3">
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Twitter Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("twitter", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Facebook Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("facebook", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Youtube Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("youtube", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Github Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("github", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Instagram Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("instagram", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="LinkedIn Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("linkedin", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Medium Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("medium", e.target.value);
            }}
          ></input>
          <input
            className="w-full h-10 font-nunito text-lg p-2 bg-fade outline-none my-1 font-pop rounded-lg"
            placeholder="Codepen Link"
            onChange={(e) => {
              stateFuntions.updateSocialLinks("codepen", e.target.value);
            }}
          ></input>
        </div>
      </div>
    </div>
  );
}

export default Form;
