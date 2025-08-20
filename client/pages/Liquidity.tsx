import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Droplets, 
  TrendingUp, 
  Plus, 
  Minus,
  DollarSign,
  Percent,
  BarChart3,
  ArrowUpDown
} from "lucide-react";
import { useState } from "react";

interface LiquidityPool {
  id: string;
  pair: string;
  tokens: { symbol: string; icon: string }[];
  tvl: string;
  apr: string;
  volume24h: string;
  fees24h: string;
  myLiquidity?: string;
  myShare?: string;
}

const liquidityPools: LiquidityPool[] = [
  {
    id: "1",
    pair: "APTX/ETH",
    tokens: [
      { symbol: "APTX", icon: "🔥" },
      { symbol: "ETH", icon: "🔷" }
    ],
    tvl: "$12.5M",
    apr: "24.5%",
    volume24h: "$2.3M",
    fees24h: "$6,900",
    myLiquidity: "$5,420",
    myShare: "0.043%"
  },
  {
    id: "2",
    pair: "APTX/USDC",
    tokens: [
      { symbol: "APTX", icon: "🔥" },
      { symbol: "USDC", icon: "💵" }
    ],
    tvl: "$8.2M", 
    apr: "18.7%",
    volume24h: "$1.8M",
    fees24h: "$5,400",
    myLiquidity: "$2,150",
    myShare: "0.026%"
  },
  {
    id: "3",
    pair: "ETH/USDC",
    tokens: [
      { symbol: "ETH", icon: "🔷" },
      { symbol: "USDC", icon: "💵" }
    ],
    tvl: "$45.1M",
    apr: "12.3%",
    volume24h: "$8.9M", 
    fees24h: "$26,700"
  },
  {
    id: "4",
    pair: "APTX/BTC",
    tokens: [
      { symbol: "APTX", icon: "🔥" },
      { symbol: "BTC", icon: "🟠" }
    ],
    tvl: "$3.8M",
    apr: "31.2%",
    volume24h: "$890K",
    fees24h: "$2,670"
  }
];

