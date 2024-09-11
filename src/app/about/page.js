"use client";

import { HiAcademicCap } from "react-icons/hi";
import { HiHandRaised } from "react-icons/hi2";
import { FaCheckCircle } from "react-icons/fa";
import { IoRocket, IoSparkles } from "react-icons/io5";
import { FaUserGroup, FaSun } from "react-icons/fa6";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const stats = [
  { label: "Launched", value: "2024" },
  { label: "Developers on the team", value: "4" },
  { label: "Active users", value: "5k+" },
  { label: "Documents processed", value: "1M+" },
];

const values = [
  {
    name: "Empower Developers: ",
    description:
      "Our mission is to provide AI-driven solutions that streamline documentation and code commenting, making the development process more efficient and intuitive.",
    icon: IoRocket,
  },
  {
    name: "Enhance Code Quality: ",
    description:
      "We take responsibility for improving code quality by offering detailed documentation and insightful comments that help developers write better code.",
    icon: HiHandRaised,
  },
  {
    name: "Foster Collaboration: ",
    description:
      "Our platform supports collaboration by providing clear and comprehensive documentation that helps teams work together seamlessly.",
    icon: FaUserGroup,
  },
  {
    name: "Continuous Improvement: ",
    description:
      "We are committed to learning and evolving, ensuring our AI tools stay at the forefront of technology to meet the needs of modern developers.",
    icon: HiAcademicCap,
  },
  {
    name: "Share Knowledge: ",
    description:
      "We believe in sharing knowledge and insights through detailed API documentation and code comments, helping developers learn and grow.",
    icon: IoSparkles,
  },
  {
    name: "Balance and Well-being: ",
    description:
      "We value work-life balance and encourage our team to enjoy downtime, fostering a healthy and productive work environment.",
    icon: FaSun,
  },
];

const benefits = [
  "Competitive salaries for top talent",
  "Flexible work hours to suit your lifestyle",
  "30 days of paid vacation for work-life balance",
  "Annual team retreats for team building and relaxation",
  "Comprehensive benefits for you and your family",
  "A supportive and innovative work environment",
];

export default function about() {
  return (
    <>
      <Header />
      <div className="bg-[#020201] custom-scrollbar">
        <main className="relative isolate">
          {/* Background */}
          <div
            className="absolute inset-x-0 top-4 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#d2d4d5] to-[#d2d4d5] opacity-25"
              style={{
                clipPath:
                  "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
              }}
            />
          </div>
          {/* Header section */}
          <div className="px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl pt-24 text-center sm:pt-40">
              <h2 className="text-4xl font-bold tracking-tight text-[#1fff67] sm:text-6xl">
                Empowering Developers
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Doc Whisperer leverages AI to enhance your code by automatically
                adding comprehensive documentation, comments, and API details.
                Simplify your coding process and ensure your projects are
                well-documented.
              </p>
            </div>
          </div>

          {/* Content section */}
          <div className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 lg:max-w-none lg:grid-cols-2">
                <div>
                  <p>
                    Doc Whisperer is designed to assist developers by automating
                    the documentation process. Our AI-powered tool analyzes your
                    code and provides detailed inline comments, API
                    documentation, and code explanations, saving you time and
                    effort.
                  </p>
                  <p className="mt-8">
                    With Doc Whisperer, you can easily manage and understand
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    complex codebases. Whether you're working on a personal
                    project or collaborating with a team, our application helps
                    ensure that every piece of code is clearly documented and
                    easy to follow.
                  </p>
                </div>
                <div>
                  <p>
                    Our platform supports various programming languages and
                    integrates seamlessly into your development workflow. By
                    using
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Doc Whisperer, you'll enhance code readability and
                    maintainability, leading to more efficient development and
                    fewer misunderstandings.
                  </p>
                  <p className="mt-8">
                    Experience the power of AI-driven documentation with Doc
                    Whisperer. Our tool adapts to your coding style and provides
                    personalized suggestions to improve the quality of your
                    documentation and code comments.
                  </p>
                </div>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={statIdx}
                    className="flex flex-col-reverse gap-y-3 border-l border-white/20 pl-6"
                  >
                    <dt className="text-base leading-7 text-gray-300">
                      {stat.label}
                    </dt>
                    <dd className="text-3xl font-semibold tracking-tight text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Values section */}
          <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-[#1fff67] sm:text-4xl">
                Values
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                At Doc Whisperer, we are driven by a commitment to enhance the
                development experience. Our core values focus on empowering
                developers, enhancing code quality, fostering collaboration, and
                promoting continuous learning. We strive to share knowledge and
                support a balanced work environment to ensure both professional
                growth and well-being.
              </p>
            </div>

            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
              {values.map((value) => (
                <div key={value.name} className="relative pl-9 ">
                  <dt className="inline font-semibold text-text-[#1fff67]">
                    <value.icon
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-500"
                      aria-hidden="true"
                    />
                    {value.name}
                  </dt>{" "}
                  <dd className="inline">{value.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Team section */}
          <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-[#1fff67] sm:text-4xl">
                Team
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                At Doc Whisperer, our dedicated team is passionate about
                transforming the way developers document their code. With a
                blend of expertise in AI and a deep understanding of developer
                needs, we are committed to delivering an intuitive and powerful
                tool that enhances productivity and fosters better code quality.
                Our team is small but highly skilled, working tirelessly to
                ensure our users have the best experience possible.
              </p>
            </div>
          </div>

          {/* CTA section */}
          <div className="relative isolate -z-10 mt-32 sm:mt-40 pb-10">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                <div className="w-full flex-auto">
                  <h2 className="text-3xl font-bold tracking-tight text-[#1fff67] sm:text-4xl">
                    Join Our Team
                  </h2>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    At Doc Whisperer, we are dedicated to revolutionizing the
                    way developers interact with code and documentation. Join us
                    in our mission to empower developers with cutting-edge AI
                    tools that streamline documentation, enhance code quality,
                    and
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    foster collaboration. If you're passionate about technology
                    and eager to make a meaningful impact, we’d love to hear
                    from you!
                  </p>

                  <ul
                    role="list"
                    className="mt-10 grid grid-cols-1 gap-x-8 gap-y-3 text-base leading-7 text-white sm:grid-cols-2"
                  >
                    {benefits.map((benefit) => (
                      <li key={benefit} className="flex gap-x-3">
                        <FaCheckCircle
                          className="h-7 w-5 flex-none"
                          aria-hidden="true"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10 flex">
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-[#1fff67]"
                    >
                      See our job postings{" "}
                      <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
              aria-hidden="true"
            >
              <div
                className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#d2d4d5] to-[#d2d4d5] opacity-25"
                style={{
                  clipPath:
                    "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                }}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
