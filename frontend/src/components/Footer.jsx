import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaNotesMedical } from "react-icons/fa6";


export const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-secondary text-primary-content p-10 sticky bottom-0">
      <aside>
        <FaNotesMedical className="size-14"/>
        <p className="font-bold text-lg">
          NoteStack
        </p>
          <p className="font-bold">A simple note sharing application</p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://linkedin.com">
            <FaLinkedin className="size-8"/>
          </a>
          <a href="https://github.com">
            <FaGithub className="size-8"/>
          </a>
        </div>
      </nav>
    </footer>
  );
};
