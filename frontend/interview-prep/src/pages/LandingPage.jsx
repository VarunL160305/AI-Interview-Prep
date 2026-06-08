import { useState } from "react";
import {APP_FEATURES} from "../utils/data";
import {useNavigate} from "react-router-dom";
import "./LandingPage.css";
import {LuSparkles} from 'react-icons/lu'

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {};

  return (
    <>
      <div className="hero-section">
        <div className="container-fluid px-lg-5 px-4">
          <header className="d-flex justify-content-between align-items-center py-4">
            <div className="logo-text">
              Interview Prep AI
            </div>
            <button className="signup-btn" onClick={() => setOpenAuthModel(true)}>
              Login / Sign Up
            </button>
          </header>
          <div className="row align-items-center hero-row">
            <div className="col-lg-6">
              <div className="mb-4">
                <span className="ai-badge d-inline-flex align-items-center gap-2">
                  <LuSparkles/> AI Powered
                </span>
              </div>
              <h1 className="hero-title">
                Ace Interviews with
                <br />
                <span className="hero-gradient">
                  AI-Powered
                </span>
                {" "}Learning
              </h1>
            </div>
            <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
              <p className="hero-description">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit
                is here.
              </p>
              <button className="hero-btn" onClick={handleCTA}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100 mt-5" style={{ backgroundColor: "#FFFCEF" }}>
        <div className="container py-5">
          <section className="mt-5">
            <h2 className="fs-2 fw-medium text-center mb-5">
              Features That Make You Shine
            </h2>
            <div className="d-flex flex-column align-items-center gap-4">
              <div className="row g-4 w-100">
                {APP_FEATURES.slice(0, 3).map((feature) => (
                  <div className="col-md-4" key={feature.id}>
                    <div className="feature-card h-100">
                      <h3 className="fs-6 fw-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-secondary mb-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="row g-4 justify-content-center w-100">
                {APP_FEATURES.slice(3).map((feature) => (
                  <div className="col-md-6" key={feature.id}>
                    <div className="feature-card h-100">
                      <h3 className="fs-6 fw-semibold mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-secondary mb-0">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;