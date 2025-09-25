import './menu.css';

const Menu = ({ children, className, style = {} }) => {
  return (
    <div className={`menu ${className}`} style={style}>
      <ul>{children}</ul>
    </div>
  );
};

export default Menu;
