import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Image, 
  ShoppingCart, 
  Tag, 
  TrendingUp, 
  Users, 
  Palette,
  Search,
  Filter,
  Heart,
  Share2,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

interface NFTItem {
  id: string;
  name: string;
  image: string;
  price?: number;
  currency: string;
  collection: string;
  isListed: boolean;
  rarity?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

interface Collection {
  id: string;
  name: string;
  image: string;
  floorPrice: number;
  volume24h: number;
  owners: number;
  totalSupply: number;
}

const mockCollections: Collection[] = [
  {
    id: "aura-punks",
    name: "Aura Punks",
    image: "https://via.placeholder.com/400x400/9333ea/ffffff?text=Aura+Punks",
    floorPrice: 0.5,
    volume24h: 125.8,
    owners: 3450,
    totalSupply: 10000
  },
  {
    id: "cosmic-crystals",
    name: "Cosmic Crystals",
    image: "https://via.placeholder.com/400x400/a855f7/ffffff?text=Cosmic+Crystals",
    floorPrice: 1.2,
    volume24h: 89.5,
    owners: 2890,
    totalSupply: 5000
  },
  {
    id: "digital-degens",
    name: "Digital Degens",
    image: "https://via.placeholder.com/400x400/c084fc/ffffff?text=Digital+Degens",
    floorPrice: 0.8,
    volume24h: 45.2,
    owners: 1995,
    totalSupply: 3333
  }
];

const mockNFTs: NFTItem[] = [
  {
    id: "1",
    name: "Aura Punk #1",
    image: "https://via.placeholder.com/300x300/9333ea/ffffff?text=Aura+Punk+%231",
    price: 5.0,
    currency: "ETH",
    collection: "Aura Punks",
    isListed: true,
    rarity: "Legendary",
    attributes: [
      { trait_type: "Background", value: "Purple Void" },
      { trait_type: "Eyes", value: "Laser" },
      { trait_type: "Hat", value: "Crown" }
    ]
  },
  {
    id: "2",
    name: "Cosmic Crystal #1", 
    image: "https://via.placeholder.com/300x300/a855f7/ffffff?text=Cosmic+Crystal+%231",
    price: 3.8,
    currency: "ETH",
    collection: "Cosmic Crystals",
    isListed: true,
    rarity: "Epic",
    attributes: [
      { trait_type: "Type", value: "Amethyst" },
      { trait_type: "Size", value: "Large" },
      { trait_type: "Energy", value: "Infinite" }
    ]
  },
  {
    id: "3",
    name: "Digital Degen #100",
    image: "https://via.placeholder.com/300x300/c084fc/ffffff?text=Digital+Degen+%23100",
    price: 1.5,
    currency: "ETH",
    collection: "Digital Degens",
    isListed: true,
    rarity: "Rare",
    attributes: [
      { trait_type: "Hands", value: "Diamond" },
      { trait_type: "Mindset", value: "HODL" },
      { trait_type: "Power Level", value: "9000+" }
    ]
  },
  {
    id: "4",
    name: "Aura Punk #42",
    image: "https://via.placeholder.com/300x300/9333ea/ffffff?text=Aura+Punk+%2342",
    price: 2.5,
    currency: "ETH",
    collection: "Aura Punks",
    isListed: true,
    rarity: "Epic",
    attributes: [
      { trait_type: "Background", value: "Galaxy" },
      { trait_type: "Eyes", value: "Cosmic" },
      { trait_type: "Accessory", value: "Time Crystal" }
    ]
  }
];

export default function NFT() {
  const [selectedTab, setSelectedTab] = useState("marketplace");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNFT, setSelectedNFT] = useState<NFTItem | null>(null);

  const stats = {
    totalVolume: "260.5 ETH",
    floorPrice: "0.5 ETH",
    totalSales: "1,247",
    activeListings: "3,892"
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case "Legendary": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Epic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Rare": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-aura-50/20 to-background pt-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover, collect, and trade unique digital assets on Auraswap</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-aura-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{stats.totalVolume}</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </CardContent>
          </Card>
          <Card className="border-aura-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{stats.floorPrice}</div>
              <div className="text-sm text-muted-foreground">Floor Price</div>
            </CardContent>
          </Card>
          <Card className="border-aura-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{stats.totalSales}</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </CardContent>
          </Card>
          <Card className="border-aura-100 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">{stats.activeListings}</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-aura-100 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search NFTs, collections..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" className="border-aura-200 text-aura-700 hover:bg-aura-50">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* NFT Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockNFTs.map((nft) => (
                <Card key={nft.id} className="border-aura-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-aura-50">
                        <img 
                          src={nft.image} 
                          alt={nft.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 bg-white/80 hover:bg-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {nft.rarity && (
                        <Badge className={`absolute top-2 left-2 ${getRarityColor(nft.rarity)}`}>
                          {nft.rarity}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{nft.name}</h3>
                        <p className="text-sm text-muted-foreground">{nft.collection}</p>
                      </div>
                      
                      {nft.isListed && nft.price && (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">Price</p>
                            <p className="font-bold text-lg">{nft.price} {nft.currency}</p>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white"
                                onClick={() => setSelectedNFT(nft)}
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Buy
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Purchase NFT</DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to buy "{nft.name}" for {nft.price} {nft.currency}?
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline">Cancel</Button>
                                <Button className="bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white">
                                  Confirm Purchase
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="collections" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCollections.map((collection) => (
                <Card key={collection.id} className="border-aura-100 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-aura-50">
                        <img 
                          src={collection.image} 
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{collection.name}</h3>
                        <p className="text-sm text-muted-foreground">{collection.totalSupply.toLocaleString()} items</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Floor Price</p>
                        <p className="font-semibold">{collection.floorPrice} ETH</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Volume 24h</p>
                        <p className="font-semibold">{collection.volume24h} ETH</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Owners</p>
                        <p className="font-semibold">{collection.owners.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Total Supply</p>
                        <p className="font-semibold">{collection.totalSupply.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4 bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Collection
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card className="border-aura-100 bg-white/80 backdrop-blur-sm max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-aura-600" />
                  Create NFT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <div className="border-2 border-dashed border-aura-200 rounded-lg p-8 text-center">
                    <Image className="h-12 w-12 mx-auto text-aura-400 mb-4" />
                    <p className="text-muted-foreground">Drop your image here or click to browse</p>
                    <Button variant="outline" className="mt-4 border-aura-200 text-aura-700 hover:bg-aura-50">
                      Choose File
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="NFT Name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Collection</Label>
                    <Input placeholder="Collection Name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Description</Label>
                  <textarea 
                    className="w-full p-3 border border-input rounded-md bg-background text-sm"
                    rows={4}
                    placeholder="Describe your NFT..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Properties</Label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Trait type" />
                      <Input placeholder="Value" />
                    </div>
                    <Button variant="outline" size="sm" className="border-aura-200 text-aura-700 hover:bg-aura-50">
                      Add Property
                    </Button>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white font-semibold"
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Create NFT
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
