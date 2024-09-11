import { FaXTwitter, FaGithub } from "react-icons/fa6";

const navigation = {
  social: [
    {
      name: "X",
      href: "https://x.com/kynstral",
      icon: (props) => <FaXTwitter {...props} />,
    },
    {
      name: "GitHub",
      href: "https://github.com/kynstral",
      icon: (props) => <FaGithub {...props} />,
    },
  ],
};

export default function Footer() {
  return (
    <footer
      className="bg-transparent border-t border-[#d2d4d5]/10 font-bold relative z-10 custom-scrollbar"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-10 sm:pt-8 lg:px-8 lg:pt-12">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-[#1fff67]">
                  Doc Whisperer
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="/chat"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      Code Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="/chat"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      API Documentation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-[#1fff67]">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="/pricing"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      Guides
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-bold leading-6 text-[#1fff67]">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="/about"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/faq"
                      className="text-sm font-semibold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-bold leading-6 text-[#1fff67]">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm font-bold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm font-bold leading-6 text-[#d2d4d5] hover:text-[#1fff67] cursor-pointer"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-bold leading-6 text-[#1fff67]">
              Newsletter
            </h3>
            <p className="mt-2 text-sm font-bold leading-6 text-[#d2d4d5]">
              Stay updated with the latest AI-driven documentation tools and
              features from Doc Whisperer.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-[#020201] px-3 py-1.5 text-base text-[#d2d4d5] shadow-sm ring-1 ring-inset ring-[#d2d4d5]/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-[#1fff67] sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-[#1fff67] px-3 py-2 text-sm font-bold text-[#020201] shadow-sm hover:bg-[#1fff67]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1fff67]"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-[#d2d4d5]/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-12">
          <div className="flex space-x-6 md:order-2">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-2xl text-[#d2d4d5] hover:text-[#1fff67]"
                style={{ transition: "color 0.3s" }}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs font-bold leading-5 text-[#d2d4d5] md:order-1 md:mt-0">
            © 2024 Doc Whisperer, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
