import { useGetActualite } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "wouter";
import { Calendar, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ActualiteDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  const { data: actu, isLoading, error } = useGetActualite(id, {
    query: {
      enabled: !!id,
      queryKey: ["/api/actualites", id],

    },
  });



  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Skeleton className="h-8 w-24 mb-6 rounded-none" />
        <Skeleton className="h-12 w-full mb-4 rounded-none" />
        <Skeleton className="h-12 w-3/4 mb-8 rounded-none" />
        <Skeleton className="h-[400px] w-full mb-8 rounded-none" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !actu) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Article introuvable</h2>
        <p className="text-muted-foreground mb-8">L'actualité que vous recherchez n'existe pas ou a été supprimée.</p>
        <Link href="/actualites">
          <Button className="bg-primary text-white rounded-none">Retour aux actualités</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      {/* Header / Hero */}
      <div className="w-full bg-muted/30 pt-12 pb-8 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/actualites" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux actualités
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-secondary text-primary hover:bg-secondary rounded-none px-3 py-1 font-bold tracking-wider uppercase">
              {actu.categorie || "Actualité"}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground font-medium">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(actu.datePublication).toLocaleDateString('fr-FR', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
              })}
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary leading-tight mb-8">
            {actu.titre}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl mt-8">
        {actu.image && (
          <div className="w-full aspect-[21/9] mb-12 bg-muted relative">
            <img 
              src={actu.image} 
              alt={actu.titre} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-12">
          {/* Social Share sidebar */}
          <div className="md:w-16 flex md:flex-col gap-4 py-2 text-muted-foreground shrink-0">
            <span className="text-xs font-semibold uppercase tracking-widest hidden md:block mb-2 text-center" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
              Partager
            </span>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
              <Facebook className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
              <Linkedin className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Text */}
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:leading-relaxed prose-a:text-secondary">
            {/* Simple paragraph splitting for demo purposes since we don't have rich HTML content in the mock */}
            {actu.contenu.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-foreground/90">{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
