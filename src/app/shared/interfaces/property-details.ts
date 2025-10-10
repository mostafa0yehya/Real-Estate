export interface propertyDetails {
  addedOrReduced: string;
  auction: boolean;
  bathrooms: number;
  bedrooms: number;
  channel: string;
  commercial: boolean;
  contactUrl: string;
  countryCode: string;
  customer: Customer;
  development: boolean;
  displayAddress: string;
  displaySize: string;
  displayStatus: string;
  distance: any;
  enhancedListing: boolean;
  enquiredTimestamp: any;
  enquiryAddedTimestamp: any;
  enquiryCalledTimestamp: any;
  featuredProperty: boolean;
  feesApply: boolean;
  feesApplyText: any;
  firstVisibleDate: string;
  formattedBranchName: string;
  formattedDistance: string;
  hasBrandPlus: boolean;
  heading: string;
  hidden: boolean;
  id: number;
  isRecent: boolean;
  keywordMatchType: string;
  keywords: any[];
  listingUpdate: ListingUpdate;
  location: Location;
  lozengeModel: LozengeModel;
  numberOfFloorplans: number;
  numberOfImages: number;
  numberOfVirtualTours: number;
  onlineViewingsAvailable: boolean;
  premiumListing: boolean;
  price: Price;
  productLabel: ProductLabel;
  propertyImages: PropertyImages;
  propertySubType: string;
  propertyTypeFullDescription: string;
  propertyUrl: string;
  residential: boolean;
  saved: boolean;
  showOnMap: boolean;
  staticMapUrl: any;
  students: boolean;
  summary: string;
  transactionType: string;
}

export interface Customer {
  branchDisplayName: string;
  branchId: number;
  branchLandingPageUrl: string;
  branchName: string;
  brandPlusLogoURI: string;
  brandPlusLogoUrl: string;
  brandTradingName: string;
  buildToRent: boolean;
  buildToRentBenefits: any[];
  commercial: boolean;
  contactTelephone: string;
  development: boolean;
  developmentContent: any;
  enhancedListing: boolean;
  showOnMap: boolean;
  showReducedProperties: boolean;
}

export interface ListingUpdate {
  listingUpdateDate: string;
  listingUpdateReason: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LozengeModel {
  matchingLozenges: any[];
}

export interface Price {
  amount: number;
  currencyCode: string;
  displayPrices: DisplayPrice[];
  frequency: string;
}

export interface DisplayPrice {
  displayPrice: string;
  displayPriceQualifier: string;
}

export interface ProductLabel {
  productLabelText: any;
  spotlightLabel: boolean;
}

export interface PropertyImages {
  images: Image[];
  mainImageSrc: string;
  mainMapImageSrc: string;
}

export interface Image {
  caption: any;
  srcUrl: string;
  url: string;
}
