import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../images/HomeImg.svg";
import { Toaster } from "react-hot-toast";
import template1 from "../images/template1.svg";
import template2 from "../images/template2.svg";

function Home() {
  return (
    <div className="h-full w-full">
      <div className="min-h-homeheight h-full w-full bg-white flex flex-row items-center justify-around mr:flex-col">
        <Toaster></Toaster>
        <div className="text-secondary-100 m-10 flex flex-col">
          <h1 className="font-nunito text-5xl py-2">
            Connect and <br></br>Explore with Developers.
          </h1>
          <h3 className="font-pop text-2xl py-2">
            Join the community to connect with<br></br>developers and their
            aspiring works!
          </h3>
          <Link to="/dashboard">
            <button className="w-40 h-10 bg-primary rounded font-pop text-white my-2">
              DevConnect Now!
            </button>
          </Link>
        </div>
        <img
          src={HomeImg}
          className="max-w-600 w-full m-10"
          alt="homeImg"
        ></img>
      </div>
      <div className="h-auto w-full bg-secondary-100 text-white flex flex-col items-center">
        <h1 className="font-nunito text-4xl p-5 text-center">
          What's DevConnect?
        </h1>
        <div className="w-full flex justify-around items-center m-10 mr:flex-col">
          <div className="w-1/4 flex flex-col mr:w-3/4">
            <h1 className="font-pop text-4xl py-2">
              Take a look on<br></br> Developer Profiles.
            </h1>
            <p className="font-pop">
              Some cool developer profiles are available for you to reach out.
            </p>
          </div>
          <img
            src={template1}
            alt="HomeImage"
            className="max-w-lg w-full p-5"
          ></img>
        </div>
        <div className="w-full flex justify-around items-center m-10 mr:flex-col">
          <img
            src={template2}
            alt="HomeImage"
            className="max-w-sm w-full p-5"
          ></img>
          <div className="w-1/4 flex flex-col mr:w-3/4">
            <h1 className="font-pop text-4xl py-2">
              Connect with the<br></br>Developer.
            </h1>
            <p className="font-pop">
              Developer's social media handles, projects, blogs are available to
              easily reach the developer.
            </p>
          </div>
        </div>
      </div>
      <footer className="w-full h-10 flex justify-center items-center">
        <h1 className="font-pop text-xl text-secondary-100">
          Made by{" "}
          <a href="https://www.twitter.com/Nimalan_" className="underline">
            Nimalan
          </a>{" "}
          with ❤️
        </h1>
      </footer>
    </div>
  );
}

export default Home;
