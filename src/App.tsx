import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingFlow } from './components/OnboardingFlow';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { SafetySetup } from './components/SafetySetup';
import { HomeDashboard } from './components/HomeDashboard';
import { SOSActive } from './components/SOSActive';
import { CommunityPage } from './components/CommunityPage';
import { MapView } from './components/MapView';
import { VolunteerPage } from './components/VolunteerPage';
import { ProfilePage } from './components/ProfilePage';
import { EditProfile } from './components/EditProfile';
import { TrustedContacts } from './components/TrustedContacts';
import { IncidentHistory } from './components/IncidentHistory';
import { SupportResources } from './components/SupportResources';
import { PrivacyControls } from './components/PrivacyControls';
import { LocationSettings } from './components/LocationSettings';
import { Notifications } from './components/Notifications';
import { PoliceStations } from './components/PoliceStations';
import { Chat } from './components/Chat';
import { UserProvider } from './contexts/UserContext';

export type Screen = 
  | 'splash' 
  | 'onboarding'
  | 'login'
  | 'signup' 
  | 'setup' 
  | 'home' 
  | 'sos-active' 
  | 'community' 
  | 'map' 
  | 'volunteers' 
  | 'profile'
  | 'edit-profile'
  | 'trusted-contacts'
  | 'incident-history'
  | 'support-resources'
  | 'privacy-controls'
  | 'location-settings'
  | 'notifications'
  | 'police-stations'
  | 'chat';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<any>(null);
  const [sosActive, setSOSActive] = useState(false);

  useEffect(() => {
    // Auto-fade from splash to onboarding after 2.5 seconds
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('onboarding');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingFlow onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <Login 
          onLogin={(userData) => {
            setUser(userData);
            setCurrentScreen('home');
          }}
          onNavigateToSignup={() => setCurrentScreen('signup')}
        />;
      case 'signup':
        return <SignUp 
          onComplete={(userData) => {
            setUser(userData);
            setCurrentScreen('setup');
          }}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />; 
      case 'setup':
        return <SafetySetup onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeDashboard 
          onNavigate={setCurrentScreen}
          onSOSTrigger={() => setCurrentScreen('sos-active')}
        />;
      case 'sos-active':
        return <SOSActive onResolved={() => setCurrentScreen('home')} />;
      case 'community':
        return <CommunityPage onNavigate={setCurrentScreen} />;
      case 'map':
        return <MapView onNavigate={setCurrentScreen} />;
      case 'volunteers':
        return <VolunteerPage onNavigate={setCurrentScreen} />;
      case 'profile':
        return <ProfilePage onNavigate={setCurrentScreen} />;
      case 'edit-profile':
        return <EditProfile onNavigate={setCurrentScreen} />;
      case 'trusted-contacts':
        return <TrustedContacts onNavigate={setCurrentScreen} />;
      case 'incident-history':
        return <IncidentHistory onNavigate={setCurrentScreen} />;
      case 'support-resources':
        return <SupportResources onNavigate={setCurrentScreen} />;
      case 'privacy-controls':
        return <PrivacyControls onNavigate={setCurrentScreen} />;
      case 'location-settings':
        return <LocationSettings onNavigate={setCurrentScreen} />;
      case 'notifications':
        return <Notifications onNavigate={setCurrentScreen} />;
      case 'police-stations':
        return <PoliceStations onNavigate={setCurrentScreen} />;
      case 'chat':
        return <Chat onNavigate={setCurrentScreen} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        {renderScreen()}
      </div>
    </UserProvider>
  );
}