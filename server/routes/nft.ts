import { RequestHandler } from "express";
import { NFT, NFTCollection, ListNFTRequest, BuyNFTRequest, CreateNFTRequest } from "@shared/api";

// Mock NFT collections
const nftCollections: NFTCollection[] = [
  {
    id: "aura-punks",
    name: "Aura Punks",
    description: "10,000 unique collectible Aura Punks with proof of ownership stored on the blockchain",
    image: "https://via.placeholder.com/400x400/9333ea/ffffff?text=Aura+Punks",
    contractAddress: "0x1234567890123456789012345678901234567890",
    creator: "0xc4305Bb6e927a4b8d5f0a9a5B8f0eBC7a8C0dD85",
    totalSupply: 10000,
    floorPrice: 0.5,
    volume24h: 125.8,
    owners: 3450
  },
  {
    id: "cosmic-crystals",
    name: "Cosmic Crystals", 
    description: "Rare crystalline formations from the depths of space, each with unique properties",
    image: "https://via.placeholder.com/400x400/a855f7/ffffff?text=Cosmic+Crystals",
    contractAddress: "0x2345678901234567890123456789012345678901",
    creator: "0xd5416Cc7f038b5c9e6f1b9b6C9f1fCD8b9D1eE96",
    totalSupply: 5000,
    floorPrice: 1.2,
    volume24h: 89.5,
    owners: 2890
  },
  {
    id: "digital-degens",
    name: "Digital Degens",
    description: "Community-driven collection of digital art celebrating DeFi culture",
    image: "https://via.placeholder.com/400x400/c084fc/ffffff?text=Digital+Degens",
    contractAddress: "0x3456789012345678901234567890123456789012", 
    creator: "0xe6527DD8g149c6d0f7g2c0c7D0g2gDE9c0E2fF07",
    totalSupply: 3333,
    floorPrice: 0.8,
    volume24h: 45.2,
    owners: 1995
  }
];

// Mock NFTs
const nfts: NFT[] = [
  {
    id: "nft_1",
    tokenId: "1",
    contractAddress: "0x1234567890123456789012345678901234567890",
    name: "Aura Punk #1",
    description: "The first and most legendary Aura Punk",
    image: "https://via.placeholder.com/400x400/9333ea/ffffff?text=Aura+Punk+%231",
    attributes: [
      { trait_type: "Background", value: "Purple Void" },
      { trait_type: "Eyes", value: "Laser" },
      { trait_type: "Hat", value: "Crown" },
      { trait_type: "Rarity", value: "Legendary" }
    ],
    owner: "0x742d35Cc6647C0532d07dFD87C1e8F164d3D2c70",
    creator: "0xc4305Bb6e927a4b8d5f0a9a5B8f0eBC7a8C0dD85",
    price: 5.0,
    currency: "ETH",
    isListed: true,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z"
  },
  {
    id: "nft_2",
    tokenId: "42",
    contractAddress: "0x1234567890123456789012345678901234567890",
    name: "Aura Punk #42",
    description: "A rare Aura Punk with cosmic properties",
    image: "https://via.placeholder.com/400x400/9333ea/ffffff?text=Aura+Punk+%2342",
    attributes: [
      { trait_type: "Background", value: "Galaxy" },
      { trait_type: "Eyes", value: "Cosmic" },
      { trait_type: "Accessory", value: "Time Crystal" },
      { trait_type: "Rarity", value: "Epic" }
    ],
    owner: "0x853e46Dd7657D3544e0b08eF88C3f8e6F175c3eE1",
    creator: "0xc4305Bb6e927a4b8d5f0a9a5B8f0eBC7a8C0dD85",
    price: 2.5,
    currency: "ETH",
    isListed: true,
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-21T11:20:00Z"
  },
  {
    id: "nft_3",
    tokenId: "1",
    contractAddress: "0x2345678901234567890123456789012345678901",
    name: "Cosmic Crystal #1",
    description: "A pristine amethyst formation with infinite energy",
    image: "https://via.placeholder.com/400x400/a855f7/ffffff?text=Cosmic+Crystal+%231",
    attributes: [
      { trait_type: "Type", value: "Amethyst" },
      { trait_type: "Size", value: "Large" },
      { trait_type: "Energy", value: "Infinite" },
      { trait_type: "Origin", value: "Andromeda" }
    ],
    owner: "0x964f57Ee8768E4556f1c04eF98D4f9e7G286d4fF2",
    creator: "0xd5416Cc7f038b5c9e6f1b9b6C9f1fCD8b9D1eE96",
    price: 3.8,
    currency: "ETH",
    isListed: true,
    createdAt: "2024-01-17T13:45:00Z",
    updatedAt: "2024-01-22T16:30:00Z"
  },
  {
    id: "nft_4",
    tokenId: "100",
    contractAddress: "0x3456789012345678901234567890123456789012",
    name: "Digital Degen #100",
    description: "Diamond hands since 2009",
    image: "https://via.placeholder.com/400x400/c084fc/ffffff?text=Digital+Degen+%23100",
    attributes: [
      { trait_type: "Hands", value: "Diamond" },
      { trait_type: "Mindset", value: "HODL" },
      { trait_type: "Experience", value: "Veteran" },
      { trait_type: "Power Level", value: "9000+" }
    ],
    owner: "0x742d35Cc6647C0532d07dFD87C1e8F164d3D2c70",
    creator: "0xe6527DD8g149c6d0f7g2c0c7D0g2gDE9c0E2fF07",
    isListed: false,
    currency: "ETH",
    createdAt: "2024-01-18T08:20:00Z",
    updatedAt: "2024-01-18T08:20:00Z"
  }
];

