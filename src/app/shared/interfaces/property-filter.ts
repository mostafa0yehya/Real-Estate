export interface PropertyFilter {
  identifier: string; // Required

  page?: number; // optional
  sort_by?: SortBy;
  search_radius?:
    | '0.0'
    | '0.25'
    | '0.5'
    | '1.0'
    | '3.0'
    | '5.0'
    | '10.0'
    | '15.0'
    | '20.0'
    | '30.0'
    | '40.0'
    | string;

  min_price?: number;
  max_price?: number;
  min_bedroom?: number;
  max_bedroom?: number;

  property_type?: string;

  added_to_site?: '1' | string;

  has_garden?: boolean;
  has_buying_schemes?: boolean;
  has_parking?: boolean;
  has_retirement_home?: boolean;
  has_auction_property?: boolean;
  has_include_under_offer_sold_stc?: boolean;
  do_not_show_buying_schemes?: boolean;
  do_not_show_retirement_home?: boolean;

  keywords?: string;
}
enum SortBy {
  HighestPrice,
  LowestPrice,
  NewestListed,
  OldestListed,
  NearestFirst,
}
