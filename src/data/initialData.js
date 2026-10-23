import heroImage from '@/assets/rr-hero.jpg';
import servicesImage from '@/assets/rr-services-grid.jpg';
import projectsImage from '@/assets/rr-projects-triptych.jpg';
import indoreImage from '@/assets/rr-indore.jpg';
import brandCoverImage from '@/assets/rr-brand-cover.jpg';

export { heroImage, servicesImage, projectsImage, indoreImage, brandCoverImage };

export const initialProperties = [
  {
    id: "rr-shree-residency",
    name: "RR Shree Residency",
    location: "Super Corridor, Indore",
    locationSlug: "super-corridor",
    bhk: "2 & 3 BHK",
    area: "1200–1650 sq.ft.",
    price: "₹42 Lakh onwards",
    type: "Apartment",
    status: "Ongoing",
    featured: true,
    crop: "crop-project-1",
    bedrooms: "2 & 3 BHK",
    bathrooms: "2–3",
    parking: "Covered",
    possession: "December 2026",
    description: "Contemporary homes with thoughtful amenities near Indore's fastest-growing corridor."
  },
  {
    id: "rr-green-villas",
    name: "RR Green Villas",
    location: "Bicholi Mardana, Indore",
    locationSlug: "bicholi-mardana",
    bhk: "3 & 4 BHK",
    area: "2200–2800 sq.ft.",
    price: "₹1.25 Cr onwards",
    type: "Villa",
    status: "Upcoming",
    featured: true,
    crop: "crop-project-2",
    bedrooms: "3 & 4 BHK",
    bathrooms: "4",
    parking: "2 Covered",
    possession: "Mid 2027",
    description: "Private villas shaped around landscaped greens, natural light and family living."
  },
  {
    id: "rr-business-hub",
    name: "RR Business Hub",
    location: "Vijay Nagar, Indore",
    locationSlug: "vijay-nagar",
    bhk: "Shops & Offices",
    area: "650–1800 sq.ft.",
    price: "₹55 Lakh onwards",
    type: "Commercial",
    status: "Ongoing",
    featured: false,
    crop: "crop-project-3",
    bedrooms: "N/A",
    bathrooms: "Executive Attached",
    parking: "Ample Visitor & Reserved",
    possession: "Ready to Fit-out",
    description: "A high-visibility business address with efficient floor plates and modern facilities."
  },
  {
    id: "rr-orchid-heights",
    name: "RR Orchid Heights",
    location: "Nipania, Indore",
    locationSlug: "nipania",
    bhk: "2 & 3 BHK",
    area: "1100–1520 sq.ft.",
    price: "₹48 Lakh onwards",
    type: "Apartment",
    status: "Ready to Move",
    featured: false,
    crop: "crop-project-2",
    bedrooms: "2 & 3 BHK",
    bathrooms: "2",
    parking: "Covered",
    possession: "Immediate",
    description: "Move-in-ready apartments combining modern convenience with a calm neighbourhood."
  },
  {
    id: "rr-premium-plots",
    name: "RR Premium Plots",
    location: "Rau, Indore",
    locationSlug: "rau",
    bhk: "Residential Plots",
    area: "1000–2400 sq.ft.",
    price: "₹28 Lakh onwards",
    type: "Plot",
    status: "Ongoing",
    featured: false,
    crop: "crop-project-1",
    bedrooms: "Open Plot",
    bathrooms: "N/A",
    parking: "Roadside & In-plot",
    possession: "Immediate Registry",
    description: "Well-planned residential plots with strong connectivity and essential infrastructure."
  },
  {
    id: "rr-corporate-square",
    name: "RR Corporate Square",
    location: "AB Road, Indore",
    locationSlug: "ab-road",
    bhk: "Premium Offices",
    area: "500–1450 sq.ft.",
    price: "₹62 Lakh onwards",
    type: "Office",
    status: "Completed",
    featured: false,
    crop: "crop-project-3",
    bedrooms: "N/A",
    bathrooms: "Floor Restrooms",
    parking: "Basement Multi-level",
    possession: "Immediate",
    description: "Professional workspaces designed for ambitious businesses on a landmark corridor."
  }
];

