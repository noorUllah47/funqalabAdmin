import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Account from "../../api/Account";
import axios from "axios"

const Login = () => {
  const history = useNavigate();
  const initialState = {
    email: "",
    password: "",
    error: "",
    login: localStorage.getItem("AOFLoggedIn"),
    // sendingReq: false,
  };

  const [formData, setformData] = useState(initialState);
  const [sendingReq, setsendingReq] = useState(false);
  const { email, password, error, login } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    setsendingReq(true)
    e.preventDefault();
    const res = Account.Login(email, password)
    res.then((value) => {
      console.log('login response is===========>>', value.data.token)

      if (value.status) {
        localStorage.setItem("token", value.data.token)
        localStorage.setItem("loggedIn", true)
        localStorage.setItem("super", false)

        axios.defaults.headers =
        {
          'x-auth-token': value.data.token
        }
        setsendingReq(false)
        history("/Form")
      }
    })
      .catch((err) => {
        console.log(err)
      })

  };

  return (
    <>
      {login ? (
        <Navigate to="/Form" />
      ) : (
        <div className="bg-grey-100 ">
          <div className="centerr">
            <div>
              <div className="bg-white edge loginForm mb-3">
                <p className="Bold REM2 text-center">Sign in to your account</p>
                <p className=" text-center t-grey-200">
                  Sign in to get your portfolio updates, make transactions and get
                  on-demand customer support.{" "}
                </p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-3"
                    placeholder="Email or User ID"
                    value={email}
                    onChange={handleChange}
                    id="email"
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={handleChange}
                    id="password"
                    minLength="8"
                    required
                  />
                  {/* <NavLink className="text-decoration-none" to="/ForgetPassword">

                    <span className="  t-pink mb-5 fs14 fw-500 ">

                      Forgot Password?

                    </span>


                  </NavLink> */}
                  {/* <button
                    className="btn-filled fs16 px-3 py-3 w-100 mt-3"
                    type="submit"
                  >
                    {sendingReq ? (

                      <div className="whitespinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    ) : (
                      <>Sign in</>
                    )}
                  </button> */}

                  <button type="submit" className="SignInBtn tc-blue bg-white w-100 py-3  mt-3">

                    {sendingReq ? (

                      <div className="bluespinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </div>
                    ) : (
                      <>Sign in</>
                    )}
                  </button>

                  <p className="text-danger fs12 text-center">{error}</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
