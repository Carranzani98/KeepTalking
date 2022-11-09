export interface Language {
  code: string
  language_name: string
}
export interface LanguagesResponse extends Response {
  data: Language[]
}
