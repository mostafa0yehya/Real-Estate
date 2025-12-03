export interface PropertyMoreDetails {
  address: Address;
  addressId: any;
  affordableBuyingScheme: boolean;
  aiLocationInfo: any;
  bathrooms: number;
  bedrooms: number;
  broadband: Broadband;
  brochures: Brochure[];
  businessForSale: boolean;
  channel: string;
  commercial: boolean;
  commercialUseClasses: any[];
  contactInfo: ContactInfo;
  countryGuide: any;
  customer: Customer;
  dfpAdInfo: DfpAdInfo;
  encId: any;
  entranceFloor: any;
  epcGraphs: EpcGraph[];
  features: Features;
  feesApply: any;
  floorplans: Floorplan[];
  id: string;
  images: Image[];
  industryAffiliations: any[];
  infoReelItems: InfoReelItem[];
  keyFeatures: string[];
  lettings: any;
  listingHistory: ListingHistory;
  livingCosts: LivingCosts;
  location: Location;
  misInfo: MisInfo;
  mortgageCalculator: MortgageCalculator;
  nearestAirports: any[];
  nearestStations: NearestStation[];
  prices: Prices;
  propertySubType: string;
  propertyUrls: PropertyUrls;
  reviews: any;
  rooms: any[];
  sharedOwnership: SharedOwnership;
  showSchoolInfo: boolean;
  sizings: any[];
  soldPropertyType: string;
  staticMapImgUrls: StaticMapImgUrls;
  status: Status;
  streetView: StreetView;
  tags: any[];
  tenure: Tenure;
  termsOfUse: string;
  text: Text;
  transactionType: string;
  virtualTours: any[];
}

export interface Address {
  countryCode: string;
  deliveryPointId: any;
  displayAddress: string;
  incode: string;
  outcode: string;
  ukCountry: string;
}

export interface Broadband {
  broadbandCheckerUrl: string;
  disclaimer: string;
}

export interface Brochure {
  caption: string;
  url: string;
}

export interface ContactInfo {
  contactMethod: string;
  telephoneNumbers: TelephoneNumbers;
}

export interface TelephoneNumbers {
  disclaimerDescription: any;
  disclaimerText: any;
  disclaimerTitle: any;
  internationalNumber: any;
  localNumber: string;
}

export interface Customer {
  bannerAd: any;
  branchDisplayName: string;
  branchId: number;
  branchName: string;
  buildToRent: boolean;
  buildToRentBenefits: any[];
  commercial: boolean;
  companyName: string;
  companyTradingName: string;
  customerBannerAdProfileUrl: string;
  customerDescription: CustomerDescription;
  customerMpuAdProfileUrl: string;
  customerProfileUrl: string;
  customerPropertiesUrl: string;
  developmentInfo: DevelopmentInfo;
  displayAddress: string;
  isNewHomeDeveloper: boolean;
  logoPath: string;
  mpuAd: any;
  products: Products;
  showBrochureLeadModal: boolean;
  spotlight: any;
  valuationFormUrl: string;
  videoEnabled: boolean;
  videoUrl: any;
}

export interface CustomerDescription {
  descriptionHTML: string;
  isTruncated: boolean;
  truncatedDescriptionHTML: string;
}

export interface DevelopmentInfo {
  micrositeFeatures: any[];
  sitePlanUri: any;
}

export interface Products {
  hasMicrosite: boolean;
}

export interface DfpAdInfo {
  channel: string;
  targeting: Targeting[];
}

export interface Targeting {
  key: string;
  value: string[];
}

export interface EpcGraph {
  caption: string;
  url: string;
}

export interface Features {
  accessibility: any[];
  broadband: any[];
  electricity: any[];
  garden: any[];
  heating: any[];
  obligations: Obligations;
  parking: Parking[];
  risks: Risks;
  sewerage: any[];
  water: any[];
}

export interface Obligations {
  listed: any;
  requiredAccess: any;
  restrictions: any;
  rightsOfWay: any;
}

export interface Parking {
  alias: string;
  displayText: string;
}

export interface Risks {
  floodDefences: any;
  floodSources: any[];
  floodedInLastFiveYears: any;
}

export interface Floorplan {
  caption: string;
  resizedFloorplanUrls: ResizedFloorplanUrls;
  type: string;
  url: string;
}

export interface ResizedFloorplanUrls {
  size296x197: string;
}

export interface Image {
  caption: any;
  resizedImageUrls: ResizedImageUrls;
  url: string;
}

export interface ResizedImageUrls {
  size135x100: string;
  size476x317: string;
  size656x437: string;
}

export interface InfoReelItem {
  primaryText: string;
  secondaryText: string;
  title: string;
  tooltipText: string;
  type: string;
}

export interface ListingHistory {
  listingUpdateReason: string;
}

export interface LivingCosts {
  annualGroundRent: any;
  annualServiceCharge: any;
  councilTaxBand: any;
  councilTaxExempt: boolean;
  councilTaxIncluded: boolean;
  domesticRates: any;
  groundRentPercentageIncrease: any;
  groundRentReviewPeriodInYears: any;
}

export interface Location {
  circleRadiusOnMap: number;
  latitude: number;
  longitude: number;
  pinType: string;
  showMap: boolean;
  zoomLevel: number;
}

export interface MisInfo {
  branchId: number;
  brandPlus: boolean;
  featuredProperty: boolean;
  offerAdvertStampTypeId: any;
  premiumDisplay: boolean;
  premiumDisplayStampId: any;
}

export interface MortgageCalculator {
  price: number;
  propertyTypeAlias: string;
}

export interface NearestStation {
  distance: number;
  name: string;
  types: string[];
  unit: string;
}

export interface Prices {
  displayPriceQualifier: string;
  exchangeRate: any;
  message: any;
  pricePerSqFt: any;
  primaryPrice: string;
  secondaryPrice: any;
}

export interface PropertyUrls {
  nearbySoldPropertiesUrl: string;
  similarPropertiesUrl: string;
}

export interface SharedOwnership {
  ownershipPercentage: any;
  rentFrequency: string;
  rentPrice: any;
  sharedOwnershipFlag: boolean;
}

export interface StaticMapImgUrls {
  staticMapImgUrlDesktopLarge: string;
  staticMapImgUrlDesktopSmall: string;
  staticMapImgUrlMobile: string;
  staticMapImgUrlTablet: string;
}

export interface Status {
  archived: boolean;
  published: boolean;
}

export interface StreetView {
  heading: number;
  latitude: number;
  longitude: number;
  pitch: number;
  zoom: number;
}

export interface Tenure {
  message: any;
  tenureType: string;
  yearsRemainingOnLease: any;
}

export interface Text {
  auctionFeesDisclaimer: any;
  description: string;
  disclaimer: string;
  guidePriceDisclaimer: any;
  newHomesBrochureDisclaimer: string;
  pageTitle: string;
  propertyPhrase: string;
  reservePriceDisclaimer: any;
  shareDescription: string;
  shareText: string;
  shortDescription: string;
  staticMapDisclaimerText: string;
}
