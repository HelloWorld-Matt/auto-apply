
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

type ApplicationStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

interface AutomatedApplication {
  id: string;
  job_url: string;
  company_name: string | null;
  job_title: string | null;
  status: ApplicationStatus;
  error_message: string | null;
  created_at: string;
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
  const [jobUrl, setJobUrl] = useState("");
  const { toast } = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a job URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit job applications",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('automated_applications').insert({
        job_url: jobUrl.trim(),
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job application queued for automation",
      });

      setJobUrl("");
      refetch();
    } catch (error) {
      console.error('Error submitting job:', error);
      toast({
        title: "Error",
        description: "Failed to submit job for automation",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Add New Job for Automation</h3>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="url"
            placeholder="Enter job posting URL"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            Queue Application
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Recent Automated Applications</h3>
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
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(app.job_url, '_blank')}
              >
                View Job
              </Button>
            </div>
          ))}
          {applications?.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No automated applications yet
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AutomatedApplications;
