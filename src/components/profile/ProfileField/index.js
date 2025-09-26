import React from "react";
import "./index.css";

const ProfileField = ({ label, value, multiline = false }) => {
    return (
        <div className="profile-field">
            <label className="profile-label">{label}</label>
            {multiline ? (
                <textarea
                    value={value || "—"}
                    readOnly
                    className="profile-textarea"
                    rows={4}
                />
            ) : (
                <input
                    type="text"
                    value={value || "—"}
                    readOnly
                    className="profile-input"
                />
            )}
        </div>
    );
};

export default ProfileField;
