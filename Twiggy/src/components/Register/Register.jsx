import React from "react";
import "./Register.css";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you have a CSS file for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom if needed

function Register() {
  const navigate = useNavigate(); // Import useNavigate from react-router-dom if needed
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        data
      );
      console.log("Registration successful:", response.data);
      if (response.status === 200) {
        toast.success("Registration successful");
        navigate("/login"); // Redirect to login page after successful registration
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };
  return (
    <body>
      <div className="register-container">
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
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Full Name"
                      onChange={handleChange}
                      name="name"
                    />
                    <label htmlFor="floatingInput">Full Name</label>
                  </div>
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

                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="text-center">
                      <a href="/login" className="text-decoration-none">
                        Already have an account? Sign In
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

export default Register;
