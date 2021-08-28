import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";

//Text Intro
export const textIntro = elem => {
    gsap.from(elem, {
        xPercent: -20,
        opacity: 0,
        stagger: 0.2,
        duration: 2,
        scale: -1,
        ease: "back",
    });
};

//Open menu
export const menuShow = (elem1, elem2) => {
    gsap.from([elem1, elem2], {
        duration: 0.7,
        height: 0,
        transformOrigin: "right top",
        skewY: 2,
        ease: "power4.inOut",
        stagger: {
            amount: 0.2,
        },
    })
}

//Close menu
export const menuHide = (elem1, elem2) => {
    gsap.to([elem1, elem2], {
        duration: 0.8,
        height: 0,
        ease: "power4.inOut",
        stagger: {
            amount: 0.07,
        },
    })
}

//Stagger links
export const staggerLinks = (elem1, elem2, elem3) => {
    gsap.from([elem1, elem2, elem3], {
        duration: 0.8,
        y: 100,
        delay: 0.1,
        ease: "power4.inOut",
        stagger: {
            amount: 0.3,
        },
    })
}

// Hover on the link
export const hoverLink = e => {
    gsap.to(e.target, {
        duration: 0.4,
        y: 3,
        skewX: 4,
        ease: "power2.inOut"
    });
};

// Hover away from the link
export const hoverExit = e => {
    gsap.to(e.target, {
        duration: 0.4,
        y: -3,
        skewX: 0,
        ease: "power2.inOut"
    });
};
//Skew gallery Images
export const skewGallery = elem1 => {
    //register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    // make the right edge "stick" to the scroll bar. force3D: true improves performance
    gsap.set(elem1, { transformOrigin: "right center", force3D: true });
    let clamp = gsap.utils.clamp(-20, 20) // don't let the skew go beyond 20 degrees. 
    ScrollTrigger.create({
        trigger: elem1,
        onUpdate: (self) => {
            const velocity = clamp(Math.round(self.getVelocity() / 300));
            gsap.to(elem1, {
                skew: 0,
                skewY: velocity,
                ease: "power3",
                duration: 0.8,
                overwrite: true,
            });
        },
    });

}