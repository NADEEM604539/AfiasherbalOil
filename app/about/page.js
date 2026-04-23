import Footer from "@/components/Footer";
import NavbarWrapper from "./NavbarWrapper";
import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About Afia's Herbal Oil | Our Story, Mission & Values",
  description: "Learn about Afia's Herbal Oil's mission to provide pure, natural, and organic oils. Discover our commitment to quality, sustainability, and customer care.",
  keywords: ["about us", "herbal oil company", "natural products", "organic oils", "Pakistan"],
  openGraph: {
    title: "About Afia's Herbal Oil | Our Story, Mission & Values",
    description: "Discover our story, mission, and commitment to bringing you the finest natural and organic oils.",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <NavbarWrapper />
      <AboutPageClient />
    </>
  );
}
