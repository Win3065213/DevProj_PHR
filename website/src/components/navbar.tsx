"use client"

import { MouseEventHandler } from "react";

interface NavbarProps {
    side: boolean;
}

export default function Navbar({ side }: NavbarProps) {
    const navElements = [
        {
            name: "Home",
            href: "..",
            sublink: []
        },
        {
            name: "Medical Record",
            href: "/records",
            sublink: [
                {
                    name: "Allergies",
                    href: "#"
                },
                {
                    name: "Documents",
                    href: "#"
                }
            ]
        },
        {
            name: "About Project",
            href: "/about",
            sublink: []
        },
        {
            name: "Survey",
            href: "https://forms.office.com/e/Txu47fQzsD",
            sublink: []
        }
    ]
    
    const handleClick = (e:any) => {
        const sub = e.currentTarget as HTMLElement;

        const parent = sub.closest("section");
        if (!parent) return;
        const sublinks = parent.querySelectorAll(".sublink");

        if (sub.classList.contains("active")) {
            sub.classList.remove("active");
            sublinks.forEach((sublink) => {
                sublink.classList.remove("active");
            });
        } else {
            sub.classList.add("active");
            sublinks.forEach((sublink) => {
                sublink.classList.add("active");
            });
        }
    }

    return (
        <>
            {side ?
                (
                    <nav className="flex flex-col gap-1
                                    w-5/12 mx-auto mt-16">
                        {navElements.map((ele) => (
                            <section key={ele.name}>
                                <div
                                    className="rounded-md flex gap-1 overflow-hidden">
                                    <a
                                        className=" group w-full px-5 py-3 bg-[var(--phr)]
                                                    font-bold text-white
                                                    transition duration-500"
                                        href={ele.href}
                                    >
                                        <span className="group-hover:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]">
                                            {ele.name}
                                        </span>
                                    </a>
                                    {ele.sublink.length > 0 ?
                                        <button
                                            className=" sub ml-auto bg-[var(--phr)] px-4 py-3
                                                        font-bold text-white
                                                        after:content-['>'] after:inline-block
                                                        cursor-pointer"
                                            onClick={handleClick}>
                                        </button>
                                        :
                                        <></>
                                    }
                                </div>
                                {ele.sublink.map((sub) => (
                                        <div
                                            key={sub.name}
                                            className=" group/sub sublink w-full px-5 ml-7
                                                        ease-in-out transition-[padding,margin,height] duration-1500 delay-300
                                                        bg-[#5b9aff] rounded-md">
                                            <a
                                                className="
                                                        font-bold text-white
                                                        transition duration-500
                                                        group-hover/sub:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]"
                                                href={sub.href}
                                            >
                                                {sub.name}
                                            </a>
                                        </div>
                                    ))}
                            </section>
                        ))}
                    </nav>
                ) : (
                    <nav className="flex gap-10
                                    w-10/12 overflow-x-auto m-auto p-5">
                        {navElements.map((ele) => (
                            <a
                                key={ele.name}
                                className="text-white font-bold text-center self-center
                                            transition duration-500 hover:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]"
                                href={ele.href}
                            >
                                {ele.name}
                            </a>
                        ))}
                    </nav>
                )
            }
        </>


    );
}