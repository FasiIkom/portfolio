import type { IconType } from "react-icons";
import {
  SiPython,
  SiGo,
  SiSpringboot,
  SiNextdotjs,
  SiReact,
  SiHtml5,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiMongodb,
  SiDocker,
  SiGit,
  SiPostman,
  SiJsonwebtokens,
} from "react-icons/si";
import { FaCubes, FaCode, FaPlug, FaInfinity, FaShieldHalved } from "react-icons/fa6";

type TechIcon = { Icon: IconType; color: string };

// Brand colors; black-logo brands fall back to a light tone so they stay
// visible on the dark canvas. Concept items use the brand yellow accent.
const ACCENT = "#fcd535";
const LIGHT = "#eaecef";

const MAP: Record<string, TechIcon> = {
  "Python (Django)": { Icon: SiPython, color: "#3776AB" },
  Go: { Icon: SiGo, color: "#00ADD8" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6DB33F" },
  "Next.js": { Icon: SiNextdotjs, color: LIGHT },
  React: { Icon: SiReact, color: "#61DAFB" },
  HTML5: { Icon: SiHtml5, color: "#E34F26" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  "Git & GitHub": { Icon: SiGit, color: "#F05032" },
  Postman: { Icon: SiPostman, color: "#FF6C37" },
  JWT: { Icon: SiJsonwebtokens, color: LIGHT },
  "CI/CD": { Icon: FaInfinity, color: ACCENT },
  SOLID: { Icon: FaCubes, color: ACCENT },
  "Clean Code": { Icon: FaCode, color: ACCENT },
  "RESTful API": { Icon: FaPlug, color: ACCENT },
  "2FA": { Icon: FaShieldHalved, color: ACCENT },
};

const FALLBACK: TechIcon = { Icon: FaCode, color: ACCENT };

/** Renders the brand/concept icon for a skill label. */
export function TechIcon({
  name,
  size = 16,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const { Icon, color } = MAP[name] ?? FALLBACK;
  return (
    <Icon
      size={size}
      color={color}
      className={className}
      aria-hidden="true"
    />
  );
}
