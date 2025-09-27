import React, { useState, useEffect } from 'react';
import LandingPage from '@/components/LandingPage';
import AuthPage from '@/components/AuthPage';
import AdminLogin from '@/components/AdminLogin';
import WellnessAssessment from '@/components/WellnessAssessment';
import CrisisIntervention from '@/components/CrisisIntervention';
import AIChatbot from '@/components/AIChatbot';
import CounselorBooking from '@/components/CounselorBooking';
import AdminDashboard from '@/components/AdminDashboard';
import StudentDashboard from '@/components/StudentDashboard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageData, setPageData] = useState(null);
  const { user, profile, isAdmin, loading } = useAuth();

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setPageData(data);
    }
  };

  // Handle authentication state changes
  useEffect(() => {
    if (!loading) {
      if (user && currentPage === 'login') {
        // Redirect authenticated users away from login page
        setCurrentPage(isAdmin ? 'admin-dashboard' : 'dashboard');
      } else if (user && currentPage === 'admin-login') {
        // Redirect to appropriate dashboard based on role
        setCurrentPage(isAdmin ? 'admin-dashboard' : 'dashboard');
      } else if (!user && (currentPage === 'dashboard' || currentPage === 'admin-dashboard')) {
        // Redirect unauthenticated users to home
        setCurrentPage('home');
      }
    }
  }, [user, isAdmin, currentPage, loading]);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <AuthPage onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'assessment':
        if (!user) return <AuthPage onNavigate={handleNavigate} />;
        return <WellnessAssessment onNavigate={handleNavigate} userData={{ name: profile?.full_name, email: user.email, university: profile?.university }} />;
      case 'crisis':
        if (!user) return <AuthPage onNavigate={handleNavigate} />;
        return <CrisisIntervention onNavigate={handleNavigate} assessmentData={pageData} />;
      case 'chatbot':
        if (!user) return <AuthPage onNavigate={handleNavigate} />;
        return <AIChatbot onNavigate={handleNavigate} userData={{ name: profile?.full_name, email: user.email }} assessmentResults={pageData?.assessmentResults} />;
      case 'counselors':
        if (!user) return <AuthPage onNavigate={handleNavigate} />;
        return <CounselorBooking onNavigate={handleNavigate} userData={{ name: profile?.full_name, email: user.email }} assessmentResults={pageData?.assessmentResults} fromChat={pageData?.fromChat} emergency={pageData?.emergency} />;
      case 'admin-dashboard':
        if (!user || !isAdmin) return <AdminLogin onNavigate={handleNavigate} />;
        return <AdminDashboard onNavigate={handleNavigate} userData={{ name: profile?.full_name, email: user.email, role: 'admin' }} />;
      case 'dashboard':
        if (!user) return <AuthPage onNavigate={handleNavigate} />;
        return <StudentDashboard onNavigate={handleNavigate} userData={{ name: profile?.full_name, email: user.email, university: profile?.university }} />;
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
