import React from "react";
import Progress from "./ProgressBar";
import "./survey.css";

function Survey(props) {
  const { primary, secondary, tertiary } = props.themes;
  const { font = "" } = props;

  const fontURLSafe = font.replace(/\s+/g, "+");

  return (
    <div className="wrapper" style={{ width: props.mobile ? "360px" : "90%" }}>
      <link
        href={`https://fonts.googleapis.com/css?family=${fontURLSafe}`}
        rel="stylesheet"
      ></link>
      <div
        className=""
        style={{
          fontFamily: `${props.font}, sans-serif`,
          backgroundColor: tertiary,
          backgroundRepeat: props.backgroundRepeat,
          backgroundPosition: props.backgroundPosition,
          backgroundSize: props.backgroundSize,
          backgroundImage: `url("${props.backgroundImage}")`,
        }}
      >
        <div className="survey">
          <nav
            className="navbar navbar-light ps-2"
            style={{ backgroundColor: secondary }}
          >
            <button
              type="button"
              className={"btn btn-secondary"}
              style={{
                width: "60px",
                height: "38px",
                borderRadius: props.buttonRoundness,
              }}
            />

            <Progress themes={props.themes} />
          </nav>
          <div className="content">
            <div
              className="card"
              style={{ width: "30rem", borderRadius: props.formRoundness }}
            >
              <div className="card-body">
                {props.logo && (
                  <img src={props.logo} alt="logo" className="logo" />
                )}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <textarea
                  style={{ borderColor: primary }}
                  className="form-control my-4 d-none d-sm-block"
                />
                <button
                  type="button"
                  className="conditional btn btn-secondary"
                  style={{
                    backgroundColor: primary,
                    width: "60px",
                    height: "38px",
                    borderRadius: props.buttonRoundness,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
