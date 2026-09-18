import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, History, TrendingUp, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function APropos() {
  const { t } = useTranslation();
  const buildingImage = "/assets/images/Si%C3%A8ge%20de%20la%20BNM.jpg.jpeg";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center bg-primary">
        <div className="container relative z-20 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              {t("about.title")}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              {t("about.heroDescription")}
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
                <span className="text-secondary font-bold uppercase tracking-widest text-sm">{t("about.historyLabel")}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                {t("about.historyTitle")}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p>
                  {t("about.historyOne")}
                </p>
                <p>
                  {t("about.historyTwo")}
                </p>
                <p>
                  {t("about.historyThree")}
                </p>
              </div>
            </div>
            <div className="relative h-[500px]">
              <div className="absolute inset-0 bg-primary/10 rounded-tl-[100px]" />
              <img 
                src={buildingImage} 
                alt={t("common.bankName")}
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">{t("about.dnaTitle")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("about.dnaDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="rounded-none border-t-4 border-t-secondary shadow-md hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t("about.mission")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.missionDescription")}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-t-4 border-t-primary shadow-md hover:-translate-y-2 transition-transform duration-300 bg-primary text-white">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-white/10 rounded-full flex items-center justify-center text-secondary mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">{t("about.vision")}</h3>
                <p className="text-white/80 leading-relaxed">
                  {t("about.visionDescription")}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-none border-t-4 border-t-secondary shadow-md hover:-translate-y-2 transition-transform duration-300">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t("about.values")}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.valuesDescription")}
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
                <h2 className="text-3xl font-serif font-bold text-primary mb-8">{t("about.governance")}</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {t("about.governanceDescription")}
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">{t("about.management")}</h4>
                      <p className="text-muted-foreground">{t("about.managementDescription")}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">{t("about.board")}</h4>
                      <p className="text-muted-foreground">{t("about.boardDescription")}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-muted p-3 rounded mr-4">
                      <History className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-primary mb-2">{t("about.committees")}</h4>
                      <p className="text-muted-foreground">{t("about.committeesDescription")}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary p-12 text-white flex flex-col justify-center">
                 <div className="text-secondary font-serif text-6xl mb-6">"</div>
                 <blockquote className="text-2xl leading-relaxed font-light mb-8 italic">
                   {t("about.quote")}
                 </blockquote>
                 <div>
                   <div className="font-bold text-xl">{t("about.generalManagement")}</div>
                   <div className="text-white/60">Banque Nationale de Mauritanie</div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
