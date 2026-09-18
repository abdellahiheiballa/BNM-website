import { useState } from "react";
import { useSimulateClassic, useSimulateMurabaha } from "@workspace/api-client-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Minus, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Simulateur() {
  const { t, i18n } = useTranslation();
  const [tab, setTab] = useState("classic");

  const [classicMontant, setClassicMontant] = useState(3672000);
  const [classicDureeAns, setClassicDureeAns] = useState(12);
  const [classicDureeMois, setClassicDureeMois] = useState(145);
  const [classicTaux, setClassicTaux] = useState(6);
  const [classicTax, setClassicTax] = useState(0.16);
  const [classicFirstDueDate, setClassicFirstDueDate] = useState("2026-07-22");
  const [classicLoanStartDate, setClassicLoanStartDate] = useState("2026-06-22");

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
        dureeAns: classicDureeAns,
        dureeMois: classicDureeMois,
        taux: classicTaux,
        tax: classicTax,
        firstDueDate: classicFirstDueDate,
        loanStartDate: classicLoanStartDate,
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
    return new Intl.NumberFormat(i18n.language === "ar" ? "ar-MR" : "fr-FR", {
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{t("simulator.title")}</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {t("simulator.description")}
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
                {t("simulator.classic")}
              </TabsTrigger>
              <TabsTrigger 
                value="murabaha"
                className="rounded-none text-base data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
              >
                {t("simulator.murabaha")}
              </TabsTrigger>
            </TabsList>

            {/* CLASSIC TAB */}
            <TabsContent value="classic" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 rounded-none border-none shadow-md">
                  <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-2xl font-serif text-primary">{t("simulator.calculateCredit")}</CardTitle>
                    <CardDescription>{t("simulator.adjustParameters")}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.loanAmount")}</Label>
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
                        <Label className="text-base font-semibold text-primary">{t("simulator.years")}</Label>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none" onClick={() => setClassicDureeAns(Math.max(1, classicDureeAns - 1))}><Minus className="w-4 h-4" /></Button>
                          <div className="text-xl font-bold text-primary w-12 text-center">{classicDureeAns} {t("simulator.yearsShort")}</div>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-none" onClick={() => setClassicDureeAns(Math.min(25, classicDureeAns + 1))}><Plus className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <Slider 
                        min={1} max={25} step={1}
                        value={[classicDureeAns]} 
                        onValueChange={(v) => setClassicDureeAns(v[0])}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.months")}</Label>
                        <div className="w-32">
                          <Input 
                            type="number" 
                            min={1}
                            max={300}
                            value={classicDureeMois}
                            onChange={(e) => setClassicDureeMois(parseInt(e.target.value) || 1)}
                            className="text-right font-bold rounded-none"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{t("simulator.monthOverride")}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.annualRate")}</Label>
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

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.tax")}</Label>
                        <div className="w-24">
                          <Input 
                            type="number" 
                            step="0.01"
                            value={classicTax * 100}
                            onChange={(e) => setClassicTax((parseFloat(e.target.value) || 0) / 100)}
                            className="text-right font-bold rounded-none"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{t("simulator.taxDescription")}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.firstDueDate")}</Label>
                        <div className="w-40">
                          <Input 
                            type="date"
                            value={classicFirstDueDate}
                            onChange={(e) => setClassicFirstDueDate(e.target.value)}
                            className="text-right font-bold rounded-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.loanStartDate")}</Label>
                        <div className="w-40">
                          <Input 
                            type="date"
                            value={classicLoanStartDate}
                            onChange={(e) => setClassicLoanStartDate(e.target.value)}
                            className="text-right font-bold rounded-none"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{t("simulator.firstPeriodInterest")}</p>
                    </div>

                    <Button 
                      className="w-full bg-secondary text-primary hover:bg-secondary/90 font-bold h-12 text-lg rounded-none mt-8"
                      onClick={handleClassicSubmit}
                      disabled={simulateClassic.isPending}
                    >
                      {simulateClassic.isPending ? t("simulator.calculating") : t("simulator.launch")}
                    </Button>
                  </CardContent>
                </Card>

                {/* Classic Results Box */}
                <Card className="bg-primary text-white rounded-none border-none shadow-xl h-fit sticky top-24">
                  <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-center font-serif text-xl">{t("simulator.estimatedResult")}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {simulateClassic.data ? (
                      <div className="animate-in fade-in duration-500">
                        <div className="text-center mb-8">
                          <div className="text-sm text-white/70 mb-2 uppercase tracking-wider">{t("simulator.monthlyTtc")}</div>
                          <div className="text-4xl font-bold text-secondary">{formatMRU(simulateClassic.data.mensualiteTTC)}</div>
                          <div className="text-sm text-white/50 mt-1">{t("simulator.perMonth")}</div>
                        </div>
                        
                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.borrowedAmount")}</span>
                            <span className="font-semibold">{formatMRU(simulateClassic.data.montant)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.months")}</span>
                            <span className="font-semibold">{simulateClassic.data.dureeMois} {t("simulator.monthsShort")}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.rate")}</span>
                            <span className="font-semibold">{simulateClassic.data.taux}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.tax")}</span>
                            <span className="font-semibold">{(simulateClassic.data.taxRate * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between items-center text-secondary">
                            <span>{t("simulator.totalCreditCost")}</span>
                            <span className="font-bold">{formatMRU(simulateClassic.data.interetsTotal)}</span>
                          </div>
                          <div className="flex justify-between items-center text-secondary">
                            <span>{t("simulator.totalTaxes")}</span>
                            <span className="font-bold">{formatMRU(simulateClassic.data.taxTotal || 0)}</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-white/10">
                            <span>{t("simulator.totalRepayment")}</span>
                            <span>{formatMRU(simulateClassic.data.coutTotal)}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-white text-primary hover:bg-gray-100 font-bold mt-8 rounded-none group">
                          {t("simulator.requestCredit")} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/50">
                        {t("simulator.emptyResult")}
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
                    <CardTitle className="text-2xl font-serif text-primary">{t("simulator.calculateMurabaha")}</CardTitle>
                    <CardDescription>{t("simulator.murabahaDescription")}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <Label className="text-base font-semibold text-primary">{t("simulator.propertyPrice")}</Label>
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
                        <Label className="text-base font-semibold text-primary">{t("simulator.personalContribution")}</Label>
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
                        {t("simulator.propertyPercentage", { value: ((murabahaApport / murabahaPrix) * 100).toFixed(0) })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <Label className="text-base font-semibold text-primary block">{t("simulator.repaymentDuration")}</Label>
                        <div className="flex items-center gap-4">
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-none" onClick={() => setMurabahaDuree(Math.max(1, murabahaDuree - 1))}><Minus className="w-4 h-4" /></Button>
                          <div className="text-xl font-bold text-primary flex-1 text-center bg-muted py-1.5 rounded">{murabahaDuree} {t("simulator.yearsShort")}</div>
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-none" onClick={() => setMurabahaDuree(Math.min(25, murabahaDuree + 1))}><Plus className="w-4 h-4" /></Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label className="text-base font-semibold text-primary block">{t("simulator.bankMargin")}</Label>
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
                      {simulateMurabaha.isPending ? t("simulator.calculating") : t("simulator.launchMurabaha")}
                    </Button>
                  </CardContent>
                </Card>

                {/* Murabaha Results Box */}
                <Card className="bg-primary text-white rounded-none border-none shadow-xl h-fit sticky top-24">
                  <CardHeader className="bg-white/5 border-b border-white/10">
                    <CardTitle className="text-center font-serif text-xl">{t("simulator.murabahaResult")}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {simulateMurabaha.data ? (
                      <div className="animate-in fade-in duration-500">
                        <div className="text-center mb-8">
                          <div className="text-sm text-white/70 mb-2 uppercase tracking-wider">{t("simulator.estimatedMonthly")}</div>
                          <div className="text-4xl font-bold text-secondary">{formatMRU(simulateMurabaha.data.mensualite)}</div>
                          <div className="text-sm text-white/50 mt-1">{t("simulator.perMonth")}</div>
                        </div>
                        
                        <div className="space-y-4 border-t border-white/10 pt-6">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.bankPurchasePrice")}</span>
                            <span className="font-semibold">{formatMRU(murabahaPrix - murabahaApport)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.months")}</span>
                            <span className="font-semibold">{simulateMurabaha.data.dureeAns} {t("simulator.monthsShort")}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70">{t("simulator.bankMarginResult")}</span>
                            <span className="font-semibold text-secondary">{simulateMurabaha.data.marge}%</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-white/10">
                            <span>{t("simulator.finalResalePrice")}</span>
                            <span>{formatMRU(simulateMurabaha.data.coutTotal)}</span>
                          </div>
                        </div>

                        <div className="mt-6 bg-white/5 p-3 text-xs text-white/70 italic border border-white/10">
                          {t("simulator.murabahaNote")}
                        </div>

                        <Button className="w-full bg-white text-primary hover:bg-gray-100 font-bold mt-6 rounded-none group">
                          {t("simulator.requestFinancing")} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-white/50">
                        {t("simulator.emptyResult")}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-muted-foreground mt-8 text-center max-w-3xl mx-auto">
            {t("simulator.legalNotice")}
          </p>
        </div>
      </section>
    </div>
  );
}
