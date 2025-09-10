"use client";

import { useState } from "react";
import { Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, CheckCircle, Clock, Info, RefreshCw, AlertTriangle } from "lucide-react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

interface TaskDetailProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

const getStatusVariant = (status: Task["status"]): "destructive" | "secondary" | "default" => {
  switch (status) {
    case "Overdue":
      return "destructive";
    case "Needs Rework":
      return "destructive";
    case "Completed":
      return "default";
    case "Pending":
      return "secondary";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: Task["status"]): React.ReactNode => {
    switch (status) {
        case "Overdue":
          return <Clock className="h-4 w-4" />;
        case "Needs Rework":
          return <RefreshCw className="h-4 w-4" />;
        case "Completed":
          return <CheckCircle className="h-4 w-4" />;
        case "Pending":
          return <Info className="h-4 w-4" />;
        default:
          return <Info className="h-4 w-4" />;
    }
}


export default function TaskDetail({ task, onTaskUpdate }: TaskDetailProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(task.photoUrl || null);
  const [notes, setNotes] = useState("");
  const { toast } = useToast();


  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  };

  const handleSubmit = (newStatus: "Completed" | "Pending") => {
    onTaskUpdate({
      ...task,
      status: newStatus,
      photoUrl: photoPreview || task.photoUrl,
      feedback: newStatus === "Completed" ? notes : task.feedback,
    });
    toast({
      title: `Task "${task.title}" updated`,
      description: `Status changed to ${newStatus}.`,
      variant: 'default'
    });
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
                <CardDescription className="mt-2">
                    Due by {format(parseISO(task.deadline), "EEEE, MMMM d, yyyy")}
                </CardDescription>
            </div>
            <Badge variant={getStatusVariant(task.status)} className="text-sm px-3 py-1 flex items-center gap-2">
                {getStatusIcon(task.status)}
                {task.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow grid gap-6">
        <p className="text-muted-foreground">{task.description}</p>
        
        {task.status === 'Needs Rework' && task.feedback && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Rework Required</AlertTitle>
                <AlertDescription>{task.feedback}</AlertDescription>
            </Alert>
        )}

        <Separator />

        <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <h4 className="font-semibold">Execution</h4>
                <div className="space-y-2">
                    <Label htmlFor="notes">Completion Notes</Label>
                    <Textarea id="notes" placeholder="Add any notes for the supervisor..." value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label>Attach Photo</Label>
                     <Input id="camera-input" type="file" accept="image/*" capture className="hidden" onChange={handlePhotoChange}/>
                    <label htmlFor="camera-input" className="block">
                        <Button variant="outline" className="w-full" asChild>
                            <div><Camera className="mr-2 h-4 w-4" /> <span>Take Photo</span></div>
                        </Button>
                    </label>
                    <p className="text-xs text-muted-foreground">This will open the camera. Uploading from the gallery is disabled.</p>
                </div>
            </div>
             <div className="space-y-2">
                 <Label>Photo Preview</Label>
                <div className="w-full aspect-video rounded-md bg-muted flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                        <Image src={photoPreview} alt="Task photo preview" width={400} height={225} className="object-cover w-full h-full" />
                    ) : (
                        <p className="text-sm text-muted-foreground">No photo taken</p>
                    )}
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-end gap-2">
        {task.status !== 'Completed' && (
             <>
                <Button variant="outline" onClick={() => handleSubmit('Pending')}>Save Progress</Button>
                <Button onClick={() => handleSubmit('Completed')}>Mark as Complete</Button>
            </>
        )}
         {task.status === 'Completed' && (
            <p className="text-sm text-muted-foreground">This task is already completed.</p>
        )}
      </CardFooter>
    </Card>
  );
}
