import SquareBracketsIcon from './squareBracketsIcon';
import CogIcon from './cogIcon';
import MonitorIcon from './monitorIcon';
import DataIcon from './dataIcon';

const CohortIcon = ({ specialisation }) => {
  if (specialisation === 1) {
    return (
      <>
        <div className="cohort-avatar software">
          <SquareBracketsIcon color="white" />
        </div>
      </>
    );
  }
  if (specialisation === 2) {
    return (
      <>
        <div className="cohort-avatar front-end">
          <MonitorIcon color="white" />
        </div>
      </>
    );
  }
  if (specialisation === 3) {
    return (
      <>
        <div className="cohort-avatar data">
          <DataIcon color="rgba(249, 251, 252, 1)" />
        </div>
      </>
    );
  }
  return <CogIcon />;
};

export default CohortIcon;
