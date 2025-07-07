import React, { useContext } from "react";
import "./Login.css"; // Assuming you have a CSS file for styling
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you have a CSS file for styling
import { StoreContext } from "../../context/StoreContext"; // Import your global state context if needed
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom if needed

function Login() {
  const [data, setData] = React.useState({ email: "", password: "" });
  const navigate = useNavigate(); // Import useNavigate from react-router-dom if needed
  const { setToken } = useContext(StoreContext); // Assuming you have a StoreContext for global state management

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        data
      );
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setToken(response.data.token); // Assuming you store the token in your context
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        toast.success("Login successful");
        navigate("/"); // Redirect to home page after successful login
      } else {
        toast.error("Login failed. Please try again");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again");
    }
  };

  return (
    <body>
      <div className="login-container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={handleChange}
                      name="email"
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="text-center">
                      <a href="/register" className="text-decoration-none">
                        Don't have an account? Sign Up
                      </a>
                    </div>
                  </div>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
