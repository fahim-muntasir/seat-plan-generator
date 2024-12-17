import React from 'react';
import { motion } from 'framer-motion';
import { ExamHallIllustration } from "../illustrations/ExamHallIllustration"

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary-50 to-white overflow-hidden min-h-screen flex items-center">
      <div className="max-w-7xl min-w-full mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-0 lg:pb-0 xl:pb-0">
          <div className="mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-0 lg:mt-0 lg:px-8 xl:mt-0">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="sm:text-center lg:text-left lg:w-1/2 text-center md:text-left"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Transform Your</span>
                  <span className="block text-primary-600">Exam Management</span>
                </h1>
                <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Streamline your exam seating arrangements with our intelligent system. Create optimal seating plans that ensure fair and organized examinations.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#get-started"
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg shadow-primary-500/25 md:py-4 md:text-lg md:px-10 transition-all duration-200 mb-5 md:mb-0 "
                    >
                      Get Started
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#learn-more"
                      className="w-full flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-100 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                    >
                      Learn More
                    </a>
                  </motion.div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full lg:w-1/2 mt-10 lg:mt-0"
              >
                <ExamHallIllustration />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative blob shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4">
        <div className="w-96 h-96 bg-gradient-to-br from-primary-200/50 to-primary-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4">
        <div className="w-96 h-96 bg-gradient-to-tr from-secondary-200/50 to-secondary-300/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      </div>
    </div>
  );
};