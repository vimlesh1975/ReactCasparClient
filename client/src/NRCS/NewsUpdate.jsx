import React, { useState, useEffect, useCallback } from 'react';
import { addressmysql } from '../common'
import STFSingleLine from './STFSingleLine'
import news_update from './gif/news_update.gif'
import { useParams } from 'react-router-dom';



const data = [
    '1   Lucknow Kisan Mahapanchayat: कृषि कानूनों की वापसी 70 साल में किसान आंदोलनों की सबसे बड़ी जीत',
    '2   मुख्यमंत्री योगी आदित्यनाथ',
    '3   अमेरिका में डॉलर की बारिश: चलते ट्रक से सड़क पर नोटों से भरे कई बैग उड़े, हाईवे पर कारें खड़ी कर लूटने लगे लोग , चलने नहीं देंगे रामायण एक्सप्रेस, संतों की वेशभूषा में वेटरों पर साधुओं की चेतावनी',
    '4   मंत्रिमंडल विस्तार ',
    '5   अनुपमा सीरियल में Rupali Ganguly की मां का किरदार निभा चुकीं एक्ट्रेस Madhavi Gogate का निधन',
    '6   पाक को खदेड़ने ',
];


const NewsUpdate = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationStyle, setAnimationStyle] = useState({ opacity: 0, transform: 'translateX(0%)' });
    const [dataList, setDataList] = useState(data);
    const [isStarted, setIsStarted] = useState(false);
    const { selectedDate } = useParams();


    useEffect(() => {
        if (!isStarted || dataList.length === 0) return;

        // Display the first item immediately
        setTimeout(() => {
        setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
            
        }, 1700);

        const interval = setInterval(() => {
            // Reset animation to the starting position
            setAnimationStyle({ opacity: 0, transform: 'translateX(0%)', transition: 'none' });

            // Update text and start the reveal animation
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % dataList.length);
                setAnimationStyle({ opacity: 1, transform: 'translateX(0)', transition: 'opacity 0.5s ease, transform 0.5s ease' });
            }, 1700); // Slight delay for smooth transition
        }, 9000); // Change text every 1 second

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
                addressmysql() + `/show_runorderSpecial?param1=${'News Update'}&param2=${selectedDate}`
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
                    bottom: 52,
                }}
            >
                            <img src={news_update} alt="news_update" style={{ width: '100%', height: '100%', transform: 'scale(1, 0.6)'  }} />
            
            </div>

            {/* Text with Inline Animation */}
            {isStarted && (
                <div
                    style={{
                        ...animationStyle,
                        position: 'fixed',
                        bottom: 80,
                        left:25,
                        color: 'black',
                        fontSize: 53,
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

           
        </div>
    );
};

export default NewsUpdate;
