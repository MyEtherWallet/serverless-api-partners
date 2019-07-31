export default {
  contracts: [
    {
      title: 'CryptoKitties',
      itemName: 'Kitties',
      contractAddress: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
      metadataAddress: 'https://api.cryptokitties.co/kitties/',
      directImage: true,
      imageKey: 'image_url',
      ERC721Extension: false,
      ERC721Metadata: true,
      nonStandard: true
    },
    {
      title: 'CryptoFlowers',
      itemName: 'Flowers',
      contractAddress: '0x8bc67d00253fd60b1afcce88b78820413139f4c6',
      metadataAddress: 'https://cryptoflowers.io/v/',
      imageKey: 'image',
      ERC721Extension: true,
      ERC721Metadata: true,
      nonStandard: false
    },
    {
      title: 'Gods Unchained',
      itemName: 'Cards',
      contractAddress: '0x6EbeAf8e8E946F0716E6533A6f2cefc83f60e8Ab',
      metadataAddress: 'https://api.godsunchained.com/card/',
      imageKey: 'image',
      ERC721Extension: true,
      ERC721Metadata: true,
      nonStandard: false
    },
    // socket Error: socket hang up when trying to get images
    // {
    //   title: 'MyCryptoHeros: Hero',
    //   contractAddress: '0x273f7f8e6489682df756151f5525576e322d51a3',
    //   metadataAddress: 'https://www.mycryptoheroes.net/metadata/hero/',
    //   imageKey: 'image',
    //   ERC721Extension: true,
    //   ERC721Metadata: true,
    //   nonStandard: false
    // },
    // {
    //   title: 'MyCryptoHeros: Extension',
    //   contractAddress: '0xdceaf1652a131F32a821468Dc03A92df0edd86Ea',
    //   metadataAddress: 'https://www.mycryptoheroes.net/metadata/Extension/',
    //   imageKey: 'image',
    //   ERC721Extension: true,
    //   ERC721Metadata: true,
    //   nonStandard: false
    // },
    {
      title: 'etheremon',
      contractAddress: '0x5d00d312e171be5342067c09bae883f9bcb2003b',
      metadataAddress: 'https://www.etheremon.com/api/monster/get_data?monster_ids=',
      depth: 2,
      keys: ['data', '@tokenvalue@'],
      imageKey: 'image',
      ERC721Extension: false,
      ERC721Metadata: true,
      nonStandard: false
    },
    {
      title: 'CryptoSkulls',
      contractAddress: '0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9',
      metadataAddress: 'https://www.etheremon.com/api/monster/get_data?monster_ids=',
      depth: 2,
      keys: ['data', '@tokenvalue@'],
      imageKey: 'image',
      ERC721Extension: false,
      ERC721Metadata: true,
      nonStandard: false
    }
  ]
};