import heroImage from '@/assets/rr-hero.jpg';
import servicesImage from '@/assets/rr-services-grid.jpg';
import projectsImage from '@/assets/rr-projects-triptych.jpg';
import indoreImage from '@/assets/rr-indore.jpg';

export { heroImage, servicesImage, projectsImage, indoreImage };

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
    id: "rr-shree-residency",
    name: "RR Shree Residency",
    location: "Super Corridor, Indore",
    type: "2 & 3 BHK Apartments",
    category: "Residential",
    status: "Ongoing",
    price: "₹42 Lakh onwards",
    description: "Contemporary homes with thoughtful amenities near Indore's fastest-growing corridor.",
    crop: "crop-project-1"
  },
  {
    id: "rr-green-villas",
    name: "RR Green Villas",
    location: "Bicholi Mardana, Indore",
    type: "3 & 4 BHK Villas",
    category: "Residential",
    status: "Upcoming",
    price: "₹1.25 Cr onwards",
    description: "Private villas shaped around landscaped greens, natural light and family living.",
    crop: "crop-project-2"
  },
  {
    id: "rr-business-hub",
    name: "RR Business Hub",
    location: "Vijay Nagar, Indore",
    type: "Shops & Office Spaces",
    category: "Commercial",
    status: "Ongoing",
    price: "₹55 Lakh onwards",
    description: "A high-visibility business address with efficient floor plates and modern facilities.",
    crop: "crop-project-3"
  },
  {
    id: "rr-premium-plots",
    name: "RR Premium Plots",
    location: "Rau, Indore",
    type: "Residential Plots",
    category: "Plots",
    status: "Ongoing",
    price: "₹28 Lakh onwards",
    description: "Well-planned residential plots with strong connectivity and essential infrastructure.",
    crop: "crop-project-1"
  },
  {
    id: "rr-orchid-heights",
    name: "RR Orchid Heights",
    location: "Nipania, Indore",
    type: "2 & 3 BHK Apartments",
    category: "Residential",
    status: "Completed",
    price: "₹48 Lakh onwards",
    description: "Move-in-ready apartments combining modern convenience with a calm neighbourhood.",
    crop: "crop-project-2"
  },
  {
    id: "rr-corporate-square",
    name: "RR Corporate Square",
    location: "AB Road, Indore",
    type: "Premium Offices",
    category: "Commercial",
    status: "Completed",
    price: "₹62 Lakh onwards",
    description: "Professional workspaces designed for ambitious businesses on a landmark corridor.",
    crop: "crop-project-3"
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
