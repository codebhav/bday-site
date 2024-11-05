import { ReactLenis } from "lenis/dist/lenis-react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useTransform,
} from "framer-motion";
import FrogAndToad from "./FrogAndToad";
import { useRef } from "react";

export const PhotoParallax = () => {
    return (
        <div className="bg-zinc-950">
            <ReactLenis
                root
                options={{
                    lerp: 0.05,
                    smoothWheel: true,
                    smoothTouch: true,
                    touchMultiplier: 2,
                    wheelMultiplier: 1,
                    gestureOrientation: "vertical",
                    orientation: "vertical",
                }}
            >
                <Hero />
                <Schedule />
            </ReactLenis>
        </div>
    );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
    return (
        <div
            style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
            className="relative w-full"
        >
            <CenterImage />

            <ParallaxImages />

            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
        </div>
    );
};

const CenterImage = () => {
    const { scrollY } = useScroll();

    const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
    const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

    const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

    const backgroundSize = useTransform(
        scrollY,
        [0, SECTION_HEIGHT + 500],
        ["170%", "100%"]
    );
    const opacity = useTransform(
        scrollY,
        [SECTION_HEIGHT, SECTION_HEIGHT + 500],
        [1, 0]
    );

    return (
        <motion.div
            className="sticky top-0 h-screen w-full"
            style={{
                clipPath,
                backgroundSize,
                opacity,
                backgroundImage: `url(/fairy.png)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        />
    );
};

const ParallaxImages = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 pt-[200px]">
            <ParallaxImg
                src="delhi.jpeg"
                alt="And example of a space launch"
                start={-200}
                end={200}
                className="w-1/3"
            />
            <ParallaxImg
                src="percy.png"
                alt="An example of a space launch"
                start={100}
                end={-250}
                className="mx-auto w-2/3"
            />
            <ParallaxImg
                src="ghar.jpeg"
                alt="Orbiting satellite"
                start={0}
                end={-600}
                className="ml-auto w-5/12"
            />
            <ParallaxImg
                src="pixie.jpeg"
                alt="Orbiting satellite"
                start={-760}
                end={-600}
                className="ml-24 w-3/12"
            />
        </div>
    );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: [`${start}px end`, `end ${end * -1}px`],
    });

    const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

    const y = useTransform(scrollYProgress, [0, 1], [start, end]);
    const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            ref={ref}
            style={{ transform, opacity }}
        />
    );
};

const Schedule = () => {
    return (
        <section id="launch-schedule">
            <motion.h1
                initial={{ y: 48, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.75 }}
                className="mb-20 text-4xl font-black uppercase text-zinc-50"
            ></motion.h1>
            <FrogAndToad />
        </section>
    );
};

export default PhotoParallax;
