export interface ArtifactType {
  id: number;
  artifact_type: string;
  parent_id: number | null;
}

export interface Period {
  id: number;
  sequence: number;
  period: string;
}

export interface Provenience {
  id: number;
  provenience: string;
  location_id: number;
  place_id: number;
  region_id: number;
}

export interface Material {
  id: number;
  material: string;
}

export interface Genre {
  id: number;
  genre: string;
}

export interface Language {
  id: number;
  sequence: number;
  language: string;
  inline_code: string;
}

export interface PublicationDetail {
  id: number;
  designation: string;
  bibtexkey: string;
  year: string;
  entry_type_id: number;
  address: string;
  number: string;
  publisher: string;
  title: string;
  series: string;
}

export interface CollectionDetail {
  id: number;
  collection: string;
  collection_url: string;
  collection_actor: string;
  collection_holding: string;
  collection_actor_status: string;
  collection_holding_status: string;
  country_iso: string;
  region_gadm: string;
  district_gadm: string;
  location_longitude_wgs1984: number;
  location_latitude_wgs1984: number;
  glow_id: number;
}

export interface ExternalResourceDetail {
  id: number;
  external_resource: string;
  base_url: string;
  project_url: string;
  abbrev: string;
}

export interface ArtifactPublication {
  id: number;
  entity_id: number;
  publication_id: number;
  exact_reference: string;
  publication_type: string;
  table_name: string;
  publication: PublicationDetail;
}

export interface ArtifactCollection {
  id: number;
  artifact_id: number;
  collection_id: number;
  collection: CollectionDetail;
}

export interface ArtifactExternalResource {
  id: number;
  artifact_id: number;
  external_resource_id: number;
  external_resource_key: string;
  external_resource: ExternalResourceDetail;
}

export interface Inscription {
  id: number;
  artifact_id: number;
  atf: string;
  transliteration?: string;
  transliteration_clean?: string;
  transliteration_for_search?: string;
  is_atf2conll_diff_resolved: boolean;
  is_latest: boolean;
}

export interface ArtifactComposite {
  id: number;
  composite_no: string;
  artifact_id: number;
  composite: {
    id: number;
    composite_no: string;
    designation: string;
    dates_referenced: string;
    artifact_comments: string;
    created_by: number;
    artifact_type_comments: string;
  };
}

export interface Artifact {
  id: number;
  designation: string;
  excavation_no: string | null;
  findspot_comments: string | null;
  findspot_square: string | null;
  museum_no: string | null;
  thickness: string | null;
  height: string | null;
  width: string | null;
  dates_referenced: string;
  created_by: number;
  
  // Direct Nested Objects
  inscription: Inscription;
  artifact_type: ArtifactType;
  period: Period;
  provenience: Provenience;

  // Arrays of Join Objects
  composites: ArtifactComposite[];
  publications: ArtifactPublication[];
  collections: ArtifactCollection[];
  external_resources: ArtifactExternalResource[];
  
  materials: Array<{
    id: number;
    artifact_id: number;
    material_id: number;
    material: Material;
  }>;
  
  languages: Array<{
    id: number;
    artifact_id: number;
    language_id: number;
    language: Language;
  }>;
  
  genres: Array<{
    id: number;
    artifact_id: number;
    genre_id: number;
    comments: string;
    genre: Genre;
  }>;

  // Empty arrays in sample - typed as any[] or unknown[] until data is known
  seals: any[];
  impressions: any[];
  witnesses: any[];
  material_colors: any[];
  material_aspects: any[];
  dates: any[];
}

// The API returns an array of these
export type ArtifactList = Artifact[];

export interface ArtifactsFetchResponse {
  artifacts: Artifact[];
  nextPage: number | undefined;
}

interface AuthorDetail {
  id: number;
  author: string; // Full name string
  last: string;
  first: string;
  orcid_id?: string;
  email?: string;
  institution?: string;
}
interface ArticleAuthor {
  id: number;
  article_id: number;
  author_id: number;
  sequence: number;
  email?: string;
  institution?: string;
  author: AuthorDetail;
}

export interface Article {
  id: number;
  title: string;
  article_type: 'cdlj' | 'cdlb' | string;
  created: string; // ISO Date string
  modified: string; // ISO Date string
  year: number;
  article_no: string;
  authors: ArticleAuthor[];
  content_html?: string; // Optional field
}

export interface ArticlesFetchResponse {
  articles: Article[];
  nextPage: number | undefined;
}