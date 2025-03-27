"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThamesiqLogo from "@/assets/thamesiq_logo.svg";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
const pinnedSectionRef = useRef<HTMLDivElement | null>(null);
const slide1Ref = useRef<HTMLDivElement | null>(null);
const logoRef = useRef<HTMLDivElement | null>(null);
const headlineRef = useRef<HTMLHeadingElement | null>(null);
const textContainerRef = useRef<HTMLDivElement | null>(null);
const text1Ref = useRef<HTMLDivElement | null>(null);
const text2Ref = useRef<HTMLDivElement | null>(null);
const sectionInsertedRef = useRef<HTMLDivElement | null>(null);
const credibilityRef = useRef<HTMLDivElement | null>(null);
const backgroundRef = useRef<HTMLDivElement | null>(null);
const mainRef = useRef<HTMLElement | null>(null);
const formRef = useRef<HTMLDivElement | null>(null);
const formContentRef = useRef<HTMLDivElement | null>(null);

  const [role, setRole] = useState("");

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Smooth scroll to form section
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (mainRef.current) {
        mainRef.current.style.visibility = "hidden";
        mainRef.current.style.opacity = "0";
      }
      requestAnimationFrame(() => {
        if (mainRef.current) {
          mainRef.current.style.visibility = "visible";
          gsap.to(mainRef.current, { opacity: 1, duration: 0.6, ease: "power1.out" });
        }

        // HERO ANIMATIONS
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
          gsap.set(logoRef.current, { transformOrigin: "center center" });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinnedSectionRef.current,
              start: "top top",
              end: "+=200%",
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          tl.to(backgroundRef.current, { y: -50, ease: "none" }, 0);
          tl.fromTo(
            logoRef.current,
            { scale: 1, opacity: 1, filter: "blur(0px)" },
            { scale: 4, opacity: 0, filter: "blur(8px)", ease: "power2.inOut" },
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
          tl.to(text1Ref.current, { x: -100, opacity: 0, ease: "power2.in" }, 0.9)
            .to(text2Ref.current, { x: 100, opacity: 0, ease: "power2.in" }, "<");
        }

        // SECTION INSERTED ANIMATION
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

        // CREDIBILITY SECTION ANIMATION
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

        // FORM CONTENT ANIMATION (animate only the inner content)
        if (formRef.current && formContentRef.current && formContentRef.current.parentNode) {
          gsap.set(formContentRef.current, { x: window.innerWidth });
          gsap.to(formContentRef.current, {
            x: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 60%",
              end: "top center",
              scrub: 5,
              invalidateOnRefresh: true,
            },
          });
        }

        ScrollTrigger.refresh();
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden" style={{ visibility: "hidden", opacity: 0 }}>
      {/* Floating Nav */}
      <div className="fixed top-4 right-4 flex items-center gap-4 bg-gray-200 px-4 py-2 rounded-2xl shadow-lg z-50">
        <a href="#" className="text-gray-700 hover:text-gray-900 transition">Home</a>
        <a href="#" className="text-gray-700 hover:text-gray-900 transition">About</a>
        <button  onClick={scrollToForm} className="cursor-pointer px-4 py-2 bg-gray-900 text-gray-100 rounded-md hover:bg-gray-800 transition">Get Access</button>
      </div>

      {/* Hero Section */}
      <div ref={pinnedSectionRef} className="relative h-screen z-10 overflow-hidden">
        <div ref={backgroundRef} className="absolute inset-0 -z-10" />
        <div ref={slide1Ref} className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 perspective-[1000px] z-20">
          <div ref={logoRef} className="w-[65vw] mx-auto mb-4">
            <ThamesiqLogo preserveAspectRatio="xMidYMid meet" className="logo-svg w-full block" />
          </div>
          <h1 ref={headlineRef} className="text-gray-900 text-4xl font-bold text-center max-w-xl">
            Expert-Driven Sales Activation for Middle Market &amp; Enterprise
          </h1>
          {/* Hero Button */}
          <button onClick={scrollToForm} className="cursor-pointer mt-10 px-8 py-4 rounded-md transition-all duration-300 text-gray-100 bg-gradient-to-r from-gray-900 to-gray-700 shadow-md hover:shadow-xl hover:shadow-gray-500/50 hover:from-gray-800 hover:to-gray-600 focus:outline-none z-30">
            Get Early Access
          </button>
        </div>
        {/* Background text container (non-interactive) */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <div ref={textContainerRef} className="flex flex-col items-center justify-center space-y-4">
            <div ref={text1Ref} className="text-gray-900 text-5xl font-bold">Activating Producer Relationships</div>
            <div ref={text2Ref} className="text-gray-900 text-5xl font-bold">Amplifying Practice Group Expertise</div>
          </div>
        </div>
      </div>

      {/* Credibility Section */}
      <div ref={credibilityRef} className="relative h-screen px-6 md:px-12 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Producer<br />Trust &amp; Credibility
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-300 animate-spin-slow"></div>
              <div className="relative inline-block px-10 py-6 bg-white rounded-full border border-gray-300 shadow-lg">
                <span className="text-gray-900 text-[8rem] leading-none font-bold">1.97</span>
              </div>
            </div>
          </div>
          <p className="text-sm mt-6 text-gray-700 max-w-2xl text-center">
            Polled multiple CFOs and In-House Counsels.
            <br />
            On a 1–5 scale, 3 is what most would rate new attorneys or bankers.
          </p>
        </div>
      </div>

      {/* Section Inserted */}
      <div ref={sectionInsertedRef} className="flex items-center h-screen text-gray-900 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold tracking-tight leading-tight md:max-w-xl">
              A proven system designed to help teams move faster, engage smarter, and drive greater trust.
            </h2>
          </div>
          <ul className="text-2xl text-gray-700 font-semibold leading-normal space-y-3">
            <li><TextGradientScroll text="Empowers Producers to turn lukewarm relationships into real opportunities" /></li>
            <li><TextGradientScroll text="Supports Internal Practice Groups looking to drive greater producer engagement" /></li>
            <li><TextGradientScroll text="Cross-sell intelligently with data-backed strategies" /></li>
            <li><TextGradientScroll text="Accelerates M&A integration of Producers and Practice Groups" /></li>
            <li><TextGradientScroll text="Provides External Wholesalers, MGAs &amp; Risk Vendors a better way to connect" /></li>
            <li><TextGradientScroll text="Increases ROI on sports suites by utilizing a strategic deployment method" /></li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="flex flex-col items-center justify-center h-screen w-full bg-gray-50 px-4">
        <div ref={formContentRef} className="max-w-xl mx-auto">
          <div className="backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-300">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Exclusive Early Access Opportunity</h2>
            <p className="text-gray-700 mb-6">
              We’re launching an exclusive early access program where we will work hands-on with a small group of clients.
              <br />
              Interested in learning more? Sign up below.
            </p>
            <form className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label htmlFor="firstName" className="block text-sm mb-1 text-gray-700">
                    First name<span className="text-gray-900"> *</span>
                  </label>
                  <input type="text" id="firstName" placeholder="First name" className="w-full p-2 rounded text-gray-900 border border-gray-300" required />
                </div>
                <div className="w-1/2">
                  <label htmlFor="lastName" className="block text-sm mb-1 text-gray-700">
                    Last name<span className="text-gray-900"> *</span>
                  </label>
                  <input type="text" id="lastName" placeholder="Last name" className="w-full p-2 rounded text-gray-900 border border-gray-300" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Email<span className="text-gray-900"> *</span>
                </label>
                <input type="email" id="email" placeholder="you@company.com" className="w-full p-2 rounded text-gray-900 border border-gray-300" required />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm mb-1 text-gray-700">
                  Role<span className="text-gray-900"> *</span>
                </label>
                <select id="role" onChange={(e) => setRole(e.target.value)} className="w-full p-2 rounded text-gray-900 border border-gray-300" required>
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
                  <label htmlFor="customRole" className="block text-sm mb-1 text-gray-700">
                    Your role
                  </label>
                  <input type="text" id="customRole" placeholder="Tell us more" className="w-full p-2 rounded text-gray-900 border border-gray-300" required />
                </div>
              )}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-1 accent-gray-900" required />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  You agree to our <a href="#" className="underline">privacy policy</a>.
                </label>
              </div>
              <button type="submit" className="cursor-pointer w-full bg-gray-900 text-gray-100 font-semibold py-2 px-4 rounded-md hover:bg-gray-800">
                Request Early Access
              </button>
            </form>
          </div>
          {/* Back to Top link inside the Form Section */}
          <div className="mt-6">
            <button onClick={scrollToTop} className="text-gray-700 hover:text-gray-900 transition underline">
              Back to Top
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}