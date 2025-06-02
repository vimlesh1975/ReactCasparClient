import React, { useEffect, useState, cloneElement } from 'react';
import ReactDOM from 'react-dom';

function NewWindowforfullscreen({ children, onClose, newWindowRef, scrollWidth, scrollHeight }) {
    const [container, setContainer] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(1);

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (newWindowRef.current) {
                newWindowRef.current.close();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (!newWindowRef.current || newWindowRef.current.closed) {
            newWindowRef.current = window.open('', '', `width=${scrollWidth + 20},height=${scrollHeight + 40}`);


        }
        if (!newWindowRef.current) {
            return;
        }
        let containerDiv = newWindowRef.current.document.getElementById('root');
        if (!containerDiv) {
            containerDiv = newWindowRef.current.document.createElement('div');
            containerDiv.setAttribute('id', 'root');
            newWindowRef.current.document.body.appendChild(containerDiv);

            newWindowRef.current.document.body.style.overflow = 'hidden';
            newWindowRef.current.document.body.style.transform = `scale(0.410,0.43)`;

            newWindowRef.current.document.body.style.transformOrigin = 'top left';

        }
        setContainer(containerDiv);
        newWindowRef.current.addEventListener('beforeunload', onClose);


        newWindowRef.current.resizeTo(newWindowRef.current.screen.width - 1, newWindowRef.current.screen.height - 1);
        newWindowRef.current.moveTo(0, 0);

        containerDiv.style.transformOrigin = '5px 0';
        const screenHeight = newWindowRef.current.screen.height;

        const knownOrigins = {
            1080: 160,
            1050: 165,
            1024: 160,
            960: 153,
            900: 155,
            864: 155,
            800: 150,
            768: 150,
            720: 140,
            664: 145,
            600: 135,
        };
        const sf = (screenHeight - (knownOrigins[screenHeight] || 150)) / scrollHeight;
        containerDiv.style.transform = `scale(${newWindowRef.current.screen.width / scrollWidth}, ${sf} )`;
        setScaleFactor(sf);

        return () => {
            newWindowRef.current.removeEventListener('beforeunload', onClose);
        };
    }, []);

    const childrenWithProps = React.Children.map(children, (child) =>
        cloneElement(child, { scaleFactor })
    );

    return container ? ReactDOM.createPortal(childrenWithProps, container) : null;
}
export default NewWindowforfullscreen;
