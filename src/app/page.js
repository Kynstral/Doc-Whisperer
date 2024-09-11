"use client";

import React from "react";
import Image from "next/image";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import app from "@/assets/app.png";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-[#020201] custom-scrollbar">
        <div className="relative isolate pt-14">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#d2d4d5] to-[#d2d4d5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-2xl font-bold tracking-tight text-[#1fff67] sm:text-6xl">
                  Seamless Documentation for Your Code & APIs
                </h1>
                <p className="mt-6 text-lg leading-8 text-[#d2d4d5]">
                  Elevate your code with effortless, AI-powered documentation.
                  Doc Whisperer enhances your APIs and code by adding clear,
                  inline documentation that’s tailored to your needs, making
                  collaboration and maintenance smoother.
                </p>
                <p className="mt-6 text-lg leading-8 text-[#d2d4d5]">
                  Automate the grunt work and let Doc Whisperer handle the
                  technical details, providing you with rich, structured
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  information that brings your projects to life. Whether it's
                  APIs or complex codebases, we make documentation simple,
                  effective, and fast.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a href="/chat">
                    <button
                      type="button"
                      className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
                    >
                      Get started
                    </button>
                  </a>
                  <p className="rounded-md text-sm font-semibold text-[#1fff67] shadow-sm cursor-not-allowed">
                    Learn more <span aria-hidden="true">→</span>
                  </p>
                </div>
              </div>
              <Image
                src={app}
                alt="App screenshot"
                width={2432}
                height={1442}
                className="mt-16 rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 sm:mt-24"
              />
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#d2d4d5] to-[#d2d4d5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
