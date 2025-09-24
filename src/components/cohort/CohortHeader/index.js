import React from "react";
import CohortIcon from "../../../assets/icons/cohortIconSpecialisationIcon";
import "./index.css";

const CohortHeader = ({ cohort }) => {
    if (!cohort) return null;

    return (
        <div className="cohort-header">
            <div className="cohort-avatar">
                <CohortIcon specialisation={cohort.specialisation.id} />
            </div>
            <div className="cohort-header-info">
                <p className="cohort-header-title">
                    {cohort.specialisation.name}, {cohort.name}
                </p>
                <small>
                    {cohort.startDate && cohort.endDate
                        ? `${cohort.startDate} – ${cohort.endDate}`
                        : "No dates set"}
                </small>
            </div>
        </div>
    );
};

export default CohortHeader;
