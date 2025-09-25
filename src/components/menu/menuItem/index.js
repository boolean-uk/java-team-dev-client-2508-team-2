import { NavLink } from 'react-router-dom';
import ArrowRightIcon from '../../../assets/icons/arrowRightIcon';

const MenuItem = ({ icon, text, children, linkTo = '#nogo', onClick = () => {} }) => {
  return (
    <li onClick={onClick}>
      <NavLink to={linkTo}>
        {icon}
        <p>{text}</p>
        {children && <ArrowRightIcon />}
      </NavLink>
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default MenuItem;
