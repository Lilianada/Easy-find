import React from "react";
import Image from "next/image";
import Stats from "./Stats";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="mt-16 px-6 mx-auto max-w-[90%] sm:mt-24 lg:mt-24 min-h-[calc(100vh_-_80px_)] lg:min-h-full">
      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
          <>
            <span className="block text-base font-semibold text-gray-500 sm:text-lg lg:text-base xl:text-lg">
              Coming soon
            </span>
            <h1 className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
              <span className="block text-gray-900">Hire a rising talent</span>
              <span className="block text-blue-600">Find your dream job</span>
            </h1>
          </>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
            Looking for a new role? Create a profile on EasyFind to connect
            directly with growing tech teams. Hiring? We're the go-to platform
            for sourcing the best tech talent out there.
          </p>
          <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
            <form action="#" method="POST" className="mt-3 sm:flex">
              <label htmlFor="email" className="sr-only">
                Search
              </label>

              <input
                type="search"
                name="search"
                id=""
                className="block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm outline-none focus:border-rose-500 focus:ring-rose-500"
                placeholder="Job Title, Skill or Company"
              />
              <Link
                href='/browse-jobs'
                className="mt-3 sm:w-auto rounded-md border border-transparent bg-gray-800 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:inline-flex sm:flex-shrink-0 sm:items-center block w-32"
              >
                Find jobs
              </Link>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              <span  className="font-medium text-gray-900">
              Suggestions: {" "}
              </span>
              Designer, Programming, Full-time, Remote, Meta
            </p>
          </div>
        </div>
        <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
          <div className="relative mx-auto w-full rounded-lg shadow-lg">
            <div className="relative block w-full overflow-hidden rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Image
              src="/assets/images/job_seekers.jpg"
              alt="Job seekers"
              width={640}
              height={360}
              sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="z-10"
              priority
            />
            </div>
          </div>
        </div>
      </div>
      <Stats />
    </main>
  );
}
