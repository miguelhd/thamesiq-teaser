/* eslint-disable @next/next/no-html-link-for-pages */

"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ValuesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (!mainRef.current) return;
    // Ensure the main container is visible
    gsap.set(mainRef.current, { visibility: "visible", opacity: 1 });

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop animations (min-width: 768px)
        "(min-width: 768px)": function () {
          // Section 1: Header runs automatically on load.
          gsap.from(".values-header span", {
            duration: 0.8,
            opacity: 0,
            y: 20,
            scale: 1.4,
            stagger: 0.05,
            ease: "power3.out",
          });
          // Section 1: Bullet animation with pinning & scrubbing.
          gsap.timeline({
            scrollTrigger: {
              trigger: ".section-1",
              start: "top top",
              end: "+=30%",
              pin: true,
              scrub: true,
            },
          }).from(".values-bullet", {
            x: -80,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          });
          // Section 2: Global pinning with a dummy tween.
          gsap.timeline({
            scrollTrigger: {
              trigger: ".section-2",
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: true,
            },
          }).fromTo(".section-2", { x: 0 }, { x: 0, duration: 1 });
          // Section 2: Animate each block individually.
          const section2 = document.querySelector(".section-2");
          if (section2) {
            const blocks = section2.querySelectorAll(".section2-block");
            blocks.forEach((block) => {
              gsap.from(block, {
                scrollTrigger: {
                  trigger: block,
                  start: "center bottom",
                  end: "center center",
                  scrub: true,
                },
                opacity: 0,
                y: 200,
                ease: "power3.out",
              });
            });
          }
          // Section 3: Pinned with scrubbed word-by-word fade-in.
          gsap.timeline({
            scrollTrigger: {
              trigger: ".section-3",
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: true,
            },
          }).to(".section-3-text span", {
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power1.out",
          });
          // Section 4: Pin the section and fade in inner content from 20% to 100%.
          gsap.timeline({
            scrollTrigger: {
              trigger: ".section-4",
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: true,
            },
          }).fromTo(
            ".section-4-content",
            { opacity: 0.2 },
            { opacity: 1, ease: "power2.out" }
          );
        },
        // Mobile animations (max-width: 767px)
        "(max-width: 767px)": function () {
          // On mobile, disable pinning/scrubbing for smoother scroll.
          gsap.from(".values-header span", {
            duration: 0.8,
            opacity: 0,
            y: 20,
            scale: 1.4,
            stagger: 0.05,
            ease: "power3.out",
          });
          gsap.from(".values-bullet", {
            scrollTrigger: {
              trigger: ".section-1",
              start: "top center",
            },
            x: -80,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power2.out",
          });
          const section2 = document.querySelector(".section-2");
          if (section2) {
            const blocks = section2.querySelectorAll(".section2-block");
            blocks.forEach((block) => {
              gsap.from(block, {
                scrollTrigger: {
                  trigger: block,
                  start: "top 90%",
                },
                opacity: 0,
                y: 200,
                duration: 0.6,
                ease: "power3.out",
              });
            });
          }
          gsap.to(".section-3-text span", {
            scrollTrigger: {
              trigger: ".section-3",
              start: "top 80%",
            },
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            ease: "power1.out",
          });
          gsap.fromTo(
            ".section-4-content",
            { opacity: 0.2 },
            { opacity: 1, duration: 0.6, ease: "power2.out" }
          );
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full overflow-x-hidden"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      {/* Responsive Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/75 backdrop-blur-md px-4 py-2 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="block">
              <Image
                src="/thamesiq_logo.svg"
                alt="Thames IQ Logo"
                width={100}
                height={32}
                className="h-6 w-auto"
              />
            </Link>
          </div>
          <nav>
            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-4">
              <li>
                <Link href="/" className="text-gray-700 hover:text-gray-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-700 hover:text-gray-900 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#accessForm" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
                  Get Access
                </Link>
              </li>
            </ul>
            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setNavOpen(!navOpen)}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                {navOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </nav>
        </div>
        {/* Mobile Nav Menu */}
        {navOpen && (
          <div className="md:hidden">
            <ul className="flex flex-col items-center gap-4 py-4">
              <li>
                <Link href="/" className="text-gray-700 hover:text-gray-900 transition" onClick={() => setNavOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-700 hover:text-gray-900 transition" onClick={() => setNavOpen(false)}>
                  About
                </Link>
              </li>
              <li>
                <Link href="/#accessForm" className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition" onClick={() => setNavOpen(false)}>
                  Get Access
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Section 1 */}
      <section className="section-1 relative min-h-screen">
        <div className="md:h-[80vh] h-auto relative">
          <div className="max-w-5xl mx-auto px-8 w-full h-full flex flex-col pt-32 pb-8">
            <header className="values-header mb-30 whitespace-nowrap">
              <h1 className="text-hero font-bold mb-5 flex flex-nowrap">
                {"Our Values".split("").map((letter, i) => (
                  <span key={i} className="inline-block">
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>
              <div className="values-subheadline text-big font-normal text-pretty text-gray-900 whitespace-normal">
                Every decision we make involves benchmarking them with our values.
              </div>
            </header>
            <div className="values-bullets space-y-0">
              <div className="values-bullet py-5 border-b border-gray-200">
                <h3 className="text-small-heading font-bold text-gray-900">
                  Creative Collaboration
                </h3>
              </div>
              <div className="values-bullet py-5 border-b border-gray-200">
                <h3 className="text-small-heading font-bold text-gray-900">
                  Thoughtful Disruption
                </h3>
              </div>
              <div className="values-bullet py-5 border-b border-gray-200">
                <h3 className="text-small-heading font-bold text-gray-900">
                  Bridging Expertise
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-2 bg-[#FAFAFA] relative min-h-screen">
        <div className="h-[100vh] relative">
          <div className="max-w-5xl mx-auto px-8 w-full h-full flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="section2-block section2-block-1 mb-10">
                <h2 className="section-header text-heading text-balanced font-bold mb-5">
                  The Clients We Work With
                </h2>
                <p className="section-text text-big text-pretty">
                  Optimistic folks that value mutual respect.
                </p>
              </div>
              <div className="section2-block section2-block-2">
                <h2 className="section-header text-heading text-balanced font-bold mb-5">
                  The Team We’re Building
                </h2>
                <p className="section-text text-big text-pretty">
                  Specifically Confident, Holistically Humble.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="section-3 flex items-center min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <p className="section-3-text section-header text-special font-bold mb-2 text-pretty leading-tight">
            {"We’ve put significant thought in each of these values that go beyond a few sentences. If you want to learn more – ping us!"
              .split(" ")
              .map((word, i) => (
                <span key={i} className="inline-block opacity-0 mr-[0.25ch]">
                  {word}
                </span>
              ))}
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="section-4 relative md:min-h-screen h-auto bg-[#1f2937]">
        <div className="section-4-content max-w-5xl mx-auto px-8 md:py-32 py-16">
          <h2 className="section-header text-small-heading font-bold mb-10 text-white">
            Our View on Middle Market and Enterprise Companies Business Development
          </h2>
          <div className="overflow-auto md:max-h-[400px] h-auto columns-1 md:columns-2 [column-gap:64px]">
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              Trust is lost in the industry. A significant amount of executive leaders do not trust new insurance producers that knock on their doors.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              We believe that discovery meetings need to be earned. Brokers need to illustrate and display expertise to build credibility with a prospect. Not only the producers but the practice groups that work with them.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              We also believe this expertise needs to be deployed strategically and efficiently at the right time.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              The top brokers typically have what it takes - the producers with the relationship and the practice groups. But they don’t maximize their ROI because they don’t put it all together. M&A further complicates this, but creates an opportunity to accelerate organic growth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Thames IQ. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ValuesPage;