export default function Liquidity() {
  const [selectedPool, setSelectedPool] = useState<LiquidityPool | null>(null);
  const [activeTab, setActiveTab] = useState("add");
  const [token0Amount, setToken0Amount] = useState("");
  const [token1Amount, setToken1Amount] = useState("");

  const userStats = {
    totalLiquidity: "$7,570",
    totalEarnings: "$542.30",
    totalPools: "2",
    avgApr: "21.6%"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-aptx-50/20 to-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Liquidity</h1>
          <p className="text-muted-foreground">Provide liquidity and earn trading fees on APTX protocol</p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-aptx-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{userStats.totalLiquidity}</div>
              <div className="text-sm text-muted-foreground">Total Liquidity</div>
            </CardContent>
          </Card>
          <Card className="border-aptx-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-green-600">{userStats.totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
          <Card className="border-aptx-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{userStats.totalPools}</div>
              <div className="text-sm text-muted-foreground">Active Pools</div>
            </CardContent>
          </Card>
          <Card className="border-aptx-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-aptx-600">{userStats.avgApr}</div>
              <div className="text-sm text-muted-foreground">Avg APR</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 gap-8">
          {/* Liquidity Pools */}
          <div className="lg:col-span-2">
            <Card className="border-aptx-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-aptx-600" />
                  Liquidity Pools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liquidityPools.map((pool) => (
                    <Card 
                      key={pool.id}
                      className={`border-aptx-100 cursor-pointer transition-all hover:shadow-md ${
                        selectedPool?.id === pool.id ? 'ring-2 ring-aptx-300 bg-aptx-50' : 'bg-white/60'
                      }`}
                      onClick={() => setSelectedPool(pool)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center -space-x-2">
                              {pool.tokens.map((token, index) => (
                                <div key={index} className="text-2xl bg-white rounded-full border-2 border-white">
                                  {token.icon}
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-foreground">{pool.pair}</span>
                                {pool.myLiquidity && (
                                  <Badge className="bg-aptx-100 text-aptx-700 hover:bg-aptx-200">
                                    My Pool
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {pool.tokens.map(t => t.symbol).join(" + ")}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">{pool.apr}</div>
                            <div className="text-sm text-muted-foreground">APR</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-aptx-500" />
                            <div>
                              <div className="text-muted-foreground">TVL</div>
                              <div className="font-medium">{pool.tvl}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4 text-aptx-500" />
                            <div>
                              <div className="text-muted-foreground">Volume 24h</div>
                              <div className="font-medium">{pool.volume24h}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Percent className="h-4 w-4 text-aptx-500" />
                            <div>
                              <div className="text-muted-foreground">Fees 24h</div>
                              <div className="font-medium">{pool.fees24h}</div>
                            </div>
                          </div>
                          {pool.myLiquidity && (
                            <div className="flex items-center space-x-2">
                              <Droplets className="h-4 w-4 text-aptx-500" />
                              <div>
                                <div className="text-muted-foreground">My Liquidity</div>
                                <div className="font-medium">{pool.myLiquidity}</div>
                              </div>
                            </div>
                          )}
                        </div>

                        {pool.myShare && (
                          <div className="mt-3 pt-3 border-t border-aptx-100">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Pool Share</span>
                              <span className="text-sm font-medium">{pool.myShare}</span>
                            </div>
                            <Progress value={parseFloat(pool.myShare)} className="mt-2 h-2" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Liquidity Actions */}
          <div className="space-y-6">
            {selectedPool ? (
              <Card className="border-aptx-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="flex items-center -space-x-1">
                      {selectedPool.tokens.map((token, index) => (
                        <span key={index} className="text-lg bg-white rounded-full border border-aptx-200">
                          {token.icon}
                        </span>
                      ))}
                    </div>
                    {selectedPool.pair}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full grid-cols-2">
                      <TabsTrigger value="add">Add Liquidity</TabsTrigger>
                      <TabsTrigger value="remove">Remove</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="add" className="space-y-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>{selectedPool.tokens[0].symbol} Amount</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={token0Amount}
                              onChange={(e) => setToken0Amount(e.target.value)}
                              className="pr-20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                              <span className="text-lg">{selectedPool.tokens[0].icon}</span>
                              <span className="text-sm text-muted-foreground">{selectedPool.tokens[0].symbol}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Balance: 2,540 {selectedPool.tokens[0].symbol}</span>
                            <Button variant="ghost" size="sm" className="text-aptx-600 hover:text-aptx-700 p-0 h-auto">
                              MAX
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-aptx-100 text-aptx-600">
                            <Plus className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>{selectedPool.tokens[1].symbol} Amount</Label>
                          <div className="relative">
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={token1Amount}
                              onChange={(e) => setToken1Amount(e.target.value)}
                              className="pr-20"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                              <span className="text-lg">{selectedPool.tokens[1].icon}</span>
                              <span className="text-sm text-muted-foreground">{selectedPool.tokens[1].symbol}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Balance: 1.45 {selectedPool.tokens[1].symbol}</span>
                            <Button variant="ghost" size="sm" className="text-aptx-600 hover:text-aptx-700 p-0 h-auto">
                              MAX
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-aptx-50 border border-aptx-200 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pool Share:</span>
                          <span className="font-medium">0.045%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>LP Tokens:</span>
                          <span className="font-medium">~125.4</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>APR:</span>
                          <span className="font-medium text-green-600">{selectedPool.apr}</span>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-aptx-500 to-aptx-600 hover:from-aptx-600 hover:to-aptx-700 text-white font-semibold"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Liquidity
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="remove" className="space-y-4">
                      <div className="space-y-4">
                        <div>
                          <Label>Liquidity to Remove</Label>
                          <div className="mt-4 space-y-4">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-foreground">25%</div>
                              <div className="text-sm text-muted-foreground">of your liquidity</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 grid-cols-4 gap-2">
                              {["25%", "50%", "75%", "MAX"].map((percent) => (
                                <Button key={percent} variant="outline" size="sm" className="border-aptx-200 hover:bg-aptx-50">
                                  {percent}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-aptx-50 border border-aptx-200 rounded-lg p-4 space-y-3">
                          <div className="text-sm font-medium text-center">You will receive</div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{selectedPool.tokens[0].icon}</span>
                                <span>{selectedPool.tokens[0].symbol}</span>
                              </div>
                              <span className="font-medium">125.4</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{selectedPool.tokens[1].icon}</span>
                                <span>{selectedPool.tokens[1].symbol}</span>
                              </div>
                              <span className="font-medium">0.05</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="w-full border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <Minus className="mr-2 h-4 w-4" />
                        Remove Liquidity
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-aptx-100 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <Droplets className="h-12 w-12 mx-auto text-aptx-400 mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select a Pool</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a liquidity pool to provide liquidity and earn trading fees
                  </p>
                </CardContent>
              </Card>
            )}

            {/* My Positions */}
            <Card className="border-aptx-100 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-aptx-600" />
                  My Positions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liquidityPools.filter(pool => pool.myLiquidity).map((pool) => (
                  <div key={pool.id} className="flex items-center justify-between p-3 bg-aptx-50 rounded-lg border border-aptx-100">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center -space-x-1">
                        {pool.tokens.map((token, index) => (
                          <span key={index} className="text-sm bg-white rounded-full border border-aptx-200">
                            {token.icon}
                          </span>
                        ))}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{pool.pair}</div>
                        <div className="text-xs text-muted-foreground">APR: {pool.apr}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{pool.myLiquidity}</div>
                      <div className="text-xs text-green-600">+$12.50</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
