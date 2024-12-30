import React from 'react';
import { motion } from 'framer-motion';
import { ExampleTemplate } from '../ExampleTemplate';
import FileUpload from '../FileUpload';
import { BackgroundAnimation } from '../animations/BackgroundAnimation';
import { Student } from '@/types';

type GetStartedProps = {
  handleFileUpload: (data: Student[]) => void;
}

export const GetStarted: React.FC<GetStartedProps> = ({handleFileUpload}) => {

  return (
    <div className="relative min-h-screen bg-gradient-to-t from-white to-primary-50/30" id="get-started">
      <BackgroundAnimation />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-50 mb-4">
            <span className="px-3 py-0.5 text-sm font-semibold text-primary-700 rounded-full bg-white shadow-sm">
              Get Started
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Transform Your Exam Management
            <span className="block text-primary-600">in Minutes</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Simply upload your student data and let our intelligent system create the perfect seating arrangement.
          </p>
        </motion.div>

        <div className="max-w-xl mx-auto space-y-8">
          <FileUpload onUpload={handleFileUpload} />
          
          <ExampleTemplate />
        </div>
      </div>
    </div>
  );
};