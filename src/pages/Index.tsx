
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { UserProfile } from '@/utils/voiceProfiles';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar onProfileChange={setUserProfile} />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
          </div>
          <ChatInterface userProfile={userProfile} />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
