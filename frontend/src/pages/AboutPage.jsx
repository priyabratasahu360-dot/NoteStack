import { Sidebar } from "../components/Sidebar";

export const AboutPage = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <Sidebar heading="About NoteStack" />
      <div className="min-h-screen">
        <section className="bg-gray-400 w-auto m-4 text-black p-4 rounded-lg flex flex-col gap-5">
          <h2 className="font-bold text-2xl">Who We Are</h2>
          <p className="font-semibold opacity-70">
            NoteStack is a modern, full-stack web application designed to
            revolutionize how you capture, organize, and manage digital notes.
            Built for developers, students, and professionals, our platform
            combines a clean interface with robust functionality, allowing you
            to seamlessly create, edit, and secure your information from any
            device
          </p>
        </section>
        <section className="bg-gray-400 w-auto m-4 text-black p-4 rounded-lg flex flex-col gap-5">
          <h2 className="font-bold text-2xl">Our Mission</h2>
          <p className="font-semibold opacity-70">
            Our mission is to take the pain out of technical note-taking and
            documentation. We aim to provide a centralized, secure, and
            developer-friendly environment where your ideas can be easily
            organized, accessed, and shared, boosting your productivity in a
            fast-paced digital world.
          </p>
        </section>
        <section className="bg-gray-400 w-auto m-4 text-black p-4 rounded-lg flex flex-col gap-5">
          <h2 className="font-bold text-2xl">
            What Makes NoteStack Different?
          </h2>
          <ul>
            <li>
              <span className="font-bold">Built on the MERN Stack: </span>
              NoteStack utilizes MongoDB, Express.js, React.js, and Node.js to
              provide a responsive, high-performance user experience.
            </li>
            <li>
              <span className="font-bold">Security First: </span>
              We implement JWT-based authentication and encrypt passwords using
              bcrypt to ensure your data remains protected.
            </li>
            <li>
              <span className="font-bold"> Rich Content Support: </span>
              Beyond simple text, NoteStack allows you to attach images and
              documents to your notes, with media optimized via Cloudinary.
            </li>
          </ul>
        </section>

        <div className="flex justify-center mt-20">
          <ul className="steps grow">
            <li className="step step-primary">Register</li>
            <li className="step step-primary">Create</li>
            <li className="step">Upload</li>
          </ul>
        </div>
      </div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            NoteStack
          </p>
        </aside>
      </footer>
    </div>
  );
};
