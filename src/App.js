import React, { useState, useEffect } from "react";
import "./App.css";

import Survey from "./Survey";
import { Collapse } from "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const COLORS = {
  primary: "#25bcca",
  secondary: "#324157",
  tertiary: "#efefef",
};

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function App() {
  var [toggle, setToggle] = useState(false);
  var [mobile, setMobile] = useState(false);

  useEffect(() => {
    var myCollapse = document.getElementById("collapseTarget");
    var bsCollapse = new Collapse(myCollapse, { toggle: false });
    toggle ? bsCollapse.show() : bsCollapse.hide();
  });

  const [background, setBackground] = useState({});
  const [roundness, setRoundness] = useState({});
  const [colors, setColors] = useState(COLORS);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImageURL, setBackgroundImageDataURL] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoURL, setLogoURL] = useState(null);
  const [font, setFont] = useState("Open Sans");

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file === undefined) {
      return;
    }
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setBackgroundImage(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (backgroundImage) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setBackgroundImageDataURL(result);
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
  }, [backgroundImage]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file === undefined) {
      return;
    }
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setLogo(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (logo) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setLogoURL(result);
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
  }, [logo]);

  function handleColorChange(event) {
    const { name, value } = event.target;
    setColors({
      ...colors,
      [name]: value,
    });
  }

  function handleFontChange(event) {
    const { value } = event.target;
    setFont(value);
  }

  function handleBackgroundPropChange(event) {
    const { name, value } = event.target;
    setBackground({
      ...background,
      [name]: value,
    });
  }

  function handleTextChange(event) {
    const { name, value } = event.target;
    setRoundness({
      ...roundness,
      [name]: value,
    });
  }

  return (
    <div className="container-fluid mt-2">
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          className="btn btn-primary"
          onClick={() => setToggle((toggle) => !toggle)}
        >
          Settings{" "}
          <i className={`icon bi-arrows-${toggle ? "collapse" : "expand"}`}></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setMobile((mobile) => !mobile) && false}
        >
          <i className={`icon bi-${mobile ? "display" : "phone"}`} /> Preview
        </button>
      </div>
      <form className="collapse container-fluid mt-2" id="collapseTarget">
        <div className="row mb-3 g-3 align-items-ceter">
          <div className="col-auto">
            <label htmlFor="primaryColor" className="col-form-label">
              Primary
            </label>
          </div>
          <div className="col-auto">
            <input
              type="color"
              className="form-control form-control-color"
              id="primaryColor"
              name="primary"
              value={colors.primary}
              onChange={handleColorChange}
              title="Choose your color"
            />
          </div>
          <div className="col-auto">
            <span className="form-text">{colors.primary}</span>
          </div>
        </div>
        <div className="row mb-3 g-3 align-items-ceter">
          <div className="col-auto">
            <label htmlFor="secondaryColor" className="col-form-label">
              Secondary
            </label>
          </div>
          <div className="col-auto">
            <input
              type="color"
              className="form-control form-control-color"
              id="secondaryColor"
              name="secondary"
              value={colors.secondary}
              onChange={handleColorChange}
              title="Choose your color"
            />
          </div>
          <div className="col-auto">
            <span className="form-text">{colors.secondary}</span>
          </div>
        </div>
        <div className="row mb-3 g-3 align-items-ceter">
          <div className="col-auto">
            <label htmlFor="tertiaryColor" className="col-form-label">
              Tertiary
            </label>
          </div>
          <div className="col-auto">
            <input
              type="color"
              className="form-control form-control-color"
              id="tertiaryColor"
              name="tertiary"
              value={colors.tertiary}
              onChange={handleColorChange}
              title="Choose your color"
            />
          </div>
          <div className="col-auto">
            <span className="form-text">{colors.tertiary}</span>
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
              accept="image/* "
              onChange={handleLogoChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="backgroundImage" className="col-sm-2 col-form-label">
            Background Image
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="file"
              id="backgroundImage"
              accept="image/* "
              onChange={handleBackgroundImageChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="backgroundRepeat" className="col-sm-2 col-form-label">
            Background Repeat
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="backgroundRepeat"
              name="repeat"
              onChange={handleBackgroundPropChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="backgroundSize" className="col-sm-2 col-form-label">
            Background Size
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="backgroundSize"
              name="size"
              onChange={handleBackgroundPropChange}
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
              name="position"
              onChange={handleBackgroundPropChange}
            />
          </div>
        </div>

        <div className="row mb-3">
          <label htmlFor="buttonRoundness" className="col-sm-2 col-form-label">
            Button Roundness
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="buttonRoundness"
              name="buttonRoundness"
              onChange={handleTextChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="formRoundness" className="col-sm-2 col-form-label">
            Form Roundness
          </label>
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              id="formRoundness"
              name="formRoundness"
              onChange={handleTextChange}
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
              onChange={handleFontChange}
            />
          </div>
        </div>
      </form>
      <Survey
        font={font}
        themes={colors}
        logo={logoURL}
        backgroundImage={backgroundImageURL}
        backgroundRepeat={background.repeat}
        backgroundSize={background.size}
        backgroundPosition={background.position}
        buttonRoundness={roundness.buttonRoundness}
        formRoundness={roundness.formRoundness}
        mobile={mobile}
      />
    </div>
  );
}

export default App;
