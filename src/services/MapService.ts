import {
  Client,
  DistanceMatrixRequest,
  UnitSystem,
  TravelMode,
  TransitMode,
  GeocodeRequest,
  LatLngLiteral,
  DistanceMatrixResponse,
}
from "@googlemaps/google-maps-services-js"

export class MapService {

  private client;

  constructor() {
    this.client = new Client({})
  }

  async getGeocodeLocation(address: string): Promise<LatLngLiteral> {
    const params_: GeocodeRequest = {
      params: {
        address: address,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      }
    }
    const response = await this.client.geocode(params_)
    return response.data.results[0].geometry.location
  }

  async getDistanceMatrix(origins: string, destinations: string): Promise<DistanceMatrixResponse> {
    const params_: DistanceMatrixRequest = {
      params: {
        origins: [origins],
        destinations: [destinations],
        units: UnitSystem.metric,
        mode: TravelMode.transit,
        transit_mode: [TransitMode.train, TransitMode.bus],
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
      }
    }
    const response = await this.client.distancematrix(params_)
    return response
  }

}