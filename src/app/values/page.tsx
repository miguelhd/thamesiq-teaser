"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll";

gsap.registerPlugin(ScrollTrigger);

const ValuesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  const scrollToAccessForm = () => {
    const element = document.getElementById("accessForm");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!mainRef.current) return;
    gsap.set(mainRef.current, { visibility: "visible", opacity: 1 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

// Section 1
      tl.from(".values-header span", {
        opacity: 0,
        y: 20,
        scale: 1.4,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      });

      const bulletTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-1",
          start: "top top",
          end: "+=25%",
          pin: true,
          scrub: true,
        },
      });

      bulletTL.from(".values-bullet", {
        x: -80,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      });

// Create a timeline tied to scroll progress for Section 2
      const section2 = document.querySelector(".section-2");
      if (section2) {
        const blocks = section2.querySelectorAll(".section2-block");

        blocks.forEach((block, index) => {
          gsap.from(block, {
            scrollTrigger: {
              trigger: section2,
              start: `top top`, // Adjust when the section starts animating
              end: "+=25%",     // Adjust when the animation finishes
              pin: true,
              scrub: true,
            },
            opacity: 0, // Starting opacity
            y: 200,      // Starting Y offset
            ease: "power3.out",
          });
        });
      }

// Section 3
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

      // Section 4 - fade in the entire content with scrub
gsap.from(".section-4 .fade-target", {
  scrollTrigger: {
    trigger: ".section-4",
    start: "top 90%",     // Start fading in when section enters view
    end: "top 50%",       // Fully visible by mid-screen
    scrub: true,
  },
  opacity: 0,
  y: 40,
  ease: "power2.out",
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-white/75 backdrop-blur-md px-4 py-2 shadow-sm z-50">
        <div className="flex items-center">
          <Image
            src="/thamesiq_logo.svg"
            alt="Thames IQ Logo"
            width={100}
            height={32}
            className="h-6 w-auto"
          />
        </div>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-gray-700 hover:text-gray-900 transition">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition">
            About
          </a>
          <button
            onClick={scrollToAccessForm}
            className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
          >
            Get Access
          </button>
        </nav>
      </header>

      {/* Section 1 */}
      <section className="section-1 relative min-h-screen">
        <div className="h-[100vh] relative">
          <div className="sticky top-0 h-screen">
            <div className="max-w-5xl mx-auto px-8 w-full h-full flex flex-col pt-32 pb-8">
              <header className="values-header mb-30">
                <h1 className="text-hero font-bold mb-5 flex flex-wrap">
                  {"Our Values".split("").map((letter, i) => (
                    <span key={i} className="inline-block">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  ))}
                </h1>
                <div className="values-subheadline text-big font-normal text-pretty text-gray-900">
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
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-2 bg-[#FAFAFA] relative min-h-screen">
        <div className="h-[100vh] relative">
        <div className="sticky top-0 h-screen">
                    <div className="max-w-5xl mx-auto px-8 w-full h-full flex flex-col pt-32 pb-8">
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
              <a
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-600 hover:text-gray-900 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default ValuesPage;
