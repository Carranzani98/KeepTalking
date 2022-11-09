export interface Country {
  code: string
  country: string
}
export interface CountriesResponse extends Response {
  data: Country[]
}
