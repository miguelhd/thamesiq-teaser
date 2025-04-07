"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ThamesiqLogo from "@/assets/thamesiq_logo.svg";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";
import { AuroraBackground } from "@/components/ui/aurora-background";

// Register the ScrollTrigger plugin with GSAP.
gsap.registerPlugin(ScrollTrigger);

// Extend the HTMLElement interface for our custom properties.
interface CustomSlideElement extends HTMLElement {
  _mouseMoveHandler?: (e: MouseEvent) => void;
  _mouseLeaveHandler?: (e: MouseEvent) => void;
}

export default function Home() {
  // Explicitly typed refs.
  const pinnedSectionRef = useRef<HTMLDivElement | null>(null);
  const slide1Ref = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const bulletSectionRef = useRef<HTMLDivElement | null>(null);
  const bulletListRef = useRef<HTMLUListElement | null>(null);
  const credibilityRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);
  const formContentRef = useRef<HTMLDivElement | null>(null);
  const accessButtonRef = useRef<HTMLButtonElement | null>(null);

  // State for manual dark mode toggle.
  const [manualDark, setManualDark] = useState(false);
  useEffect(() => {
    const root = window.document.documentElement;
    if (manualDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [manualDark]);

  // State for the role selection in the form.
  const [role, setRole] = useState("");

  // Scroll helper functions.
  const scrollToPageTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToAccessForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  // ------------------------------
  // Stabilize Mouse Effect Functions using useCallback
  // ------------------------------
  const initMouse3DEffect = useCallback(() => {
    const slideElem = slide1Ref.current as CustomSlideElement | null;
    if (slideElem) {
      const mouseMoveHandler = (e: MouseEvent) => {
        const rect = slideElem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = -((y - centerY) / centerY) * 5;
        gsap.to(slideElem, {
          rotationY: rotateY,
          rotationX: rotateX,
          transformPerspective: 1000,
          ease: "power3.out",
          duration: 0.5,
        });
      };

      const mouseLeaveHandler = () => {
        gsap.to(slideElem, {
          rotationY: 0,
          rotationX: 0,
          ease: "power3.out",
          duration: 0.5,
        });
      };

      slideElem.addEventListener("mousemove", mouseMoveHandler);
      slideElem.addEventListener("mouseleave", mouseLeaveHandler);

      // Save handlers on the element for removal later.
      slideElem._mouseMoveHandler = mouseMoveHandler;
      slideElem._mouseLeaveHandler = mouseLeaveHandler;
    }
  }, []);

  const removeMouse3DEffect = useCallback(() => {
    const slideElem = slide1Ref.current as CustomSlideElement | null;
    if (slideElem) {
      const mouseMoveHandler = slideElem._mouseMoveHandler;
      const mouseLeaveHandler = slideElem._mouseLeaveHandler;
      if (mouseMoveHandler && mouseLeaveHandler) {
        slideElem.removeEventListener("mousemove", mouseMoveHandler);
        slideElem.removeEventListener("mouseleave", mouseLeaveHandler);
      }
    }
  }, []);

  // ------------------------------
  // Main useEffect: Initialize Animations
  // ------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
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

        // Call modularized animation functions.
        animateHeroSection();
        animateAccessButton();
        animateBulletSection();
        animateCredibilitySection();
        animateFormSection();

        ScrollTrigger.refresh();
      });
    }, mainRef);

    initMouse3DEffect();

    return () => {
      removeMouse3DEffect();
      ctx.revert();
    };
  }, [initMouse3DEffect, removeMouse3DEffect]);

  // ------------------------------
  // Modularized Animation Functions
  // ------------------------------

  const animateHeroSection = () => {
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
  };

  // New function to fade out the Get Access button.
  const animateAccessButton = () => {
    if (accessButtonRef.current && pinnedSectionRef.current) {
      gsap.fromTo(
        accessButtonRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: pinnedSectionRef.current,
            start: "top 90%",
            end: "+=300",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }
  };

  const animateBulletSection = () => {
    if (bulletSectionRef.current) {
      gsap.fromTo(
        bulletSectionRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bulletSectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
    if (bulletListRef.current) {
      const bullets = bulletListRef.current.querySelectorAll("li");
      gsap.from(bullets, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: bulletListRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }
  };

  const animateCredibilitySection = () => {
    if (credibilityRef.current) {
      const heading = credibilityRef.current.querySelector("[data-cred='heading']");
      const number = credibilityRef.current.querySelector("[data-cred='number']");
      const paragraph = credibilityRef.current.querySelector("[data-cred='text']");
      gsap.set(paragraph, { overflow: "hidden", clipPath: "inset(0 100% 0 0)" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: credibilityRef.current,
          start: "center center",
          end: "+=600",
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      tl.fromTo(
        heading,
        { scale: 0.9, opacity: 0, y: 100 },
        { scale: 1, opacity: 1, y: 0, ease: "power3.out" },
        0
      )
        .fromTo(
          number,
          { scale: 0.5, opacity: 0, y: 150 },
          { scale: 1, opacity: 1, y: 0, ease: "power4.out" },
          0.2
        )
        .fromTo(
          paragraph,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, ease: "power2.out" },
          0.3
        );
    }
  };

  const animateFormSection = () => {
    if (formRef.current && formContentRef.current) {
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
  };

  // ------------------------------
  // JSX Return
  // ------------------------------
  return (
    <main
      ref={mainRef}
      className="relative w-full overflow-x-hidden bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      {/* Floating Navigation */}
      <div className="fixed top-4 right-4 flex items-center gap-4 bg-gray-50/75 dark:bg-gray-800/75 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg z-50">
        <a href="#" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition">
          Home
        </a>
        <a href="/values" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition">
          Values
        </a>
        <button
          onClick={scrollToAccessForm}
          ref={accessButtonRef}
          className="cursor-pointer px-4 py-2 bg-gray-900 text-gray-100 rounded-md hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition"
        >
          Get Early Access
        </button>
        <button
          onClick={() => setManualDark(!manualDark)}
          className="text-sm px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Toggle {manualDark ? "Light" : "Dark"}
        </button>
      </div>

      {/* Hero Section */}
      <div ref={pinnedSectionRef} className="relative h-screen overflow-hidden z-10">
        <AuroraBackground className="fixed inset-0 -z-20">
          <div ref={backgroundRef} className="absolute inset-0 -z-10 bg-transparent" />
        </AuroraBackground>
        <div
          ref={slide1Ref}
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center px-4 perspective-[1000px] z-20"
        >
          <div ref={logoRef} className="w-11/12 md:w-[65vw] mx-auto">
            <ThamesiqLogo
              preserveAspectRatio="xMidYMid meet"
              className="logo-svg w-full block text-black dark:text-white fill-current"
            />
          </div>
          <h1
            ref={headlineRef}
            className="text-gray-800 dark:text-gray-100 text-small-heading md:text-4xl font-bold text-center max-w-xl mt-8"
          >
            Expert-Driven Sales Activation for Middle Market &amp; Enterprise
          </h1>
          <button
            onClick={scrollToAccessForm}
            ref={accessButtonRef}
            className="cursor-pointer mt-12 px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 text-xl text-gray-100 bg-gradient-to-r from-gray-900 to-gray-700 dark:text-gray-900 dark:from-gray-100 dark:to-gray-200 shadow-md hover:shadow-xl focus:outline-none"
          >
            Get Early Access
          </button>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <div ref={textContainerRef} className="flex flex-col items-center justify-center space-y-4">
            <div ref={text1Ref} className="text-gray-900 dark:text-gray-100 text-heading text-center font-bold">
              Activating Producer Relationships
            </div>
            <div ref={text2Ref} className="text-gray-900 dark:text-gray-100 text-heading text-center font-bold">
              Amplifying Practice Group Expertise
            </div>
          </div>
        </div>
      </div>

      {/* Credibility Section */}
      <div ref={credibilityRef} className="relative h-screen px-4 md:px-12 bg-gray-50 dark:bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
          <h2 data-cred="heading" className="text-heading font-bold text-gray-900 dark:text-gray-100 text-center">
            Producer<br />Trust &amp; Credibility
          </h2>
          <div data-cred="number" className="relative inline-block px-6 py-4 bg-white dark:bg-zinc-950 rounded-xl border border-gray-300 dark:border-zinc-700 shadow-lg">
            <span className="text-sky-600 dark:text-gray-100 text-4xl md:text-[8rem] leading-none font-bold">
              1.97
            </span>
          </div>
          <p data-cred="text" className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-2xl text-center">
            Polled multiple CFOs and In-House Counsels.
            <br />
            On a 1–5 scale, 3 is what most would rate new attorneys or bankers.
          </p>
        </div>
      </div>

      {/* Bullet Section */}
      <div ref={bulletSectionRef} className="flex items-center h-screen px-4 md:px-12 bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 grid grid-cols-12 relative">
            <h2 className="text-small-heading font-bold tracking-tight leading-tight text-balance text-left dark:text-gray-100 text-gray-800 md:text-left col-span-9">
              <TextGradientScroll text="A proven system designed to help teams move faster, engage smarter, and drive greater trust." />
            </h2>
          </div>
          <ul ref={bulletListRef} className="text-big text-sky-600 dark:text-gray-300 font-semibold tracking-tight text-pretty leading-normal space-y-3">
            <li>
              <TextGradientScroll text="Empowers Producers to turn lukewarm relationships into real opportunities" />
            </li>
            <li>
              <TextGradientScroll text="Supports Internal Practice Groups looking to drive greater producer engagement" />
            </li>
            <li>
              <TextGradientScroll text="Cross-sell intelligently with data-backed strategies" />
            </li>
            <li>
              <TextGradientScroll text="Accelerates M&A integration of Producers and Practice Groups" />
            </li>
            <li>
              <TextGradientScroll text="Provides External Wholesalers, MGAs &amp; Risk Vendors a better way to connect" />
            </li>
            <li>
              <TextGradientScroll text="Increases ROI on sports suites by utilizing a strategic deployment method" />
            </li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <div ref={formRef} className="flex flex-col items-center justify-center w-full bg-gray-100 dark:bg-zinc-900 px-4 py-24">
        <div ref={formContentRef} className="max-w-2xl w-full mx-auto">
          <div className="backdrop-blur rounded-2xl shadow-xl bg-gray-50 dark:bg-zinc-50 border border-gray-200 p-8">
            <h2 className="text-small-heading font-bold mb-4 text-gray-900">Exclusive Early Access Opportunity</h2>
            <p className="text-gray-700 mb-6 text-body">
              We&apos;re launching an exclusive early access program where we will work hands-on with a small group of clients.
              Interested in learning more? Sign up below.
            </p>
            <form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <label htmlFor="firstName" className="block text-sm mb-1 text-gray-700">
                    First name<span className="text-gray-900"> *</span>
                  </label>
                  <input type="text" id="firstName" className="w-full max-w-xl py-4 px-6 text-xl rounded-lg border border-gray-300 bg-white text-gray-900" required />
                </div>
                <div className="w-full md:w-1/2">
                  <label htmlFor="lastName" className="block text-sm mb-1 text-gray-700">
                    Last name<span className="text-gray-900"> *</span>
                  </label>
                  <input type="text" id="lastName" className="w-full max-w-xl py-4 px-6 text-xl rounded-lg border border-gray-300 bg-white text-gray-900" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                  Email<span className="text-gray-900"> *</span>
                </label>
                <input type="email" id="email" className="w-full max-w-xl py-4 px-6 text-xl rounded-lg border border-gray-300 bg-white text-gray-900" required />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm mb-1 text-gray-700">
                  Role<span className="text-gray-900"> *</span>
                </label>
                <div className="relative w-full max-w-xl">
                  <select
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="appearance-none w-full py-4 px-6 pr-10 text-xl rounded-lg border border-gray-300 bg-white text-gray-900"
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
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              {role === "Other (Tell us more!)" && (
                <div>
                  <label htmlFor="customRole" className="block text-sm mb-1 text-gray-700">
                    Your role
                  </label>
                  <input type="text" id="customRole" className="w-full max-w-xl py-4 px-6 text-xl rounded-lg border border-gray-300 bg-white text-gray-900" required />
                </div>
              )}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="privacy" className="mt-2 mr-2 ml-1 scale-175 accent-gray-900" required />
                <label htmlFor="privacy" className="text-xl text-gray-700">
                  You agree to our <a href="#" className="underline">privacy policy</a>.
                </label>
              </div>
              <button type="submit" className="cursor-pointer w-full bg-gray-900 text-gray-100 font-semibold py-4 px-8 text-lg rounded-lg hover:bg-gray-800">
                Request Early Access
              </button>
            </form>
          </div>
          <div className="mt-6">
            <button onClick={scrollToPageTop} className="text-gray-700 hover:text-gray-900 transition underline">
              Back to Top
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-200 dark:bg-gray-950 py-8">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Thames IQ. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
                Terms of Service
              </a>
              <a href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}