'use client';

import React from 'react';
import Count from './Count';
import dynamic from 'next/dynamic';
import Triangles from './Triangles';

const Clock = dynamic(() => import('./Clock'), { ssr: false });

const ScrollView = ({
    scrollContainerStyle, scrollingTextStyle, currentFont, fontBold,
    isRTL, fontColor, allContent, currentStoryNumber, crossedLines,
    storyLines, slugs, newsReaderText, showClock, startPosition,
    contentRefs, textRef
}) => {
    return (
        <div>
            <div style={{
                backgroundColor: 'lightgray',
                color: 'blue',
                fontSize: 18 * 2.5,
                fontWeight: 'bolder',
                width: 1920
            }}>
                <div style={{
                    backgroundColor: 'lightgreen',
                    width: `${Math.min((crossedLines / storyLines[currentStoryNumber - 1]) * 100, 100)}%`
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-around', width: 1920 }}>
                        <div>{`Cur: ${currentStoryNumber} (${currentStoryNumber}/${slugs?.length})`}</div>
                        <div>{newsReaderText}</div>
                        <div><Count currentStoryNumber={currentStoryNumber} /></div>
                        <div>{showClock ? '' : '.'}</div>
                        <div style={{ display: showClock ? 'inline' : 'none', color: 'red' }}><Clock /></div>
                        <div>{crossedLines}/{storyLines[currentStoryNumber - 1]}</div>
                    </div>
                </div>
            </div>
            {
                <div style={scrollContainerStyle}>
                    <div ref={textRef} style={scrollingTextStyle}>
                        {allContent.map((content, i) => (
                            <div
                                key={i}
                                dir={(i % 3 === 1) ? (isRTL ? 'rtl' : 'ltr') : 'ltr'}
                                ref={(el) => (contentRefs.current[i] = el)}
                                style={{
                                    fontFamily: (i % 3 === 1) ? currentFont : 'Times New Roman',
                                    backgroundColor: i % 3 === 0 ? 'blue' : 'transparent',
                                    color: i % 3 === 0 ? 'yellow' : fontColor,
                                    fontWeight: (i % 3 === 1) ? (fontBold ? 'bold' : 'normal') : 'normal'
                                }}
                            >
                                {content}
                            </div>
                        ))}
                    </div>
                    <div style={{ position: 'absolute', top: parseInt(startPosition) - 50 }}>
                        <Triangles />
                    </div>
                </div>}

        </div>
    );
};

export default ScrollView;
