
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ApplicationStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface AutomatedApplication {
  id: string;
  job_url: string;
  company_name: string | null;
  job_title: string | null;
  status: ApplicationStatus;
  error_message: string | null;
  created_at: string;
  match_percentage: number | null;
  job_description: string | null;
  cover_letter_sent: boolean;
  application_method: string | null;
}

const getStatusColor = (status: ApplicationStatus) => {
  switch (status) {
    case 'pending':
      return 'default';
    case 'in_progress':
      return 'secondary';
    case 'completed':
      return 'outline';
    case 'failed':
      return 'destructive';
    default:
      return 'default';
  }
};

const AutomatedApplications = () => {
  const { toast } = useToast();
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);

  const { data: applications, refetch } = useQuery({
    queryKey: ['automated-applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('automated_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return data as AutomatedApplication[];
    },
  });

  const toggleAutoApply = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to change automation settings",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({ auto_apply: !autoApplyEnabled })
        .eq('id', user.id);

      if (error) throw error;

      setAutoApplyEnabled(!autoApplyEnabled);
      toast({
        title: autoApplyEnabled ? "Automation Disabled" : "Automation Enabled",
        description: autoApplyEnabled 
          ? "Job applications will now require manual approval" 
          : "Matching jobs will be automatically applied to",
      });
    } catch (error) {
      console.error('Error toggling auto-apply:', error);
      toast({
        title: "Error",
        description: "Failed to update automation settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Automation Settings</h3>
            <p className="text-sm text-muted-foreground">
              Configure how the system handles matching job applications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-apply">Auto-apply to matching jobs</Label>
            <Switch
              id="auto-apply"
              checked={autoApplyEnabled}
              onCheckedChange={toggleAutoApply}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Automated Applications</h3>
        <div className="space-y-4">
          {applications?.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">
                    {app.job_title || 'Job Title Pending'}
                  </h4>
                  <Badge variant={getStatusColor(app.status)}>
                    {app.status.replace('_', ' ')}
                  </Badge>
                  {app.match_percentage && (
                    <Badge variant="outline">
                      {app.match_percentage}% Match
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {app.company_name || 'Company Pending'} •{' '}
                  {new Date(app.created_at).toLocaleDateString()}
                </p>
                {app.error_message && (
                  <p className="text-sm text-destructive">
                    Error: {app.error_message}
                  </p>
                )}
                {app.job_description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {app.job_description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {app.status === 'pending' && (
                  <Button variant="secondary" size="sm">
                    Review Match
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(app.job_url, '_blank')}
                >
                  View Job
                </Button>
              </div>
            </div>
          ))}
          {applications?.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No automated applications yet. Make sure your profile and job preferences are set up.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AutomatedApplications;
