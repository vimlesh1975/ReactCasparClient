import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";

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
                eval(data.script); // Execute script (Only if it's safe)
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
