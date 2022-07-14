import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import PostData from '../../../../Api/PostData'
// import {
//   getAuth,
//   sendPasswordResetEmail,
// } from "firebase/auth";

// import analytics from '../../../../firebase.config';

// import { getAnalytics, logEvent } from "firebase/analytics";
const ForgetPassword = () => {

  const history = useNavigate();

  // const auth = getAuth();

  const initialState = {
    email: '',
    error: '',
    // sendingReq: false,
  }

  const [formData, setformData] = useState(initialState);
  const [sendingReq, setsendingReq] = useState(false);
  const { email, error } = formData;
  const handleChange = (e) => {
    const { name, value } = e.target


    setformData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsendingReq(true)


    // const res = PostData.ForgetPasswordEmail(email);
    // res.then((value) => {
    //   console.log('ForgetPasswordEmail <<<<<<<<<<<<<<<=========>>>>>>>>>', value)
    //   // setShowVerificationBtn(false)
    //   logEvent(analytics, 'forget_password_email_submitted');
    //   alert('Recovery email sent')
    //   setsendingReq(false)
    //   history('/')

    // })
    //   .catch(function (error) {

    //     console.log(error.response)

    //   })

  }


  return (
    <>

      <div className="bg-grey-100 ">
        <div className="centerr">
          <div>
            <div className="bg-white edge loginForm  mb-3 w-FitCntnt">
              <p className="Bold REM2 text-center" >Reset your password</p>
              <p className=" text-center t-grey-200">Enter your email and we'll send you instructions on how to reset your password.</p>
              <form onSubmit={handleSubmit}>

                <input
                  type="email"
                  name="email"
                  className="form-control mb-3"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  id="email"
                  required
                />
                <button
                  className="btn-filled fs16 px-3 py-3 w-100"
                  type="submit"
                >
                  {sendingReq ? (
                    // <div className="spinner-border text-light" role="status">
                    //   <span className="visually-hidden">Loading...</span>
                    // </div>
                    <div className="whitespinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                  ) : (
                    <> Submit</>
                  )}
                </button>
                <p className="text-danger fs12 text-center">{error}</p>
              </form>
            </div>
            <NavLink className="text-decoration-none" to="/">
              <p className="text-center t-grey-200 fs14 mt-32">
                Go back to{" "}
                <span className="t-pink">Sign In</span>.
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
const Logo = () => (
  <svg width="170" height="48" viewBox="0 0 144 53" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5.92548H38.5155V44.441L19.2578 24.7018L0 5.92548Z" fill="url(#paint0_linear_1992_933)" />
    <path d="M0 12.5093H31.9317V44.441L15.9658 28.076L0 12.5093Z" fill="url(#paint1_linear_1992_933)" />
    <path d="M56.4401 5.90989H51.4814V23.3904H56.4401V14.7391C56.4401 12.6386 56.4755 9.32766 59.4153 9.32766C62.2135 9.32766 62.1072 12.0334 62.1072 14.1339V23.3904H67.0659V12.7098C67.0659 8.65123 65.7684 5.90989 61.093 5.90989C59.322 5.90989 57.3073 6.25466 56.5109 7.51197H56.4401V5.90989Z" fill="#230B59" />
    <path d="M84.5587 15.4512V14.8459C84.5587 9.57688 82.0085 5.90989 76.3059 5.90989C70.6742 5.90989 67.8761 9.50567 67.8761 14.8103C67.8761 20.115 71.2055 23.3904 76.5893 23.3904C80.2375 23.3904 83.3135 21.7267 84.4524 17.7653H79.8833C79.2103 19.1538 78.2186 19.9162 76.5893 19.9162C74.0037 19.9162 73.1182 17.6585 73.1182 15.4512H84.5587ZM73.2599 12.3538C73.5078 10.5381 74.6058 9.21739 76.5893 9.21739C78.5019 9.21739 79.6354 10.5737 79.8833 12.3538H73.2599Z" fill="#230B59" />
    <path d="M90.4979 13.8847L83.0598 23.3904H89.2228L93.2252 17.3025L97.688 23.3904H103.78L96.4483 13.8847L93.7567 10.1109L90.5333 5.90989H84.512L90.4979 13.8847Z" fill="#230B59" />
    <path d="M109.786 10.1109H112.832V5.90989H109.786V0H104.827V23.3904H109.786V10.1109Z" fill="#230B59" />
    <path d="M66.1955 28.146C64.0557 26.6646 61.816 26.3354 60.4346 26.3354C55.1926 26.3354 51.3818 29.7876 51.3818 34.9855C51.3818 40.0054 54.9696 43.7826 60.1054 43.7826C61.6285 43.7826 64.1224 43.2888 65.8663 41.8075C65.8663 41.8075 65.6063 41.6167 65.0433 40.4907C64.5495 39.5031 64.4516 38.3677 64.4516 38.3677C63.5661 39.3645 62.2744 39.8323 60.9284 39.8323C58.0949 39.8323 56.4114 37.7624 56.4114 35.0211C56.4114 32.4578 57.6365 30.0369 60.4346 30.0369C61.9577 30.0369 63.3974 30.2857 64.3849 31.2733C64.3849 31.2733 64.6938 30.2857 65.2272 29.4627C65.7607 28.6398 66.1955 28.146 66.1955 28.146Z" fill="#230B59" />
    <path d="M83.5406 26.2251H78.6527V27.7193C77.4485 26.2952 75.554 26.0816 73.7476 26.0816C68.7535 26.0816 65.8663 30.1046 65.8663 34.7328C65.8663 39.4679 68.6999 43.6723 73.8003 43.6723C75.6066 43.6723 77.5193 43.3485 78.5819 41.96H78.6527V43.6723H83.5406V26.2251ZM75.0045 39.7171C72.4543 39.7171 70.8959 37.1538 70.8959 34.804C70.8959 32.4543 72.4543 29.9266 75.0045 29.9266C77.5547 29.9266 79.1486 32.4543 79.1486 34.804C79.1486 37.1538 77.5547 39.7171 75.0045 39.7171Z" fill="#230B59" />
    <path d="M90.3902 26.3354H85.4315V53H90.3902V42.0347H90.4611C91.5433 42.9596 93.3935 43.7826 95.1644 43.7826C100.3 43.7826 103.141 39.6137 103.141 34.8431C103.141 30.2505 100.252 26.3354 95.329 26.3354C93.4872 26.3354 91.5433 26.8292 90.3902 27.7939V26.3354ZM94.003 39.8273C91.4528 39.8273 89.8944 37.264 89.8944 34.9143C89.8944 32.5646 91.4528 30.0369 94.003 30.0369C96.5532 30.0369 98.1117 32.5646 98.1117 34.9143C98.1117 37.264 96.5532 39.8273 94.003 39.8273Z" fill="#230B59" />
    <path d="M109.786 26.3354H104.827V43.6723H109.786V26.3354Z" fill="#230B59" />
    <path d="M116.41 30.3929V26.3354V23.3904H111.451V43.6723H116.41V30.3929Z" fill="#230B59" />
    <path d="M137.384 26.1919H132.496V27.8296C131.292 26.4055 129.561 26.1919 127.755 26.1919C122.76 26.1919 119.71 30.2149 119.71 34.8431C119.71 39.5781 122.654 43.6723 127.755 43.6723C129.561 43.6723 131.363 43.4587 132.425 42.0703H132.496V43.6723H137.384V26.1919ZM128.848 39.8273C126.298 39.8273 124.739 37.264 124.739 34.9143C124.739 32.5646 126.298 30.0369 128.848 30.0369C131.398 30.0369 132.992 32.5646 132.992 34.9143C132.992 37.264 131.398 39.8273 128.848 39.8273Z" fill="#230B59" />
    <path d="M143.885 13.482H138.926V43.6723H143.885V13.482Z" fill="#230B59" />
    <path d="M102.735 5.92548H97.5325L94.8347 9.49957L97.3398 12.5093L102.735 5.92548Z" fill="url(#paint2_linear_1992_933)" />
    <path d="M117.55 26.3354H122.817C122.817 26.3354 121.171 27.323 120.348 28.4751C119.525 29.6273 119.36 30.2857 119.36 30.2857H117.55V26.3354Z" fill="url(#paint3_linear_1992_933)" />
    <defs>
      <linearGradient id="paint0_linear_1992_933" x1="-1.64416" y1="-13.0565" x2="36.2682" y2="41.6844" gradientUnits="userSpaceOnUse">
        <stop stop-color="#230B59" />
        <stop offset="1" stop-color="#E92A5E" />
      </linearGradient>
      <linearGradient id="paint1_linear_1992_933" x1="21.2329" y1="44.441" x2="21.2329" y2="12.5093" gradientUnits="userSpaceOnUse">
        <stop stop-color="#82297D" />
        <stop offset="1" stop-color="#E12C61" />
      </linearGradient>
      <linearGradient id="paint2_linear_1992_933" x1="98.785" y1="5.92548" x2="98.785" y2="12.5093" gradientUnits="userSpaceOnUse">
        <stop stop-color="#82297D" />
        <stop offset="1" stop-color="#E12C61" />
      </linearGradient>
      <linearGradient id="paint3_linear_1992_933" x1="120.183" y1="26.3354" x2="120.183" y2="30.2857" gradientUnits="userSpaceOnUse">
        <stop stop-color="#82297D" />
        <stop offset="1" stop-color="#E12C61" />
      </linearGradient>
    </defs>
  </svg>

)