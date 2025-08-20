import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-aptx-50/20 to-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <Card className="border-aptx-100 bg-white/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Construction className="h-16 w-16 mx-auto text-aptx-500 mb-4" />
              <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="bg-aptx-50 border border-aptx-200 rounded-lg p-6 mb-6">
              <p className="text-sm text-aptx-700">
                This page is coming soon! Continue building by asking for specific features or content for this section.
              </p>
            </div>
            <Button 
              variant="outline"
              className="border-aptx-200 text-aptx-700 hover:bg-aptx-50"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
