import { propertyDetails } from './property-details';

export interface Cities {
  name: string;
  data?: propertyDetails[] | null;
  code: string;
}
