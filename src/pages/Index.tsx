import React, { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import AdminLogin from '@/components/AdminLogin';
import WellnessAssessment from '@/components/WellnessAssessment';
import CrisisIntervention from '@/components/CrisisIntervention';
import AIChatbot from '@/components/AIChatbot';
import CounselorBooking from '@/components/CounselorBooking';
import AdminDashboard from '@/components/AdminDashboard';
import StudentDashboard from '@/components/StudentDashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userData, setUserData] = useState(null);
  const [pageData, setPageData] = useState(null);

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setUserData(data);
      setPageData(data);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'assessment':
        return <WellnessAssessment onNavigate={handleNavigate} userData={userData} />;
      case 'crisis':
        return <CrisisIntervention onNavigate={handleNavigate} assessmentData={pageData} />;
      case 'chatbot':
        return <AIChatbot onNavigate={handleNavigate} userData={userData} assessmentResults={pageData?.assessmentResults} />;
      case 'counselors':
        return <CounselorBooking onNavigate={handleNavigate} userData={userData} assessmentResults={pageData?.assessmentResults} fromChat={pageData?.fromChat} emergency={pageData?.emergency} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} userData={userData} />;
      case 'dashboard':
        return <StudentDashboard onNavigate={handleNavigate} userData={userData} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
};

export default Index;
