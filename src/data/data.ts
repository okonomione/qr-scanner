export enum ListingStatusEnum {
  Unknown = 0,
  Draft = 1,
  Published = 2,
}

export interface SelectPayload<T> {
  data: T;
  isLoading: boolean;
}

export interface ISearchResultItem {
  id: string;
  userId: string;
  cardId: number;
  cardType: string;
  weaknessType: string;
  resistType: string;
  evolutionStage: string;
  imageSrc: string[] | undefined;
  buyItNowPrice?: number;
  illustrator: string;
  price: number;
  saleType?: string;
  series: string;
  set: string;
  releaseDate: string;
  grading: number;
  graded: string;
  rarity: string;
  language: string;
  title: string;
  type1: string;
  type2: null;
  seller: string;
  year: number;
  brand: string;
  number: number;
  name: string;
  imageList: {path: string}[];
  shippingType: string;
  internationalShippingCharge: number;
  domesticShippingCharge: number;
  sellerAvatar: string;
  paymentUserName: string;
  purchaseDate: Date;
  tags: string[];
  listingType: ListingType;
  locality: string;
  location: string;
  country: string;
  postCode: string;
  region: string;
  shipFrom: string;
  shippingCost: number;
}

export enum ListingType {
  singleCard = 'singleCard',
  mixedBundle = 'bundleSingle',
  bundleSealed = 'bundleSealed',
  sealedSingle = 'sealedSingle',
  unknown = 'unknown',
}

export interface Grade {
  company: string;
  name: string;
  value: number;
  label?: string;
  title: string;
  children?: Array<Grade>;
  subgrades?: ISubgrade;
  description?: string;
  active?: boolean;
  selected?: boolean;
}

export interface ISubgrade {
  Centering?: number;
  Edges?: number;
  Corners?: number;
  Surface?: number;
}

export interface ICardGrade {
  grade: Grade;
  otherGradingCompany?: string;
  selfAssessment?: string;
  hasSubgrades?: boolean;
}

export enum ShippingChargeType {
  freePostage = 'Free Postage',
  chargePostage = 'Charge Postage',
}
export enum ShippingType {
  domestic = 'Domestic',
  domesticInternational = 'Domestic & International',
}

export interface IShipping {
  shippingType?: ShippingType;
  shippingChargeType?: ShippingChargeType;
  internationalShippingCharge?: number;
  domesticShippingCharge?: number;
  address?: AddressSearchResult;
}

export interface AddressSearchResult {
  postcode?: string;
  country?: string;
  locality?: string;
  street?: string;
  streetNumber?: string;
  state?: string;
  fullAddress?: string;
  cityTown?: string;
  latitude?: number;
  longitude?: number;
  timeOffset?: number;
}

export enum ConditionType {
  'Graded' = 'Graded',
  'Ungraded' = 'Ungraded',
  'Unknown' = 'Unknown',
}

export interface CSFile {
  file?: File;
  name?: string;
  path?: string;
}

export interface IImage {
  [key: string]: CSFile;
}
export interface IListing {
  title: string;
  id: string;
  userId: string;
  countryCode: string;
  accessToken?: string;
  listingStatus?: ListingStatusEnum;
  listingType?: string;
  description: string;
  offer: string;
  imageList: any;
  buyItNowPrice: string;
  graded: ConditionType;
  shipping: IShipping;
  card: ICard;
  cardType: string;
  weaknessType: string;
  resistType: string;
  evolutionStage: string;
  setCode: string;
  illustrator: string;
  rarity: string;
  elementType: string;
  price: number;
  name: string;
  number: string;
  series: string;
  set: string;
  grade: ICardGrade;
  images: IImage;
  imageSrc?: string[];
  id_token?: string;
  currentStep?: string;
  emailAddress?: string;
  feeTable?: IFeeTable;
  sellerAvatar?: string;
  canBePaid?: boolean;
  purchaseDate?: Date;
  paymentUserName: string;
  tags: string[];
  locality: string;
  location: string;
  country: string;
  postCode: string;
  region: string;
  latitude: string;
  longitude: string;
  timeOffset: number;
}

