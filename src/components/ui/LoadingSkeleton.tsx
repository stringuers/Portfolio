import { Card } from '@/components/ui/card';

export const ProjectCardSkeleton = () => {
  return (
    <Card className="h-[500px] p-6 bg-card/80 backdrop-blur-sm border border-border animate-pulse">
      <div className="h-6 bg-muted rounded w-3/4 mb-4" />
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-muted rounded w-full" />
        <div className="h-4 bg-muted rounded w-5/6" />
        <div className="h-4 bg-muted rounded w-4/6" />
      </div>
      <div className="flex gap-2 mb-6">
        <div className="h-6 bg-muted rounded-full w-20" />
        <div className="h-6 bg-muted rounded-full w-24" />
        <div className="h-6 bg-muted rounded-full w-16" />
      </div>
      <div className="flex gap-3 mt-auto">
        <div className="h-10 bg-muted rounded flex-1" />
        <div className="h-10 bg-muted rounded flex-1" />
      </div>
    </Card>
  );
};

export const SectionSkeleton = () => {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="h-0.5 bg-muted rounded w-16 mx-auto mb-6 animate-pulse" />
          <div className="h-12 bg-muted rounded w-64 mx-auto mb-6 animate-pulse" />
          <div className="h-6 bg-muted rounded w-96 mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

