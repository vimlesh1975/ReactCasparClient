import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
// import anime from "animejs";
import { gsap } from 'gsap';


const Xyz = () => {
    const divRef = useRef(null); // Correct ref name

    useEffect(() => {
        let socket;

        if (window.location.origin !== "https://vimlesh1975.github.io") {
            socket = io(":9000"); // Use `io()` instead of `new socketIOClient()`
        } else {
            socket = io("https://octopus-app-gzws3.ondigitalocean.app");
        }



        // Listen for connection event
        socket.on("connect", () => {
            socket.on("DataFromCanvas2", (data) => {
                divRef.current.innerHTML = data.svg;
                // eslint-disable-next-line 
                // eval(data.script); // Execute script (Only if it's safe)

                // anime({
                //     targets: 'rect, text, circle, ellipse, line, polyline, polygon,path, foreignObject, image',
                //     // targets: 'g',
                //     translateX: [-500, 0],
                //     translateY: [500, 0],
                //     delay: anime.stagger(10)
                // });

                var elements = document.querySelectorAll('rect, image, text, path, circle');
                const sortedElements = Array.from(elements).sort(function (a, b) {
                    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
                });

                //    document.body.style.opacity = 1;
                sortedElements.forEach((element, index) => {
                    var pathTransform = 0;
                    if (element.tagName === 'path') {
                        pathTransform = element.transform.animVal[0].matrix.e
                    }
                    // console.log(element.transform.animVal[0].matrix.e)
                    const scalefactor = element.parentNode.getCTM().a;
                    gsap.set(element, { x: -2100 / scalefactor, opacity: 0 });
                    gsap.to(element, {
                        x: (element.tagName === 'path') ? pathTransform : 0,
                        opacity: 1,
                        duration: 0.5,
                        delay: index * 0.03,
                        ease: "",
                    });
                });



            });
            socket.emit("Iamready", socket.id); // Emit after connection is established
        });

        return () => {
            socket.off("DataFromCanvas2");
        };
    }, []);

    return (
        <div ref={divRef} >
            {/* Hello Xyz */}
        </div>
    );
};

export default Xyz;
