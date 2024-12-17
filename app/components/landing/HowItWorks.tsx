import React from 'react';
import { FileUp, Settings2, Users, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    id: 2,
    name: 'Upload Data',
    description: 'Import student information using our Excel template.',
    icon: FileUp,
  },
  {
    id: 1,
    name: 'Configure Room',
    description: 'Set up room dimensions and capacity according to your needs.',
    icon: Settings2,
  },
  {
    id: 3,
    name: 'Generate Plan',
    description: 'Let our system create an optimal seating arrangement.',
    icon: Users,
  },
  {
    id: 4,
    name: 'Export Results',
    description: 'Download the final seating plan in your preferred format.',
    icon: Download,
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="bg-white py-24 min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-primary-600">How It Works</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            Four simple steps to organize your exam
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Our streamlined process makes it easy to create and manage exam seating arrangements.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 shadow-lg shadow-primary-100/50">
                    <step.icon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-center text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};