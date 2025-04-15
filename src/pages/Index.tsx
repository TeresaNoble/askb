
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
