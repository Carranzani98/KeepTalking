export interface Country {
  id: string
  code: string
  country: string
}
export interface CountriesResponse extends Response {
  data: Country[]
}
