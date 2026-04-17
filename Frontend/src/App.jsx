import { useState } from "react";

const BASE_URL = "http://localhost:3000/api";

function App() {
  const [user, setUser] = useState(null);
  const [music, setMusic] = useState([]);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // REGISTER
  const register = async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setUser(data.user);
      getMusic();
    }
  };

  // LOGIN
  const login = async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      setUser(data.user);
      getMusic();
    }
  };

  // GET MUSIC (protected)
  const getMusic = async () => {
    const res = await fetch(`${BASE_URL}/music`, {
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setMusic(data);
    } else {
      alert(data.message);
    }
  };

  // UPLOAD MUSIC (ONLY artist)
  const uploadMusic = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("music", file);
    formData.append("title", "My Song");

    const res = await fetch(`${BASE_URL}/music/upload`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
    getMusic();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Spotify Backend UI 🎵</h1>

      {!user ? (
        <>
          <h2>Auth</h2>

          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} />

          <select name="role" onChange={handleChange}>
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>

          <br /><br />

          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h2>Welcome {user.username}</h2>

          <button onClick={getMusic}>Load Songs</button>

          {/* Only artist can upload */}
          {user.role === "artist" && (
            <>
              <h3>Upload Music</h3>
              <input type="file" onChange={uploadMusic} />
            </>
          )}

          <ul>
            {music.map((m) => (
              <li key={m._id}>
  🎵 {m.title} — {m.artist?.username}
  <br />
  <audio controls src={m.uri}></audio>
</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;