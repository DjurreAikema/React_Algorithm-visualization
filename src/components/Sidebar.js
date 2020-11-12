import React from 'react';
import './Sidebar.css';
import Sidebaroption from './SidebarOption';
import AppsIcon from "@material-ui/icons/Apps";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>sidebar header</h2>
                </div>
            </div>
            <Sidebaroption Icon={AppsIcon} Title="Threads" />
            <Sidebaroption Icon={AppsIcon} Title="Threads" />
            <hr />
            <Sidebaroption Title="Placeholder 1" />
            <Sidebaroption Title="Placeholder 2" />
        </div>
    )
}

export default Sidebar
