import React, { useState } from 'react';
import { Home, Users, Map, Shield, UserCircle, Globe, AlertTriangle, BookOpen, ThumbsUp, MessageCircle, Flag, Plus, Navigation, Send, X, Heart, Share2, Eye } from 'lucide-react';
import { Screen } from '../App';

interface CommunityPageProps {
  onNavigate: (screen: Screen) => void;
}

interface Story {
  id: number;
  user: string;
  area: string;
  time: string;
  message: string;
  likes: number;
  comments: Comment[];
  type: 'warning' | 'positive';
  liked?: boolean;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
}

const initialStories: Story[] = [
  {
    id: 1,
    user: 'Priya S.',
    area: 'Linking Road, Bandra',
    time: '2 hours ago',
    message: 'Avoid Linking Road after 9PM — very dark near the turning. Request for better street lights.',
    likes: 24,
    comments: [
      { id: 1, user: 'Anjali M.', text: 'Thanks for sharing! I usually take that route.', time: '1 hour ago' },
      { id: 2, user: 'Divya K.', text: 'I reported this to BMC as well.', time: '30 min ago' },
    ],
    type: 'warning',
    liked: false,
  },
  {
    id: 2,
    user: 'Anjali M.',
    area: 'Bandra Station',
    time: '5 hours ago',
    message: 'Great response from volunteer Rajesh. Helped me get a safe auto. Thank you SafeSpace community!',
    likes: 45,
    comments: [
      { id: 1, user: 'Priya S.', text: 'So glad you are safe!', time: '4 hours ago' },
    ],
    type: 'positive',
    liked: true,
  },
  {
    id: 3,
    user: 'Anonymous',
    area: 'Carter Road',
    time: '1 day ago',
    message: 'Noticed suspicious activity near Carter Road around 8PM yesterday. Stay alert and travel in groups.',
    likes: 18,
    comments: [],
    type: 'warning',
    liked: false,
  },
  {
    id: 4,
    user: 'Divya K.',
    area: 'Hill Road',
    time: '2 days ago',
    message: 'Hill Road is very well lit and safe even at night. Police patrol is regular. Great for evening walks!',
    likes: 32,
    comments: [
      { id: 1, user: 'Anjali M.', text: 'Good to know! Thanks for sharing', time: '1 day ago' },
    ],
    type: 'positive',
    liked: false,
  },
];

const unsafeAreas = [
  {
    name: 'Linking Road Junction',
    riskLevel: 'High',
    reports: 15,
    lastReport: '2 hours ago',
  },
  {
    name: 'SV Road - Dark Stretch',
    riskLevel: 'Medium',
    reports: 7,
    lastReport: '1 day ago',
  },
  {
    name: 'Khar Station Area',
    riskLevel: 'Medium',
    reports: 5,
    lastReport: '3 days ago',
  },
];

