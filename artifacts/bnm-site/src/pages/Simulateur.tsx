import { useState } from "react";
import { useSimulateClassic, useSimulateMurabaha } from "@workspace/api-client-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Minus, ArrowRight } from "lucide-react";

export default function Simulateur() {
  const [tab, setTab] = useState("classic");

  // Classic Form State
  const [classicMontant, setClassicMontant] = useState(1000000);
  const [classicDuree, setClassicDuree] = useState(5);
  const [classicTaux, setClassicTaux] = useState(5.5);

  // Murabaha Form State
  const [murabahaPrix, setMurabahaPrix] = useState(2000000);
  const [murabahaApport, setMurabahaApport] = useState(400000);
  const [murabahaDuree, setMurabahaDuree] = useState(10);
  const [murabahaMarge, setMurabahaMarge] = useState(5);

  const simulateClassic = useSimulateClassic();
  const simulateMurabaha = useSimulateMurabaha();

  const handleClassicSubmit = () => {
    simulateClassic.mutate({
      data: {
        montant: classicMontant,
        dureeAns: classicDuree,
        taux: classicTaux
      }
    });
  };

  const handleMurabahaSubmit = () => {
    simulateMurabaha.mutate({
      data: {
        prixBien: murabahaPrix,
        apportPersonnel: murabahaApport,
        dureeAns: murabahaDuree,
        marge: murabahaMarge
      }
    });
  };

  const formatMRU = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MRU',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20 pb-24">
      {/* Header */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calculator className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Simulateurs de Financement</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Estimez vos mensualités en quelques secondes, que vous optiez pour un crédit classique ou un financement islamique Mourabaha.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 mt-8">
        <div className="max-w-5xl mx-auto">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-14 bg-background border rounded-none p-1">
              <TabsTrigger 
                value="classic" 
                className="rounded-none text-base data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
              >
                Crédit Classique
              </TabsTrigger>
              <TabsTrigger 
                value="murabaha"
                className="rounded-none text-base data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
              >
                Financement Murabaha (Islamique)
              </TabsTrigger>
            </TabsList>

            {/* CLASSIC TAB */}
            <TabsContent value="classic" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-none border-none shadow-md">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-2xl font-serif text-primary">Calculez votre crédit</CardTitle>
                    <CardDescription>Réglez les paramètres pour obtenir une estimation.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">Montant du prêt</Label>
                        <div className="text-2xl font-bold text-primary bg-muted px-4 py-1 rounded">
                          {formatMRU(classicMontant)}
                        </div>
                      </div>
                      <Slider 
                        min={100000} max={50000000} step={100000}
                        value={[classicMontant]} 
                        onValueChange={(v) => setClassicMontant(v[0])}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>100k MRU</span>
                        <span>50M MRU</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">Durée (années)</Label>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none" onClick={() => setClassicDuree(Math.max(1, classicDuree - 1))}><Minus className="w-4 h-4" /></Button>
                          <div className="text-xl font-bold text-primary w-12 text-center">{classicDuree} ans</div>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none" onClick={() => setClassicDuree(Math.min(25, classicDuree + 1))}><Plus className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <Slider 
                        min={1} max={25} step={1}
                        value={[classicDuree]} 
                        onValueChange={(v) => setClassicDuree(v[0])}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">Taux d'intérêt annuel (%)</Label>
                        <div className="w-24">
                          <Input 
                            type="number" 
                            step="0.1"
                            value={classicTaux}
                            onChange={(e) => setClassicTaux(parseFloat(e.target.value) || 0)}
                            className="text-right font-bold rounded-none"
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold h-12 text-lg rounded-none mt-8"
                      onClick={handleClassicSubmit}
                      disabled={simulateClassic.isPending}
                    >
                      {simulateClassic.isPending ? "Calcul en cours..." : "Lancer la simulation"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Classic Results Box */}
                <Card className="bg-primary text-white rounded-none border-none shadow-xl h-fit sticky top-24">
                  <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-center font-serif text-xl">Résultat Estimatif</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {simulateClassic.data ? (
                      <div className="animate-in fade-in duration-500">
                        <div className="text-center mb-8">
                          <div className="text-sm text-white/70 mb-2 uppercase tracking-wider">Mensualité estimée</div>
                          <div className="text-4xl font-bold text-secondary">{formatMRU(simulateClassic.data.mensualite)}</div>
                          <div className="text-sm text-white/50 mt-1">/ mois</div>
                        </div>
                        
                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Montant emprunté</span>
                            <span className="font-semibold">{formatMRU(simulateClassic.data.montant)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Durée</span>
                            <span className="font-semibold">{simulateClassic.data.dureeAns} mois</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Taux</span>
                            <span className="font-semibold">{simulateClassic.data.taux}%</span>
                          </div>
                          <div className="flex justify-between items-center text-secondary">
                            <span>Coût total du crédit</span>
                            <span className="font-bold">{formatMRU(simulateClassic.data.interetsTotal)}</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-white/10">
                            <span>Total à rembourser</span>
                            <span>{formatMRU(simulateClassic.data.coutTotal)}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-white text-primary hover:bg-gray-100 font-bold mt-8 rounded-none group">
                          Demander ce crédit <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/50">
                        Remplissez le formulaire et cliquez sur "Lancer la simulation" pour voir les résultats.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* MURABAHA TAB */}
            <TabsContent value="murabaha" className="mt-6">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-none border-none shadow-md">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-2xl font-serif text-primary">Calculez votre Murabaha</CardTitle>
                    <CardDescription>Estimez le financement de votre bien selon les principes de la Charia.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">Prix du bien à acquérir</Label>
                        <div className="text-2xl font-bold text-primary bg-muted px-4 py-1 rounded">
                          {formatMRU(murabahaPrix)}
                        </div>
                      </div>
                      <Slider 
                        min={100000} max={50000000} step={100000}
                        value={[murabahaPrix]} 
                        onValueChange={(v) => setMurabahaPrix(v[0])}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">Votre apport personnel</Label>
                        <div className="text-2xl font-bold text-primary bg-muted px-4 py-1 rounded">
                          {formatMRU(murabahaApport)}
                        </div>
                      </div>
                      <Slider 
                        min={0} max={murabahaPrix} step={50000}
                        value={[murabahaApport]} 
                        onValueChange={(v) => setMurabahaApport(Math.min(v[0], murabahaPrix))}
                        className="py-4"
                      />
                      <div className="text-xs text-muted-foreground text-right">
                        Soit {((murabahaApport / murabahaPrix) * 100).toFixed(0)}% du prix du bien
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <Label className="text-base font-semibold text-primary block">Durée de remboursement (ans)</Label>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-none" onClick={() => setMurabahaDuree(Math.max(1, murabahaDuree - 1))}><Minus className="w-4 h-4" /></Button>
                          <div className="text-xl font-bold text-primary flex-1 text-center bg-muted py-1.5 rounded">{murabahaDuree} ans</div>
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-none" onClick={() => setMurabahaDuree(Math.min(25, murabahaDuree + 1))}><Plus className="w-4 h-4" /></Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-semibold text-primary block">Marge bancaire (%)</Label>
                        <Input 
                          type="number" 
                          step="0.1"
                          value={murabahaMarge}
                          onChange={(e) => setMurabahaMarge(parseFloat(e.target.value) || 0)}
                          className="font-bold text-lg h-10 rounded-none bg-muted/50"
                        />
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold h-12 text-lg rounded-none mt-8"
                      onClick={handleMurabahaSubmit}
                      disabled={simulateMurabaha.isPending}
                    >
                      {simulateMurabaha.isPending ? "Calcul en cours..." : "Lancer la simulation Murabaha"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Murabaha Results Box */}
                <Card className="bg-primary text-white rounded-none border-none shadow-xl h-fit sticky top-24">
                  <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-center font-serif text-xl">Résultat Murabaha</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {simulateMurabaha.data ? (
                      <div className="animate-in fade-in duration-500">
                        <div className="text-center mb-8">
                          <div className="text-sm text-white/70 mb-2 uppercase tracking-wider">Mensualité estimée</div>
                          <div className="text-4xl font-bold text-secondary">{formatMRU(simulateMurabaha.data.mensualite)}</div>
                          <div className="text-sm text-white/50 mt-1">/ mois</div>
                        </div>
                        
                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Prix d'achat par la banque</span>
                            <span className="font-semibold">{formatMRU(murabahaPrix - murabahaApport)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Durée</span>
                            <span className="font-semibold">{simulateMurabaha.data.dureeAns} mois</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">Marge de la banque</span>
                            <span className="font-semibold text-secondary">{simulateMurabaha.data.marge}%</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-white/10">
                            <span>Prix de revente final</span>
                            <span>{formatMRU(simulateMurabaha.data.coutTotal)}</span>
                          </div>
                        </div>

                        <div className="mt-6 bg-white/5 p-3 text-xs text-white/70 italic border border-white/10">
                          Selon la Murabaha, la banque achète le bien et vous le revend à un prix majoré d'une marge convenue à l'avance.
                        </div>

                        <Button className="w-full bg-white text-primary hover:bg-gray-100 font-bold mt-6 rounded-none group">
                          Demander ce financement <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/50">
                        Remplissez le formulaire et cliquez sur "Lancer la simulation" pour voir les résultats.
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-8 text-center max-w-3xl mx-auto">
            Mentions légales : Les résultats de ce simulateur sont donnés à titre indicatif et ne constituent en aucun cas une offre contractuelle de crédit ou de financement. L'octroi d'un financement est soumis à l'acceptation de votre dossier par la Banque Nationale de Mauritanie.
          </p>
        </div>
      </section>
    </div>
  );
}
