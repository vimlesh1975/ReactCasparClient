import React, { useState, useEffect, useCallback } from 'react';
import { addressmysql } from '../common'
import STFMultine from './STFMultine'
import { useParams } from 'react-router-dom';

// eslint-disable-next-line
import red_news_update from './gif/red_news_update.gif'

// eslint-disable-next-line
import yellow_news_update from './gif/yellow_news_update.gif'

// eslint-disable-next-line
import red_breaking_news from './gif/red_breaking_news.gif'

// eslint-disable-next-line
import yellow_breaking_news from './gif/yellow_breaking_news.gif'

import {  useDispatch } from "react-redux";


var red = true;
red = false

const data = [
    "रायगड जिल्ह्यातील उरण तालुक्यात राहणारे उरण तालुक्याचे सुपुत्र रोहित शरद घरत यांनी उत्कृष्ट कामगिरी करत कास्य पदक पटकाविले आहे.\n\n",
    "कौलालमपूर, मलेशिया येथे गोशीन रियू कराटे असोसिएशन (इंडिया )तर्फे आयोजित केलेल्या आंतरराष्ट्रीय कराटे स्पर्धेत ८४ ",
    "५० व्या गोल्डन ज्यूबिली युनिव्हर्सरी इंटरनॅशनल टूर्नामेंट अँड ट्रेनिंग कॅम्प २०२४ अंतर्गत ११ ते १४ डिसेंबर २०२४ दरम्यान मेणारा, PT ८०, "
]

const Twoliner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationStyle, setAnimationStyle] = useState({ opacity: 0, transform: 'translateX(100%)' });
    const [dataList, setDataList] = useState(data);
    const [isStarted, setIsStarted] = useState(false);
    const { selectedDate, NrcsBreakingText } = useParams();

    const dispatch = useDispatch();
    window.dispatch = dispatch;

    useEffect(() => {
        if (!isStarted || dataList.length === 0) return;

        setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });

        const interval = setInterval(() => {
            setAnimationStyle({ opacity: 0, transform: 'translateX(100%)', transition: 'none' });

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % dataList.length);
                setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
            }, 50); // Slight delay for smooth transition
        }, 10000); // Change text every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [dataList, isStarted]);

    const startScroll = (newData) => {
        setDataList(newData);
        setCurrentIndex(0); // Reset index to start from the beginning
        setIsStarted(true); // Start scrolling
    };
    window.startScroll = startScroll;

    useEffect(() => {
        function handleMessage(event) {
            if (!event.data.data) return;
            if (event.data?.action === "callFunction") {
               dispatch({ type: "NRCSBREAKINGTEXT", payload: event.data.data });
            }
        }
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [dispatch]);

    const fetchRO = useCallback(async () => {
        try {
            const res = await fetch(
                addressmysql() + `/show_runorderSpecial?param1=${'Two Liner'}&param2=${selectedDate}`
            );
            const data = await res.json();
            const aa = [];
            data.forEach((val) => {
                if (val && val.Script) {
                    const splitText = (val.Script)?.split("$$$$");
                    splitText.forEach((item) => {
                        aa.push(`${item.replaceAll("'", "")}`);
                    });
                }
            });
            startScroll(aa);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [selectedDate]);

    useEffect(() => {
        fetchRO();
    }, [fetchRO]);

    return (
        <div>
            {/* Background Bar */}
            <div
                style={{
                    // backgroundColor: '#ff8000',
                    minHeight: 80,
                    width: '100%',
                    position: 'fixed',
                    top: red ? 42 : 15,
                }}
            >
                {/* <img src={red_news_update} alt="red_news_update.gif" /> */}
                {/* <img src={red_breaking_news} alt="red_breaking_news.gif" /> */}

                {(NrcsBreakingText==='true' )? <img src={yellow_breaking_news} alt="yellow_breaking_news.gif" /> : <img src={yellow_news_update} alt="yellow_news_update.gif" />}
                {/* <img src={yellow_news_update} alt="yellow_news_update.gif" /> */}
                {/* <img src={yellow_breaking_news} alt="yellow_breaking_news.gif" /> */}

            </div>

            {/* Text with Inline Animation */}
            {isStarted && (
                <div
                    style={{
                        ...animationStyle,
                        position: 'fixed',
                        // top: red ? 842 : 865,
                        top: red ? 842 : 885,
                        left: red ? 500 : 40,
                        color: 'black',
                        fontWeight: 'bolder',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    {/* {dataList[currentIndex]} */}
                    <STFMultine text={dataList[currentIndex]} containerWidth={window.innerWidth - (red ? 550 : 100)} containerHeight={110} fs={red ? 180 : 60} />
                </div>
            )}

        </div>
    );
};

export default Twoliner;
