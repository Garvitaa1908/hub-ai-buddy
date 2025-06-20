
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Search, Filter, Upload, Download, Star, Eye, MessageCircle, Tag } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  subject: string;
  type: 'notes' | 'paper' | 'assignment' | 'other';
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  tags: string[];
  size: string;
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: 'Data Structures Complete Notes',
      subject: 'Computer Science',
      type: 'notes',
      uploadedBy: 'Sarah M.',
      uploadDate: '2 days ago',
      downloads: 342,
      rating: 4.8,
      tags: ['trees', 'graphs', 'algorithms'],
      size: '2.3 MB'
    },
    {
      id: '2',
      title: 'Operating Systems Mid-term Paper 2023',
      subject: 'Computer Science',
      type: 'paper',
      uploadedBy: 'Alex R.',
      uploadDate: '5 days ago',
      downloads: 156,
      rating: 4.5,
      tags: ['processes', 'memory', 'scheduling'],
      size: '850 KB'
    },
    {
      id: '3',
      title: 'Database Design Assignment Solution',
      subject: 'Computer Science',
      type: 'assignment',
      uploadedBy: 'Mike W.',
      uploadDate: '1 week ago',
      downloads: 98,
      rating: 4.2,
      tags: ['sql', 'normalization', 'er-diagram'],
      size: '1.1 MB'
    },
    {
      id: '4',
      title: 'Calculus Integration Techniques',
      subject: 'Mathematics',
      type: 'notes',
      uploadedBy: 'Emma L.',
      uploadDate: '3 days ago',
      downloads: 203,
      rating: 4.9,
      tags: ['integration', 'calculus', 'techniques'],
      size: '1.8 MB'
    }
  ];

  const subjects = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry'];
  const types = ['all', 'notes', 'paper', 'assignment', 'other'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'notes': return 'bg-blue-100 text-blue-700';
      case 'paper': return 'bg-green-100 text-green-700';
      case 'assignment': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation currentPath="/resources" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Academic <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-gray-600">Share and discover study materials with your peers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload Resource</span>
            </button>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{resource.subject}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{resource.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{resource.rating}</span>
                </div>
                <span>{resource.size}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  By {resource.uploadedBy} • {resource.uploadDate}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No resources found matching your criteria</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
