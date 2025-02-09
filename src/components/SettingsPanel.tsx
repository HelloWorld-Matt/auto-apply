import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPanel = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(
    profile?.job_types || ['full-time']
  );

  const handleAutoApplyToggle = async (checked: boolean) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ auto_apply: checked })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: checked ? "Auto-apply Enabled" : "Auto-apply Disabled",
        description: checked 
          ? "System will automatically apply to highly matched jobs" 
          : "System will require manual approval for job applications",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMatchScoreChange = async (value: string) => {
    if (!user) return;
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ minimum_match_percentage: parseInt(value) })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Settings Updated",
        description: `Minimum match score set to ${value}%`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobTypeToggle = async (jobType: string) => {
    if (!user) return;
    
    let updatedJobTypes: string[];
    if (selectedJobTypes.includes(jobType)) {
      // Remove job type if it's already selected
      updatedJobTypes = selectedJobTypes.filter(type => type !== jobType);
    } else {
      // Add job type if it's not selected
      updatedJobTypes = [...selectedJobTypes, jobType];
    }

    // Ensure at least one job type is selected
    if (updatedJobTypes.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one job type",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ job_types: updatedJobTypes })
        .eq('id', user.id);

      if (error) throw error;

      setSelectedJobTypes(updatedJobTypes);
      toast({
        title: "Job Types Updated",
        description: "Your preferred job types have been updated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Application Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Applications</Label>
              <p className="text-sm text-muted-foreground">
                Automatically apply to highly matched jobs
              </p>
            </div>
            <Switch 
              checked={profile?.auto_apply || false}
              onCheckedChange={handleAutoApplyToggle}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Minimum Match Score</Label>
            <Select
              defaultValue={String(profile?.minimum_match_percentage || 85)}
              onValueChange={handleMatchScoreChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select minimum match score" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="80">80%</SelectItem>
                <SelectItem value="85">85%</SelectItem>
                <SelectItem value="90">90%</SelectItem>
                <SelectItem value="95">95%</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Job Types</Label>
            <div className="flex flex-wrap gap-2">
              {["full-time", "part-time", "contract", "freelance"].map((jobType) => (
                <Button
                  key={jobType}
                  variant={selectedJobTypes.includes(jobType) ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleJobTypeToggle(jobType)}
                  disabled={isLoading}
                >
                  {jobType.charAt(0).toUpperCase() + jobType.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates about your applications
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Get text messages for important updates
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">AI Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cover Letter Style</Label>
            <Select defaultValue="professional">
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>AI Job Matching</Label>
              <p className="text-sm text-muted-foreground">
                Use AI to match jobs with your profile
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-panel">
        <h3 className="text-lg font-semibold mb-4">Export Data</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select defaultValue="csv">
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">Export Application History</Button>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
