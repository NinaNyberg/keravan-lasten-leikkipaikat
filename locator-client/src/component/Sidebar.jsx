import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import playgroundImg from '../assets/playground-svgrepo-com.png';

import './sidebarStyles.css';

const Sidebar = ({ flyToCenter, playgrounds, flyToPlayground }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTrigger = () => setIsOpen(!isOpen);

  return (
    <div>
      <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div onClick={handleTrigger} className="trigger">
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faPlus}
            style={{
              background: isOpen ? 'transparent' : 'rgba(35, 55, 75, 0.9)'
            }}
          />
        </div>

        <div className="heading">
          <img
            src={playgroundImg}
            alt="playground-icon"
            className="playground-img"
            onClick={() => {
              flyToCenter();
            }}
          />
          <h1
            className="heading-title"
            onClick={() => {
              flyToCenter();
            }}
          >
            Locations
          </h1>
        </div>
        <hr></hr>
        <div className="listings">
          {playgrounds &&
            playgrounds.map((playground, index) => (
              <div
                className="playground-listing sidebar-position"
                key={index}
                onClick={() => {
                  flyToPlayground(playground);
                }}
              >
                <h3 className="playground-name">
                  {playground.properties.playgroundName}
                </h3>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
