import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  HiOutlineEnvelope, 
  HiOutlineChatBubbleLeftRight,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineCodeBracketSquare,
  HiOutlineStar,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles
} from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const RECIPIENT_EMAIL = "priyabratasahu360@gmail.com";
  const GITHUB_REPO_URL = "https://github.com/priyabratasahu360-dot/NoteStack";
  const GITHUB_PROFILE_URL = "https://github.com/priyabratasahu360-dot";

  const handleSubmit = (e) => {
    e.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const mailSubject = formData.subject.trim() 
      ? `[NoteStack] ${formData.subject}`
      : `[NoteStack Contact] Message from ${fullName || "User"}`;

    const mailBody = `Hello Priyabrata,

Name: ${fullName}
Email: ${formData.email}

Message:
${formData.message}

---
Sent via NoteStack Contact Form`;

    // Construct mailto link
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    toast.success("Opening your email client to send message!");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold shadow-xs">
            <HiOutlineChatBubbleLeftRight className="size-4" />
            <span>Get in Touch & Collaborate</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
            Contact & Community
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Have questions, feature requests, or want to contribute? Send a message directly or join us on GitHub!
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Direct Email Details & Info Card */}
          <div className="lg:col-span-1 space-y-5">
            
            {/* Direct Email Card */}
            <div className="p-6 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs space-y-4">
              <h3 className="font-extrabold text-base text-base-content flex items-center gap-2">
                <HiOutlineEnvelope className="size-5 text-primary" />
                <span>Direct Contact</span>
              </h3>

              <p className="text-xs text-base-content/65 leading-relaxed">
                Submitting this form automatically drafts an email to our inbox with your details pre-filled.
              </p>

              <div className="p-3.5 rounded-2xl bg-base-200/70 border border-base-content/10 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <HiOutlineEnvelope className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-base-content/50 block">
                    Developer Email
                  </span>
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    className="text-xs font-bold text-primary hover:underline truncate block"
                  >
                    {RECIPIENT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-primary/5 border border-primary/10 text-[11px] text-base-content/70">
                ⚡ We usually respond within 24 hours. Feel free to reach out for feedback or questions!
              </div>
            </div>

            {/* GitHub Quick Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-base-100 via-base-100 to-primary/5 border border-base-content/10 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-base-200 border border-base-content/10 flex items-center justify-center text-base-content">
                <FaGithub className="size-5" />
              </div>

              <h4 className="font-bold text-sm text-base-content">Open Source Project</h4>
              <p className="text-xs text-base-content/65 leading-relaxed">
                NoteStack is actively maintained. Check out issues, roadmap, and star the repo!
              </p>

              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline pt-1"
              >
                <span>View on GitHub</span>
                <HiOutlineArrowTopRightOnSquare className="size-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Email Form */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <HiOutlineCheckCircle className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-base-content">Email Draft Created!</h3>
                <p className="text-xs sm:text-sm text-base-content/60 max-w-md mx-auto leading-relaxed">
                  Your default email client was opened with your message pre-composed to{" "}
                  <span className="font-semibold text-primary">{RECIPIENT_EMAIL}</span>. Click send in your email client to complete transmission!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-primary-content hover:opacity-90 transition cursor-pointer"
                  >
                    Draft Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-base-content/10 pb-3">
                  <h3 className="font-extrabold text-base text-base-content">
                    Send a Direct Message
                  </h3>
                  <p className="text-xs text-base-content/60">
                    Fill out the form below to send an email inquiry.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-xs sm:text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-xs sm:text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="student@university.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-xs sm:text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bug Report / Feature Idea"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-xs sm:text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Type your question, suggestion, or study resource request here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-xs sm:text-sm focus:bg-base-100 focus:border-primary focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-primary to-secondary text-primary-content shadow-sm hover:opacity-95 transition active:scale-95 cursor-pointer"
                >
                  <HiOutlinePaperAirplane className="size-4" />
                  <span>Send Email Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Dedicated GitHub Contribution Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-content/10 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <HiOutlineSparkles className="size-3.5" />
                <span>Open Source Collaboration</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-base-content">
                Contribute to NoteStack
              </h2>
              <p className="text-xs sm:text-sm text-base-content/60">
                Want to build new features, report bugs, or improve student workflows? We welcome all pull requests!
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content transition border border-base-content/10"
              >
                <FaGithub className="size-4" />
                <span>Developer Profile</span>
              </a>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:opacity-90 text-primary-content shadow-xs transition"
              >
                <HiOutlineStar className="size-4" />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

          {/* Contribution Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-content/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="font-bold text-sm text-base-content">Fork & Clone</h4>
              <p className="text-xs text-base-content/60 leading-relaxed">
                Fork the repository to your account, clone locally, and set up your environment using <code className="px-1 py-0.5 rounded bg-base-300 text-[10px]">npm install</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-content/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h4 className="font-bold text-sm text-base-content">Pick an Issue</h4>
              <p className="text-xs text-base-content/60 leading-relaxed">
                Check existing issues or propose improvements such as OAuth providers, markdown notes editor, or tagging filters.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/50 border border-base-content/10 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h4 className="font-bold text-sm text-base-content">Submit Pull Request</h4>
              <p className="text-xs text-base-content/60 leading-relaxed">
                Push your branch and open a PR. We review quickly and merge quality contributions with full contributor credit!
              </p>
            </div>
          </div>

          {/* Quick Repo Link Box */}
          <div className="p-4 rounded-2xl bg-base-200/70 border border-base-content/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-base-content/80 font-mono">
              <HiOutlineCodeBracketSquare className="size-4 text-primary shrink-0" />
              <span className="truncate">{GITHUB_REPO_URL}</span>
            </div>
            <a
              href={`${GITHUB_REPO_URL}/fork`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>Fork Repository</span>
              <HiOutlineArrowTopRightOnSquare className="size-3.5" />
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};