export const getNFTCollections: RequestHandler = (req, res) => {
  try {
    res.json(nftCollections);
  } catch (error) {
    console.error("Get NFT collections error:", error);
    res.status(500).json({
      error: "Failed to fetch NFT collections"
    });
  }
};

export const getNFTCollection: RequestHandler = (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = nftCollections.find(c => c.id === collectionId);
    
    if (!collection) {
      return res.status(404).json({
        error: "Collection not found"
      });
    }

    // Get NFTs in this collection
    const collectionNFTs = nfts.filter(nft => {
      const nftCollection = nftCollections.find(c => c.contractAddress === nft.contractAddress);
      return nftCollection?.id === collectionId;
    });

    res.json({
      ...collection,
      nfts: collectionNFTs
    });
  } catch (error) {
    console.error("Get NFT collection error:", error);
    res.status(500).json({
      error: "Failed to fetch NFT collection"
    });
  }
};

export const getNFTs: RequestHandler = (req, res) => {
  try {
    const { listed, owner, collection } = req.query;
    
    let filteredNFTs = [...nfts];

    // Filter by listing status
    if (listed === 'true') {
      filteredNFTs = filteredNFTs.filter(nft => nft.isListed);
    } else if (listed === 'false') {
      filteredNFTs = filteredNFTs.filter(nft => !nft.isListed);
    }

    // Filter by owner
    if (owner && typeof owner === 'string') {
      filteredNFTs = filteredNFTs.filter(nft => 
        nft.owner.toLowerCase() === owner.toLowerCase()
      );
    }

    // Filter by collection
    if (collection && typeof collection === 'string') {
      const targetCollection = nftCollections.find(c => c.id === collection);
      if (targetCollection) {
        filteredNFTs = filteredNFTs.filter(nft => 
          nft.contractAddress === targetCollection.contractAddress
        );
      }
    }

    res.json(filteredNFTs);
  } catch (error) {
    console.error("Get NFTs error:", error);
    res.status(500).json({
      error: "Failed to fetch NFTs"
    });
  }
};

export const getNFT: RequestHandler = (req, res) => {
  try {
    const { nftId } = req.params;
    const nft = nfts.find(n => n.id === nftId);
    
    if (!nft) {
      return res.status(404).json({
        error: "NFT not found"
      });
    }

    // Add collection info
    const collection = nftCollections.find(c => c.contractAddress === nft.contractAddress);

    res.json({
      ...nft,
      collection: collection ? {
        id: collection.id,
        name: collection.name,
        floorPrice: collection.floorPrice
      } : null
    });
  } catch (error) {
    console.error("Get NFT error:", error);
    res.status(500).json({
      error: "Failed to fetch NFT"
    });
  }
};

