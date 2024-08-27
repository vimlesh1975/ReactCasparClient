import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Tsparticles2 = () => {
    const particlesInit = useCallback(async (engine) => {
        // console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        const aa = await container;
        window.tsParticles = aa._engine;
    }, []);

    return (<div>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
        />
    </div>);
};
export default Tsparticles2