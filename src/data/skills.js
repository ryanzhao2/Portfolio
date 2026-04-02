// --- icons ---------------------------------------------------------------
import {
  FaPython,
  FaJava,
  FaReact,
  FaDocker,
  FaAws,
  FaGitAlt,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
  FaFigma,
  FaCode,
  FaTerminal,
  FaDatabase
} from "react-icons/fa";

import { VscVscode } from "react-icons/vsc";

import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiKeras,
  SiLangchain,
  SiJupyter,
  SiNpm,
  SiYarn,
  SiWebpack,
  SiPostgresql,
  SiMongodb,
  SiGooglecloud,
  SiFlask
} from "react-icons/si";

// --- skills mapping --------------------------------------------------------------
export const skillsMapping = {
  // Languages
  "Python": { icon: FaPython },
  "Java": { icon: FaJava },
  "C": { icon: SiC },
  "C++": { icon: SiCplusplus },
  "Assembly": { icon: FaCode },
  "JavaScript": { icon: SiJavascript },
  "SQL": { icon: FaDatabase },
  "HTML/CSS": { icon: FaHtml5 },
  "Bash": { icon: FaTerminal },

  // Frameworks/Libraries
  "React": { icon: FaReact },
  "Next.js": { icon: SiNextdotjs },
  "Node.js": { icon: SiNodedotjs },
  "three.js": { icon: SiThreedotjs },
  "Tailwind CSS": { icon: SiTailwindcss },
  "TensorFlow": { icon: SiTensorflow },
  "Pytorch": { icon: SiPytorch },
  "OpenCV": { icon: SiOpencv },
  "Keras": { icon: SiKeras },
  "Flask": { icon: SiFlask },

  // Developer Tools
  "Git": { icon: FaGitAlt },
  "Docker": { icon: FaDocker },
  "AWS": { icon: FaAws },
  "GCP": { icon: SiGooglecloud },
  "PostgreSQL": { icon: SiPostgresql },
  "MongoDB": { icon: SiMongodb },
  "VS Code": { icon: VscVscode },
  "Jupyter": { icon: SiJupyter },
  "GitHub": { icon: FaGithub },
  "npm/yarn": { icon: SiNpm }
};

// Helper function to get icon for a technology
export const getTechnologyIcon = (techName) => {
  const mapping = skillsMapping[techName];
  if (mapping && mapping.icon) {
    return mapping;
  }
  // Fallback to a safe icon
  return { icon: FaCode };
}; 