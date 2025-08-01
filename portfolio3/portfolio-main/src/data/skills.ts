// --- icons ---------------------------------------------------------------
import {
    FaPython,
    FaLinux,
    FaNetworkWired,
    FaDocker,
    FaAws,
    FaGitAlt,
    FaHtml5,
    FaCss3Alt,
    FaJava,
    FaReact,
    FaAngular
} from "react-icons/fa";
import { FaGolang, FaMicrochip } from "react-icons/fa6";

import {
    SiC,
    SiCplusplus,
    SiNvidia,
    SiPytorch,
    SiNumpy,
    SiPandas,
    SiWireshark,
    SiPostgresql,
    SiRedis,
    SiNeo4J,
    SiSupabase,
    SiTypescript,
    SiJavascript,
    SiSvelte,
    SiSwift,
    SiGooglecloud
} from "react-icons/si";

// --- skills --------------------------------------------------------------
export const skills = [
    // ──────────────── Languages & Compute / ML ────────────────
    { id: 1, name: "Python", icon: FaPython },
    { id: 2, name: "C++", icon: SiCplusplus, size: 26 },
    { id: 3, name: "C", icon: SiC },
    { id: 4, name: "Go", icon: FaGolang, size: 38 },
    { id: 5, name: "CUDA", icon: SiNvidia },         // NVIDIA ≈ CUDA
    { id: 6, name: "SystemVerilog", icon: FaMicrochip },
    { id: 7, name: "PyTorch", icon: SiPytorch },
    { id: 8, name: "NumPy", icon: SiNumpy },
    { id: 9, name: "Pandas", icon: SiPandas },

    // ──────────────── Systems & Networking ────────────────
    { id: 11, name: "TCP/IP", icon: FaNetworkWired },
    { id: 13, name: "Wireshark", icon: SiWireshark },

    // ──────────────── DevOps & Data ────────────────
    { id: 14, name: "Docker", icon: FaDocker },
    { id: 15, name: "AWS", icon: FaAws },
    { id: 16, name: "PostgreSQL", icon: SiPostgresql, size: 22 },
    { id: 17, name: "Redis", icon: SiRedis },
    { id: 18, name: "Neo4j", icon: SiNeo4J },
    { id: 19, name: "Supabase", icon: SiSupabase },

    // ──────────────── Cloud extras ────────────────
    { id: 21, name: "GCP", icon: SiGooglecloud },

    // ──────────────── Front-end (kept, but lower) ────────────────
    { id: 22, name: "TypeScript", icon: SiTypescript },
    { id: 23, name: "JavaScript", icon: SiJavascript },
    { id: 24, name: "React", icon: FaReact },
    { id: 25, name: "Angular", icon: FaAngular },
    { id: 26, name: "SvelteKit", icon: SiSvelte },
    { id: 27, name: "HTML", icon: FaHtml5, size: 22 },
    { id: 28, name: "CSS", icon: FaCss3Alt, size: 22 },
    { id: 29, name: "Swift", icon: SiSwift },
    { id: 30, name: "Java", icon: FaJava, size: 22 }
];