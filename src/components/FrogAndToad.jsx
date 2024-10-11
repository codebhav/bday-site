import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FrogAndToad = () => {
    return (
        <div className="bg-zinc-950">
            <TextParallaxContent
                imgUrl="https://i.imgur.com/f6DZJGN.jpeg"
                heading='"What did you write in the letter?"'
                subheading="Frog said."
            >
                <ExampleContent />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl="https://i.imgur.com/RwNGZJe.png"
                heading='"I wrote `Dear Toad, I am glad that you are my best friend.'
                subheading='Your best friend, Frog.`"'
            >
                <ExampleContent />
            </TextParallaxContent>
            <TextParallaxContent
                imgUrl="https://i.imgur.com/Tt9JpU3.png"
                heading='"Oh",'
                subheading='said Toad. "That makes a very good letter."'
            >
                <ExampleContent />
            </TextParallaxContent>
        </div>
    );
};

const IMG_PADDING = 40;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
                <StickyImage imgUrl={imgUrl} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const StickyImage = ({ imgUrl }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
        >
            <motion.div
                className="absolute inset-0 bg-neutral-950/70"
                style={{
                    opacity,
                }}
            />
        </motion.div>
    );
};

const OverlayCopy = ({ subheading, heading }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            style={{
                y,
                opacity,
            }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
            <p className="text-center text-4xl font-bold md:text-7xl">
                {heading}
            </p>
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
        </motion.div>
    );
};

const ExampleContent = () => (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        {/*  */}
    </div>
);

export default FrogAndToad;
