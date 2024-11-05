import { AnimatePresence, useAnimate, usePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FiClock, FiPlus, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

const allowedUsernames = ["sushi", "prongs", "pwongs", "sush", "sushruti"];
const password = "CockButAlsoBalls";

const HomePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos
            ? JSON.parse(savedTodos)
            : [
                  { id: 1, text: "I built", checked: false, time: "5 mins" },
                  {
                      id: 2,
                      text: "you a custom",
                      checked: false,
                      time: "10 mins",
                  },
                  { id: 3, text: "todo list", checked: true, time: "12 hrs" },
                  { id: 4, text: "hehe", checked: false, time: "1 hrs" },
              ];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleCheck = (id) => {
        setTodos((pv) =>
            pv.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
        );
    };

    const removeElement = (id) => {
        setTodos((pv) => pv.filter((t) => t.id !== id));
    };

    const handleLogin = (username, passwordInput) => {
        if (allowedUsernames.includes(username) && passwordInput === password) {
            localStorage.setItem("isLoggedIn", "true");
            setIsLoggedIn(true);
        } else {
            alert("Invalid credentials!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <>
            <section
                className="min-h-screen bg-zinc-950 py-24"
                style={
                    {
                        /* your styles */
                    }
                }
            >
                <div className="mx-auto w-full max-w-xl px-4">
                    <button onClick={handleLogout} className="text-red-500">
                        Logout
                    </button>
                    <Header />
                    <Todos
                        removeElement={removeElement}
                        todos={todos}
                        handleCheck={handleCheck}
                    />
                </div>
                <Form setTodos={setTodos} />
            </section>
        </>
    );
};

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// Other components (Header, Form, Todos, Todo) remain the same

const Header = () => {
    // Get the current hour
    const currentHour = new Date().getHours();

    // Determine the greeting based on the time of day
    const getGreeting = () => {
        if (currentHour < 12) {
            return "Good morning, Sush! 🌻";
        } else if (currentHour < 18) {
            return "Good afternoon, Sush! 🌤️";
        } else {
            return "Good evening, Sush! 🌙";
        }
    };

    return (
        <div className="mb-6">
            <h1 className="text-xl font-medium text-white">{getGreeting()}</h1>
            <p className="text-zinc-400">
                Let's see what we've got to do today.
            </p>
        </div>
    );
};

const Form = ({ setTodos }) => {
    const [visible, setVisible] = useState(false);

    const [time, setTime] = useState(15);
    const [text, setText] = useState("");
    const [unit, setUnit] = useState("mins");

    const handleSubmit = () => {
        if (!text.length) {
            return;
        }

        setTodos((pv) => [
            {
                id: Math.random(),
                text,
                checked: false,
                time: `${time} ${unit}`,
            },
            ...pv,
        ]);

        setTime(15);
        setText("");
        setUnit("mins");
    };

    return (
        <div className="fixed bottom-6 left-1/2 w-full max-w-xl -translate-x-1/2 px-4">
            <AnimatePresence>
                {visible && (
                    <motion.form
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 25 }}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-3"
                    >
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What do you need to do?"
                            className="h-24 w-full resize-none rounded bg-zinc-900 p-3 text-sm text-zinc-50 placeholder-zinc-500 caret-zinc-50 focus:outline-0"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <input
                                    type="number"
                                    className="w-24 rounded bg-zinc-700 px-1.5 py-1 text-sm text-zinc-50 focus:outline-0"
                                    value={time}
                                    onChange={(e) =>
                                        setTime(parseInt(e.target.value))
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() => setUnit("mins")}
                                    className={`rounded px-1.5 py-1 text-xs ${
                                        unit === "mins"
                                            ? "bg-white text-zinc-950"
                                            : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                                    }`}
                                >
                                    mins
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUnit("hrs")}
                                    className={`rounded px-1.5 py-1 text-xs ${
                                        unit === "hrs"
                                            ? "bg-white text-zinc-950"
                                            : "bg-zinc-300/20 text-zinc-300 transition-colors hover:bg-zinc-600 hover:text-zinc-200"
                                    }`}
                                >
                                    hrs
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="rounded bg-indigo-600 px-1.5 py-1 text-xs text-indigo-50 transition-colors hover:bg-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
            <button
                onClick={() => setVisible((pv) => !pv)}
                className="grid w-full place-content-center rounded-full border border-zinc-700 bg-zinc-900 py-3 text-lg text-white transition-colors hover:bg-zinc-800 active:bg-zinc-900"
            >
                <FiPlus
                    className={`transition-transform ${
                        visible ? "rotate-45" : "rotate-0"
                    }`}
                />
            </button>
        </div>
    );
};

const Todos = ({ todos, handleCheck, removeElement }) => {
    return (
        <div className="w-full space-y-3">
            <AnimatePresence>
                {todos.map((t) => (
                    <Todo
                        handleCheck={handleCheck}
                        removeElement={removeElement}
                        id={t.id}
                        key={t.id}
                        checked={t.checked}
                        time={t.time}
                    >
                        {t.text}
                    </Todo>
                ))}
            </AnimatePresence>
        </div>
    );
};

const Todo = ({ removeElement, handleCheck, id, children, checked, time }) => {
    const [isPresent, safeToRemove] = usePresence();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!isPresent) {
            const exitAnimation = async () => {
                animate(
                    "p",
                    {
                        color: checked ? "#6ee7b7" : "#fca5a5",
                    },
                    {
                        ease: "easeIn",
                        duration: 0.125,
                    }
                );
                await animate(
                    scope.current,
                    {
                        scale: 1.025,
                    },
                    {
                        ease: "easeIn",
                        duration: 0.125,
                    }
                );

                await animate(
                    scope.current,
                    {
                        opacity: 0,
                        x: checked ? 24 : -24,
                    },
                    {
                        delay: 0.75,
                    }
                );
                safeToRemove();
            };

            exitAnimation();
        }
    }, [isPresent]);

    return (
        <motion.div
            ref={scope}
            layout
            className="relative flex w-full items-center gap-3 rounded border border-zinc-700 bg-zinc-900 p-3"
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={() => handleCheck(id)}
                className="size-4 accent-indigo-400"
            />

            <p
                className={`text-white transition-colors ${
                    checked && "text-zinc-400"
                }`}
            >
                {children}
            </p>
            <div className="ml-auto flex gap-1.5">
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded bg-zinc-800 px-1.5 py-1 text-xs text-zinc-400">
                    <FiClock />
                    <span>{time}</span>
                </div>
                <button
                    onClick={() => removeElement(id)}
                    className="rounded bg-red-300/20 px-1.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-600 hover:text-red-200"
                >
                    <FiTrash2 />
                </button>
            </div>
        </motion.div>
    );
};

export default HomePage;
