"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ValuesPage: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  // Example scroll function; update with your desired logic.
  const scrollToAccessForm = () => {
    // For example, scroll to an element with ID "accessForm"
    const element = document.getElementById('accessForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      // Reveal the main element before running animations.
      gsap.set(mainRef.current, { visibility: 'visible', opacity: 1 });
    }
    const tl = gsap.timeline({ defaults: { duration: 0.6, ease: 'power2.out' } });
    tl.from('.values-header', { opacity: 0, y: -20 })
      .from('.values-subheader', { opacity: 0, y: 20 }, '-=0.4')
      .from('.values-bullet', { opacity: 0, y: 20, stagger: 0.2 }, '-=0.4')
      .from('.section-header', { opacity: 0, y: 20 }, '-=0.3')
      .from('.section-text', { opacity: 0, y: 20, stagger: 0.2 }, '-=0.3');
  }, []);

  return (
    <main
      ref={mainRef}
      className="relative w-full overflow-x-hidden"
      style={{ visibility: 'hidden', opacity: 0 }}
    >
      {/* Header: Logo on left, floating nav on right */}
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gray-50/75 backdrop-blur-md px-4 py-2 shadow-sm z-50">
        <div className="flex items-center">
          <img
            src="/thamesiq_logo.svg"
            alt="Thames IQ Logo"
            className="h-8 w-auto"
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
      <section
        className="section-1 flex flex-col mt-40"
        style={{ height: '100vh' }}
      >
        <div className="max-w-5xl mx-auto px-8">
          <header
            className="values-header mb-12"
            style={{ marginBottom: 'clamp(6rem, 10vw, 11.25rem)' }}
          >
            <h1 className="text-hero font-bold mb-4">Our Values</h1>
            <p className="values-subheader text-big font-normal">
              Every decision we make involves benchmarking them with our values.
            </p>
          </header>
          <div className="values-bullets space-y-0">
            <div className="values-bullet py-5 border-b border-gray-200">
              <h3 className="text-big font-normal text-gray-900">
                Creative Collaboration
              </h3>
            </div>
            <div className="values-bullet py-5 border-b border-gray-200">
              <h3 className="text-big font-normal text-gray-900">
                Thoughtful Disruption
              </h3>
            </div>
            <div className="values-bullet py-5 border-b border-gray-200">
              <h3 className="text-big font-normal text-gray-900">
                Bridging Expertise
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section
        className="section-2 flex items-center bg-[#FAFAFA] py-16 min-h-screen"
      >
        <div className="max-w-5xl mx-auto px-8 w-full">
          <div className="mb-12 grid grid-cols-12">
            <h2 className="section-header text-heading font-bold mb-10 col-span-12 lg:col-span-7">
              The Clients We Work With
            </h2>
            <p className="section-text text-big col-span-12 lg:col-span-7 mb-20">
              Optimistic folks that value mutual respect.
            </p>
          </div>
          <div className="mb-12 grid grid-cols-12">
            <h2 className="section-header text-heading font-bold mb-10 col-span-12 lg:col-span-7">
              The Team We're Building
            </h2>
            <p className="section-text text-big col-span-12 lg:col-span-7">
              Specifically Confident, Holistically Humble.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section
        className="section-3 flex items-center"
        style={{ height: '100vh' }}
      >
        <div className="max-w-5xl mx-auto px-8">
          <p className="section-header text-special font-bold mb-2">
            We've put significant thought in each of these values that go beyond a few sentences. If you want to learn more – ping us!
          </p>
        </div>
      </section>

      {/* Section 4: Multi-column overflow layout */}
      <section className="section-4 flex bg-[#1f2937] py-32 min-h-screen">
        <div className="max-w-5xl mx-auto px-8 w-full">
          <h2 className="section-header text-small-heading font-bold mb-10 text-white">
            Our View on Middle Market and Enterprise Companies Business Development
          </h2>
          <div className="overflow-auto max-h-[400px] columns-1 md:columns-2 [column-gap:64px]">
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4 last:mb-0">
              Trust is lost in the industry. A significant amount of executive leaders do not trust new insurance producers that knock on their doors.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4 last:mb-0">
              We believe that discovery meetings need to be earned. Brokers need to illustrate and display expertise to build credibility with a prospect. Not only the producers but the practice groups that work with them.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4 last:mb-0">
              We also believe this expertise needs to be deployed strategically and efficiently at the right time.
            </p>
            <p className="section-text text-body text-gray-300 leading-relaxed mb-4 last:mb-0">
              The top brokers typically have what it takes – the producers with the relationship and the practice groups. But they don’t maximize their ROI because they don’t put it all together. M&A further complicates this, but creates an opportunity to accelerate organic growth.
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