import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaLaptop, FaGraduationCap, FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaQuoteLeft } from 'react-icons/fa';
import EventModal from '../components/EventModal';
import SEO from '../components/SEO';
import bg1 from '@/images/hero-community.webp';
import bg2 from '@/images/hero-landscape.webp';
import bg3 from '@/images/hero-calm.webp';
import bg4 from '@/images/hero-support.webp';

/** The founding-date flash in the diagonal slice. */
const EST_COLOR = '#AEF359';

/**
 * Institutional marks shown in the green slice.
 *
 * These are third-party emblems. Shown without a caption they read as
 * "partner" or "endorsed by" — see the note handed over with this change. If
 * the relationship is something narrower (following published guidance, say),
 * add a caption above the list that says so, rather than leaving it implied.
 *
 * Each file was cropped to its mark, resized and converted to WebP; the WHO
 * original was an opaque JPEG whose white box would have shown as a hard
 * rectangle. They sit on white cards rather than being flattened to white
 * silhouettes, because the Uganda coat of arms loses all its detail as a
 * silhouette and official emblems should not be redrawn.
 */
const partnerMarks = [
  {
    src: '/images/partners/who.webp',
    alt: 'World Health Organization logo',
    // Per-mark heights, not one shared height. These three are 3.27:1, 1.18:1
    // and 3.95:1 — cap them all at the same height and the near-square coat of
    // arms renders at roughly a third of the optical weight of the wide marks.
    h: 'h-8 xl:h-11',
  },
  {
    src: '/images/partners/ministry-of-health-uganda.webp',
    alt: 'Republic of Uganda Ministry of Health coat of arms',
    h: 'h-11 xl:h-14',
  },
  {
    src: '/images/partners/africa-cdc.webp',
    alt: 'Africa CDC logo',
    h: 'h-7 xl:h-9',
  },
];

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [bg1, bg2, bg3, bg4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const services = [
    {
      icon: FaHeart,
      title: 'Individual Counselling',
      description: 'Professional therapy for anxiety, depression, trauma, and personal growth.',
      link: '/services'
    },
    {
      icon: FaUsers,
      title: 'Corporate Wellness',
      description: 'Employee assistance programs and workplace mental health solutions.',
      link: '/services'
    },
    {
      icon: FaLaptop,
      title: 'Online Therapy',
      description: 'Convenient telehealth sessions accessible from anywhere.',
      link: '/services'
    },
    {
      icon: FaGraduationCap,
      title: 'Educational Programs',
      description: 'Mental health training and workshops for schools and organizations.',
      link: '/services'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Concious Parenting Pathway',
      date: '2025-12-10',
      time: '10:00 AM',
      location: 'Kampala Community Center',
      description: 'Join us for interactive sessions on understanding / harmonizing and managing parenting approaches.',
      audience: 'General Public',
      price: 'Free'
    },
    {
      id: 2,
      title: 'The Cultural Whisperer Program',
      date: '2026-04-22',
      time: '2:00 PM',
      location: 'Serena Hotel, Kampala',
      description: 'Cultivating Harmonious Productive and Culturally Intelligent Workspaces.',
      audience: 'Corporate',
      price: 'UGX 100,000'
    },
    {
      id: 3,
      title: 'The Authentic Living Journey',
      date: '2025-10-11',
      time: '9:00 AM',
      location: 'Makerere University',
      description: 'Recovering your original self to live a life of Peace, Purpose, reliability and Consistency.',
      audience: 'Youth',
      price: 'UGX 50,000'
    }
  ];

  // Each quote is attributed to a director; `slug` links the card to that
  // person's profile page so the homepage passes crawl equity to all four.
  const testimonials = [
    {
      slug: 'dr-kyosaba-winfred-biribonwa',
      name: 'Dr. Kyosaba Winfred Biribonwa - PhD',
      role: 'Founding Partner & Executive Director',
      content: 'Winrise aims to transform your institutional culture; Handle change, live happier, focused and be more productive.',
      image: '/images/dr-kyosaba-winfred-biribonwa.webp'
    },
    {
      slug: 'joan-claire-kabikuru',
      name: 'Joan Claire Kabikuru',
      role: 'Head of Finance & Administration, Director',
      content: 'Ensuring operational excellence and financial sustainability to support our mission of transforming mental health services.',
      image: '/images/joan-claire-kabikuru.webp'
    },
    {
      slug: 'richard-asiimwe-kacururu',
      name: 'Richard Asiimwe Kacururu',
      role: 'Travel Specialist, Partner & Director',
      content: 'Wholesome Travel, Retreat & Mentorship programs are tailored to deliver healing, more confident and at peace steady minds.',
      image: '/images/richard-asiimwe-kacururu.webp'
    },
    {
      slug: 'emilly-karine-ajuna',
      name: 'Emilly Karine Ajuna',
      role: 'Head of Programs & Director',
      content: 'Our workplace physical & mental health balanced programs significantly improve employee\' emotional well-being.',
      image: '/images/emilly-karine-ajuna.webp'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO path="/" />

      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/20 to-primary/10 overflow-hidden">
        {/* Background Images */}
        {backgroundImages.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentBgIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{
              backgroundImage: `url(${bg})`,
              backgroundBlendMode: 'overlay'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/30" />

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-10">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentBgIndex ? 'bg-primary w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
        >
          <h1 className="font-urbanist font-bold text-5xl md:text-7xl mb-6 leading-tight">
            Empowering Minds.<br />
            <span className="text-primary">Transforming Lives.</span>
          </h1>
          <p className="font-urbanist text-xl md:text-2xl mb-8 opacity-90">
            Professional mental health and wellness services that inspire healing, resilience, and personal transformation across Uganda.
          </p>
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                title="Contact Us to Book a Session"
                aria-label="Book a counselling session with Winrise"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-urbanist font-semibold text-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Book a Session</span>
                <FaArrowRight aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Services Preview */}
      <section className="relative overflow-hidden py-12 lg:py-14 lg:min-h-[540px] xl:min-h-[620px] bg-white">
        {/*
          Diagonal green slice, desktop only.

          The wedge is a real flex container, not a background image, so the
          founding date and the partner marks live inside it. `clip-path` cuts
          the slanted right edge.

          The 190px slant across a section this short is what makes the angle
          read as steep: the angle is the slant over the height, so halving the
          height sharpens it as much as widening the slant does.

          Content is LEFT-aligned and capped at 132px wide deliberately. The
          wedge narrows toward its bottom edge — width minus the slant — so a
          left-aligned stack of that width stays inside the green at every
          height and breakpoint. Centring could not guarantee that.

          Below lg the wedge is hidden; a diagonal side-by-side has nowhere to
          go on a phone, so the marks get their own strip underneath instead.
        */}
        {/*
          Border shade on the divider: a second wedge sitting behind the first,
          7px wider at every height. Because both are anchored left and share
          the same slant, the extra width is only ever visible along the
          slanted edge — which is exactly a border, without needing a rotated
          pseudo-element whose angle would have to be kept in sync by hand.
        */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute inset-y-0 left-0 bg-primary-dark
                     w-[calc(52%+7px)] xl:w-[calc(46%+7px)] 2xl:w-[calc(42%+7px)]"
          style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 190px) 100%, 0 100%)' }}
        />

        <div
          className="hidden lg:flex absolute inset-y-0 left-0 w-[52%] xl:w-[46%] 2xl:w-[42%]
                     bg-primary flex-col items-center justify-center gap-6 pt-6 pb-32 px-8"
          style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 190px) 100%, 0 100%)' }}
        >
          {/* pb far larger than pt is what lifts the block: with justify-center,
              the extra bottom padding shifts everything up by half the
              difference. Lifting it is not only cosmetic — the wedge is at its
              widest near the top, so raising the block buys it room. At 1024px
              this is the difference between ~3px of clearance and ~30px. */}
          <img
            src="/images/winrise.png"
            alt="Winrise Counselling & Wellness"
            width="256"
            height="173"
            loading="lazy"
            className="h-16 xl:h-20 w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)]"
          />

          {/*
            Set on two lines, and that is load-bearing rather than stylistic.
            At 120px, ".est 2024" on one line measures 545px. The wedge offers
            330px at 1024px and 407px at 1280px — it does not fit at any
            realistic laptop width. Stacked, the widest line ("2024") is 296px
            and clears comfortably. Put it back on one line and it will spill
            across the diagonal.
          */}
          <p
            className="font-ubuntu font-bold text-[120px] xl:text-[144px] leading-[0.82]
                       tracking-tight text-center [text-shadow:0_3px_16px_rgba(0,0,0,0.30)]"
            style={{ color: EST_COLOR }}
          >
            <span className="block">.est</span>
            <span className="block">2024</span>
          </p>

          {/*
            Full colour, transparent, one centred row. Measured against this
            green all three marks sit at luminance 101–119 and the green is
            ~110, so they read softly rather than crisply. The drop-shadow
            lifts them off the ground a little. If they ever look washed out,
            the fix is a white card behind each — these are official emblems
            and should not be recoloured.
          */}
          <ul className="flex items-center justify-center gap-4 xl:gap-5 list-none m-0 p-0">
            {partnerMarks.map((mark) => (
              <li key={mark.src} className="flex items-center">
                <img
                  src={mark.src}
                  alt={mark.alt}
                  width="320"
                  height="98"
                  loading="lazy"
                  className={`${mark.h} w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)]`}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Clears the widest point of the wedge (its top edge) at every
            breakpoint from lg up.

            38%, not 36%, even though the wedge is 36%. Percentage padding
            resolves against THIS container's width — which is the viewport
            minus the 32px gutters — while the wedge is 36% of the full
            viewport. Matching the numbers leaves only ~9px of clearance
            between 1024px and 1280px. The extra two points buys ~30px.
          */}
          <div className="lg:pl-[55%] xl:pl-[49%] 2xl:pl-[45%]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center lg:text-left mb-8"
            >
              <h2 className="font-urbanist font-bold text-3xl md:text-4xl text-text mb-3">
                Our <span className="text-primary">Services</span>
              </h2>
              <p className="font-josefin text-base text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Comprehensive mental health and wellness solutions tailored to individuals, families, and organizations.
              </p>
            </motion.div>

            {/* Minimalist tiles: no card, no shadow, no icon badge. A hairline
                rule gives each one its edge, which is all the separation flat
                tiles need. Two across because the wedge takes a third of the row. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group border-t border-gray-200 pt-5"
                >
                  <service.icon
                    className="text-primary mb-3"
                    size={20}
                    aria-hidden="true"
                  />
                  <h3 className="font-josefin font-semibold text-lg text-text mb-1.5">
                    {service.title}
                  </h3>
                  <p className="font-josefin text-sm text-gray-600 leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 font-josefin font-medium text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Learn more
                    <FaArrowRight
                      size={11}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Below lg the wedge is hidden, so the founding date and the
                institutional marks get a plain horizontal strip instead. */}
            <div className="lg:hidden mt-10 pt-8 border-t border-gray-200">
              {/* Ubuntu and bold to match the wedge, but text-primary rather
                  than EST_COLOR: #AEF359 on white is 1.33:1 and effectively
                  invisible. The brand green on white is 4.34:1. */}
              <img
                src="/images/winrise.png"
                alt="Winrise Counselling & Wellness"
                width="256"
                height="173"
                loading="lazy"
                className="h-14 w-auto object-contain mb-4"
              />
              <p className="font-ubuntu font-bold text-6xl leading-none text-primary mb-5">
                .est 2024
              </p>
              <ul className="flex flex-wrap items-center gap-4 list-none m-0 p-0">
                {partnerMarks.map((mark) => (
                  <li key={mark.src} className="h-12 flex items-center">
                    <img
                      src={mark.src}
                      alt={mark.alt}
                      width="320"
                      height="98"
                      loading="lazy"
                      className={`${mark.h} max-w-[120px] w-auto object-contain`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Listing Section */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-6">
              Our <span className="text-primary">Product Listing</span>
            </h2>
            <p className="font-urbanist text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our range of products designed to promote mental health awareness and well-being.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-2 text-primary mb-4">
                  <FaCalendarAlt size={16} />
                  <span className="font-urbanist font-medium text-sm">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="font-urbanist font-semibold text-xl text-text mb-3">
                  {event.title}
                </h3>
                <p className="font-urbanist text-gray-600 mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="flex items-center space-x-2 text-gray-500 mb-2">
                  <FaMapMarkerAlt size={14} />
                  <span className="font-urbanist text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-urbanist font-medium text-primary">
                    {event.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedEvent(event)}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-urbanist font-medium text-sm transition-colors duration-300"
                  >
                    Register
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Commitment Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-text mb-6">
              Our <span className="text-primary">Team Commitment</span>
            </h2>
            <p className="font-ubuntu text-xl text-gray-600 max-w-3xl mx-auto">
              Meet our dedicated team and their commitment to transforming lives through mental health and wellness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex"
                style={{ minHeight: '220px' }}
              >
                {/* Image slice — left side */}
                <div className="w-2/5 flex-shrink-0 relative">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}, ${testimonial.role} at WINRISE Counselling & Wellness`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>

                {/* Text — right side */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                  <FaQuoteLeft className="text-primary mb-3" size={20} />
                  <p className="italic text-gray-600 mb-5 leading-relaxed text-sm" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
                    "{testimonial.content}"
                  </p>
                  <div>
                    <h4 className="font-ubuntu font-semibold text-text text-sm">
                      <Link
                        to={`/team/${testimonial.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {testimonial.name}
                      </Link>
                    </h4>
                    <p className="font-ubuntu text-xs text-primary mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-urbanist font-bold text-4xl md:text-5xl text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="font-urbanist text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Take the first step towards better mental health and well-being. Our professional team is here to support you every step of the way.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-full font-urbanist font-semibold text-lg transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Home;