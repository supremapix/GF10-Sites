import { ReactNode } from 'react';

export interface SectionProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export interface ProjectItem {
  title: string;
  category: string;
  image: string;
}

export interface LocationParams {
  name: string;
}