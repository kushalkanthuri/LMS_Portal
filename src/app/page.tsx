import Link from "next/link";

export default function Home() {
  return (
    <main className="size-full bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simplify Your
              <span className="text-blue-600">Campus Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              An all-in-one platform that streamlines administrative tasks,
              enhances communication, and improves the educational experience
              for students and staff.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 text-lg"
              >
                Get Started
              </Link>
              <button className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-300 text-lg">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center text-gray-600">
              <span className="flex items-center mr-4">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Easy Setup
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-blue-100 rounded-lg p-2 shadow-xl">
                <img
                  src="/dashboard-image.png"
                  alt="Campus Bridge Dashboard"
                  className="rounded-lg shadow-inner"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-slate-100 p-4 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Student satisfaction
                    </p>
                    <p className="text-xl font-bold text-blue-600">+95%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Everything You Need to Manage Your Campus
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Student Management",
              icon: "👨‍🎓",
              description:
                "Streamline registration, attendance tracking, and academic performance monitoring.",
            },
            {
              title: "Course Administration",
              icon: "📚",
              description:
                "Easily organize courses, assign faculty, and manage curriculum.",
            },
            {
              title: "Scheduling System",
              icon: "🗓️",
              description:
                "Optimize class schedules, room assignments, and academic calendars.",
            },
            {
              title: "Financial Management",
              icon: "💰",
              description:
                "Handle tuition, scholarships, payroll, and other financial operations.",
            },
            {
              title: "Communication Hub",
              icon: "📱",
              description:
                "Connect all stakeholders with announcements, messaging, and notifications.",
            },
            {
              title: "Analytics Dashboard",
              icon: "📊",
              description:
                "Make data-driven decisions with comprehensive insights and reports.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Trusted by Universities Worldwide
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "Campus Bridge transformed how we manage our university operations. Everything is now streamlined and efficient.",
                author: "Dr. Sarah Johnson",
                role: "University President",
              },
              {
                quote:
                  "The student experience has improved dramatically since implementing this system. Registration is now a breeze.",
                author: "Prof. Michael Chen",
                role: "Dean of Students",
              },
              {
                quote:
                  "As an administrator, I can't imagine going back to our old processes. Campus Bridge saves us countless hours.",
                author: "Lisa Rodriguez",
                role: "Administrative Director",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-blue-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Campus?
          </h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Join hundreds of universities that have modernized their management
            systems with Campus Bridge.
          </p>
          <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-medium hover:bg-blue-100 transition duration-300 text-lg">
            Schedule a Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Campus Bridge</h3>
              <p className="text-gray-400">
                Modern solutions for modern education
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>
              © {new Date().getFullYear()} Campus Bridge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
