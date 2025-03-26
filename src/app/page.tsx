"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const section4Ref = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

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

      if (section4Ref.current) {
        gsap.fromTo(
          section4Ref.current,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section4Ref.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const handleMouseMove = (event: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const effectMultiplierSlide1 = 20;
        const effectMultiplierText = 20;

        const rotationYSlide1 = ((event.clientX - innerWidth / 2) / innerWidth) * effectMultiplierSlide1;
        const rotationXSlide1 = ((event.clientY - innerHeight / 2) / innerHeight) * -effectMultiplierSlide1;

        const rotationYText = ((event.clientX - innerWidth / 2) / innerWidth) * effectMultiplierText;
        const rotationXText = ((event.clientY - innerHeight / 2) / innerHeight) * -effectMultiplierText;

        if (slide1Ref.current) {
          gsap.to(slide1Ref.current, {
            rotationY: rotationYSlide1,
            rotationX: rotationXSlide1,
            transformOrigin: "center center",
            ease: "power2.out",
            duration: 0.5,
          });
        }
        if (textContainerRef.current) {
          gsap.to(textContainerRef.current, {
            rotationY: rotationYText,
            rotationX: rotationXText,
            transformOrigin: "center center",
            ease: "power2.out",
            duration: 0.5,
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
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
        className="h-[832px] bg-[#1F235B] text-white flex flex-col justify-center px-8"
      >
        <div className="max-w-4xl mx-auto space-y--6">
          <h2 className="text-3xl font-bold leading-tight">
            A proven system designed to help teams move faster, engage smarter, and drive greater trust.
          </h2>
          <ul className="text-lg leading-relaxed space-y-2">
            <li>Empowers Producers to turn lukewarm relationships into real opportunities</li>
            <li>Supports Internal Practice Groups looking to drive greater producer engagement</li>
            <li>Cross-sell intelligently with data-backed strategies</li>
            <li>Accelerates M&amp;A integration of Producers and Practice Groups</li>
            <li>Provides External Wholesalers, MGAs &amp; Risk Vendors a better way to connect</li>
            <li>Increases ROI on sports suites by utilizing a strategic deployment method</li>
          </ul>
        </div>
      </div>

      <div
        ref={section4Ref}
        className="h-[832px] flex flex-col items-center justify-center bg-neutral-900 text-white p-8"
      >
        <div className="max-w-md w-full">
          <h4 className="text-2xl mb-4 font-bold">Request Early Access</h4>
          <p className="mb-6 text-gray-300">
            Provide your details to be notified when we launch.
          </p>
          <form className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Jane Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="jane@example.com" />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
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
