import React from 'react';
import { ExampleTemplate } from '../ExampleTemplate';
import FileUpload from '../FileUpload';

export const GetStarted: React.FC = ({handleFileUpload}) => {

  return (
    <div className="bg-gray-50 py-24 min-h-screen flex items-center" id="get-started">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-16">
          <h2 className="text-lg font-semibold text-blue-600">Get Started</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Create your seating plan now
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Begin by uploading student data.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          <FileUpload onUpload={handleFileUpload} />
          
          <ExampleTemplate />
        </div>
      </div>
    </div>
  );
};