import { cache } from "react";

import { readData } from "@/lib/data";

import type {

  SiteConfig,

  SectionConfig,

  Service,

  Product,

  Testimonial,

  FAQ,

  BlogPost,

  GalleryItem,

  Benefit,

  ProcessStep,

} from "@/types";



export const getSiteData = cache(async () => {

  const [

    config,

    sections,

    services,

    products,

    testimonials,

    faqs,

    blogPosts,

    gallery,

    benefits,

    processSteps,

  ] = await Promise.all([

    readData<SiteConfig>("site-config"),

    readData<SectionConfig[]>("sections"),

    readData<Service[]>("services"),

    readData<Product[]>("products"),

    readData<Testimonial[]>("testimonials"),

    readData<FAQ[]>("faqs"),

    readData<BlogPost[]>("blog-posts"),

    readData<GalleryItem[]>("gallery"),

    readData<Benefit[]>("benefits"),

    readData<ProcessStep[]>("process-steps"),

  ]);



  const enabledSections = sections

    .filter((s) => s.enabled)

    .sort((a, b) => a.order - b.order);



  return {

    config,

    sections: enabledSections,

    services: services.filter((s) => s.enabled).sort((a, b) => a.order - b.order),

    products: products.filter((p) => p.enabled).sort((a, b) => a.order - b.order),

    testimonials: testimonials.filter((t) => t.enabled).sort((a, b) => a.order - b.order),

    faqs: faqs.filter((f) => f.enabled).sort((a, b) => a.order - b.order),

    blogPosts: blogPosts.filter((b) => b.enabled),

    gallery: gallery.filter((g) => g.enabled).sort((a, b) => a.order - b.order),

    benefits: benefits.filter((b) => b.enabled).sort((a, b) => a.order - b.order),

    processSteps: processSteps.filter((p) => p.enabled).sort((a, b) => a.order - b.order),

  };

});



export { isSectionEnabled } from "@/lib/sections";