export interface IFeeTable {
  buyersProtection: string;
  countryCode: string;
  salesTaxRate: string;
  salesTaxAmount: number;
  midnightMerchantFee: number;
  pGCommissionPercent: string;
  pgCommissionAmount: number;
  pgFixedFee: number;
  pgTotal: number;
  internationalShippingAmount: number;
  domesticShippingAmount: number;
  totalInternationalBuyer: number;
  totalLocalBuyer: number;
  totalFeesAndTax: number;
  totalFees: number;
  soldAmount: number;
}

export interface ICard {
  id: string;
  cardId: string;
  name: string;
  number: string;
  cardNumberValue: number;
  cardNumberValue2: string;
  imageSrc: string[];
  series: string;
  set: string;
  rarity: string;
  elementType: string;
  cardType: string;
  releaseDate: string;
  setCode: string;
  illustrator: string;
  abilityName1: string;
  abilityDescription1?: string;
  abilityAmount1?: string | null;
  abilityType1?: string | null;
  abilityName2?: string | null;
  abilityDescription2?: string | null;
  abilityAmount2?: string | null;
  abilityType2?: string | null;
  abilityName3?: string | null;
  abilityDescription3?: string | null;
  abilityAmount3?: string | null;
  abilityType3?: string | null;
  abilityName4?: string | null;
  abilityDescription4?: string | null;
  abilityAmount4?: string | null;
  abilityType4?: string | null;
  weaknessType: string | null;
  weaknessName: string | null;
  weaknessAmount: number;
  resistType: string | null;
  resistAmount: string;
  evolutionStage: string | null;
  hitpoints: number;
  pokemon: string;
  defaultImage?: boolean;
  pokemonTag: string | null;
  resistDescription: string | null;
  selected: boolean;
}

