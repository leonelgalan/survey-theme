import React from "react";
import { marked } from "marked";

import sadIcon from "./icon_sad.svg";
import neutralIcon from "./icon_neutral.svg";
import happyIcon from "./icon_happy.svg";

function Email(props) {
  const { tertiary } = props.themes;
  const {
    mobile,
    emailReplyTo,
    emailSubject,
    logo,
    logoOutside,
    emailLead,
    emailText,
    emailCentered,
    emailSignature,
    emailCTA,
    emailButton,
  } = props;

  function adjustRoundness(x = "") {
    if (x === 0) {
      return 0;
    } else if (x.includes("rem")) {
      return "1.5rem";
    } else if (x.includes("px")) {
      return "5px";
    } else {
      return 0;
    }
  }

  const formRoundness = adjustRoundness(props.formRoundness);
  const borderRadius = adjustRoundness(props.buttonRoundness);

  return (
    <>
      <div className="wrapper" style={{ width: mobile ? "360px" : "90%" }}>
        <div className="row">
          <div className="col">
            <ul className="headers list-group mb-3">
              <li className="list-group-item">Reply-To: {emailReplyTo}</li>
              <li className="list-group-item">Subject: {emailSubject}</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div
              className="emailContent"
              style={{
                backgroundColor: tertiary,
                paddingTop: logo && logoOutside ? "0" : undefined,
              }}
            >
              {logo && logoOutside && (
                <div
                  style={{
                    padding: "16px",
                    margin: "0 auto",
                    maxWidth: "95%",
                    width: "30rem",
                  }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="logo"
                    style={{ maxWidth: "95%" }}
                  />
                </div>
              )}
              <div className="card" style={{ borderRadius: formRoundness }}>
                <div className="card-body">
                  {logo && !logoOutside && (
                    <img src={logo} alt="logo" className="logo" />
                  )}
                  <p
                    className="lead"
                    style={{ textAlign: emailCentered ? "center" : "inherit" }}
                  >
                    {emailLead}
                  </p>
                  <div
                    style={{ textAlign: emailCentered ? "center" : "inherit" }}
                    dangerouslySetInnerHTML={{
                      __html: marked(emailText || ""),
                    }}
                  ></div>
                  {emailCTA === "simple" && (
                    <button
                      type="button"
                      className="btn brand d-block mx-auto my-3"
                      style={{
                        width: "120px",
                        height: "38px",
                        borderRadius: borderRadius,
                      }}
                    >
                      {emailButton}
                    </button>
                  )}
                  {emailCTA === "nps" && (
                    <div className="nps container text-center">
                      <div className="row g-2">
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            10 - Very Likely
                          </button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            9
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            8
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            7
                          </button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            6
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            5
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            4
                          </button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            3
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            2
                          </button>
                        </div>
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            1
                          </button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button
                            className="brand btn"
                            style={{ borderRadius: borderRadius }}
                          >
                            0 - Not Likely
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {emailCTA === "csat" && (
                    <div className="csat container text-center">
                      <div className="row g-2">
                        <div className="col">
                          <button className="emoji btn">
                            <img src={sadIcon} alt="Sad" />
                          </button>
                        </div>
                        <div className="col">
                          <button className="emoji btn">
                            <img src={neutralIcon} alt="Indifferent" />
                          </button>
                        </div>
                        <div className="col">
                          <button className="emoji btn">
                            <img src={happyIcon} alt="Happy" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className="footer"
                    dangerouslySetInnerHTML={{
                      __html: marked(emailSignature || ""),
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="footer"
                style={{
                  margin: "20px auto",
                  maxWidth: "95%",
                  width: "30rem",
                }}
              >
                <span className="placeholder" style={{ width: "150px" }}></span>
                <span className="placeholder" style={{ width: "100px" }}></span>
                <span className="placeholder" style={{ width: "175px" }}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Email;
