import { useState, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return alert("All fields are required");

    try {
      const res = await API.post('register/', { username, email, password });
      console.log("Register response:", res.data);

      if (!res.data.access) return alert("Registration failed: no token returned");

      login(res.data.access); // auto-login
      navigate('/');
    } catch (err) {
      console.log("Register error:", err.response?.data);
      const errors = err.response?.data;

      if (errors?.username) alert("Username error: " + errors.username.join(" "));
      else if (errors?.email) alert("Email error: " + errors.email.join(" "));
      else if (errors?.password) alert("Password error: " + errors.password.join(" "));
      else alert("Registration failed: Unknown error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
