
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Calendar, Plus, Clock, CheckCircle, X, Users } from 'lucide-react';

interface LectureBlock {
  id: string;
  subject: string;
  time: string;
  day: string;
  status: 'attending' | 'missed' | 'cancelled' | 'proxy' | null;
}

const Attendance = () => {
  const [selectedBatch, setSelectedBatch] = useState('');
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({ subject: '', time: '', day: '' });

  const [timetable, setTimetable] = useState<LectureBlock[]>([
    { id: '1', subject: 'Mathematics', time: '9:00 AM', day: 'Monday', status: null },
    { id: '2', subject: 'Physics', time: '11:00 AM', day: 'Monday', status: null },
    { id: '3', subject: 'Chemistry', time: '2:00 PM', day: 'Monday', status: null },
    { id: '4', subject: 'Computer Science', time: '9:00 AM', day: 'Tuesday', status: null },
    { id: '5', subject: 'Mathematics', time: '11:00 AM', day: 'Tuesday', status: null },
    { id: '6', subject: 'English', time: '2:00 PM', day: 'Tuesday', status: null },
    { id: '7', subject: 'Physics', time: '9:00 AM', day: 'Wednesday', status: null },
    { id: '8', subject: 'Chemistry', time: '11:00 AM', day: 'Wednesday', status: null },
  ]);

  const batches = ['CSE-A 2023', 'CSE-B 2023', 'ECE-A 2023', 'ECE-B 2023', 'ME-A 2023', 'ME-B 2023'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleStatusChange = (lectureId: string, status: 'attending' | 'missed' | 'cancelled' | 'proxy') => {
    setTimetable(prev => 
      prev.map(lecture => 
        lecture.id === lectureId ? { ...lecture, status } : lecture
      )
    );
  };

  const addNewClass = () => {
    if (newClass.subject && newClass.time && newClass.day) {
      const newLecture: LectureBlock = {
        id: Date.now().toString(),
        subject: newClass.subject,
        time: newClass.time,
        day: newClass.day,
        status: null
      };
      setTimetable(prev => [...prev, newLecture]);
      setNewClass({ subject: '', time: '', day: '' });
      setShowAddClass(false);
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'attending': return 'bg-green-500';
      case 'missed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      case 'proxy': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case 'attending': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'missed': return <X className="w-4 h-4 text-red-600" />;
      case 'cancelled': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'proxy': return <Users className="w-4 h-4 text-blue-600" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  if (!selectedBatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <Navigation currentPath="/attendance" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Attendance <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Tracker</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Select your batch to view your timetable</p>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select Your Batch</h2>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-center"
              >
                <option value="">Choose your batch</option>
                {batches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const groupedTimetable = days.reduce((acc, day) => {
    acc[day] = timetable.filter(lecture => lecture.day === day);
    return acc;
  }, {} as Record<string, LectureBlock[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation currentPath="/attendance" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Weekly <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Timetable</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Batch: {selectedBatch}</p>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setSelectedBatch('')}
              className="px-4 py-2 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              Change Batch
            </button>
            <button
              onClick={() => setShowAddClass(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Add Class</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {days.map(day => (
            <div key={day} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{day}</h3>
              </div>
              <div className="p-4 space-y-3">
                {groupedTimetable[day]?.length > 0 ? (
                  groupedTimetable[day].map(lecture => (
                    <div key={lecture.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{lecture.subject}</h4>
                        {getStatusIcon(lecture.status)}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{lecture.time}</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleStatusChange(lecture.id, 'attending')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            lecture.status === 'attending' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/20'
                          }`}
                        >
                          Attending
                        </button>
                        <button
                          onClick={() => handleStatusChange(lecture.id, 'missed')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            lecture.status === 'missed' 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-900/20'
                          }`}
                        >
                          Missed
                        </button>
                        <button
                          onClick={() => handleStatusChange(lecture.id, 'cancelled')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            lecture.status === 'cancelled' 
                              ? 'bg-gray-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          Cancelled
                        </button>
                        <button
                          onClick={() => handleStatusChange(lecture.id, 'proxy')}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            lecture.status === 'proxy' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/20'
                          }`}
                        >
                          Proxy
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">No classes scheduled</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showAddClass && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Class</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={newClass.subject}
                    onChange={(e) => setNewClass(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter subject name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                  <input
                    type="text"
                    value={newClass.time}
                    onChange={(e) => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., 9:00 AM"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Day</label>
                  <select
                    value={newClass.day}
                    onChange={(e) => setNewClass(prev => ({ ...prev, day: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select day</option>
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowAddClass(false)}
                  className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addNewClass}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
                >
                  Add Class
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
