import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Cards from "@/pages/cards";
import GiftCards from "@/pages/gift-cards";
import Games from "@/pages/games";
import Topup from "@/pages/topup";
import Transfers from "@/pages/transfers";
import Mobile from "@/pages/mobile";
import Esim from "@/pages/esim";
import Reviews from "@/pages/reviews";
import VpnPage from "@/pages/vpn";

import AccountDashboard from "@/pages/account/dashboard";
import AccountTopup from "@/pages/account/topup";
import AccountWithdraw from "@/pages/account/withdraw";
import AccountTransactions from "@/pages/account/transactions";
import AccountOrders from "@/pages/account/orders";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/cards" component={Cards} />
      <Route path="/gift-cards" component={GiftCards} />
      <Route path="/games" component={Games} />
      <Route path="/topup" component={Topup} />
      <Route path="/transfers" component={Transfers} />
      <Route path="/mobile" component={Mobile} />
      <Route path="/esim" component={Esim} />
      <Route path="/vpn" component={VpnPage} />
      <Route path="/reviews" component={Reviews} />
      
      <Route path="/account" component={AccountDashboard} />
      <Route path="/account/topup" component={AccountTopup} />
      <Route path="/account/withdraw" component={AccountWithdraw} />
      <Route path="/account/transactions" component={AccountTransactions} />
      <Route path="/account/orders" component={AccountOrders} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="unicard-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
