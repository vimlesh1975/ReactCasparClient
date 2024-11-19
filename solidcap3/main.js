// var filter1 = document.getElementsByTagName('defs')[0];
// filter1.innerHTML = '<filter id="filter1" x="0" y="0" width="100%" height="100%"> <feSpecularLighting result="spec1" specularExponent="12" lighting-color="yellow"> <fePointLight x="0" y="0" z="14" > <animate attributeName="x" values="-467.5;517.5;517.5" keyTimes="0;0.5; 1" dur="3s" repeatCount="indefinite" /> </fePointLight> </feSpecularLighting> <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /> </filter>'
// var allRectangles = document.getElementsByTagName('rect');

// Array.from(allRectangles).forEach((element) => {
//     element.style.filter = 'url(#filter1)';
// });


// Define the first filter with light moving from left to right
var filter1 = document.getElementsByTagName('defs')[0];
filter1.innerHTML = `
  <filter id="filter1" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting result="spec1" specularExponent="12" lighting-color="yellow">
      <fePointLight x="0" y="38" z="8">
        <animate attributeName="x" values="-467.5;517.5;517.5" keyTimes="0;0.5;1" dur="10s" repeatCount="indefinite" />
      </fePointLight>
    </feSpecularLighting>
    <feComposite in="SourceGraphic" in2="spec1" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
  </filter>

  <!-- Second filter with light moving in the opposite direction -->
  <filter id="filter2" x="0" y="0" width="100%" height="100%">
    <feSpecularLighting result="spec2" specularExponent="12" lighting-color="yellow">
      <fePointLight x="0" y="-38" z="14">
        <animate attributeName="x" values="517.5;-467.5;-467.5" keyTimes="0;0.5;1" dur="10s" repeatCount="indefinite" />
      </fePointLight>
    </feSpecularLighting>
    <feComposite in="SourceGraphic" in2="spec2" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
  </filter>
`;

// Apply the first filter to all rectangles with an even index
var allRectangles = document.getElementsByTagName('rect');
Array.from(allRectangles).forEach((element, index) => {
  element.style.filter += 'url(#filter1)';
  element.style.filter += 'url(#filter2)';
});


const scriptgsap = document.createElement("script");
scriptgsap.src = "./js/gsap.min.js";
scriptgsap.setAttribute("type", "text/javascript");
var outAnimation;
var elements = document.querySelectorAll('rect, image, text, path, circle');


scriptgsap.onload = function () {
  setTimeout(() => {
    // timeout is nessaesaary to set all variable set by client.
    const sortedElements = Array.from(elements).sort(function (a, b) {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

    document.body.style.opacity = 1;
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

    outAnimation = () => {
      sortedElements.forEach((element, index) => {
        const scalefactor = element.parentNode.getCTM().a;
        gsap.set(element, { x: -2100 / scalefactor, opacity: 0 });
        gsap.from(element, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: (sortedElements.length - index - 1) * 0.03,
          ease: "power2.out"
        });
      });

    }
  }, 100);

  // setTimeout(() => {
  //     outAnimation();
  // }, 4000);
};



document.body.appendChild(scriptgsap);
