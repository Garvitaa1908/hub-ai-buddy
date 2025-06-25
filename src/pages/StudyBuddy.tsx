
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import StudyBuddyCard from '@/components/StudyBuddyCard';
import { MapPin, Clock, Users, Filter, Search } from 'lucide-react';

const StudyBuddy = () => {
  const [currentStatus, setCurrentStatus] = useState<'Solo Focus' | 'Open to Study' | 'Need Help'>('Open to Study');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [currentLocationFilter, setCurrentLocationFilter] = useState('all');

  const studyBuddies = [
    {
      id: '1',
      name: 'Student A',
      status: 'Open to Study' as const,
      subject: 'Mathematics',
      location: 'Library - 2nd Floor',
      timeRemaining: '2 hours left',
      avatar: 'SA',
      year: '2nd Year',
      gender: 'Male'
    },
    {
      id: '2',
      name: 'Student B',
      status: 'Need Help' as const,
      subject: 'Physics',
      location: 'Study Room A',
      timeRemaining: '1 hour left',
      avatar: 'SB',
      year: '3rd Year',
      gender: 'Female'
    },
    {
      id: '3',
      name: 'Student C',
      status: 'Solo Focus' as const,
      subject: 'Chemistry',
      location: 'Common Area',
      timeRemaining: '3 hours left',
      avatar: 'SC',
      year: '1st Year',
      gender: 'Male'
    },
    {
      id: '4',
      name: 'Student D',
      status: 'Open to Study' as const,
      subject: 'Computer Science',
      location: 'Library - 1st Floor',
      timeRemaining: '4 hours left',
      avatar: 'SD',
      year: '4th Year',
      gender: 'Female'
    },
    {
      id: '5',
      name: 'Student E',
      status: 'Need Help' as const,
      subject: 'Mathematics',
      location: 'Study Room B',
      timeRemaining: '1.5 hours left',
      avatar: 'SE',
      year: '2nd Year',
      gender: 'Prefer not to say'
    },
    {
      id: '6',
      name: 'Student F',
      status: 'Open to Study' as const,
      subject: 'Biology',
      location: 'Lab - 3rd Floor',
      timeRemaining: '2.5 hours left',
      avatar: 'SF',
      year: '3rd Year',
      gender: 'Male'
    }
  ];

  const locations = ['all', 'Library - 1st Floor', 'Library - 2nd Floor', 'Study Room A', 'Study Room B', 'Common Area', 'Lab - 3rd Floor'];
  const subjects = ['all', 'Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'Biology'];
  const years = ['all', '1st Year', '2nd Year', '3rd Year', '4th Year'];
  const genders = ['all', 'Male', 'Female', 'Prefer not to say'];

  const filteredBuddies = studyBuddies.filter(buddy => {
    const matchesLocation = selectedLocation === 'all' || buddy.location === selectedLocation;
    const matchesSubject = selectedSubject === 'all' || buddy.subject === selectedSubject;
    const matchesYear = selectedYear === 'all' || buddy.year === selectedYear;
    const matchesGender = selectedGender === 'all' || buddy.gender === selectedGender;
    const matchesCurrentLocation = currentLocationFilter === 'all' || buddy.location.toLowerCase().includes(currentLocationFilter.toLowerCase());
    return matchesLocation && matchesSubject && matchesYear && matchesGender && matchesCurrentLocation;
  });

  const handleConnectStudyBuddy = (id: string) => {
    console.log('Connecting to study buddy:', id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Solo Focus': return 'bg-red-500';
      case 'Open to Study': return 'bg-green-500';
      case 'Need Help': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const clearAllFilters = () => {
    setSelectedLocation('all');
    setSelectedSubject('all');  
    setSelectedYear('all');
    setSelectedGender('all');
    setCurrentLocationFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation currentPath="/study-buddy" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Study <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Buddy</span> Finder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with peers for collaborative learning</p>
        </div>

        {/* Your Status */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Current Status</h2>
          <div className="flex flex-wrap gap-3">
            {(['Solo Focus', 'Open to Study', 'Need Help'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setCurrentStatus(status)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStatus === status
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                <span>{status}</span>
              </button>
            ))}
          </div>
          
          {currentStatus !== 'Solo Focus' && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-green-700 dark:text-green-300 font-medium">You're visible to other study buddies!</p>
              <p className="text-green-600 dark:text-green-400 text-sm mt-1">Others can now connect with you for study sessions.</p>
            </div>
          )}
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Find Study Buddies
            </h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium"
            >
              Clear All Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'all' ? 'All Locations' : location}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year of Study</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Location</label>
              <input
                type="text"
                value={currentLocationFilter === 'all' ? '' : currentLocationFilter}
                onChange={(e) => setCurrentLocationFilter(e.target.value || 'all')}
                placeholder="Search by current location..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {genders.map(gender => (
                  <option key={gender} value={gender}>
                    {gender === 'all' ? 'All Genders' : gender}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedLocation !== 'all' || selectedSubject !== 'all' || selectedYear !== 'all' || selectedGender !== 'all' || currentLocationFilter !== 'all') && (
            <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-purple-700 dark:text-purple-300 font-medium mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedLocation !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">
                    Location: {selectedLocation}
                  </span>
                )}
                {selectedSubject !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">
                    Subject: {selectedSubject}
                  </span>
                )}
                {selectedYear !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">
                    Year: {selectedYear}
                  </span>
                )}
                {selectedGender !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">
                    Gender: {selectedGender}
                  </span>
                )}
                {currentLocationFilter !== 'all' && (
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded text-sm">
                    Current Location: {currentLocationFilter}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Study Buddies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuddies.map((buddy) => (
            <StudyBuddyCard 
              key={buddy.id} 
              buddy={buddy} 
              onConnect={handleConnectStudyBuddy}
            />
          ))}
        </div>

        {filteredBuddies.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No study buddies found</p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your filters or check back later</p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Study Buddy Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Be Respectful</h4>
              <p className="text-sm text-purple-100">Respect others' study time and preferences</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Stay Focused</h4>
              <p className="text-sm text-purple-100">Keep study sessions productive and on-topic</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Help Each Other</h4>
              <p className="text-sm text-purple-100">Share knowledge and learn together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyBuddy;
