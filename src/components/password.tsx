import React from 'react';
import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
//import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Password() {
    const [password, setPassword] = useState(false);
    useEffect(() => {
        const pass = localStorage.getItem('password');
        if (localStorage.getItem('unlocked') === 'true') {
            setPassword(false);
            document.body.classList.remove('overflow-hidden');
        } else if (pass !== null) {
            setPassword(true);
            document.body.classList.add('overflow-hidden');
        } else {
            setPassword(false);
            document.body.classList.remove('overflow-hidden');
        }
    }, []);
    //listen for alt+l
    onkeydown = function (e) {
        if (e.altKey && e.key === 'l') {
            if (localStorage.getItem('password') !== null) {
                setPassword(true);
                localStorage.setItem('unlocked', 'false');
                document.body.classList.add('overflow-hidden');
            }
        }
    };
    return (
        <>
            {password && (
                <>
                    <div className="password h-full w-full fixed top-0 left-0 right-0 bottom-0 z-40 bg-transparent backdrop-blur-sm overflow-hidden"></div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const password =
                                //@ts-ignore
                                document.getElementById('password').value;
                            let pass = localStorage.getItem('password');
                            if (pass === password) {
                                setPassword(false);
                                localStorage.setItem('unlocked', 'true');
                                document.body.classList.remove(
                                    'overflow-hidden'
                                );
                            } else {
                                setPassword(true);
                                localStorage.setItem('unlocked', 'false');
                                document.body.classList.add('overflow-hidden');
                            }
                        }}
                    >
                        <input
                            id="password"
                            placeholder="Password"
                            type="password"
                            className="text-center password h-10 bg-[var(--input-bg-color)] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-xl"
                        />
                    </form>
                </>
            )}
        </>
    );
}