export const appData: ISearchResultItem[] = [
  {
    name: 'Charizard',
    id: '1',
    userId: '1',
    cardId: 1,
    cardType: 'Pokemon',
    weaknessType: 'Water',
    resistType: 'Fire',
    evolutionStage: 'Stage 2',
    imageSrc: [
      'https://images.okonomi.one/userImages/thumbnails/front-1a57395f-b1b4-4692-a5fd-9a37a55b08de-2f14a3f4-64cd-4de8-a85f-375a08d977aa.jpeg',
    ],
    illustrator: 'Mitsuhiro Arita',
    price: 100,
    buyItNowPrice: 100,
    saleType: 'Buy It Now',
    series: 'Base',
    set: 'Base Set',
    releaseDate: '1999/01/09',
    grading: 10,
    graded: 'PSA',
    rarity: 'Rare Holo',
    language: 'English',
    title: 'Charizard',
    type1: 'Fire',
    type2: null,
    seller: 'Seller',
    year: 1999,
    brand: 'Pokemon',
    number: 4,
    imageList: [],
    shippingType: 'Domestic',
    internationalShippingCharge: 10,
    domesticShippingCharge: 5,
    sellerAvatar: 'https://images.pokemontcg.io/base1/4.png',
    paymentUserName: 'Seller',
    purchaseDate: new Date(),
    tags: ['Pokemon', 'Charizard', 'Base Set'],
    listingType: ListingType.singleCard,
    locality: 'Melbourne',
    location: 'Melbourne',
    country: 'Australia',
    postCode: '3000',
    region: 'Victoria',
    shipFrom: 'Australia',
    shippingCost: 10,
  },
  {
    name: 'Blastoise',
    id: '2',
    userId: '1',
    cardId: 2,
    cardType: 'Pokemon',
    weaknessType: 'Grass',
    resistType: 'Fire',
    evolutionStage: 'Stage 2',
    imageSrc: [
      'https://images.okonomi.one/userImages/thumbnails/front-e1c189c9-a101-451a-bd54-65bff16ce437-3355c923-3eba-4d34-b6d1-8f95929d0225.jpeg',
    ],
    illustrator: 'Mitsuhiro Arita',
    price: 100,
    buyItNowPrice: 100,
    saleType: 'Buy It Now',
    series: 'Base',
    set: 'Base Set',
    releaseDate: '1999/01/09',
    grading: 10,
    graded: 'PSA',
    rarity: 'Rare Holo',
    language: 'English',
    title: 'Blastoise',
    type1: 'Water',
    type2: null,
    seller: 'Seller',
    year: 1999,
    brand: 'Pokemon',
    number: 2,
    imageList: [],
    shippingType: 'Domestic',
    internationalShippingCharge: 10,
    domesticShippingCharge: 5,
    sellerAvatar: 'https://images.pokemontcg.io/base1/2.png',
    paymentUserName: 'Seller',
    purchaseDate: new Date(),
    tags: ['Pokemon', 'Blastoise', 'Base Set'],
    listingType: ListingType.singleCard,
    locality: 'Melbourne',
    location: 'Melbourne',
    country: 'Australia',
    postCode: '3000',
    region: 'Victoria',
    shipFrom: 'Australia',
    shippingCost: 10,
  },
  {
    name: 'Venusaur',
    id: '3',
    userId: '1',
    cardId: 3,
    cardType: 'Pokemon',
    weaknessType: 'Fire',
    resistType: 'Water',
    evolutionStage: 'Stage 2',
    imageSrc: [
      'https://images.okonomi.one/userImages/thumbnails/front-ef134428-1065-4dbb-9c88-42047647a031-0bcfd21f-efaa-498b-aab8-09b31d3dc9b5.jpeg',
    ],
    illustrator: 'Mitsuhiro Arita',
    price: 100,
    buyItNowPrice: 100,
    saleType: 'Buy It Now',
    series: 'Base',
    set: 'Base Set',
    releaseDate: '1999/01/09',
    grading: 10,
    graded: 'PSA',
    rarity: 'Rare Holo',
    language: 'English',
    title: 'Venusaur',
    type1: 'Grass',
    type2: null,
    seller: 'Seller',
    year: 1999,
    brand: 'Pokemon',
    number: 15,
    imageList: [],
    shippingType: 'Domestic',
    internationalShippingCharge: 10,
    domesticShippingCharge: 5,
    sellerAvatar: 'https://images.pokemontcg.io/base1/15.png',
    paymentUserName: 'Seller',
    purchaseDate: new Date(),
    tags: ['Pokemon', 'Venusaur', 'Base Set'],
    listingType: ListingType.singleCard,
    locality: 'Melbourne',
    location: 'Melbourne',
    country: 'Australia',
    postCode: '3000',
    region: 'Victoria',
    shipFrom: 'Australia',
    shippingCost: 10,
  },
  {
    name: 'Pikachu',
    id: '4',
    userId: '1',
    cardId: 4,
    cardType: 'Pokemon',
    weaknessType: 'Fire',
    resistType: 'Water',
    evolutionStage: 'Basic',
    imageSrc: [
      'https://images.okonomi.one/userImages/thumbnails/front-6a4132aa-2651-4662-bf26-4d8d255a2a23-df9ab8f5-85c1-47cc-b873-2aabfd1b6ebb.jpeg',
    ],
    illustrator: 'Mitsuhiro Arita',
    price: 100,
    buyItNowPrice: 100,
    saleType: 'Buy It Now',
    series: 'Base',
    set: 'Base Set',
    releaseDate: '1999/01/09',
    grading: 10,
    graded: 'PSA',
    rarity: 'Rare Holo',
    language: 'English',
    title: 'Pikachu',
    type1: 'Lightning',
    type2: null,
    seller: 'Seller',
    year: 1999,
    brand: 'Pokemon',
    number: 58,
    imageList: [],
    shippingType: 'Domestic',
    internationalShippingCharge: 10,
    domesticShippingCharge: 5,
    sellerAvatar: 'https://images.pokemontcg.io/base1/58.png',
    paymentUserName: 'Seller',
    purchaseDate: new Date(),
    tags: ['Pokemon', 'Pikachu', 'Base Set'],
    listingType: ListingType.singleCard,
    locality: 'Melbourne',
    location: 'Melbourne',
    country: 'Australia',
    postCode: '3000',
    region: 'Victoria',
    shipFrom: 'Australia',
    shippingCost: 10,
  },
];
