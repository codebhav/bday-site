import { FiUser } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "./useWindowSize";

const VerticalAccordion = () => {
    const [open, setOpen] = useState(items[0].id);

    return (
        <div className="min-h-screen bg-indigo-600 flex flex-row items-center justify-center">
            <section className="p-4 rounded-lg">
                <div className="flex flex-col lg:flex-row h-fit lg:h-[450px] w-full max-w-4xl mx-auto shadow overflow-hidden">
                    {items.map((item) => {
                        return (
                            <Panel
                                key={item.id}
                                open={open}
                                setOpen={setOpen}
                                id={item.id}
                                Icon={item.Icon}
                                testimonial={item.testimonial}
                                author={item.author}
                                spotifyLink={item.spotifyLink}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

const Panel = ({
    open,
    setOpen,
    id,
    Icon,
    testimonial,
    author,
    spotifyLink,
}) => {
    const { width } = useWindowSize();
    const isOpen = open === id;

    return (
        <>
            <button
                className="bg-white hover:bg-slate-50 transition-colors p-3 border-r-[1px] border-b-[1px] border-slate-200 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group"
                onClick={() => setOpen(id)}
            >
                <span
                    style={{
                        writingMode: "vertical-lr",
                    }}
                    className="hidden lg:block text-xl font-light rotate-180"
                >
                    {author}
                </span>
                <span className="block lg:hidden text-xl font-light">
                    {author}
                </span>
                <div className="w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center">
                    <Icon />
                </div>
                <span className="w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key={`panel-${id}`}
                        variants={
                            width && width > 1024
                                ? panelVariants
                                : panelVariantsSm
                        }
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="w-full h-full overflow-hidden relative bg-[#f5f5f5] flex flex-col justify-between p-6"
                    >
                        {/* Testimonial Content */}
                        <div className="text-gray-800 mb-4">
                            <p className="text-lg italic">"{testimonial}"</p>
                            <p className="mt-2 font-bold">- {author}</p>
                        </div>

                        {/* Spotify Icon */}
                        <motion.a
                            href={spotifyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 10,
                                ease: "linear",
                                repeat: Infinity,
                            }}
                            className="self-end text-green-500"
                        >
                            <img src="spotify.png" alt="" className="w-12" />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VerticalAccordion;

// Variants for panel animation
const panelVariants = {
    open: {
        width: "100%",
        height: "100%",
    },
    closed: {
        width: "0%",
        height: "100%",
    },
};

const panelVariantsSm = {
    open: {
        width: "100%",
        height: "200px",
    },
    closed: {
        width: "100%",
        height: "0px",
    },
};

// Mock testimonial data
const items = [
    {
        id: 1,
        title: "Testimonial 1",
        Icon: FiUser,
        testimonial:
            "This is the best experience I ever had. The support was amazing!",
        author: "John Doe",
        spotifyLink: "https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb",
    },
    {
        id: 2,
        title: "Testimonial 2",
        Icon: FiUser,
        testimonial: "Really enjoyed it, highly recommended!",
        author: "Jane Smith",
        spotifyLink: "https://open.spotify.com/track/2TpxZ7JUBn3uw46aR7qd6V",
    },
    {
        id: 3,
        title: "Testimonial 3",
        Icon: FiUser,
        testimonial: "Such a great service, I will definitely come back.",
        author: "Sarah Connor",
        spotifyLink: "https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp",
    },
    {
        id: 4,
        title: "Testimonial 4",
        Icon: FiUser,
        testimonial: "Absolutely fantastic, couldn't have asked for more.",
        author: "Tony Stark",
        spotifyLink: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b",
    },
];
