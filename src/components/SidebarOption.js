import React from 'react';
import './SidebarOption.css';

function Sidebaroption({Icon, Title}) {
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon" />}
            {Icon ? (<h3>{Title}</h3>):(<h3 className="sidebarOption__channel"><span>#</span> {Title}</h3>)}
        </div>
    )
}

export default Sidebaroption
