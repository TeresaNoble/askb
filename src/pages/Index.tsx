
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { UserProfile } from '@/utils/voiceProfiles';

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    communicationStyle: "Witty",
    contentFormat: "Quick Summary",
    generation: "Mixed",
    length: "Medium",
    toneFlair: "Slash",
    ultraDirect: false
  });

  return (
    <div className="flex h-screen">
      <Sidebar onProfileChange={setUserProfile} />
      <main className="flex-1">
        <ChatInterface userProfile={userProfile} />
      </main>
    </div>
  );
};

export default Index;
