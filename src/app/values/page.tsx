"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ValuesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToAccessForm = () => {
    const element = document.getElementById('accessForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!mainRef.current) return;

    gsap.set(mainRef.current, { visibility: "visible", opacity: 1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Animate "Our Values" headline letter-by-letter (includes y-axis slide)
      tl.from(".values-header span", {
        opacity: 0,
        y: 20,
        scale: 1.4,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate subheadline text letter-by-letter AFTER the headline.
      // Added transformOrigin to "center center" to avoid unwanted vertical movement due to scaling.
      tl.from(
        ".values-subheadline span",
        {
          opacity: 0,
          scale: 1.4,
          transformOrigin: "50% 50%", // or "center center"
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        },
        ">0" // starts immediately after the previous animation completes
      );

      // ...rest of your animations...
      const bulletTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-1",
          start: "top top",
          end: "+=25%",
          scrub: true,
          markers: false,
        },
      });

      bulletTL.from(".values-bullet", {
        x: -80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });

      // Other section animations remain unchanged...
      gsap.from(".section2-block-1", {
        scrollTrigger: {
          trigger: ".section2-block-1",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      gsap.from(".section2-block-2", {
        scrollTrigger: {
          trigger: ".section2-block-2",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
      });

      gsap.to(".section-3-text span", {
        scrollTrigger: {
          trigger: ".section-3",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power1.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full overflow-x-hidden" style={{ visibility: 'hidden', opacity: 0 }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white/75 backdrop-blur-md px-4 py-2 shadow-sm z-50">
        <div className="flex items-center">
          <img src="/thamesiq_logo.svg" alt="Thames IQ Logo" className="h-8 w-auto" />
        </div>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-gray-700 hover:text-gray-900 transition">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition">About</a>
          <button onClick={scrollToAccessForm} className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition">
            Get Access
          </button>
        </nav>
      </header>

      {/* Section 1 */}
      <section className="section-1 relative min-h-screen">
        <div className="h-[125vh] relative">
          <div className="sticky top-0 h-screen">
            <div className="max-w-5xl mx-auto px-8 w-full h-full flex flex-col justify-between pt-32 pb-8">
              <header className="values-header mb-12">
                <h1 className="text-hero font-bold mb-4 flex flex-wrap">
                  {"Our Values".split("").map((letter, i) => (
                    <span key={i} className="inline-block will-change-transform">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </h1>

                {/* Updated subheadline: Each letter is wrapped to preserve spaces */}
                <p className="values-subheadline text-big font-normal text-gray-900">
                  {"Every decision we make involves benchmarking them with our values."
                    .split("")
                    .map((char, i) => (
                      <span key={i} className="inline-block will-change-transform">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                </p>
              </header>

              <div className="values-bullets mb-20">
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
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-2 flex items-center bg-[#FAFAFA] py-16 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <div className="mb-12 grid grid-cols-12 section2-block-1">
            <h2 className="section-header text-heading font-bold mb-10 col-span-12 lg:col-span-7">The Clients We Work With</h2>
            <p className="section-text text-big col-span-12 lg:col-span-7 mb-20">
              Optimistic folks that value mutual respect.
            </p>
          </div>

          <div className="mb-12 grid grid-cols-12 section2-block-2">
            <h2 className="section-header text-heading font-bold mb-10 col-span-12 lg:col-span-7">The Team We're Building</h2>
            <p className="section-text text-big col-span-12 lg:col-span-7">
              Specifically Confident, Holistically Humble.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="section-3 flex items-center min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <p className="section-3-text section-header text-special font-bold mb-2 text-pretty leading-tight">
            {"We've put significant thought in each of these values that go beyond a few sentences. If you want to learn more – ping us!"
              .split(" ")
              .map((word, i) => (
                <span key={i} className="inline-block opacity-0 mr-[0.25ch] will-change-transform">
                  {word}
                </span>
              ))}
          </p>
        </div>
      </section>

      {/* Section 4 */}
      <section className="section-4 flex bg-[#1f2937] py-32 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <h2 className="section-header text-small-heading font-bold mb-10 text-white">
            Our View on Middle Market and Enterprise Companies Business Development
          </h2>
          <div className="overflow-auto max-h-[400px] columns-1 md:columns-2 [column-gap:64px]">
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              Trust is lost in the industry. A significant amount of executive leaders do not trust new insurance producers that knock on their doors.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              We believe that discovery meetings need to be earned. Brokers need to illustrate and display expertise to build credibility with a prospect.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              We also believe this expertise needs to be deployed strategically and efficiently at the right time.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4">
              The top brokers typically have what it takes – the producers with the relationship and the practice groups.
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
              <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition">Privacy Policy</a>
              <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition">Terms of Service</a>
              <a href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ValuesPage;