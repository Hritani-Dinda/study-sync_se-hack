import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Trophy,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    dueDate: string;
    status: string;
    score?: string;
    questions: number;
    timeLimit: string;
  };
  courseId: string;
  showDetails?: boolean;
}

export function QuizCard({
  quiz,
  courseId,
  showDetails = false,
}: QuizCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "upcoming":
        return <Badge variant="default">Upcoming</Badge>;
      case "not-started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "upcoming":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "not-started":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return <Trophy className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {getStatusIcon(quiz.status)}
              <h3 className="font-semibold">{quiz.title}</h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {quiz.dueDate}
              </div>
              {showDetails && (
                <>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {quiz.timeLimit}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Trophy className="mr-1 h-4 w-4" />
                    {quiz.questions} questions
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-end">
              {getStatusBadge(quiz.status)}
              {quiz.score && (
                <Badge variant="outline" className="ml-2">
                  Score: {quiz.score}
                </Badge>
              )}
            </div>
            <Button asChild className="w-full md:w-auto">
              <Link href={`/quiz/${quiz.id}`}>
                {quiz.status === "completed"
                  ? "View Results"
                  : quiz.status === "upcoming"
                  ? "Prepare"
                  : "Start Quiz"}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
