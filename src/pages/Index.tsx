
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  BarChart3,
  BriefcaseIcon,
  Settings2,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import JobDashboard from "@/components/JobDashboard";
import ProfileSetup from "@/components/ProfileSetup";
import ApplicationTracker from "@/components/ApplicationTracker";
import SettingsPanel from "@/components/SettingsPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("No user found, redirecting to /auth");
      navigate("/auth");
    }
  }, [user, navigate]);

  if (typeof user === 'undefined') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <header className="mb-8 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="outline" className="mb-2">Beta</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              AutoApply
            </h1>
            <p className="text-muted-foreground mt-1">Automate your job search</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2">
              Quick Start <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={signOut} 
              className="gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        </div>
        
        <Card className="mt-6 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Application Progress</p>
              <p className="text-sm text-muted-foreground">12 applications this week</p>
            </div>
            <Progress value={66} className="w-[200px]" />
          </div>
        </Card>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto p-0">
          <TabsTrigger
            value="dashboard"
            className="data-[state=active]:bg-background flex items-center gap-2 p-4 transition-all duration-200"
          >
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="jobs"
            className="data-[state=active]:bg-background flex items-center gap-2 p-4 transition-all duration-200"
          >
            <BriefcaseIcon className="h-4 w-4" />
            Jobs
          </TabsTrigger>
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-background flex items-center gap-2 p-4 transition-all duration-200"
          >
            <UserCircle2 className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-background flex items-center gap-2 p-4 transition-all duration-200"
          >
            <Settings2 className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 space-y-4 slide-up">
          <JobDashboard />
        </TabsContent>

        <TabsContent value="jobs" className="mt-6 space-y-4 slide-up">
          <ApplicationTracker />
        </TabsContent>

        <TabsContent value="profile" className="mt-6 space-y-4 slide-up">
          <ProfileSetup />
        </TabsContent>

        <TabsContent value="settings" className="mt-6 space-y-4 slide-up">
          <SettingsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
