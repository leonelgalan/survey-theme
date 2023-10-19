import React from "react";

function Email(props) {
  const { primary, tertiary } = props.themes;
  const {
    mobile,
    emailReplyTo,
    emailSubject,
    logo,
    logoOutside,
    emailLead,
    emailText,
    emailFooter,
    emailButtonType,
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
  const buttonRoundness = adjustRoundness(props.buttonRoundness);

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
            <div className="emailContent" style={{ backgroundColor: tertiary }}>
              {logo && logoOutside && (
                <div
                  style={{ margin: "0 auto", maxWidth: "95%", width: "30rem" }}
                >
                  <img
                    src={logo}
                    alt="logo"
                    className="logo"
                    style={{ maxWidth: "25em" }}
                  />
                </div>
              )}
              <div className="card" style={{ borderRadius: formRoundness }}>
                <div className="card-body">
                  {logo && !logoOutside && (
                    <img src={logo} alt="logo" className="logo" />
                  )}
                  <p className="lead">{emailLead}</p>
                  <p>{emailText}</p>
                  {emailButtonType === "simple" && (
                    <button
                      type="button"
                      className="btn btn-secondary d-block mx-auto my-3"
                      style={{
                        backgroundColor: primary,
                        width: "120px",
                        height: "38px",
                        borderRadius: buttonRoundness,
                      }}
                    />
                  )}
                  {emailButtonType === "nps" && (
                    <div className="nps container text-center">
                      <div className="row g-2">
                        <div className="col">
                          <button className="brand btn">
                            10 - Very Likely
                          </button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button className="brand btn">9</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">8</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">7</button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button className="brand btn">6</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">5</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">4</button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button className="brand btn">3</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">2</button>
                        </div>
                        <div className="col">
                          <button className="brand btn">1</button>
                        </div>
                      </div>
                      <div className="row g-2">
                        <div className="col">
                          <button className="brand btn">0 - Not Likely</button>
                        </div>
                      </div>
                    </div>
                  )}
                  {emailButtonType === "csat" && (
                    <div className="csat container text-center">
                      <div className="row g-2">
                        <div className="col">
                          <button className="emoji btn">☹️</button>
                        </div>
                        <div className="col">
                          <button className="emoji btn">😐</button>
                        </div>
                        <div className="col">
                          <button className="emoji btn">😃</button>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="footer">{emailFooter}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Email;
