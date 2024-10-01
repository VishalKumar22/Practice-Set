import { useEffect, useState } from "react";
import { profile } from "../axios/actions";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await profile();
                console.log(response, 'Profile data fetched');
                if (response && response.data) {
                    setProfileData(response.data);
                } else {
                    console.error("No data found in response");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchData();
    }, []); 

    const handleEdit = () => {
        navigate('/', { state: { profileData } });
    };

    return (
        <>
            {profileData ? (
                <div>
                    <h2>Profile Information</h2>
                    <ul>
                        <li><strong>Username:</strong> {profileData.username}</li>
                        <li><strong>Email:</strong> {profileData.email}</li>
                        <li><strong>Phone:</strong> {profileData.phone}</li>
                    </ul>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            ) : (
                <p>Loading profile data...</p>
            )}
        </>
    );
}

export default Profile;
