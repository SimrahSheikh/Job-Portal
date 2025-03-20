import { CheckCircle } from "lucide-react";
import HeroSlider from "./heroSlider";
import { Landing_NavBar } from "./Landing_NavBar";

export default function Web_homepage() {
  return (
    <>
      <Landing_NavBar />

      <div className="bg-white-300 py-12 px-4 sm:px-6 lg:px-8">
        <HeroSlider />
      </div>

      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <section className="my-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Why Choose Us?
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {[
              "Verified Job Listings",
              "Seamless Application Process",
              "Connect with Top Recruiters",
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow transition-transform duration-300 hover:scale-105"
              >
                <CheckCircle className="text-green-500 w-10 h-10 mx-auto" />
                <p className="mt-4 text-lg font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="bg-gray-700 text-white py-6">
        <footer className="bg-gray-700 text-white text-center py-6">
          <p>&copy; 2025 Job Portal. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
