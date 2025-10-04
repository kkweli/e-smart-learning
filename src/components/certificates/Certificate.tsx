import { Certificate as CertificateType } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Award, Download } from 'lucide-react';

interface CertificateProps {
  certificate: CertificateType;
}

export function Certificate({ certificate }: CertificateProps) {
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll just trigger a print dialog
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="certificate-container bg-gradient-to-br from-background via-background to-primary/5 p-8 rounded-lg border-4 border-primary/20 shadow-2xl">
        <div className="text-center space-y-6">
          <Award className="h-16 w-16 mx-auto text-primary" />
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Certificate of Completion
            </h1>
            <p className="text-muted-foreground">This is to certify that</p>
          </div>

          <div className="py-6">
            <h2 className="text-5xl font-bold">{certificate.userName}</h2>
          </div>

          <p className="text-lg text-muted-foreground">
            has successfully completed the course
          </p>

          <div className="py-4">
            <h3 className="text-3xl font-semibold text-primary">
              {certificate.courseName}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-6 text-sm text-muted-foreground">
            <div>
              <p className="font-semibold">Completion Date</p>
              <p>{new Date(certificate.completionDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="font-semibold">Certificate ID</p>
              <p>{certificate.id}</p>
            </div>
          </div>

          <div className="pt-8 border-t border-border/50">
            <p className="text-sm">
              <span className="font-semibold">Instructor: </span>
              {certificate.instructor}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center print:hidden">
        <Button onClick={handleDownload} className="bg-gradient-primary">
          <Download className="mr-2 h-4 w-4" />
          Download Certificate
        </Button>
      </div>
    </div>
  );
}
