import { textIntro } from "./Animate";
import React, { useEffect, useRef } from 'react';
import './App.css';
import {
    useParams
} from "react-router-dom";

const AllElements = (props) => {
    let intro = useRef(null)
    useEffect(() => {
        textIntro(intro)
    }, [])
    const { f0 } = useParams();
    const data = f0.replace(new RegExp(String.fromCharCode(2), "g"), '"').replace(new RegExp(String.fromCharCode(3), "g"), ' ').replace(new RegExp(String.fromCharCode(4), "g"), '/').replace(new RegExp(String.fromCharCode(5), "g"), '%')
    useEffect(() => {

        document.getElementById('gg').innerHTML = data;
        return () => {
        }
    })
    return (


        <div ref={(el) => (intro = el)} className='output' id='gg'></div>


    )
}

export default AllElements
