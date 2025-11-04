import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic form validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill out your name, email, and message.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);
  
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    // Check if values are missing or are placeholders
    const isPlaceholder = (value) => {
      if (!value) return true;
      const lower = value.toLowerCase();
      return lower.includes('your_') || lower.includes('placeholder') || lower.includes('example');
    };

    const missing = [];
    const hasInvalidConfig = 
      !serviceId || !templateId || !publicKey ||
      isPlaceholder(serviceId) || isPlaceholder(templateId) || isPlaceholder(publicKey);

    if (hasInvalidConfig) {
      if (!serviceId || isPlaceholder(serviceId)) missing.push("VITE_APP_EMAILJS_SERVICE_ID");
      if (!templateId || isPlaceholder(templateId)) missing.push("VITE_APP_EMAILJS_TEMPLATE_ID");
      if (!publicKey || isPlaceholder(publicKey)) missing.push("VITE_APP_EMAILJS_PUBLIC_KEY");
      
      setLoading(false);
      // Silently use mailto fallback without showing error
      const subject = encodeURIComponent("Portfolio Contact Message");
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization || "N/A"}\n\nMessage:\n${form.message}`
      );
      window.location.href = `mailto:dvennela@berkeley.edu?subject=${subject}&body=${body}`;
      
      // Reset form after opening email client
      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          organization: "",
          message: "",
        });
      }, 100);
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Daivik Vennela",
          from_email: form.email,
          to_email: "dvennela@berkeley.edu",
          organization: form.organization,
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            organization: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);

          // Log a structured error for debugging
          console.groupCollapsed("Email send failed");
          console.error("EmailJS error object:", error);
          console.log("Service ID:", serviceId);
          console.log("Template ID:", templateId);
          console.log("Has Public Key:", Boolean(publicKey));
          console.log("Payload:", {
            from_name: form.name,
            from_email: form.email,
            to_name: "Daivik Vennela",
            to_email: "dvennela@berkeley.edu",
            organization: form.organization,
            message: form.message,
          });
          console.groupEnd();

          // Map known EmailJS error texts to clearer messages
          const rawText = error?.text || "";
          let userMessage = "We couldn't send your message.";
          let suggestions = [];

          if (rawText.includes("Invalid service ID")) {
            userMessage = "Email service is not configured correctly (invalid service ID).";
            suggestions.push("Check VITE_APP_EMAILJS_SERVICE_ID in .env");
          } else if (rawText.includes("Invalid template ID")) {
            userMessage = "Email template is not configured correctly (invalid template ID).";
            suggestions.push("Check VITE_APP_EMAILJS_TEMPLATE_ID in .env");
          } else if (rawText.includes("Invalid Public Key") || rawText.includes("public key")) {
            userMessage = "Public API key appears invalid.";
            suggestions.push("Check VITE_APP_EMAILJS_PUBLIC_KEY in .env");
          } else if (rawText.toLowerCase().includes("rate")) {
            userMessage = "You're being rate limited by EmailJS.";
            suggestions.push("Wait a minute and try again");
          } else if (error?.status === 0) {
            userMessage = "Network error while contacting the email service.";
            suggestions.push("Check your internet connection");
          } else if (error?.status >= 500) {
            userMessage = "Email service is currently unavailable (server error).";
            suggestions.push("Try again later");
          }

          // Always fallback to mailto for any EmailJS error
          const subject = encodeURIComponent("Portfolio Contact Message");
          const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization || "N/A"}\n\nMessage:\n${form.message}`
          );

          // Silently use mailto fallback when EmailJS fails - no error shown to user
          window.location.href = `mailto:dvennela@berkeley.edu?subject=${subject}&body=${body}`;
          
          // Reset form after opening email client
          setTimeout(() => {
            setForm({
              name: "",
              email: "",
              organization: "",
              message: "",
            });
          }, 100);
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        {/* Header of the contact page go to styles to change fonts */}
        <p className={styles.sectionSubText}>Reach out to me...</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Email address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
        <span className='text-white font-medium mb-4'>Organization</span>
        <input
          type='text'
          name='organization'
          value={form.organization}
          onChange={handleChange}
          placeholder="(Optional)"
          className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
        />
      </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
