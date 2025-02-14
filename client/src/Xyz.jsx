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

        socket.on("DataFromCanvas2", (data) => {
            divRef.current.innerHTML = data;
            // console.log("Received:", data);
        });

        socket.emit("Iamready", socket.id);
       
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
