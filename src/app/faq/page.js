"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaMinus, FaPlus } from "react-icons/fa";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "What is Doc Whisperer?",
    answer:
      "Doc Whisperer is an AI-powered tool that automatically adds documentation and comments to your code. It helps make your code more readable and maintainable by providing inline comments, detailed API documentation, and comprehensive code documentation.",
  },
  {
    question: "How does Doc Whisperer work?",
    answer:
      "Doc Whisperer uses advanced AI algorithms to analyze your code and generate relevant comments and documentation. It understands the context and functionality of your code to provide accurate and useful explanations.",
  },
  {
    question: "What types of documentation can Doc Whisperer generate?",
    answer:
      "Doc Whisperer can generate various types of documentation, including inline comments, detailed code documentation, and API documentation. It aims to make your codebase more understandable and well-documented.",
  },
  {
    question: "Do I need to log in to use Doc Whisperer?",
    answer:
      "No, Doc Whisperer does not require any login. You can start using the tool immediately without creating an account or providing any personal information.",
  },
  {
    question: "Is my code safe with Doc Whisperer?",
    answer:
      "Yes, your code is secure with Doc Whisperer. We do not store or share your code. It is processed in real-time to generate documentation and then discarded.",
  },
  {
    question: "Can I customize the documentation style?",
    answer:
      "Currently, Doc Whisperer provides a standard style for documentation. However, we are working on adding customization options to let you choose different documentation styles in the future.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "Doc Whisperer supports a variety of popular programming languages. For a full list of supported languages, please refer to our documentation or contact our support team.",
  },
  {
    question: "What are the pricing options for Doc Whisperer?",
    answer:
      "Doc Whisperer offers both free and paid options. The free version has certain usage limits, while the paid options provide additional features and higher usage limits. For detailed pricing information, please visit our pricing page.",
  },
  {
    question: "How can I provide feedback or report issues?",
    answer:
      "You can provide feedback or report issues through our support page or by contacting us directly via email. We appreciate your input and use it to improve our tool.",
  },
];

export default function FAQPage() {
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
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-2xl font-bold leading-10 tracking-tight text-[#1fff67]">
                  Frequently Asked Questions
                </h2>
                <dl className="mt-10 space-y-6 divide-y divide-white/10">
                  {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question} className="pt-6">
                      {({ open }) => (
                        <>
                          <dt>
                            <DisclosureButton className="flex w-full items-start justify-between text-left text-[#1fff67]">
                              <span className="text-base font-semibold leading-7">
                                {faq.question}
                              </span>
                              <span className="ml-6 flex h-7 items-center">
                                {open ? (
                                  <FaMinus
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <FaPlus
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </DisclosureButton>
                          </dt>
                          <DisclosurePanel
                            as="dd"
                            className="mt-2 pr-12 text-left"
                          >
                            <p className="text-base leading-7 text-[#1fff67]">
                              {faq.answer}
                            </p>
                          </DisclosurePanel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </dl>
              </div>
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
