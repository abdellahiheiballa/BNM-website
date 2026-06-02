import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, History, TrendingUp, Users } from "lucide-react";

export default function APropos() {
  const heroImage = "/assets/images/AE8I8870%20copie%20-%20Copie.jpg.jpeg";
  const buildingImage = "/assets/images/Si%C3%A8ge%20de%20la%20BNM.jpg.jpeg";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 grayscale"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              L'institution financière de référence en Mauritanie
            </h1>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              Une histoire bâtie sur la confiance, l'innovation et l'engagement envers le développement économique du pays.
            </p>
          </div>
        </div>
      </section>

      {/* History / Intro Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px bg-secondary w-12" />
                <span className="text-secondary font-bold uppercase tracking-widest text-sm">Notre Histoire</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                Une banque au cœur de l'économie mauritanienne
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  Créée avec l'ambition de moderniser le paysage bancaire national, la Banque Nationale de Mauritanie (BNM) s'est imposée comme un acteur majeur et incontournable du financement de l'économie.
                </p>
                <p>
                  Forte de son vaste réseau d'agences réparties sur l'ensemble du territoire et de partenariats stratégiques à l'international, la BNM accompagne au quotidien particuliers, professionnels et grandes entreprises dans la réalisation de leurs projets.
                </p>
                <p>
                  Notre croissance continue repose sur une solidité financière reconnue, une gouvernance rigoureuse et une capacité d'innovation permanente pour répondre aux nouveaux usages de nos clients.
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-primary/10 rounded-tl-[100px]" />
              <img 
                src={buildingImage} 
                alt="Siège de la BNM" 
                className="absolute inset-4 object-cover w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-tl-[100px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-24 bg-muted/30 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Notre ADN</h2>
            <p className="text-lg text-muted-foreground">
              Ce qui nous définit et guide nos actions au quotidien pour vous servir avec excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-none border-t-4 border-t-secondary shadow-md hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Notre Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Offrir des services bancaires innovants, accessibles et sécurisés pour soutenir l'inclusion financière et accompagner la croissance de nos clients.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-t-4 border-t-primary shadow-md hover:-translate-y-2 transition-transform duration-300 bg-primary text-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center text-secondary mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Notre Vision</h3>
                <p className="text-white/80 leading-relaxed">
                  Être la banque de référence en Mauritanie, reconnue pour son excellence opérationnelle, son agilité digitale et son impact positif sur la société.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-t-4 border-t-secondary shadow-md hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary">Nos Valeurs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Confiance, intégrité, proximité, innovation et responsabilité sociétale sont les piliers de notre relation avec vous.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership / Gouvernance */}
      <section className="py-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-serif font-bold text-primary mb-8">Gouvernance</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  La BNM s'appuie sur une gouvernance d'entreprise solide et transparente, conforme aux meilleures pratiques internationales et aux directives de la Banque Centrale de Mauritanie.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Comité de Direction</h4>
                      <p className="text-muted-foreground">Supervise l'exécution de la stratégie globale et veille à la performance opérationnelle et financière.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Conseil d'Administration</h4>
                      <p className="text-muted-foreground">Définit les orientations stratégiques, garantit la solidité du bilan et assure le contrôle de la gestion.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <History className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">Comités Spécialisés</h4>
                      <p className="text-muted-foreground">Comité d'audit, comité des risques et comité Charia garantissant la rigueur de nos processus et de nos offres.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary p-12 text-white flex flex-col justify-center">
                 <div className="text-secondary font-serif text-6xl mb-6">"</div>
                 <blockquote className="text-2xl leading-relaxed font-light mb-8 italic">
                   Notre engagement est total : construire une banque moderne, solide et inclusive, capable d'être le moteur financier des ambitions de la Mauritanie.
                 </blockquote>
                 <div>
                   <div className="font-bold text-xl">Direction Générale</div>
                   <div className="text-white/60">Banque Nationale de Mauritanie</div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
