import React, {useEffect, useState} from 'react'
import './Popup.css'
import axios from "axios";


function Popup(props) {


    return props.trigger ? (
        <div className="popup">
            <div className='popup-inner'>
                

            </div>
        </div>
    )  : "";
}

export default Popup