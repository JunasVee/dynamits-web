import Navbar from "@/components/Navbar";
import React from "react";

const Page = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-blue-400 flex justify-center items-center p-4">
        <div className="flex w-full max-w-xl bg-white rounded-xl overflow-hidden shadow-2xl">
          {/* Left Panel - Login Form */}
          <div className="w-full p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Masuk ke Akun Anda
            </h1>

            <form>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Masukkan password Anda"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
              >
                Masuk
              </button>
            </form>

            <div className="mt-8 text-center text-gray-600">
              Belum memiliki akun?{" "}
              <a
                href="#"
                className="text-blue-500 font-semibold hover:underline"
              >
                Daftar sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
