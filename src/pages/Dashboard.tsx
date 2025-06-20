
import React from 'react';
import Navigation from '@/components/Navigation';
import StatsCard from '@/components/StatsCard';
import AttendanceCard from '@/components/AttendanceCard';
import RecentActivity from '@/components/RecentActivity';
import StudyBuddyCard from '@/components/StudyBuddyCard';
import { BookOpen, Users, Trophy, Calendar, TrendingUp, Brain } from 'lucide-react';

const Dashboard = () => {
  const subjects = [
    {
      name: 'Data Structures',
      attendance: 85,
      totalClasses: 40,
      attendedClasses: 34,
      nextClass: 'Tomorrow 10 AM',
      canBunk: true
    },
    {
      name: 'Operating Systems',
      attendance: 72,
      totalClasses: 35,
      attendedClasses: 25,
      nextClass: 'Today 2 PM',
      canBunk: false
    },
    {
      name: 'Database Systems',
      attendance: 91,
      totalClasses: 30,
      attendedClasses: 27,
      nextClass: 'Friday 11 AM',
      canBunk: true
    }
  ];

  const nearbyStudyBuddies = [
    {
      id: '1',
      name: 'Alex Johnson',
      status: 'Open to Study' as const,
      subject: 'Mathematics',
      location: 'Library - 2nd Floor',
      timeRemaining: '2 hours left',
      avatar: 'AJ'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      status: 'Need Help' as const,
      subject: 'Physics',
      location: 'Study Room A',
      timeRemaining: '1 hour left',
      avatar: 'SC'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      status: 'Solo Focus' as const,
      subject: 'Chemistry',
      location: 'Common Area',
      timeRemaining: '3 hours left',
      avatar: 'MW'
    }
  ];

  const handleConnectStudyBuddy = (id: string) => {
    console.log('Connecting to study buddy:', id);
    // Here you would implement the connection logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation currentPath="/" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Student!</span>
          </h1>
          <p className="text-gray-600">Here's your academic overview for today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Overall Attendance"
            value="82%"
            change="+3% from last week"
            icon={Calendar}
            color="purple"
          />
          <StatsCard
            title="XP Points"
            value="1,247"
            change="+125 this week"
            icon={Trophy}
            color="cyan"
          />
          <StatsCard
            title="Notes Shared"
            value="23"
            change="+5 this month"
            icon={BookOpen}
            color="blue"
          />
          <StatsCard
            title="Study Sessions"
            value="8"
            change="+2 this week"
            icon={Users}
            color="green"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Attendance */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Attendance Overview</h2>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map((subject, index) => (
                  <AttendanceCard key={index} subject={subject} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="w-6 h-6" />
                <h3 className="text-lg font-semibold">AI Study Recommendations</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium">Focus on Operating Systems</p>
                  <p className="text-sm text-purple-100">Your attendance is at 72%. Consider attending the next 3 classes.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-medium">Review Database Concepts</p>
                  <p className="text-sm text-purple-100">Upcoming quiz detected. Review normalization and SQL joins.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Study Buddies */}
          <div className="space-y-6">
            <RecentActivity />
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearby Study Buddies</h3>
              <div className="space-y-3">
                {nearbyStudyBuddies.map((buddy) => (
                  <StudyBuddyCard 
                    key={buddy.id} 
                    buddy={buddy} 
                    onConnect={handleConnectStudyBuddy}
                  />
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium">
                Find More Study Buddies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
