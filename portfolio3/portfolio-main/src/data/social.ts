import { BiLogoGithub, BiLogoLinkedinSquare, } from "react-icons/bi";
import { BsSignal } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";

export const socialLinks = [
    {
        id: 1,
        name: "GitHub",
        url: "https://github.com/krisapa",
        icon: BiLogoGithub,
        status: "social",
    },
    {
        id: 2,
        name: "Linkedin",
        url: "https://www.linkedin.com/in/kspatel8/",
        icon: BiLogoLinkedinSquare,
        status: "social",
    },
    {
        id: 3,
        name: "Signal",
        url: "https://signal.me/#eu/HOLq2OcUOnm2jnyHXD0EoStiiZ7uAgjaVVIXKCf9i4edCGzJaFNGPIVJbWXENY24",
        icon: BsSignal,
        status: "social",
    },
    {
        id: 4,
        name: "Mail",
        url: "mailto:kspatel8@icloud.com",
        icon: MdEmail,
        status: "social",
    },
    {
        id: 5,
        name: "LeetCode",
        url: "https://leetcode.com/u/yeema2/",
        icon: SiLeetcode,
        status: "social",
    }
];
