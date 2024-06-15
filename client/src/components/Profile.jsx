import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if(!token){
          alert("No token found");
          return;
        }

        const response = await axios.get('http://localhost:3001/user/getUser', {
          headers: { Authorization : 'Bearer ' + token}
        });

        setProfile(response.data);
      }
      catch(err) {
        alert("Error getting profile");
      }
    }

    setProfile();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-item-center shadow-lg box">
        <div className="avatar">
          <img
            src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
            width='200px' height='200px' alt=""
          />
        </div>
        <div className="outer">
          <div className="name">
            <h2>{profile.name}</h2>
          </div>
          <div className="email">
            <h5>{profile.email}</h5>
          </div>
          <div className="logout">
            <button
             onClick={() => navigate('/')}
             type="submit" className="btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
