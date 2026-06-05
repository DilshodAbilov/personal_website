export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Skill {
  id: number;
  name: string;
  category: "backend" | "database" | "devops" | "tools" | "design" | "other";
  category_display: string;
  icon_url: string;
  proficiency_level: number;
  years_experience: string;
  order: number;
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Project {
  id: number;
  name: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  technologies: string[];
  github_url: string;
  demo_url: string;
  is_private: boolean;
  project_type: "pet" | "work" | "opensource";
  status: "active" | "completed" | "archived";
  is_featured: boolean;
  order: number;
  images: ProjectImage[];
  created_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  technologies: string[];
  responsibilities: string[];
  order: number;
}

export interface Category {
  id: number;
  name_uz: string;
  name_en: string;
  name_ru: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  slug: string;
  cover_image: string | null;
  category: Category | null;
  tags: Tag[];
  language: string;
  read_time: number;
  views_count: number;
  published_at: string | null;
  created_at: string;
}

export interface AcademicWork {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  abstract_uz: string;
  abstract_en: string;
  abstract_ru: string;
  work_type: string;
  work_type_display: string;
  year: number;
  language: string;
  keywords: string[];
  authors: string[];
  supervisor: string;
  file: string | null;
  is_full_text_public: boolean;
  source_url: string;
  doi: string;
  openaire_url: string;
  certificate_url: string;
  diploma_url: string;
  downloads_count: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  platform_display: string;
  label: string;
  url: string;
  order: number;
}

export interface SiteProfile {
  avatar: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject_type: "job" | "collab" | "question" | "other";
  message: string;
}