const safetyTips = [
  {
    id: 1,
    title: 'Night Travel Safety',
    description: 'Always share your live location with trusted contacts when traveling alone at night.',
    category: 'Travel',
  },
  {
    id: 2,
    title: 'Auto/Taxi Safety',
    description: 'Check the registration number and driver details before getting in. Share details with contacts.',
    category: 'Transport',
  },
  {
    id: 3,
    title: 'Emergency Contacts',
    description: 'Save emergency numbers (100, 1091, 181) on speed dial for quick access.',
    category: 'Emergency',
  },
  {
    id: 4,
    title: 'Self Defense Basics',
    description: 'Learn basic self-defense moves. Target vulnerable areas: eyes, nose, throat, groin.',
    category: 'Defense',
  },
];

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<'stories' | 'unsafe' | 'awareness'>('stories');
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');
  const [postType, setPostType] = useState<'warning' | 'positive'>('warning');
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [showWorkshopModal, setShowWorkshopModal] = useState(false);
  const [workshopName, setWorkshopName] = useState('');
  const [workshopPhone, setWorkshopPhone] = useState('');

  const handleLike = (id: number) => {
    setStories(stories.map(story => {
      if (story.id === id) {
        return {
          ...story,
          likes: story.liked ? story.likes - 1 : story.likes + 1,
          liked: !story.liked,
        };
      }
      return story;
    }));
  };

  const handleAddComment = (storyId: number) => {
    if (!newComment.trim()) return;
    
    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          comments: [
            ...story.comments,
            {
              id: Date.now(),
              user: 'You',
              text: newComment,
              time: 'Just now',
            },
          ],
        };
      }
      return story;
    }));
    setNewComment('');
  };

  const handleShare = (story: Story) => {
    if (navigator.share) {
      navigator.share({
        title: 'SafeSpace Community Alert',
        text: `${story.message} - ${story.area}`,
      }).catch((error) => {
        // User cancelled or permission denied, show fallback
        if (error.name !== 'AbortError') {
          const shareText = `${story.message} - ${story.area}`;
          navigator.clipboard.writeText(shareText).then(() => {
            alert('Link copied to clipboard!');
          }).catch(() => {
            alert('Unable to share at this time');
          });
        }
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${story.message} - ${story.area}`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        alert('Unable to share: ' + shareText);
      });
    }
  };

  const handleCreatePost = () => {
    if (!newPostText.trim() || !newPostLocation.trim()) return;

    const newStory: Story = {
      id: Date.now(),
      user: 'You',
      area: newPostLocation,
      time: 'Just now',
      message: newPostText,
      likes: 0,
      comments: [],
      type: postType,
      liked: false,
    };

    setStories([newStory, ...stories]);
    setNewPostText('');
    setNewPostLocation('');
    setShowNewPost(false);
  };

  const handleWorkshopRegistration = () => {
    if (!workshopName.trim() || !workshopPhone.trim()) {
      alert('Please fill all fields');
      return;
    }
    alert(`Registration successful! You'll receive a confirmation SMS at ${workshopPhone}. Workshop details:\n\n📅 Every Saturday, 10 AM - 12 PM\n📍 Bandra Community Center\n👥 Self-defense & Safety Training\n\nSee you there, ${workshopName}! 💪`);
    setShowWorkshopModal(false);
    setWorkshopName('');
    setWorkshopPhone('');
  };

  const renderStories = () => (
    <div className="space-y-4">
      {stories.map((story) => (
        <div key={story.id} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 ${story.type === 'warning' ? 'bg-red-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                {story.type === 'warning' ? (
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                ) : (
                  <Heart className="w-6 h-6 text-green-600" />
                )}
              </div>
              <div>
                <div className="text-gray-900">{story.user}</div>
                <div className="text-sm text-gray-500">{story.time}</div>
              </div>
            </div>
            {story.type === 'warning' && (
              <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                ⚠️ Alert
              </span>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
              <Map className="w-4 h-4" />
              {story.area}
            </div>
            <p className="text-gray-700">{story.message}</p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <button 
              onClick={() => handleLike(story.id)}
              className={`flex items-center gap-2 text-sm ${story.liked ? 'text-purple-600' : 'text-gray-600'} hover:text-purple-600 transition-colors`}
            >
              <ThumbsUp className={`w-4 h-4 ${story.liked ? 'fill-purple-600' : ''}`} />
              {story.likes}
            </button>
            <button 
              onClick={() => setShowComments(showComments === story.id ? null : story.id)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {story.comments.length}
            </button>
            <button 
              onClick={() => handleShare(story)}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button 
              onClick={() => onNavigate('map')}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              View Map
            </button>
          </div>

          {/* Comments Section */}
          {showComments === story.id && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm text-gray-900 mb-3">Comments</h4>
              <div className="space-y-3 mb-3">
                {story.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-900">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment(story.id)}
                />
                <button
                  onClick={() => handleAddComment(story.id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderUnsafeAreas = () => (
    <div className="space-y-4">
      {unsafeAreas.map((area, index) => (
        <div key={index} className="bg-white rounded-2xl p-5 shadow-md">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">{area.name}</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className={`px-3 py-1 rounded-full ${
                  area.riskLevel === 'High' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  {area.riskLevel} Risk
                </span>
                <span className="text-gray-600">{area.reports} reports</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Last report: {area.lastReport}
              </div>
            </div>
            <AlertTriangle className={`w-6 h-6 ${
              area.riskLevel === 'High' ? 'text-red-500' : 'text-orange-500'
            }`} />
          </div>
          <div className="flex gap-2 mt-4">
            <button 
              onClick={() => onNavigate('map')}
              className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 text-sm flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              View on Map
            </button>
            <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 text-sm">
              Avoid Route
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAwareness = () => (
    <div className="space-y-4">
      {safetyTips.map((tip) => (
        <div key={tip.id} className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-gray-900">{tip.title}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
                  {tip.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{tip.description}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white mt-6">
        <h3 className="mb-2">Join Safety Workshop</h3>
        <p className="text-purple-100 text-sm mb-4">
          Free self-defense classes every Saturday at Bandra Community Center
        </p>
        <button 
          onClick={() => setShowWorkshopModal(true)}
          className="bg-white text-purple-600 px-6 py-3 rounded-xl hover:bg-purple-50 transition-colors"
        >
          Register Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-gray-900">Community</h1>
        <p className="text-gray-600 text-sm">Share experiences & stay informed</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('stories')}
            className={`pb-3 px-1 ${
              activeTab === 'stories'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Stories
          </button>
          <button
            onClick={() => setActiveTab('unsafe')}
            className={`pb-3 px-1 ${
              activeTab === 'unsafe'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Risk Zones
          </button>
          <button
            onClick={() => setActiveTab('awareness')}
            className={`pb-3 px-1 ${
              activeTab === 'awareness'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500'
            }`}
          >
            Safety Tips
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {activeTab === 'stories' && renderStories()}
        {activeTab === 'unsafe' && renderUnsafeAreas()}
        {activeTab === 'awareness' && renderAwareness()}
      </div>

      {/* Floating Action Button */}
      {activeTab === 'stories' && (
        <button
          onClick={() => setShowNewPost(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform z-10"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      {/* Workshop Registration Modal */}
      {showWorkshopModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Register for Workshop</h2>
              <button onClick={() => setShowWorkshopModal(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  value={workshopName}
                  onChange={(e) => setWorkshopName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={workshopPhone}
                  onChange={(e) => setWorkshopPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h3 className="text-sm text-purple-900 mb-2">Workshop Details</h3>
                <ul className="text-xs text-purple-700 space-y-1">
                  <li>📅 Every Saturday, 10 AM - 12 PM</li>
                  <li>📍 Bandra Community Center, Bandra West</li>
                  <li>👥 Self-defense & Safety Training</li>
                  <li>💰 Completely Free</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleWorkshopRegistration}
              className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700"
            >
              Confirm Registration
            </button>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900">Share with Community</h2>
              <button onClick={() => setShowNewPost(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Post Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPostType('warning')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                      postType === 'warning'
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    ⚠️ Safety Alert
                  </button>
                  <button
                    onClick={() => setPostType('positive')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                      postType === 'positive'
                        ? 'border-green-500 bg-green-50 text-green-600'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    💚 Positive Story
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Location</label>
                <input
                  type="text"
                  value={newPostLocation}
                  onChange={(e) => setNewPostLocation(e.target.value)}
                  placeholder="e.g., Linking Road, Bandra"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 text-sm">Message</label>
                <textarea
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  placeholder="Share your experience or safety tip..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                onClick={handleCreatePost}
                disabled={!newPostText.trim() || !newPostLocation.trim()}
                className="w-full bg-purple-600 text-white py-4 rounded-xl hover:bg-purple-700 disabled:bg-gray-300 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Post to Community
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <Users className="w-6 h-6" />
            <span className="text-xs">Community</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Map className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>
          <button
            onClick={() => onNavigate('volunteers')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <Shield className="w-6 h-6" />
            <span className="text-xs">Volunteers</span>
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900"
          >
            <UserCircle className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}