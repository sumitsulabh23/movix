import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      id: Date.now(),
      name,
      email,
      password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
