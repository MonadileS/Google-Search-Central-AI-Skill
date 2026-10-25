# 05. Structured Data (JSON-LD) Complete Catalog

Official Source: `https://developers.google.com/search/docs/appearance/structured-data`

Structured data provides explicit machine-readable clues about the meaning of a page using **Schema.org** vocabulary, unlocking **Rich Results** in Google Search.

---

## 5.1 General Technical & Quality Guidelines

1. **Always Use JSON-LD (`<script type="application/ld+json">`)**: Google's officially recommended format (easier to maintain and less error-prone than Microdata or RDFa). Can be placed in `<head>` or `<body>` (even injected dynamically by client JS, though SSR HTML output is fastest and safest).
2. **100% Visible Content Parity (Anti-Spam Mandate)**:
   - Never mark up content invisible to readers.
   - Never mark up site-wide aggregate reviews on every single individual product/service page, and never mark up self-serving reviews written/curated directly by the business itself on `LocalBusiness` or `Organization` (`Review` snippets on `LocalBusiness`/`Organization` are restricted).
3. **Specificity & Page Scope**: Mark up the specific primary entity of the detail page (e.g., use `Product` on a single product detail page, NOT on a category grid of 30 products unless paired properly with `ItemList` / `Carousel` rules).
4. **Active vs. Retired Rich Result Types (Crucial Modern Awareness!)**:
   - **FAQPage Restriction**: `FAQPage` rich results in Google Search are now shown **only for well-known, authoritative government and health websites** (though valid `FAQPage` markup remains harmless semantic structure).
   - **Retired / Deprecated Rich Results**: `HowTo` rich results, `SpecialAnnouncement`, `CourseInfo` legacy variants, `ClaimReview` updates, `EstimatedSalary`, `LearningVideo`, `Sitelinks Search Box`, and `VehicleListing` rich result enhancements have been retired/simplified by Google - focus engineering effort on the active high-impact schemas below!

---

## 5.2 Safe JSON-LD Injection Helper (XSS-Proof Next.js / React)

When serializing JSON-LD inside `<script>` tags, always escape `<` to `\u003c` so user-supplied strings containing `</script>` cannot trigger XSS!

```tsx
// ✅ Reusable XSS-Safe JSON-LD Component (Next.js SSR & React SPA)
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const safeJson = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson }}
    />
  );
}
```

---

## 5.3 Production-Ready Schema Templates Across Active Google Features

### 1. Homepage Identity: `WebSite` (Site Name) + `Organization` (Logo, Contact, Social Profile)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "Vanguard Robotics",
      "alternateName": "Vanguard"
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Vanguard Robotics Inc.",
      "url": "https://example.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/images/logo-512x512.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-415-555-0192",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/vanguard-robotics",
        "https://github.com/vanguard-robotics"
      ]
    }
  ]
}
```

### 2. Navigation Trail: `BreadcrumbList`
Replaces raw URL paths in SERPs with clean hierarchical trails (`Vanguard > Industrial Arms > VX-7`). Omit `item` URL on the final (current page) item or set it to the current canonical URL:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Industrial Arms", "item": "https://example.com/arms" },
    { "@type": "ListItem", "position": 2, "name": "6-Axis Cobots", "item": "https://example.com/arms/cobots" },
    { "@type": "ListItem", "position": 3, "name": "VX-7 Precision Cobot" }
  ]
}
```

