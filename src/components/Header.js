"use client";

import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Dialog, DialogPanel } from "@headlessui/react";

import doc_whisperer from "@/assets/doc_whisperer.png";

const navbar_title = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-transparent absolute inset-x-0 top-0 z-50 custom-scrollbar">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="/" className="flex items-center space-x-3">
            <Image
              className="h-12 w-12"
              src={doc_whisperer}
              alt="logo"
              width={48}
              height={48}
            />
            <span className="text-2xl font-semibold leading-6 text-[#1fff67] hidden lg:inline">
              Doc Whisperer
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6 text-[#1fff67]" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-4">
          {navbar_title.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-md font-semibold leading-6 px-3 py-1 rounded-md hover:bg-[#1fff67]/80 hover:text-black ${
                pathname === item.href
                  ? "text-black bg-[#1fff67]"
                  : "text-[#1fff67]"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="/chat"
            className="text-sm font-semibold leading-6 text-white"
          >
            <button
              type="button"
              className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
            >
              Get started
            </button>
          </a>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#020201] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 flex justify-between">
              <Image
                className="h-8 w-8"
                src={doc_whisperer}
                alt="logo"
                width={48}
                height={48}
              />
              <span className="ml-2 font-semibold text-[#1fff67] text-2xl">
                Doc Whiperer
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <FaXmark className="h-6 w-6 text-[#1fff67]" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navbar_title.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-[#1fff67]/10 ${
                      pathname === item.href
                        ? "text-white bg-[#1fff67]/30"
                        : "text-[#1fff67]"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a href="/chat">
                  <button
                    type="button"
                    className="rounded-md bg-[#1fff67] hover:bg-[#1fff67]/80 px-5 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
                  >
                    Get Started
                  </button>
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
