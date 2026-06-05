import type {
  AcademicWork,
  ContactPayload,
  Experience,
  Paginated,
  Project,
  SiteProfile,
  Skill,
  SocialLink,
} from "./types";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

/**
 * Server-side fetch (ISR — 60 soniyada yangilanadi).
 * Backend ishlamasa null qaytaradi (sahifa baribir render bo'ladi).
 */
async function getList<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data: Paginated<T> | T[] = await res.json();
    return Array.isArray(data) ? data : data.results;
  } catch {
    return [];
  }
}

export const getSkills = () => getList<Skill>("/skills/");
export const getProjects = () => getList<Project>("/portfolio/projects/");
export const getFeaturedProjects = () =>
  getList<Project>("/portfolio/projects/?is_featured=true");
export const getExperience = () => getList<Experience>("/experience/");
export const getSocials = () => getList<SocialLink>("/contact/socials/");

/** Sayt profili (yagona obyekt) — asosiy foto. Bo'lmasa null. */
export async function getProfile(): Promise<SiteProfile | null> {
  try {
    const res = await fetch(`${API_URL}/profile/`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as SiteProfile;
  } catch {
    return null;
  }
}
export const getAcademicWorks = () => getList<AcademicWork>("/academic/works/");

/** Contact forma — mijoz tomonidan yuboriladi. */
export async function sendContact(payload: ContactPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/contact/send/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
