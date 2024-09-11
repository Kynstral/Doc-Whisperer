import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative isolate min-h-full bg-[#020201] custom-scrollbar">
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
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
        <div className="relative mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base font-semibold leading-8 text-[#1fff67]">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#1fff67] sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-[#d2d4d5] sm:mt-6">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="/"
              className="text-sm font-semibold leading-7 text-[#1fff67]"
            >
              <button
                type="button"
                className="rounded-md bg-[#1fff67] px-3 py-2 text-sm font-semibold text-[#020201] shadow-sm hover:bg-[#1bff56]"
              >
                <span aria-hidden="true">&larr;</span> Back to home
              </button>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
