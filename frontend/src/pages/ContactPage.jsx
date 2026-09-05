import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { 
  HiOutlineEnvelope, 
  HiOutlineChatBubbleLeftRight,
  HiOutlineMapPin,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle
} from "react-icons/hi2";
import toast from "react-hot-toast";

export const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Your message has been sent.");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-xs font-semibold text-indigo-600">
            <HiOutlineChatBubbleLeftRight className="size-3.5" />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Support & Feedback
          </h1>
          <p className="text-sm text-base-content/60">
            Have a question, suggestion, or need help with your account? Send us a note and we will reply promptly.
          </p>
        </div>

        {/* Form & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="md:col-span-1 p-6 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contact Details</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-base-content/70">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
                    <HiOutlineEnvelope className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-base-content block">Email</span>
                    <span>support@notestack.app</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 shrink-0">
                    <HiOutlineMapPin className="size-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-base-content block">Community</span>
                    <span>Worldwide Student Hub</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-xs text-base-content/70">
              💡 Response time is usually within 24 hours on business days.
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl bg-base-100 border border-base-content/10 shadow-xs">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <HiOutlineCheckCircle className="size-16 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-bold">Message Received!</h3>
                <p className="text-sm text-base-content/60 max-w-sm mx-auto">
                  Thank you for reaching out to NoteStack. Our team will review your message shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: "", lastName: "", email: "", message: "" });
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-base-content/80">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="How can we help you today? Feel free to describe any feedback or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-base-200/70 border border-base-content/10 text-sm focus:bg-base-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/20 transition active:scale-95 cursor-pointer"
                >
                  <HiOutlinePaperAirplane className="size-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};