import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Shield, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const stats = [
    { label: "Total Volume", value: "$42.8B", change: "+12.3%" },
    { label: "Total Liquidity", value: "$3.2B", change: "+8.7%" },
    { label: "24h Transactions", value: "156K", change: "+15.2%" },
    { label: "Active Users", value: "89K", change: "+9.1%" },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-aura-500" />,
      title: "Lightning Fast",
      description: "Execute swaps in milliseconds with our optimized routing engine"
    },
    {
      icon: <Shield className="h-8 w-8 text-aura-500" />,
      title: "Secure & Trustless",
      description: "Non-custodial protocol with battle-tested smart contracts"
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-aura-500" />,
      title: "Best Prices",
      description: "Get optimal rates through intelligent liquidity aggregation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-aura-50/20 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-aura-100/50 via-transparent to-aura-200/30 -z-10" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-aura-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-aura-300/15 rounded-full blur-3xl -z-10" />
        
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Trade crypto with
              <span className="block bg-gradient-to-r from-aura-500 to-aura-700 bg-clip-text text-transparent">
                Auraswap Protocol
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              The most advanced decentralized exchange. Swap tokens, provide liquidity,
              and trade NFTs on the fastest, most secure DeFi protocol.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/swap">
                <Button size="lg" className="bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white font-semibold px-8 py-3 text-lg">
                  Start Trading
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-aura-200 text-aura-700 hover:bg-aura-50 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="border-aura-100 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-foreground lg:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                  <div className="flex items-center justify-center mt-2 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose Auraswap?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of DeFi with our cutting-edge features designed for traders, liquidity providers, and NFT collectors.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-aura-100 bg-white/60 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card className="border-aura-200 bg-gradient-to-br from-aura-50 to-aura-100/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to start trading?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of traders who trust Auraswap for their DeFi needs. Start swapping and trading NFTs in seconds.
              </p>
              <Link to="/swap">
                <Button size="lg" className="bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white font-semibold px-12 py-3 text-lg">
                  Launch Auraswap App
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
