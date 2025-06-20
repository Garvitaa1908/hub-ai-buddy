
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BookOpen, Users, Calendar, Trophy, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPath?: string;
}

const Navigation = ({ currentPath = '/' }: NavigationProps) => {
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: BookOpen, label: 'Resources', path: '/resources' },
    { icon: Users, label: 'Study Buddy', path: '/study-buddy' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H+</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              HostelHub+
            </span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <User size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
