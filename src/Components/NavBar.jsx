import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='w-screen h-[60px] flex items-center px-4 bg-orange-500 text-gray-300 border-2 border-black shadow-5xl z-10'>
      <div className="flex-none">WayfinderABA</div>
      <div className="flex-grow flex items-center justify-center">
        <div className="flex space-x-4 text-3xl">
          <NavLink 
            to="/identify-name" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Finder
          </NavLink>
          <NavLink 
            to="/identify-object" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            TBD
          </NavLink>
          <NavLink 
            to="/identify-emotion" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            TBD
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
