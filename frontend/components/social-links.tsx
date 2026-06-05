import type { ComponentType } from "react";
import { Mail, Globe, Link2 } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  TelegramIcon,
  InstagramIcon,
  YoutubeIcon,
  TwitterIcon,
  FacebookIcon,
} from "@/components/icons";

type IconType = ComponentType<{ className?: string }>;

// Platforma kodi -> ikonka
const ICONS: Record<string, IconType> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  telegram: TelegramIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  email: Mail,
  website: Globe,
  other: Link2,
};

export function socialIcon(platform: string): IconType {
  return ICONS[platform] ?? Link2;
}
