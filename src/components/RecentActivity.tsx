
import React from 'react';
import { FileText, MessageCircle, Users, Trophy } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'note' | 'question' | 'study' | 'achievement';
  title: string;
  description: string;
  time: string;
  user?: string;
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'note',
      title: 'Data Structures Notes',
      description: 'Sarah uploaded new notes for Trees and Graphs',
      time: '2 hours ago',
      user: 'Sarah M.'
    },
    {
      id: '2',
      type: 'question',
      title: 'Operating Systems Help',
      description: 'Alex asked about process synchronization',
      time: '4 hours ago',
      user: 'Alex R.'
    },
    {
      id: '3',
      type: 'study',
      title: 'Study Session',
      description: 'You joined a group study for Mathematics',
      time: '6 hours ago'
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Level Up!',
      description: 'You reached Level 5 and earned 50 XP',
      time: '1 day ago'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'note': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'question': return <MessageCircle className="w-5 h-5 text-purple-600" />;
      case 'study': return <Users className="w-5 h-5 text-green-600" />;
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex-shrink-0 mt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm text-purple-600 hover:text-purple-700 font-medium">
        View all activity
      </button>
    </div>
  );
};

export default RecentActivity;
