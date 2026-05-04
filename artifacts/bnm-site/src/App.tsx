import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/layout/Layout";
import NotFound from "@/pages/not-found";

// Pages
import Home from "./pages/Home";
import Particuliers from "./pages/Particuliers";
import Professionnels from "./pages/Professionnels";
import Entreprises from "./pages/Entreprises";
import FinanceIslamique from "./pages/FinanceIslamique";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import Simulateur from "./pages/Simulateur";
import Agences from "./pages/Agences";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/particuliers" component={Particuliers} />
        <Route path="/professionnels" component={Professionnels} />
        <Route path="/entreprises" component={Entreprises} />
        <Route path="/finance-islamique" component={FinanceIslamique} />
        <Route path="/actualites" component={Actualites} />
        <Route path="/actualites/:id" component={ActualiteDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/a-propos" component={APropos} />
        <Route path="/simulateur" component={Simulateur} />
        <Route path="/agences" component={Agences} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