export const listNFT: RequestHandler = (req, res) => {
  try {
    const { tokenId, contractAddress, price, currency, userAddress }: ListNFTRequest = req.body;

    if (!tokenId || !contractAddress || !price || !currency || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    const nft = nfts.find(n => 
      n.tokenId === tokenId && 
      n.contractAddress === contractAddress &&
      n.owner.toLowerCase() === userAddress.toLowerCase()
    );

    if (!nft) {
      return res.status(404).json({
        success: false,
        error: "NFT not found or not owned by user"
      });
    }

    if (nft.isListed) {
      return res.status(400).json({
        success: false,
        error: "NFT is already listed"
      });
    }

    // Update NFT listing
    nft.price = price;
    nft.currency = currency;
    nft.isListed = true;
    nft.updatedAt = new Date().toISOString();

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    res.json({
      success: true,
      transactionHash,
      nft: nft
    });
  } catch (error) {
    console.error("List NFT error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const buyNFT: RequestHandler = (req, res) => {
  try {
    const { nftId, userAddress }: BuyNFTRequest = req.body;

    if (!nftId || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    const nft = nfts.find(n => n.id === nftId);

    if (!nft) {
      return res.status(404).json({
        success: false,
        error: "NFT not found"
      });
    }

    if (!nft.isListed || !nft.price) {
      return res.status(400).json({
        success: false,
        error: "NFT is not listed for sale"
      });
    }

    if (nft.owner.toLowerCase() === userAddress.toLowerCase()) {
      return res.status(400).json({
        success: false,
        error: "Cannot buy your own NFT"
      });
    }

    const previousOwner = nft.owner;
    const salePrice = nft.price;

    // Update NFT ownership
    nft.owner = userAddress;
    nft.isListed = false;
    nft.price = undefined;
    nft.updatedAt = new Date().toISOString();

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    res.json({
      success: true,
      transactionHash,
      nft: nft,
      salePrice,
      previousOwner
    });
  } catch (error) {
    console.error("Buy NFT error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const createNFT: RequestHandler = (req, res) => {
  try {
    const { name, description, image, attributes, userAddress }: CreateNFTRequest = req.body;

    if (!name || !description || !image || !userAddress) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters"
      });
    }

    // For demo purposes, we'll create in the first collection
    const collection = nftCollections[0];
    const newTokenId = (nfts.length + 1).toString();

    const newNFT: NFT = {
      id: `nft_${Date.now()}`,
      tokenId: newTokenId,
      contractAddress: collection.contractAddress,
      name,
      description,
      image,
      attributes: attributes || [],
      owner: userAddress,
      creator: userAddress,
      isListed: false,
      currency: "ETH",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    nfts.push(newNFT);

    // Update collection total supply
    collection.totalSupply += 1;

    const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;

    res.json({
      success: true,
      transactionHash,
      nft: newNFT
    });
  } catch (error) {
    console.error("Create NFT error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
};

export const getUserNFTs: RequestHandler = (req, res) => {
  try {
    const { userAddress } = req.params;
    const userNFTs = nfts.filter(nft => 
      nft.owner.toLowerCase() === userAddress.toLowerCase()
    );

    // Enrich with collection data
    const enrichedNFTs = userNFTs.map(nft => {
      const collection = nftCollections.find(c => c.contractAddress === nft.contractAddress);
      return {
        ...nft,
        collection: collection ? {
          id: collection.id,
          name: collection.name,
          floorPrice: collection.floorPrice
        } : null
      };
    });

    res.json(enrichedNFTs);
  } catch (error) {
    console.error("Get user NFTs error:", error);
    res.status(500).json({
      error: "Failed to fetch user NFTs"
    });
  }
};

export const getMarketplaceStats: RequestHandler = (req, res) => {
  try {
    const totalCollections = nftCollections.length;
    const totalNFTs = nfts.length;
    const totalVolume = nftCollections.reduce((sum, col) => sum + col.volume24h, 0);
    const avgPrice = nfts
      .filter(nft => nft.isListed && nft.price)
      .reduce((sum, nft) => sum + (nft.price || 0), 0) / 
      nfts.filter(nft => nft.isListed && nft.price).length;

    const stats = {
      totalCollections,
      totalNFTs,
      totalVolume24h: totalVolume.toFixed(2) + " ETH",
      avgPrice: avgPrice.toFixed(3) + " ETH",
      activeListings: nfts.filter(nft => nft.isListed).length
    };

    res.json(stats);
  } catch (error) {
    console.error("Get marketplace stats error:", error);
    res.status(500).json({
      error: "Failed to fetch marketplace stats"
    });
  }
};
