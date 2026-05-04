import { useListAgences } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Search, Map } from "lucide-react";
import { useState, useMemo } from "react";

export default function Agences() {
  const { data: agences, isLoading } = useListAgences();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Toutes");
  const agencesArray = Array.isArray(agences) ? agences : [];

  const cities = useMemo(() => {
    if (agencesArray.length === 0) return ["Toutes"];
    const uniqueCities = new Set(agencesArray.map(a => a.ville).filter(Boolean));
    return ["Toutes", ...Array.from(uniqueCities)] as string[];
  }, [agencesArray]);

  const filteredAgences = useMemo(() => {
    if (agencesArray.length === 0) return [];
    return agencesArray.filter(agence => {
      const matchesCity = selectedCity === "Toutes" || agence.ville === selectedCity;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        agence.nom.toLowerCase().includes(searchLower) || 
        (agence.ville && agence.ville.toLowerCase().includes(searchLower)) ||
        (agence.adresse && agence.adresse.toLowerCase().includes(searchLower));
      
      return matchesCity && matchesSearch;
    });
  }, [agences, searchQuery, selectedCity]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      {/* Header */}
      <section className="bg-primary py-16 text-white relative">
        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Map className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Nos Agences</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Trouvez l'agence BNM la plus proche de chez vous parmi notre vaste réseau couvrant l'ensemble du territoire mauritanien.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          
          {/* Filters */}
          <Card className="mb-10 rounded-none border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input 
                    placeholder="Rechercher une agence, une adresse, une ville..." 
                    className="pl-10 h-12 rounded-none bg-muted/50 border-transparent focus-visible:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {cities.map(city => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      className={`rounded-none shrink-0 ${
                        selectedCity === city 
                          ? "bg-secondary text-primary hover:bg-secondary/90" 
                          : "text-primary border-primary/20 hover:bg-primary/5"
                      }`}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-serif font-bold text-primary">
              {isLoading ? "Recherche en cours..." : `${filteredAgences.length} agence${filteredAgences.length !== 1 ? 's' : ''} trouvée${filteredAgences.length !== 1 ? 's' : ''}`}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="rounded-none">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-6" />
                    <Skeleton className="h-4 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredAgences.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgences.map(agence => (
                <Card key={agence.id} className="group rounded-none border-t-4 border-t-transparent hover:border-t-secondary transition-all shadow-sm hover:shadow-md">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {agence.nom}
                    </h3>
                    
                    <div className="space-y-3 pt-2 text-muted-foreground">
                      {agence.adresse && (
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 mr-3 mt-0.5 text-primary/40 shrink-0" />
                          <span className="text-sm leading-tight">{agence.adresse}<br/>{agence.ville}</span>
                        </div>
                      )}
                      
                      {agence.telephone && (
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-3 text-primary/40 shrink-0" />
                          <span className="text-sm font-medium text-foreground">{agence.telephone}</span>
                        </div>
                      )}
                      
                      {agence.horaires && (
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 mr-3 mt-0.5 text-primary/40 shrink-0" />
                          <span className="text-sm">{agence.horaires}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 border-t mt-4">
                       <Button variant="ghost" className="w-full text-primary hover:text-secondary hover:bg-secondary/10 rounded-none justify-between">
                         Voir sur la carte <MapPin className="w-4 h-4 ml-2" />
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-background border rounded-none">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-primary mb-2">Aucune agence trouvée</h3>
              <p className="text-muted-foreground">Modifiez vos critères de recherche pour trouver une agence.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-none text-primary"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCity("Toutes");
                }}
              >
                Réinitialiser la recherche
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
