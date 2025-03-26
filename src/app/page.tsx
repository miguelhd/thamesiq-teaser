"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BackgroundPaths } from "@/components/ui/background-paths";
import ThamesiqLogo from "@/assets/thamesiq_logo.svg";

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
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  const [role, setRole] = useState("");

  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.style.visibility = 'hidden';
      mainRef.current.style.opacity = '0';
    }
    requestAnimationFrame(() => {
      if (mainRef.current) {
        mainRef.current.style.visibility = 'visible';
        gsap.to(mainRef.current, { opacity: 1, duration: 0.6, ease: 'power1.out' });
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
            end: "+=150%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
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
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen w-full overflow-x-hidden bg-[#1F235B]" style={{ visibility: 'hidden', opacity: 0 }}>
      <div className="relative">
        <div
          ref={pinnedSectionRef}
          className="relative h-[100vh] z-10 overflow-hidden bg-[#1F235B]"
        >
          <div ref={backgroundRef} className="absolute inset-0 -z-10">
            <BackgroundPaths />
          </div>

          <div
            ref={slide1Ref}
            className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center perspective-[1000px] [transform-style:preserve-3d]"
          >
            <div ref={logoRef} className="w-[50vw] mx-auto mb-4">
              <ThamesiqLogo preserveAspectRatio="xMidYMid meet" className="logo-svg w-full block" />
            </div>
            <h1
              ref={headlineRef}
              className="text-white text-4xl font-bold text-center max-w-xl"
            >
              Expert-Driven Sales Activation for Middle Market &amp; Enterprise
            </h1>
          </div>

          <div
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center perspective-[1000px]"
          >
            <div
              ref={textContainerRef}
              className="flex flex-col items-center justify-center space-y-4 [transform-style:preserve-3d]"
            >
              <div ref={text1Ref} className="text-white text-3xl font-semibold">
                Activating Producer Relationships
              </div>
              <div ref={text2Ref} className="text-white text-3xl font-semibold">
                Amplifying Practice Group Expertise
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={sectionInsertedRef}
        className="bg-[#1F235B] text-white px-6 md:px-12 py-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight leading-tight md:max-w-xl">
              A proven system designed to help teams move faster, engage smarter, and drive greater trust.
            </h2>
          </div>
          <ul className="text-lg leading-relaxed space-y-3">
            <li>Empowers Producers to turn lukewarm relationships into real opportunities</li>
            <li>Supports Internal Practice Groups looking to drive greater producer engagement</li>
            <li>Cross-sell intelligently with data-backed strategies</li>
            <li>Accelerates M&amp;A integration of Producers and Practice Groups</li>
            <li>Provides External Wholesalers, MGAs &amp; Risk Vendors a better way to connect</li>
            <li>Increases ROI on sports suites by utilizing a strategic deployment method</li>
          </ul>
        </div>
      </div>

      {/* New Form Section Below */}
      <div className="w-full bg-[#1F235B] text-white py-20 px-4">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Exclusive Early Access Opportunity</h2>
          <p className="text-gray-300 mb-6">
            We’re launching an exclusive early access program where we will work hands-on with a small group of clients. <br />
            Interested in learning more? Sign up below.
          </p>
          <form className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm mb-1">First name<span className="text-purple-400"> *</span></label>
                <input type="text" id="firstName" placeholder="First name" className="w-full p-2 rounded bg-white text-black" required />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm mb-1">Last name<span className="text-purple-400"> *</span></label>
                <input type="text" id="lastName" placeholder="Last name" className="w-full p-2 rounded bg-white text-black" required />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm mb-1">Email<span className="text-purple-400"> *</span></label>
              <input type="email" id="email" placeholder="you@company.com" className="w-full p-2 rounded bg-white text-black" required />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm mb-1">Role<span className="text-purple-400"> *</span></label>
              <select
                id="role"
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 rounded bg-white text-black"
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
                <label htmlFor="customRole" className="block text-sm mb-1">Your role</label>
                <input type="text" id="customRole" placeholder="Tell us more" className="w-full p-2 rounded bg-white text-black" required />
              </div>
            )}
            <div className="flex items-start gap-2">
              <input type="checkbox" id="privacy" className="mt-1 accent-purple-500" required />
              <label htmlFor="privacy" className="text-sm text-gray-300">
                You agree to our friendly <a href="#" className="underline">privacy policy</a>.
              </label>
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700">
              Request Early Access
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .logo-svg path[fill="#000"],
        .logo-svg path[fill="#000000"] {
          fill: white;
        }
      `}</style>
    </main>
  );
}
