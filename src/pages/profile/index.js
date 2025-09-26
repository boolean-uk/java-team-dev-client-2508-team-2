import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileSection from "../../components/profile/ProfileSection";
import ProfileField from "../../components/profile/ProfileField";
import "./index.css";

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`http://localhost:4000/users/${id}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch profile");

                const json = await res.json();
                setProfile(json.data.profile);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) return <p>Loading profile...</p>;
    if (!profile) return <p>No profile found.</p>;

    const {
        firstName,
        lastName,
        phone,
        bio,
        githubUrl,
        jobTitle,
        user: userData,
    } = profile;

    const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`;

    return (
        <main className="profile-main">
            <div className="profile-page">
                <h1 className="profile-title">Profile</h1>

                <div className="profile-card">
                    <div className="profile-header-row">
                        <div className="profile-avatar">{initials}</div>
                        <div>
                            <h2 className="profile-name">
                                {firstName} {lastName}
                            </h2>
                            <p className="profile-subtitle">
                                {userData.cohort?.specialisation?.name || "—"}
                            </p>
                        </div>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-left">
                            <ProfileSection title="Basic Info">
                                <ProfileField label="First name" value={firstName} />
                                <ProfileField label="Last name" value={lastName} />
                                <ProfileField label="GitHub" value={githubUrl} />
                            </ProfileSection>
                        </div>

                        <div className="profile-right">
                            {userData.student ? (
                                <ProfileSection title="Training Info">
                                    <ProfileField
                                        label="Role"
                                        value={userData.roles[0].name.replace("ROLE_", "")}
                                    />
                                    <ProfileField
                                        label="Cohort"
                                        value={userData.cohort?.name || userData.cohort?.id || "—"}
                                    />
                                    <ProfileField
                                        label="Specialisation"
                                        value={userData.cohort?.specialisation?.name || "—"}
                                    />
                                    <ProfileField
                                        label="Start date"
                                        value={userData.cohort?.startDate || "—"}
                                    />
                                    <ProfileField
                                        label="End date"
                                        value={userData.cohort?.endDate || "—"}
                                    />
                                </ProfileSection>
                            ) : (
                                <ProfileSection title="Professional Info">
                                    <ProfileField
                                        label="Role"
                                        value={userData.roles[0].name.replace("ROLE_", "") || "—"}
                                    />
                                    <ProfileField
                                        label="Job title"
                                        value={jobTitle || "—"}
                                    />
                                    <ProfileField
                                        label="Specialisation"
                                        value={userData.cohort?.specialisation?.name || "—"}
                                    />
                                </ProfileSection>
                            )}
                        </div>

                        <div className="profile-left">
                            <ProfileSection title="Contact Info">
                                <ProfileField label="Email" value={userData.email} />
                                <ProfileField label="Phone" value={phone} />
                            </ProfileSection>
                        </div>

                        <div className="profile-right">
                            <ProfileSection title="Bio">
                                <ProfileField label="Bio" value={bio} multiline />
                            </ProfileSection>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