### 3. Editorial & News: `Article` / `NewsArticle` / `BlogPosting` (+ Author `Person` & Paywall Sampling)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Zero-Downtime Postgres Schema Migrations at Petabyte Scale",
  "image": [
    "https://example.com/blog/pg-migrations-16x9.webp",
    "https://example.com/blog/pg-migrations-4x3.webp",
    "https://example.com/blog/pg-migrations-1x1.webp"
  ],
  "datePublished": "2026-10-12T08:00:00-07:00",
  "dateModified": "2026-10-20T14:15:00-07:00",
  "author": [
    {
      "@type": "Person",
      "name": "Elena Rostova",
      "url": "https://example.com/authors/elena-rostova",
      "jobTitle": "Principal Database Architect"
    }
  ],
  "publisher": { "@id": "https://example.com/#organization" },
  "isAccessibleForFree": true
}
```
*(For paywalled articles, set `"isAccessibleForFree": false` and add `"hasPart": { "@type": "WebPageElement", "isAccessibleForFree": false, "cssSelector": ".paywalled-article-body" }`.)*

### 4. E-Commerce & Merchant Listings: `Product` (+ `Offer`, `MerchantReturnPolicy`, `OfferShippingDetails`, `AggregateRating`, `ProductGroup` Variants)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Solstice Titanium Espresso Machine",
  "image": ["https://example.com/products/solstice-front.webp"],
  "description": "Dual-boiler rotary pump espresso machine with PID temperature control and flow profiling.",
  "sku": "SOL-TI-01",
  "brand": { "@type": "Brand", "name": "Solstice Coffee Works" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 142
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/products/solstice-titanium-espresso",
    "priceCurrency": "USD",
    "price": 2450.00,
    "priceValidUntil": "2027-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "availability": "https://schema.org/InStock",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": 0, "currency": "USD" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "US" },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": { "@type": "QuantitativeValue", "minValue": 0, "maxValue": 1, "unitCode": "DAY" },
        "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitCode": "DAY" }
      }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "US",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 30,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  }
}
```
*(For multi-variant products like sizes/colors, wrap individual `Product` entries inside `"@type": "ProductGroup"`, `"productGroupID": "SHOE-99"`, `"variesBy": ["https://schema.org/size", "https://schema.org/color"]`, `"hasVariant": [...]`.)*

### 5. SaaS, Web Tools & Mobile Apps: `SoftwareApplication` / `WebApplication`
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Orbital Acoustic Room Calculator",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

### 6. Brick-and-Mortar & Service Businesses: `LocalBusiness`
```json
{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "name": "Harborview Dental Studio",
  "image": "https://example.com/clinic-exterior.webp",
  "telephone": "+1-206-555-0148",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1420 Western Ave, Suite 400",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6079,
    "longitude": -122.3415
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:30"
    }
  ]
}
```

### 7. Additional Supported Google Rich Result Schemas (Quick Reference Matrix)
| Rich Result Feature | Schema `@type` & Required Core Properties |
| :--- | :--- |
| **Video & Key Moments** | `VideoObject`: `name`, `thumbnailUrl`, `uploadDate`, `description`, `duration` (ISO 8601 `PT4M30S`), `contentUrl`/`embedUrl`, `hasPart` (`Clip`) or `potentialAction` (`SeekToAction`). |
| **Discussion Forum & Q&A** | `DiscussionForumPosting` (`author`, `datePublished`, `text`, `comment` array - ideal for community threads/Reddit-style apps); `QAPage` (`mainEntity`: `Question` with `acceptedAnswer` / `suggestedAnswer` - ONLY when users can submit answers!). |
| **Creator / Author Profile** | `ProfilePage` (`mainEntity`: `Person` or `Organization` with `name`, `identifier`, `interactionStatistic`, `sameAs`). |
| **Events** | `Event`: `name`, `startDate` (ISO 8601), `location` (`Place` with `address` or `VirtualLocation`), `offers`, `eventStatus` (`EventScheduled`, `EventCancelled`), `organizer`. |
| **Job Postings** | `JobPosting`: `title`, `description` (clean HTML), `datePosted`, `validThrough`, `hiringOrganization`, `jobLocation` (or `jobLocationType: "TELECOMMUTE"` + `applicantLocationRequirements`), `baseSalary`. |
| **Recipes** | `Recipe`: `name`, `image`, `author`, `prepTime`, `cookTime`, `totalTime`, `recipeYield`, `recipeIngredient` (array), `recipeInstructions` (`HowToStep` array), `nutrition`. |
| **Courses & Education** | `Course` (`name`, `description`, `provider`, `hasCourseInstance`); `Quiz` (`EduQuestion` flashcards); `MathSolver`; `Dataset` (`name`, `description`, `license`, `creator` for Google Dataset Search). |
| **Carousel / ItemList** | `ItemList` (`itemListElement`: `ListItem` with `position` and `url` / nested `Course`, `Movie`, `Recipe`, `Restaurant`, or EEA `Product`). |
| **Image License Metadata** | `ImageObject`: `contentUrl`, `license`, `acquireLicensePage`, `creditText`, `creator`, `copyrightNotice` (shows "Licensable" badge in Google Images). |
| **Vacation Rentals & Movies** | `VacationRental` (`containsPlace`, `identifier`, `latitude`, `longitude`, `image` `>=8` photos); `Movie` (`name`, `image`, `director`, `aggregateRating`). |
| **Speakable & Employer Rating** | `SpeakableSpecification` (`cssSelector` / `xpath` for news audio TTS in eligible locales); `EmployerAggregateRating` (`itemReviewed` Organization, `ratingValue`, `ratingCount`). |