export const initialProjects = [
  {
    id: "rr-hotel-commercial-hub",
    name: "RR Commercial Hotel Landmark",
    location: "Vijay Nagar, Indore",
    type: "Commercial (Hotel) · G+4 (3,000 sq.ft.)",
    category: "Commercial",
    status: "Completed",
    price: null,
    image: "/projects/rr-hotel-commercial-hub.jpg",
    description: "A landmark G+4 commercial hotel development spanning 3,000 sq.ft. in Vijay Nagar, Indore. Features 34 well-ventilated rooms, grand reception lobby, office, commercial kitchen, and earthquake-resistant RCC construction.",
    crop: "crop-project-3",
    overviewTitle: "Designed for Better Hospitality & Business",
    overviewText: "Positioned strategically in Vijay Nagar, this completed commercial hotel project combines functional hospitality architecture with robust structural execution. Built across Ground + 4 floors on a 3,000 sq.ft. plot, it provides an ideal turnkey layout for hotel operations, corporate stays, or commercial hospitality ventures with maximum footfall connectivity.",
    floorLayoutText: "34 Bright rooms with cross ventilation, Spacious office & commercial kitchen, Reception & lobby area, Attached washrooms and private balconies, Secure boundary wall, Rainwater harvesting & recharge system, Certified earthing work, Dedicated on-site parking.",
    materialsText: "Earthquake-resistant RCC frame structure, Premium vitrified tiles & granite flooring, Large heavy-duty iron main door, Modern glass partition, Premium flush doors & windows, Branded CPVC plumbing fittings, Branded durable weather-proof paint.",
    hideAmenities: true,
    amenities: []
  },
  {
    id: "rr-villa-omaxe-1",
    name: "RR Luxury Villa Omaxe 1",
    location: "Omaxe 1, Bypass Indore",
    type: "5 BHK Villa · 1,500 sq.ft.",
    category: "Residential",
    status: "Completed",
    price: null,
    image: "/projects/rr-villa-omaxe-1.jpg",
    images: [
      "/projects/rr-villa-omaxe-1.jpg",
      "/projects/rr-grand-villa-elevation.jpg"
    ],
    videos: [],
    description: "A prestigious 5 BHK residential villa spanning 1,500 sq.ft. in the landmark township of Omaxe 1, Bypass Indore. Built with earthquake-resistant RCC structure, modular kitchen, private garden, Sagwan woodwork, and modern rainwater harvesting.",
    crop: "crop-project-2",
    overviewTitle: "Designed for Better Living & Family Comfort",
    overviewText: "Located in the elite gated environment of Omaxe 1 along Indore Bypass, this completed 5 BHK luxury villa provides exceptional functional circulation, natural cross-ventilation, and privacy for multi-generational family living with rapid connectivity to the city.",
    floorLayoutText: "Bright rooms with cross ventilation, Functional family circulation, Modern modular kitchen & dining spaces, Private balcony area & landscaped garden, Dedicated parking & secure boundary wall, Rainwater harvesting & ground recharge system, Certified electrical earthing work.",
    materialsText: "Earthquake-resistant RCC frame structure, Premium vitrified tiles & natural granite flooring, Premium Sagwan (teak wood) main door & designer flush doors, Gypsum POP & designer PVC POP ceiling work, Branded CPVC plumbing fittings, Premium Domal windows with granite framing, Durable weather-proof external paint.",
    hideAmenities: true,
    amenities: []
  },
  {
    id: "rr-grand-villa-ab-bypass",
    name: "RR Grand Luxury Villa",
    location: "A.B. Bypass, Indore",
    type: "5 BHK Villa · 5,300 sq.ft.",
    category: "Residential",
    status: "Ongoing",
    price: null,
    image: "/projects/rr-grand-villa-render.jpg",
    images: [
      "/projects/rr-grand-villa-render.jpg",
      "/projects/rr-grand-villa-banner.jpg",
      "/projects/rr-villa-omaxe-1-1.jpg",
      "/projects/rr-villa-omaxe-1-2.jpg",
      "/projects/rr-villa-omaxe-1-3.jpg"
    ],
    videos: [
      "/videos/r1.mp4",
      "/videos/r2.mp4",
      "/videos/r3.mp4"
    ],
    description: "An ultra-spacious 5 BHK luxury residential villa spanning 5,300 sq.ft. currently under active development at prime A.B. Bypass, Indore. Features expansive floor circulation, earthquake-resistant RCC structure, Sagwan woodwork, private garden, and modern rainwater harvesting.",
    crop: "crop-project-1",
    overviewTitle: "Expansive 5,300 Sq.Ft. Luxury Living on A.B. Bypass",
    overviewText: "Strategically located along the high-growth corridor of A.B. Bypass in Indore, this ongoing 5,300 sq.ft. 5 BHK luxury villa is being constructed with uncompromising structural integrity, generous family circulation, and bespoke architectural detailing.",
    floorLayoutText: "Expansive 5 BHK layout with dedicated servant quarters, Double-height living & formal dining rooms, Modern modular kitchen with separate store & utility, Private landscaped lawns & expansive open terrace, Wide balconies with cross ventilation, Dedicated covered parking & security boundary wall, Rainwater harvesting & groundwater recharge system, Certified multi-stage electrical earthing work.",
    materialsText: "Earthquake-resistant RCC frame structure with high-grade Fe550 steel, Premium vitrified tiles & natural Italian/granite finishes, Hand-crafted Sagwan (teak wood) main entrance & designer doors, Designer Gypsum & moisture-resistant PVC POP ceilings, Branded CPVC concealed plumbing & sanitary fittings, Heavy-duty Domal aluminium windows with granite sill framing, All-weather exterior acrylic protective coating.",
    hideAmenities: true,
    amenities: []
  }
];

