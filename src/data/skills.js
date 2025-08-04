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

import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiKeras,
  SiLangchain,
  SiPostman,
  SiJupyter,
  SiNpm,
  SiYarn,
  SiWebpack,
  SiVisualstudiocode
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
  "three.js": { icon: SiThreedotjs },
  "Tailwind CSS": { icon: SiTailwindcss },
  "TensorFlow": { icon: SiTensorflow },
  "Pytorch": { icon: SiPytorch },
  "OpenCV": { icon: SiOpencv },
  "Keras": { icon: SiKeras },
  "LangChain": { icon: SiLangchain },
  "LlamaIndex": { icon: FaCode },

  // Developer Tools
  "Git": { icon: FaGitAlt },
  "Docker": { icon: FaDocker },
  "AWS": { icon: FaAws },
  "VS Code": { icon: SiVisualstudiocode },
  "Postman": { icon: SiPostman },
  "Figma": { icon: FaFigma },
  "Jupyter": { icon: SiJupyter },
  "GitHub": { icon: FaGithub },
  "npm/yarn": { icon: SiNpm },
  "Webpack": { icon: SiWebpack }
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