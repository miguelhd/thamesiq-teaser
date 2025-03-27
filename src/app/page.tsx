"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThamesiqLogo from "@/assets/thamesiq_logo.svg";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const sectionInsertedRef = useRef<HTMLDivElement>(null);
  const credibilityRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [role, setRole] = useState("");

useEffect(() => {
  if (mainRef.current) {
    mainRef.current.style.visibility = "hidden";
    mainRef.current.style.opacity = "0";
  }
  requestAnimationFrame(() => {
    if (mainRef.current) {
      mainRef.current.style.visibility = "visible";
      gsap.to(mainRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power1.out",
      });
    }

    if (
      pinnedSectionRef.current &&
      slide1Ref.current &&
      logoRef.current &&
      headlineRef.current &&
      textContainerRef.current &&
      text1Ref.current &&
      text2Ref.current &&
      backgroundRef.current
    ) {
      gsap.set(logoRef.current, {
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedSectionRef.current,
          start: "top top",
          end: "+=200%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(backgroundRef.current, { y: -50, ease: "none" }, 0);

      tl.fromTo(
        logoRef.current,
        { scale: 1, opacity: 1, filter: "blur(0px)" },
        {
          scale: 4,
          opacity: 0,
          filter: "blur(8px)",
          ease: "power2.inOut",
        },
        0
      );

      tl.fromTo(
        headlineRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.2, opacity: 0, ease: "power2.out" },
        0.1
      );

      tl.fromTo(
        text1Ref.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        0.4
      ).fromTo(
        text2Ref.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, ease: "power2.out" },
        "<"
      );

      tl.to(
        text1Ref.current,
        { x: -100, opacity: 0, ease: "power2.in" },
        0.9
      ).to(
        text2Ref.current,
        { x: 100, opacity: 0, ease: "power2.in" },
        "<"
      );
    }

    if (sectionInsertedRef.current) {
      gsap.fromTo(
        sectionInsertedRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionInsertedRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (credibilityRef.current) {
      gsap.fromTo(
        credibilityRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: credibilityRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (formRef.current) {
  gsap.set(formRef.current, {
    x: window.innerWidth, // offscreen right dynamically
    opacity: 1,
    visibility: "visible"
  });

  gsap.to(formRef.current, {
    x: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: formRef.current,
      start: "top 90%",
      end: "top center",
      scrub: true
    }
  });
}

  });
}, []);



  return (
    <main
      ref={mainRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-[#FFF7ED]"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-gradient-to-b from-[#FFD1DC] via-[#FFEBB4] to-[#C6F7E9] animate-gradient-x" />
      </div>

      <div ref={pinnedSectionRef} className="relative h-[100vh] z-10 overflow-hidden">
        <div ref={backgroundRef} className="absolute inset-0 -z-10" />
        <div
          ref={slide1Ref}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center perspective-[1000px]"
        >
          <div ref={logoRef} className="w-[50vw] mx-auto mb-4">
            <ThamesiqLogo preserveAspectRatio="xMidYMid meet" className="logo-svg w-full block" />
          </div>
          <h1 ref={headlineRef} className="text-[#3B302A] text-4xl font-bold text-center max-w-xl">
            Expert-Driven Sales Activation for Middle Market &amp; Enterprise
          </h1>
        </div>

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center perspective-[1000px]">
          <div
            ref={textContainerRef}
            className="flex flex-col items-center justify-center space-y-4"
          >
            <div ref={text1Ref} className="text-[#3B302A] text-5xl font-bold">
              Activating Producer Relationships
            </div>
            <div ref={text2Ref} className="text-[#3B302A] text-5xl font-bold">
              Amplifying Practice Group Expertise
            </div>
          </div>
        </div>
      </div>

      <div ref={credibilityRef} className="bg-[#FFF1E8] text-[#3B302A] text-center px-6 md:px-12 py-24">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Producer<br />Trust &amp; Credibility</h2>
        <div className="inline-block px-10 py-6 bg-white rounded-[3rem] border border-[#FFD1DC]">
          <span className="text-[#3B302A] text-[8rem] leading-none font-bold">1.97</span>
        </div>
        <p className="text-sm md:text-base mt-6 text-[#5E4B43] max-w-2xl mx-auto">
          Polled multiple CFOs and In-House Counsels.<br />
          <strong>This score is on a 1–5 scale</strong><br />
          3 is what most would rate new attorneys or bankers
        </p>
      </div>

      <div ref={sectionInsertedRef} className="bg-[#FFF7ED] text-[#3B302A] px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight leading-tight md:max-w-2xl text-pretty">
              A proven system designed to help teams move faster, engage smarter, and drive greater trust.
            </h2>
          </div>
          <ul className="text-xl font-medium leading-relaxed space-y-3">
            <li><TextGradientScroll text="Empowers Producers to turn lukewarm relationships into real opportunities" /></li>
            <li><TextGradientScroll text="Supports Internal Practice Groups looking to drive greater producer engagement" /></li>
            <li><TextGradientScroll text="Cross-sell intelligently with data-backed strategies" /></li>
            <li><TextGradientScroll text="Accelerates M&A integration of Producers and Practice Groups" /></li>
            <li><TextGradientScroll text="Provides External Wholesalers, MGAs & Risk Vendors a better way to connect" /></li>
            <li><TextGradientScroll text="Increases ROI on sports suites by utilizing a strategic deployment method" /></li>
          </ul>
        </div>
      </div>

      <div ref={formRef} className="w-full bg-[#FFF7ED] text-[#3B302A] py-20 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-white/70 backdrop-blur rounded-2xl shadow-xl p-8 border border-[#FFD1DC]">
            <h2 className="text-3xl font-bold mb-4 text-[#3B302A]">Exclusive Early Access Opportunity</h2>
            <p className="text-[#5E4B43] mb-6">
              We’re launching an exclusive early access program where we will work hands-on with a small group of clients. <br />
              Interested in learning more? Sign up below.
            </p>
            <form className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm mb-1 text-[#5E4B43]">First name<span className="text-[#FF7A59]"> *</span></label>
                  <input type="text" id="firstName" placeholder="First name" className="w-full p-2 rounded bg-[#FFF1E8] text-[#3B302A] border border-[#FFD1DC]" required />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm mb-1 text-[#5E4B43]">Last name<span className="text-[#FF7A59]"> *</span></label>
                  <input type="text" id="lastName" placeholder="Last name" className="w-full p-2 rounded bg-[#FFF1E8] text-[#3B302A] border border-[#FFD1DC]" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-[#5E4B43]">Email<span className="text-[#FF7A59]"> *</span></label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full p-2 rounded bg-[#FFF1E8] text-[#3B302A] border border-[#FFD1DC]" required />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm mb-1 text-[#5E4B43]">Role<span className="text-[#FF7A59]"> *</span></label>
                <select
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 rounded bg-[#FFF1E8] text-[#3B302A] border border-[#FFD1DC]"
                  required
                >
                  <option value="">Select your role</option>
                  <option>Practice Group / Coverage Leader</option>
                  <option>Sales Manager / Regional MD</option>
                  <option>Producer</option>
                  <option>Wholesale Leader</option>
                  <option>MGA Leader</option>
                  <option>Risk Mitigation Tool</option>
                  <option>Other (Tell us more!)</option>
                </select>
              </div>
              {role === "Other (Tell us more!)" && (
                <div>
                  <label htmlFor="customRole" className="block text-sm mb-1 text-[#5E4B43]">Your role</label>
                  <input type="text" id="customRole" placeholder="Tell us more" className="w-full p-2 rounded bg-[#FFF1E8] text-[#3B302A] border border-[#FFD1DC]" required />
                </div>
              )}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-1 accent-[#FF7A59]" required />
                <label htmlFor="privacy" className="text-sm text-[#5E4B43]">
                  You agree to our <a href="#" className="underline">privacy policy</a>.
                </label>
              </div>
              <button type="submit" className="w-full bg-[#FF7A59] text-white font-semibold py-2 px-4 rounded hover:bg-[#FF9671]">
                Request Early Access
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`

        .animate-gradient-x {
          background-size: 400% 400%;
          animation: gradientX 20s ease infinite;
        }
        @keyframes gradientX {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        button {
          transition: background-color 0.3s ease, transform 0.2s ease;
          background-color: #FF7A59;
        }
        button:hover {
          background-color: #FF9671 !important;
          transform: scale(1.03);
        }
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </main>
  );
}