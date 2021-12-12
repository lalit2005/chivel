import { UserCredentials } from '@supabase/supabase-js';
export interface LayoutProps {
  children: React.ReactNode;
}

export type Channel = {
  id: string;
  channel_id: string;
  channel_name: string;
  channel_description: string;
  created_at: string;
  created_by: string;
  nav_links: string[];
  subdomain: string;
  custom_css: string;
  custom_head: string;
  announcement_text: string;
  announcement_url: string;
  og_image_url: string;
};
