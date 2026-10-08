import { Hero } from "@/components/sections/home/hero";
import { Numbers } from "@/components/sections/home/numbers";
import { TrustBar } from "@/components/sections/home/trust-bar";
import { Audience } from "@/components/sections/home/audience";
import { HowItWorks } from "@/components/sections/home/how-it-works";
import { Modules } from "@/components/sections/home/modules";
import { KsefFlow } from "@/components/sections/home/ksef-flow";
import { PricingPreview } from "@/components/sections/home/pricing-preview";
import { CaseStudies } from "@/components/sections/home/case-studies";
import { Faq } from "@/components/sections/home/faq";
import { FinalCta } from "@/components/sections/home/final-cta";
import { homeJsonLd, jsonLdHtml } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(homeJsonLd())} />
      <Hero />
      <Numbers />
      <Audience />
      <HowItWorks />
      <TrustBar />
      <Modules />
      <CaseStudies />
      <KsefFlow />
      <PricingPreview />
      <Faq />
      <FinalCta />
    </>
  );
}
