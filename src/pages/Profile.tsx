import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, BookOpen, Flame, TrendingUp, ArrowLeft, Download, User, Mail, Edit } from 'lucide-react';
import { CourseCard } from '@/components/courses/CourseCard';
import { Certificate } from '@/components/certificates/Certificate';
import type { Certificate as CertificateType } from '@/contexts/AppContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { user, courses, unenrollCourse } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateType | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const enrolledCourses = courses.filter(c => c.enrolled);
  const completedCoursesList = courses.filter(c => user.completedCourses.includes(c.id));
  const inProgressCourses = enrolledCourses.filter(c => !user.completedCourses.includes(c.id));

  const totalLessons = enrolledCourses.reduce((acc, c) => acc + c.lessons.length, 0);
  const completedLessons = enrolledCourses.reduce((acc, c) => 
    acc + c.lessons.filter(l => l.completed).length, 0
  );

  const handleEditProfile = () => {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setIsEditingProfile(true);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editedName,
          email: editedEmail
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditingProfile(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const downloadCertificate = async (certificate: CertificateType) => {
    try {
      const course = courses.find(c => c.id === certificate.courseId);
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="width: 800px; padding: 60px; background: white; font-family: Arial, sans-serif;">
          <div style="text-align: center; border: 3px solid #333; padding: 40px;">
            <h1 style="color: #333; margin-bottom: 20px; font-size: 36px;">Certificate of Completion</h1>
            <p style="font-size: 18px; margin: 20px 0;">This certifies that</p>
            <h2 style="color: #0066cc; margin: 20px 0; font-size: 32px;">${user.name}</h2>
            <p style="font-size: 18px; margin: 20px 0;">has successfully completed</p>
            <h3 style="color: #333; margin: 20px 0; font-size: 24px;">${course?.title}</h3>
            <p style="font-size: 16px; margin: 30px 0;">Instructor: ${course?.instructor}</p>
            <p style="font-size: 14px; color: #666;">Issued: ${new Date(certificate.completionDate).toLocaleDateString()}</p>
            <p style="font-size: 12px; color: #999; margin-top: 40px;">Certificate ID: ${certificate.id}</p>
          </div>
        </div>
      `;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 800;
      canvas.height = 600;
      
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 800, 600);
        ctx.fillStyle = '#333';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 40, 720, 520);
        
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Certificate of Completion', 400, 120);
        
        ctx.font = '18px Arial';
        ctx.fillText('This certifies that', 400, 180);
        
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = '#0066cc';
        ctx.fillText(user.name, 400, 230);
        
        ctx.fillStyle = '#333';
        ctx.font = '18px Arial';
        ctx.fillText('has successfully completed', 400, 280);
        
        ctx.font = 'bold 24px Arial';
        ctx.fillText(course?.title || '', 400, 330);
        
        ctx.font = '16px Arial';
        ctx.fillText(`Instructor: ${course?.instructor}`, 400, 380);
        
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.fillText(`Issued: ${new Date(certificate.completionDate).toLocaleDateString()}`, 400, 430);
        
        ctx.fillStyle = '#999';
        ctx.font = '12px Arial';
        ctx.fillText(`Certificate ID: ${certificate.id}`, 400, 520);
      }

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `certificate-${course?.title.replace(/\s+/g, '-').toLowerCase()}.png`;
          link.click();
          URL.revokeObjectURL(url);
          
          toast({
            title: "Certificate Downloaded",
            description: "Your certificate has been downloaded successfully.",
          });
        }
      });
    } catch (error) {
      console.error('Error downloading certificate:', error);
      toast({
        title: "Error",
        description: "Failed to download certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-hero border-b border-border/50">
        <div className="container py-12">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>

          <div className="flex items-start gap-6 animate-fade-in">
            <div className="h-24 w-24 rounded-full bg-gradient-primary flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEditProfile}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {user.badges.map(badge => (
                  <Badge key={badge} className="bg-accent/10 text-accent border-accent/20" variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-border/50 animate-fade-in">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-10 w-10 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{enrolledCourses.length}</div>
              <div className="text-sm text-muted-foreground">Enrolled Courses</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in [animation-delay:50ms]">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold mb-1">{completedCoursesList.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in [animation-delay:100ms]">
            <CardContent className="p-6 text-center">
              <Flame className="h-10 w-10 mx-auto mb-3 text-destructive" />
              <div className="text-3xl font-bold mb-1">{user.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 animate-fade-in [animation-delay:150ms]">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-3 text-success" />
              <div className="text-3xl font-bold mb-1">
                {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">Overall Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        {enrolledCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">My Enrolled Courses</h2>
            <div className="space-y-4">
              {enrolledCourses.map(course => {
                const isCompleted = user.completedCourses.includes(course.id);
                const completedLessons = course.lessons.filter(l => l.completed).length;
                const totalLessons = course.lessons.length;
                const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

                return (
                  <div key={course.id} className="p-6 border border-border/50 rounded-lg bg-gradient-card">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                            <p className="text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span>Instructor: {course.instructor}</span>
                              <span>•</span>
                              <span>{course.duration}</span>
                              <span>•</span>
                              <span>{totalLessons} lessons</span>
                            </div>
                            {!isCompleted && (
                              <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress</span>
                                  <span>{completedLessons}/{totalLessons} lessons ({progressPercent}%)</span>
                                </div>
                                <Progress value={progressPercent} className="h-2" />
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <Badge className="bg-success/10 text-success">Completed</Badge>
                              ) : (
                                <Badge className="bg-primary/10 text-primary">In Progress</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="bg-gradient-primary"
                        >
                          {isCompleted ? 'Review Course' : 'Continue Learning'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to unenroll from "${course.title}"? This will remove all your progress.`)) {
                              unenrollCourse(course.id);
                            }
                          }}
                          className="text-destructive hover:text-destructive"
                        >
                          Unenroll
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCoursesList.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Completed Courses & Certificates</h2>
            <div className="space-y-4">
              {completedCoursesList.map(course => {
                const certificate = user.certificates.find(c => c.courseId === course.id);
                return (
                  <div key={course.id} className="p-4 border border-border/50 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-success/10 text-success">Completed</Badge>
                      {certificate && (
                        <>
                          <Button size="sm" variant="outline" onClick={() => setSelectedCertificate(certificate)}>
                            <Award className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => downloadCertificate(certificate)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Your Certificate</DialogTitle>
            </DialogHeader>
            {selectedCertificate && <Certificate certificate={selectedCertificate} />}
          </DialogContent>
        </Dialog>

        <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {enrolledCourses.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No courses yet</h3>
            <p className="text-muted-foreground mb-6">Start your learning journey by enrolling in a course!</p>
            <Button onClick={() => navigate('/')} className="bg-gradient-primary">
              Browse Courses
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
