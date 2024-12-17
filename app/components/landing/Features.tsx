import React from 'react';
import { Upload, Users, FileSpreadsheet, Download, Settings, Edit3 } from 'lucide-react';

const features = [
  {
    name: 'Easy File Upload',
    description: 'Upload student data via Excel file with our simple drag-and-drop interface.',
    icon: Upload,
  },
  {
    name: 'Smart Seating Algorithm',
    description: 'Automatically arrange students with optimal spacing and department distribution.',
    icon: Users,
  },
  {
    name: 'Flexible Configuration',
    description: 'Customize room layouts and seating arrangements to match your needs.',
    icon: Settings,
  },
  {
    name: 'Interactive Editor',
    description: 'Make manual adjustments to the seating plan with our intuitive interface.',
    icon: Edit3,
  },
  {
    name: 'Multiple Export Options',
    description: 'Download seating plans in PDF or Excel format for easy distribution.',
    icon: FileSpreadsheet,
  },
  {
    name: 'Instant Updates',
    description: 'See changes in real-time as you modify the seating arrangement.',
    icon: Download,
  },
];

export const Features: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-white to-primary-50/30 py-24 min-h-screen flex items-center" id="learn-more">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-primary-600">Features</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for exam management
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Our comprehensive solution streamlines the entire process of creating and managing exam seating arrangements.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-xl bg-white px-6 pb-8 shadow-xl shadow-gray-200/50 hover:shadow-gray-200/80 transition-shadow duration-300">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 p-3 shadow-lg shadow-primary-500/30">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-semibold tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};