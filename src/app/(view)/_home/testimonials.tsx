import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star} from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Homeowner",
    company: "Beverly Hills",
    content:
      "Premier Pool Service has been maintaining our pool for over 2 years. Their attention to detail and reliability is unmatched. Our pool has never looked better!",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/1",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Property Manager",
    company: "Sunset Properties",
    content:
      "As a property manager, I need reliable service providers. Premier Pool Service consistently delivers exceptional results for all our properties.",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/2",
    initials: "MC",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Resort Owner",
    company: "Paradise Resort",
    content:
      "Professional, punctual, and thorough. They've helped us maintain crystal clear water for our guests. Highly recommend their services!",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/3",
    initials: "ER",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Homeowner",
    company: "Malibu",
    content:
      "After trying several pool services, Premier Pool Service stands out. Their expertise and customer service are exceptional.",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/4",
    initials: "DT",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "HOA Manager",
    company: "Oceanview Community",
    content:
      "They maintain our community pools with such care and professionalism. The residents are always complimenting the pool condition.",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/5",
    initials: "LP",
  },
  {
    id: 6,
    name: "Robert Wilson",
    role: "Business Owner",
    company: "Wilson Hotels",
    content:
      "Premier Pool Service has been our trusted partner for years. Their consistent quality and reliability make them invaluable to our business.",
    rating: 5,
    avatar: "https://avatar.iran.liara.run/public/6",
    initials: "RW",
  },
];

const TestimonialAvatar = ({
  testimonial,
  className = "",
}: {
  testimonial: Testimonial;
  className?: string;
}) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    <Avatar className="size-16 border-2 border-white shadow-lg">
      <AvatarImage
        src={testimonial.avatar || "/placeholder.svg"}
        alt={testimonial.name}
      />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
        {testimonial.initials}
      </AvatarFallback>
    </Avatar>
    <div className="text-center">
      <p className="font-medium text-sm">{testimonial.name}</p>
      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
    </div>
  </div>
);

const FeaturedTestimonial = ({ testimonial }: { testimonial: Testimonial }) => (
  <Card className="h-full bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
    <CardContent className="p-8! h-full flex flex-col justify-center">
      <Quote className="size-8 text-blue-500 mb-4!" />
      <blockquote className="lg:text-lg leading-relaxed mb-6! text-gray-700">
        &quot;{testimonial.content}&quot;
      </blockquote>
      <div className="flex items-center gap-2 mb-4!">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-sm text-gray-600">
            {testimonial.role} • {testimonial.company}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Testimonials() {
  const featuredTestimonial = testimonials[0];
  const sideTestimonials = testimonials.slice(1);

  return (
    <section className="!py-24 !px-4 !mx-auto">
      <div className="text-center space-y-4! !mb-16">
        <h4 className="text-accent-foreground font-semibold text-sm uppercase tracking-wide">
          Testimonials
        </h4>
        <h2 className="text-2xl lg:text-4xl md:text-5xl font-bold text-gray-900">
          Our Satisfied Customers
        </h2>
        <p className="text-gray-600 text-sm lg:text-lg max-w-3xl !mx-auto leading-relaxed">
          We know that finding someone to take care of your pool can be a
          daunting process. Let Premier Pool Service take care of your pool
          servicing and you won&apos;t have to have those worries again.
        </p>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side Avatars */}
        <div className="col-span-3 space-y-8!">
          <TestimonialAvatar
            testimonial={sideTestimonials[0]}
            className="justify-self-end"
          />
          <TestimonialAvatar
            testimonial={sideTestimonials[1]}
            className="justify-self-center"
          />
          <TestimonialAvatar
            testimonial={sideTestimonials[2]}
            className="justify-self-end"
          />
        </div>

        {/* Center Featured Testimonial */}
        <div className="col-span-6">
          <FeaturedTestimonial testimonial={featuredTestimonial} />
        </div>

        {/* Right Side Avatars */}
        <div className="col-span-3 space-y-8!">
          <TestimonialAvatar
            testimonial={sideTestimonials[3]}
            className="justify-self-start"
          />
          <TestimonialAvatar
            testimonial={sideTestimonials[4]}
            className="justify-self-center"
          />
          <TestimonialAvatar
            testimonial={sideTestimonials[0]}
            className="justify-self-start"
          />
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden">
        <div className="!mb-12">
          <FeaturedTestimonial testimonial={featuredTestimonial} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sideTestimonials.slice(0, 6).map((testimonial) => (
            <TestimonialAvatar key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="!mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-accent-foreground">500+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-accent-foreground">
            5 Years
          </div>
          <div className="text-gray-600">Experience</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-accent-foreground">99%</div>
          <div className="text-gray-600">Satisfaction Rate</div>
        </div>
      </div>
    </section>
  );
}
