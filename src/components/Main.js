import React from 'react';
import "./Main.css";

function Main() {
    return (
        <div className="main">
            <div className="main__header">
                <div className="main__headerLeft">
                    <h4 className="main__channelName">
                        Header left
                    </h4>
                </div>
                <div className="main__headerRight">
                    <p>
                        header right
                    </p>
                </div>
            </div>
            <div className="main__body">
                main body
            </div>
            <div className="main__footer">
                main footer
            </div>
        </div>
    )
}

export default Main
 