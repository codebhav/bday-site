import { FiUser } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "./useWindowSize";

const VerticalAccordion = () => {
    const [open, setOpen] = useState(items[0].id);

    return (
        <div className="min-h-screen bg-indigo-600 flex flex-row items-center justify-center">
            <section className="p-4 rounded-lg">
                <div className="flex flex-col lg:flex-row h-fit lg:h-[500px] w-full max-w-6xl mx-auto shadow overflow-hidden whitespace-pre-line">
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
        title: "Wish 1",
        Icon: FiUser,
        testimonial: `
        Happy birthday prongs!!

I know we haven’t catched up in a while now, but there are times when I come across songs, movies or quotes which reminds me of you. And I think that’s how I would also describe you. A person so full of everything, and so cool at the same time. I’ll always cherish having gone to movies with you when you were in Bangalore. It was fun. 

I hope you have a pretty amazing birthday!
        `,
        author: "Aseel",
        spotifyLink:
            "https://open.spotify.com/track/0vk78GBzDRMIrTsWzmA9rK?si=77ee157345a14696",
    },
    {
        id: 2,
        title: "Wish 2",
        Icon: FiUser,
        testimonial: `
        अरे प्रोंग्स! हैप्पी बर्थडे हो!  आज ऐसन मस्ती करो कि पूरा मोहल्ला बोले, ‘एतना त शादियों में भी नाचल ना देखनी!’ केक एतना खा लो कि पेटवा बोले, ‘बस बहिन, अब गुड़-धनिया भेज के फिनिश कर द!’ और आज के दिन एतना नाचो कि धरती बोले, ‘हमरा प सिरवा मत फोड़!’ तुम्हारी उम्र अब ओ बटेर जइसन हो गइल बा – देखे में छोट, लेकिन धांसू एनर्जी से भरल! तो आज फुल भोजपुरिया ठुमका लगाओ, बाकी जिम्मेदारी कल देखल जाई!
        `,
        author: "Shwetank",
        spotifyLink:
            "https://open.spotify.com/track/6qvZFbqjr3S8Ck5aBkPXPu?si=Slnhc_XhSdeTov4OUZjStg",
    },
    {
        id: 3,
        title: "Wish 3",
        Icon: FiUser,
        testimonial: `
        Hi Sushiiii

I never knew that a girl with blue hair i met randomly on the first day of college would become so close to me. You gave me your shoulder to cry upon and took mine as well, that’s how perfect things look like 🤪
IIM A is a beautiful place because of people like you ❤️

Happy 24th 😘
        `,
        author: "Aasavari",
        spotifyLink:
            "https://open.spotify.com/track/1bAH37IFyHp9m9FVVsUEdu?si=b89f664a1add4b0b",
    },
    {
        id: 4,
        title: "Wish 4",
        Icon: FiUser,
        testimonial: `
        Dear Sush,
        
        Happy birthday!! You are the most talented, funny, loyal, fierce, and determined person we know. Also the smartest, thanks to all the puzzles, and the most knowledgeable about random whale facts. All your quirks and qualities make up this beautiful person that you are and that we love more than anything else in the world. It’s a privilege to have a front row seat in your life and watch you achieve all of these amazing things that you do everyday. Trust that we’re always always always cheering for you, and have got your back no matter what. We love you so much, and are so incredibly proud of you! 

        Lots of love, 
Megs and Jaya
        `,
        author: "Megs and Jaya",
        spotifyLink:
            "https://open.spotify.com/track/2KL9XiVAGNiZBpWKdd8Iu1?si=mgDpi4hFSuyoccV8wBZtbw",
    },
    {
        id: 5,
        title: "Wish 5",
        Icon: FiUser,
        testimonial: `
        Happy Sushi Day!! 🍣 

I hope your 24th is full of all the fun, happiness and positivity life can possibly offer!  But this year is even half as incredible as you are, it promises to be a real banger!! 🔥🎆
(Sorry for the late wishes- I’ve just been out celebrating Sushi month- coz one day is too less for you, ya know? 👀👉👈)

Happy Birthday Pineapple!! 🍍🍍🍍
        `,
        author: "Shreshth",
        spotifyLink:
            "",
    },
];