export const initialLocations = [
  { name: "Super Corridor", slug: "super-corridor", propertyCountText: "12 Properties" },
  { name: "Vijay Nagar", slug: "vijay-nagar", propertyCountText: "18 Properties" },
  { name: "Bicholi Mardana", slug: "bicholi-mardana", propertyCountText: "9 Properties" },
  { name: "Rau", slug: "rau", propertyCountText: "14 Properties" },
  { name: "Bhawarkuan", slug: "bhawarkuan", propertyCountText: "11 Properties" },
  { name: "AB Road", slug: "ab-road", propertyCountText: "16 Properties" },
  { name: "Scheme No. 140", slug: "scheme-no-140", propertyCountText: "8 Properties" },
  { name: "Nipania", slug: "nipania", propertyCountText: "13 Properties" }
];

export const amenities = [
  "Landscaped gardens",
  "24×7 security",
  "Covered parking",
  "Children's play area",
  "Power backup",
  "Community spaces"
];

export const testimonials = [
  { quote: "RR Builder & Developer made our dream home a reality. Their professionalism, quality and transparency are truly commendable.", name: "Amit Sharma", initials: "AS" },
  { quote: "I sold my property through RR and got the best price. The team was very supportive throughout the process.", name: "Neha Patil", initials: "NP" },
  { quote: "Excellent construction quality and on-time delivery. Highly recommended for anyone looking to build or invest in Indore.", name: "Rajesh Verma", initials: "RV" }
];

export const privacySections = [
  ["Information We Collect", "We collect information you choose to provide through enquiry and contact forms, including your name, phone number, email and property requirements."],
  ["How We Use Information", "We use this information to respond to enquiries, understand your requirements and provide relevant property or construction assistance."],
  ["Data Protection", "We take reasonable measures to protect submitted information from unauthorized access, misuse or disclosure."],
  ["Cookies", "This website may use essential cookies to support basic functionality and improve the browsing experience."],
  ["Third Party Services", "Links to external services are governed by their own privacy practices. Please review their policies before sharing information."],
  ["Contact Information", "For privacy questions, contact info@rrbuilderindore.com."]
];

export const termsSections = [
  ["Website Usage", "Use this website only for lawful property research and genuine enquiries."],
  ["Property Information", "Listings, images, plans and specifications are indicative and should be independently verified before making a decision."],
  ["Enquiries", "Submitting an enquiry does not create a contractual relationship or guarantee property availability."],
  ["Pricing Disclaimer", "Prices are indicative, subject to change and may exclude taxes, registration and other charges."],
  ["Third Party Links", "We are not responsible for the content, availability or policies of third-party websites."],
  ["Limitation of Liability", "RR Builder & Developer is not liable for decisions made solely from preliminary website information."],
  ["Changes to Terms", "These terms may be updated when our services or legal obligations change."],
  ["Contact", "Questions may be sent to info@rrbuilderindore.com."]
];
