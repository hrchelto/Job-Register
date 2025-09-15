import React from 'react';
import { MapPin, IndianRupee, Calendar, Users } from 'lucide-react';

export const JobDescription: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Junior Java Developer
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Chilakaluripet, Andhra Pradesh</span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              <span>₹20,000 – ₹25,000/month</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Full-time</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Entry Level</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">
            We are looking for a passionate Junior Java Developer to join our team. The ideal candidate 
            should have a strong understanding of Core Java concepts, OOP principles, and application 
            development layers (Controller, Service, DAO). You will work closely with our team to build, 
            maintain, and integrate applications efficiently.
          </p>
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
            <p className="text-amber-800 font-medium">
              <strong>Important:</strong> This position requires relocation to Chilakaluripet, Andhra Pradesh. 
              Candidates must be willing to relocate for this role.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Responsibilities</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Write clean, maintainable Java code following OOP principles
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Develop Controller, Service, and DAO layer classes
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Integrate different layers of the application seamlessly
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Collaborate with team members to design and implement new features
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              Debug and troubleshoot issues in existing applications
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
              Strong knowledge of Core Java and OOP concepts
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
              Understanding of class design, methods, and application architecture
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
              Ability to write and integrate Controller, Service, and DAO classes
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
              Good problem-solving and debugging skills
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></span>
              Eagerness to learn and grow in a fast-paced environment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};