export interface Language {
  id: string
  code: string
  language_name: string
}
export interface LanguagesResponse extends Response {
  data: Language[]
}
