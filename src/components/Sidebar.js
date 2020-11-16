import React from 'react';
import './Sidebar.css';
import Sidebaroption from './SidebarOption';
import AppsIcon from "@material-ui/icons/Apps";
import {Link} from 'react-router-dom'

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>sidebar header</h2>
                </div>
            </div>
            <Sidebaroption Icon={AppsIcon} Title="Threads" />
            <Link to="/grid">
                <Sidebaroption Icon={AppsIcon} Title="Grid" />
            </Link>
            <hr />
            <Link to="/test1">
                <Sidebaroption Title="Placeholder 1" />
            </Link>
            <Link to="/test2">
                <Sidebaroption Title="Placeholder 2" />
            </Link>
        </div>
    )
}

export default Sidebar
