import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap";
import { color } from "d3-color";

import Survey from "./Survey";
import Email from "./Email";

import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  var [state, setState] = useState({
    primary: "#25bcca",
    secondary: "#324157",
    tertiary: "#efefef",
    font: "Open Sans",
    logo: null,
    logoURL: null,
    backgroundImage: undefined,
    backgroundImageURL: undefined,
    backgroundRepeat: "",
    backgroundSize: "",
    backgroundPosition: "",
    buttonRoundness: "6px",
    formRoundness: "6px",
    mobile: false,
    logoOutside: false,
    emailReplyTo: "support@example.com",
    emailSubject: "Your Feedback is Important",
    emailLead: "Thank you for your feedback!",
    emailText: "We appreciate your feedback!",
    emailFooter: "Your friends at **Example**\n\n<small>Street Address</small>",
    settings: undefined,
    emailButtonType: "simple",
  });

  const handleChange = (event) => {
    const { name, value, checked, files, type, accept } = event.target;
    window.target = event.target;

    if (files !== null && files !== undefined) {
      const file = files[0];
      if (file === undefined) {
        return;
      }
      if (!file.type.match(accept)) {
        alert("File type is not valid");
        return;
      }
      setState({
        ...state,
        [name]: file,
      });
    } else {
      const val = type === "checkbox" ? checked : value;
      setState({
        ...state,
        [name]: val,
      });
    }
  };

  const { logo, backgroundImage, settings } = state;

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (backgroundImage) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setState({
            ...state,
            backgroundImageURL: result,
          });
        }
      };
      fileReader.readAsDataURL(backgroundImage);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [state, backgroundImage]);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (logo) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setState({
            ...state,
            logoURL: result,
          });
          // setLogoURL(result);
        }
      };
      fileReader.readAsDataURL(logo);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [state, logo]);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (settings) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setState({ ...JSON.parse(result), settings: undefined });
        }
      };
      fileReader.readAsText(settings);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [state, settings]);

  const downloadSettings = () => {
    const myData = {
      ...state,
      logo: undefined,
      backgroundImage: undefined,
      settings: undefined,
    };
    console.log(downloadSettings);
    // is an object and I wrote it to file as
    // json

    // create file in browser
    const fileName = "settings";
    const json = JSON.stringify(myData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    console.log(href);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    console.log(link);

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const dark = color(color(state.primary).formatHsl()).l < 0.65;

  return (
    <div className="container-fluid">
      <div className="btn-group my-2" role="group" aria-label="Basic example">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Settings <i className="icon bi-gear"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() =>
            setState((mobile) => ({ ...state, mobile: !state.mobile })) && false
          }
        >
          <i className={`icon bi-${state.mobile ? "display" : "phone"}`} />{" "}
          Preview
        </button>
      </div>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Settings
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="survey-settings-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#survey-settings-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="survey-settings-tab-pane"
                    aria-selected="false"
                  >
                    Survey Settings
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="email-settings-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#email-settings-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="email-settings-tab-pane"
                    aria-selected="false"
                  >
                    Email Settings
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <form className="container-fluid mt-2">
                    <div className="mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={downloadSettings}
                      >
                        Download Settings
                      </button>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="settings"
                        className="col-sm-2 col-form-label"
                      >
                        Upload Settings
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="file"
                          id="settings"
                          name="settings"
                          accept="application/json"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row mb-3 g-3 align-items-ceter">
                      <div className="col-auto">
                        <label
                          htmlFor="primaryColor"
                          className="col-form-label"
                        >
                          Primary
                        </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="color"
                          className="form-control form-control-color"
                          id="primaryColor"
                          name="primary"
                          value={state.primary}
                          onChange={handleChange}
                          title="Choose your color"
                        />
                      </div>
                      <div className="col-auto">
                        <span className="form-text">{state.primary}</span>
                      </div>
                    </div>
                    <div className="row mb-3 g-3 align-items-ceter">
                      <div className="col-auto">
                        <label
                          htmlFor="secondaryColor"
                          className="col-form-label"
                        >
                          Secondary
                        </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="color"
                          className="form-control form-control-color"
                          id="secondaryColor"
                          name="secondary"
                          value={state.secondary}
                          onChange={handleChange}
                          title="Choose your color"
                        />
                      </div>
                      <div className="col-auto">
                        <span className="form-text">{state.secondary}</span>
                      </div>
                    </div>
                    <div className="row mb-3 g-3 align-items-ceter">
                      <div className="col-auto">
                        <label
                          htmlFor="tertiaryColor"
                          className="col-form-label"
                        >
                          Tertiary
                        </label>
                      </div>
                      <div className="col-auto">
                        <input
                          type="color"
                          className="form-control form-control-color"
                          id="tertiaryColor"
                          name="tertiary"
                          value={state.tertiary}
                          onChange={handleChange}
                          title="Choose your color"
                        />
                      </div>
                      <div className="col-auto">
                        <span className="form-text">{state.tertiary}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="logo" className="col-sm-2 col-form-label">
                        Logo
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="file"
                          id="logo"
                          name="logo"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="formRoundness"
                        className="col-sm-2 col-form-label"
                      >
                        Form Roundness
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="formRoundness"
                          name="formRoundness"
                          value={state.formRoundness}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="buttonRoundness"
                        className="col-sm-2 col-form-label"
                      >
                        Button Roundness
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="buttonRoundness"
                          name="buttonRoundness"
                          value={state.buttonRoundness}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="survey-settings-tab-pane"
                  role="tabpanel"
                  aria-labelledby="survey-settings-tab"
                  tabIndex="0"
                >
                  <form className="container-fluid mt-2">
                    <div className="row mb-3">
                      <label
                        htmlFor="backgroundImage"
                        className="col-sm-2 col-form-label"
                      >
                        Background Image
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="file"
                          id="backgroundImage"
                          name="backgroundImage"
                          accept="image/*"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="backgroundRepeat"
                        className="col-sm-2 col-form-label"
                      >
                        Background Repeat
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          name="backgroundRepeat"
                          id="backgroundRepeat"
                          value={state.backgroundRepeat}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="backgroundSize"
                        className="col-sm-2 col-form-label"
                      >
                        Background Size
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="backgroundSize"
                          value={state.backgroundSize}
                          name="backgroundSize"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="backgroundPosition"
                        className="col-sm-2 col-form-label"
                      >
                        Background Position
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="backgroundPosition"
                          name="backgroundPosition"
                          value={state.backgroundPosition}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label htmlFor="font" className="col-sm-2 col-form-label">
                        Font
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="font"
                          name="font"
                          value={state.font}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="email-settings-tab-pane"
                  role="tabpanel"
                  aria-labelledby="email-settings-tab"
                  tabIndex="0"
                >
                  <form className="container-fluid mt-2">
                    <div className="row mb-3 form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        name="logoOutside"
                        id="logoOutside"
                        checked={state.logoOutside}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="logoOutside">
                        Logo outside card?
                      </label>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="emailReplyTo"
                        className="col-sm-2 col-form-label"
                      >
                        Reply-To
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="emailReplyTo"
                          value={state.emailReplyTo}
                          name="emailReplyTo"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="emailSubject"
                        className="col-sm-2 col-form-label"
                      >
                        Subject
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="emailSubject"
                          value={state.emailSubject}
                          name="emailSubject"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="emailLead"
                        className="col-sm-2 col-form-label"
                      >
                        Lead
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="emailLead"
                          value={state.emailLead}
                          name="emailLead"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="emailText"
                        className="col-sm-2 col-form-label"
                      >
                        Text
                      </label>
                      <div className="col-sm-10">
                        <input
                          className="form-control"
                          type="text"
                          id="emailText"
                          value={state.emailText}
                          name="emailText"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="emailFooter"
                        className="col-sm-2 col-form-label"
                      >
                        Footer
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          className="form-control"
                          id="emailFooter"
                          value={state.emailFooter}
                          name="emailFooter"
                          rows="4"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="emailButtonType"
                        id="emailButtonTypeSimple"
                        value="simple"
                        onChange={handleChange}
                        checked={state.emailButtonType === "simple"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="emailButtonTypeSimple"
                      >
                        Simple (Button)
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="emailButtonType"
                        id="emailButtonTypeNps"
                        value="nps"
                        onChange={handleChange}
                        checked={state.emailButtonType === "nps"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="emailButtonTypeNps"
                      >
                        NPS (Numpad)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="emailButtonType"
                        id="emailButtonTypeCsat"
                        value="csat"
                        onChange={handleChange}
                        checked={state.emailButtonType === "csat"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="emailButtonTypeCsat"
                      >
                        CSAT (Emojis)
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-pills mb-2" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active"
            id="survey-tab"
            data-bs-toggle="tab"
            data-bs-target="#survey-tab-pane"
            type="button"
            role="tab"
            aria-controls="survey-tab-pane"
            aria-selected="true"
          >
            Survey
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className="nav-link"
            id="email-tab"
            data-bs-toggle="tab"
            data-bs-target="#email-tab-pane"
            type="button"
            role="tab"
            aria-controls="email-tab-pane"
            aria-selected="false"
          >
            Email
          </button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="survey-tab-pane"
          role="tabpanel"
          aria-labelledby="survey-tab"
          tabIndex="0"
        >
          <Survey
            themes={state}
            {...state}
            logo={state.logoURL}
            backgroundImage={state.backgroundImageURL}
          />
        </div>
        <div
          className="tab-pane fade"
          id="email-tab-pane"
          role="tabpanel"
          aria-labelledby="email-tab"
          tabIndex="0"
        >
          <Email themes={state} {...state} logo={state.logoURL} />
        </div>
      </div>
      <style>{`.btn.brand { background-color: ${state.primary}; ${
        dark ? "color: white;" : ""
      } }`}</style>
    </div>
  );
}

export default App;
