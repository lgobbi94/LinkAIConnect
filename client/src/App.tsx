import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { ProfilePicture } from "@/components/ProfilePicture";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 sm:max-w-md max-w-full overflow-hidden py-6 min-h-screen">
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-violet-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-indigo-700/20 rounded-full blur-3xl"></div>
        </div>
        <Router />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
