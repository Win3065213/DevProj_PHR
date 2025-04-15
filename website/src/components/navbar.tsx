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
                    name: "Consultations",
                    href: "#"
                }
            ]
        },
        {
            name: "Appointment",
            href: "/appointments",
            sublink: []
        },
        {
            name: "Survey",
            href: "#",
            sublink: []
        }
    ]
    return (
        <>
            {side ?
                (
                    <nav className="flex flex-col gap-1
                                    w-5/12 mx-auto mt-16">
                        {navElements.map((ele) => (
                            <section key={ele.name} className="group">
                                <div
                                    className="group/main w-full px-5 py-3 bg-[var(--phr)] rounded-md">
                                    <a
                                        className={`font-bold text-white
                                                    transition duration-500 group-hover/main:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]
                                                    ${ele.sublink.length > 0 ?
                                                        "after:content-['>'] after:inline-block after:rotate-0 after:duration-500 group-hover:after:rotate-90"
                                                        :
                                                        ""
                                                    }`}
                                        href={ele.href}
                                    >
                                        {ele.name}&nbsp;
                                    </a>
                                </div>
                                {ele.sublink.map((sub) => (
                                        <div
                                            key={sub.name}
                                            className=" group/sub w-full px-5 group-hover:py-3 ml-7 group-hover:my-1
                                                        h-0 group-hover:h-[48px]
                                                        scale-y-0 group-hover:scale-y-100
                                                        ease-in-out transition-[padding,margin,height] duration-1500 delay-500
                                                        group-hover:transition-transform group-hover:duration-500 group-hover:delay-300
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
                                    w-10/12 m-auto p-5">
                        {navElements.map((ele) => (
                            <a
                                key={ele.name}
                                className="text-white font-bold
                                            transition duration-500 hover:drop-shadow-[0_0_1px_#555,0_0_7px_#eeef,0_0_15px_#eee5]"
                                href={ele.href}
                            >
                                {ele.name}&nbsp;
                            </a>
                        ))}
                    </nav>
                )
            }
        </>


    );
}