import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileSection from "../../components/profile/ProfileSection";
import ProfileField from "../../components/profile/ProfileField";
import "./index.css";

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [originalProfile, setOriginalProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (message || error) {
            const timer = setTimeout(() => {
                setMessage(null);
                setError(null);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

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
                setOriginalProfile(json.data.profile);
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    const validateEmail = (email) => {
        if (!email) return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        if (!phone) return true;
        const regex = /^\+?[0-9\s-]{6,15}$/;
        return regex.test(phone);
    };

    const hasChanges = () => {
        return JSON.stringify(profile) !== JSON.stringify(originalProfile);
    };

    const isValid = () => {
        if (profile.user.id === parseInt(id) && !validateEmail(profile.user.email)) {
            return false;
        }
        if (!validatePhone(profile.phone)) {
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            let payload = {
                firstName: profile.firstName,
                lastName: profile.lastName,
                githubUrl: profile.githubUrl,
                phone: profile.phone,
                bio: profile.bio,
            };

            if (profile.user.id === parseInt(id)) {
                payload.email = profile.user.email;
                payload.jobTitle = profile.jobTitle;
            } else if (profile.user.teacher || profile.user.roles.some(r => r.name === "ROLE_TEACHER")) {
                payload.jobTitle = profile.jobTitle;
                payload.cohortId = profile.user.cohort?.id || 0;
                payload.specialisationId = profile.user.cohort?.specialisation?.id || 0;
                payload.roles = profile.user.roles.map((r) => r.name);
            }

            const res = await fetch(`http://localhost:4000/users/${id}/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.message || "Failed to update profile");
            }

            setMessage("Profile updated successfully");
            setError(null);
            setOriginalProfile(profile);
            setIsEditing(false);
        } catch (err) {
            console.error("Error saving profile:", err);
            setError(err.message || "Failed to save profile");
        }
    };

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

                {message && <div className="success-message">{message}</div>}
                {error && <div className="error-message">{error}</div>}

                <div className="profile-card">
                    <div className="profile-header-row">
                        <div className="profile-avatar">{initials}</div>
                        <div className="profile-header-info">
                            <h2 className="profile-name">
                                {firstName} {lastName}
                            </h2>
                            <p className="profile-subtitle">
                                {userData.cohort?.specialisation?.name || "—"}
                            </p>
                        </div>

                        <div className="profile-actions">
                            {!isEditing ? (
                                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                            ) : (
                                <>
                                    <button
                                        className="save-btn"
                                        onClick={handleSave}
                                        disabled={!hasChanges() || !isValid()}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="cancel-btn"
                                        onClick={() => {
                                            setProfile(originalProfile);
                                            setIsEditing(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-left">
                            <ProfileSection title="Basic Info">
                                <ProfileField
                                    label="First name"
                                    value={firstName}
                                    editable={isEditing}
                                    onChange={(e) =>
                                        setProfile({ ...profile, firstName: e.target.value })
                                    }
                                />
                                <ProfileField
                                    label="Last name"
                                    value={lastName}
                                    editable={isEditing}
                                    onChange={(e) =>
                                        setProfile({ ...profile, lastName: e.target.value })
                                    }
                                />
                                <ProfileField
                                    label="GitHub"
                                    value={githubUrl}
                                    editable={isEditing}
                                    onChange={(e) =>
                                        setProfile({ ...profile, githubUrl: e.target.value })
                                    }
                                />
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
                                        editable={isEditing}
                                        onChange={(e) =>
                                            setProfile({ ...profile, jobTitle: e.target.value })
                                        }
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
                                <ProfileField
                                    label="Email"
                                    value={userData.email}
                                    editable={isEditing && profile.user.id === parseInt(id)}
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            user: { ...userData, email: e.target.value },
                                        })
                                    }
                                />
                                <ProfileField
                                    label="Phone"
                                    value={phone}
                                    editable={isEditing}
                                    onChange={(e) =>
                                        setProfile({ ...profile, phone: e.target.value })
                                    }
                                />
                            </ProfileSection>
                        </div>

                        <div className="profile-right">
                            <ProfileSection title="Bio">
                                <ProfileField
                                    label="Bio"
                                    value={bio}
                                    editable={isEditing}
                                    textarea
                                    onChange={(e) =>
                                        setProfile({ ...profile, bio: e.target.value })
                                    }
                                />
                            </ProfileSection>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
