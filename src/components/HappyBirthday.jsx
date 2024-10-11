import React from "react";
import styles from "./bubble.module.css";

const HappyBirthday = () => {
    return (
        <div className="grid place-content-center">
            <BubbleText />
        </div>
    );
};

const BubbleText = () => {
    return (
        <h2 className="max-w-5xl text-7xl font-thin text-indigo-300">
            {"haaaaappy birthdayyyyyyy, sushi!".split("").map((child, idx) => (
                <span className={styles.hoverText} key={idx}>
                    {child}
                </span>
            ))}
        </h2>
    );
};

export default HappyBirthday;
