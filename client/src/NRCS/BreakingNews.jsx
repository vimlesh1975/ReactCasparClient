import React, { useState, useEffect, useCallback } from 'react';
import { addressmysql } from '../common'
import STFSingleLine from './STFSingleLine'



const data = [
    '1   Lucknow Kisan Mahapanchayat: कृषि कानूनों की वापसी 70 साल में किसान आंदोलनों की सबसे बड़ी जीत',
    '2   मुख्यमंत्री योगी आदित्यनाथ',
    '3   अमेरिका में डॉलर की बारिश: चलते ट्रक से सड़क पर नोटों से भरे कई बैग उड़े, हाईवे पर कारें खड़ी कर लूटने लगे लोग , चलने नहीं देंगे रामायण एक्सप्रेस, संतों की वेशभूषा में वेटरों पर साधुओं की चेतावनी',
    '4   मंत्रिमंडल विस्तार ',
    '5   अनुपमा सीरियल में Rupali Ganguly की मां का किरदार निभा चुकीं एक्ट्रेस Madhavi Gogate का निधन',
    '6   पाक को खदेड़ने ',
];


const BreakingNews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationStyle, setAnimationStyle] = useState({ opacity: 0, transform: 'translateX(-100%)' });
    const [dataList, setDataList] = useState(data);
    const [isStarted, setIsStarted] = useState(false);


    useEffect(() => {
        if (!isStarted || dataList.length === 0) return;

        // Display the first item immediately
        setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });

        const interval = setInterval(() => {
            // Reset animation to the starting position
            setAnimationStyle({ opacity: 0, transform: 'translateX(-100%)', transition: 'none' });

            // Update text and start the reveal animation
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % dataList.length);
                setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
            }, 50); // Slight delay for smooth transition
        }, 4000); // Change text every 1 second

        return () => clearInterval(interval); // Cleanup on unmount
    }, [dataList, isStarted]);

    const startScroll = (newData) => {
        setDataList(newData);
        setCurrentIndex(0); // Reset index to start from the beginning
        setIsStarted(true); // Start scrolling
    };
    window.startScroll = startScroll;


    const fetchRO = useCallback(async () => {
        try {
            const res = await fetch(
                addressmysql() + `/show_runorderBreakingNews`
            );
            const data = await res.json();
            const aa = [];
            data.forEach((val) => {
                if (val && val.Script) {
                    const splitText = (val.Script)?.split("$$$$");
                    // Add single quotes around each element and push to 'aa'
                    splitText.forEach((item) => {
                        aa.push(`${item.replaceAll("'", "")}`);
                    });
                }
            });
            startScroll(aa);
        } catch (error) {
            // console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchRO();
    }, [fetchRO]);

    return (
        <div>
            {/* Background Bar */}
            <div
                style={{
                    backgroundColor: '#ff8000',
                    minHeight: 80,
                    width: '100%',
                    position: 'fixed',
                    bottom: 80,
                }}
            ></div>

            {/* Text with Inline Animation */}
            {isStarted && (
                <div
                    style={{
                        ...animationStyle,
                        position: 'fixed',
                        bottom: 80,
                        left:25,
                        color: 'black',
                        fontSize: 55,
                        fontWeight: 'bolder',
                        whiteSpace: 'nowrap',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    {/* {dataList[currentIndex]} */}
                    <STFSingleLine text={dataList[currentIndex]} containerWidth={window.innerWidth-50} />
                </div>
            )}

            {/* Button to Start Scrolling */}
            <div style={{ display: (window.screen.colorDepth === 0) ? 'none' : 'block', marginTop: 20, textAlign: 'center' }}>
                <button
                    onClick={() => startScroll(['new data 1', 'new data 2', 'new data 3', 'new data 4', 'new data 5'])}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: 'blue',
                        color: 'white',
                        border: 'none',
                        borderRadius: 5,
                    }}
                >
                    Start Breaking News
                </button>
            </div>
        </div>
    );
};

export default BreakingNews;
