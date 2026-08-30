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
    // Intrinsic pixel size of each file, so the browser reserves the right box
    // before the image loads. All three used to declare the WHO file's 320x98,
    // which reserved the wrong box for the other two.
    w: 320,
    h: 98,
    // Weight relative to --u (see index.css), applied as a real height so the
    // flex row knows how wide each mark is. The version before this scaled the
    // marks with `transform: scale()`, which enlarges the picture but not the
    // box it occupies — so the marks overlapped each other and could cross the
    // diagonal with the row none the wiser.
    //
    // Not one shared height either: these are 3.27:1, 1.18:1 and 3.95:1, so
    // capping all three at the same height leaves the near-square coat of arms
    // at a third of the optical weight of the wide marks.
    scale: 1,
    hSm: 'h-8',
  },
  {
    src: '/images/partners/ministry-of-health-uganda.webp',
    alt: 'Republic of Uganda Ministry of Health coat of arms',
    w: 320,
    h: 272,
    scale: 1.375,
    hSm: 'h-11',
  },
  {
    src: '/images/partners/africa-cdc.webp',
    alt: 'Africa CDC logo',
    w: 320,
    h: 81,
    scale: 0.875,
    hSm: 'h-7',
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
      <section className="flip-section relative overflow-hidden bg-white py-12 lg:py-14
                          lg:min-h-[600px] xl:min-h-[700px] 2xl:min-h-[720px]">
        {/*
          Diagonal green slice, desktop only.

          The slice is a real flex container, not a background image, so the
          founding date and the partner marks live inside it. `clip-path` cuts
          the slanted right edge.

          The angle is the slant over the height, so both move together: --slant
          grew to 220px alongside the taller section, which keeps the diagonal
          about as steep as it was while giving the enlarged marks room. Both
          numbers live in index.css under .flip-slice.

          Below lg the slice is hidden; a diagonal side-by-side has nowhere to
          go on a phone, so the marks get their own strip underneath instead.
        */}
        {/*
          The divider, treated as a page being turned.

          What sells a page turn is not a line down the middle — it is that
          nothing about the join is uniform. The sheet is hinged at the top and
          peeling away toward the bottom, so:

            - the shadow it casts on the white starts at almost nothing near the
              top and widens to --lift px at the bottom, where the sheet has
              lifted furthest from the surface;
            - the lit edge on the green does the same, from 0px at the hinge to
              --rim px at the lifted end. It is the sheet's own edge catching
              light as it curls up, so it cannot exist where the sheet is still
              flat.

          Everything before this drew something of CONSTANT width along the
          diagonal — a 7px dark wedge, a black gradient, a 5px light rim — and a
          constant-width band down a join reads as an outline drawn around a
          shape, which is exactly what it looked like. Both tapers are just a
          second polygon vertex; the geometry is in index.css so the shadow and
          the sheet cannot drift apart.

          The `filter` sits on .flip-shade while the `clip-path` is on its
          ::before, and that nesting is load-bearing: CSS applies filters BEFORE
          clipping, so a blur on the clipped element itself is computed from the
          unclipped rectangle and then clipped away.
        */}
        <div aria-hidden="true" className="flip-shade hidden lg:block" />

        <div className="flip-slice hidden lg:block absolute inset-y-0 left-0">
          <div aria-hidden="true" className="flip-lit" />

          {/* The sheet. pr is far larger than pl because the content is centred
              on the trapezoid, not on the bounding box: centring on the box
              would push everything into the taper. pb larger than pt lifts the
              stack for the same reason, since the sheet is widest at the top. */}
          <div className="flip-sheet flex flex-col items-center justify-center
                          gap-6 pt-6 pb-24 xl:pb-[104px] pl-8 pr-[142px]">
            {/*
              The marks lead, and that placement is what lets them grow. The
              sheet loses --slant px of width between its top and its bottom, so
              an enlarged row of three simply does not fit lower down. The
              negative right margin cancels the stack's pr for this row alone,
              so it centres on the sheet's full width rather than on the inset
              box the taller, narrower blocks below it need.

              Each mark carries its own shadow rather than a box behind it.
              drop-shadow follows the alpha channel, so on these transparent
              PNGs it traces the emblem itself — which is what separates them
              from the green. They needed it: measured against this background
              all three sit at luminance 101-119 and the green is ~110, so
              without a shadow they have almost nothing to read against.
            */}
            <ul className="flex items-center justify-center gap-8 xl:gap-10 list-none m-0 p-0 -mr-[110px]">
              {partnerMarks.map((mark) => (
                <li key={mark.src} className="flex items-center">
                  <img
                    src={mark.src}
                    alt={mark.alt}
                    width={mark.w}
                    height={mark.h}
                    loading="lazy"
                    className="w-auto object-contain"
                    style={{
                      height: `calc(var(--u) * ${mark.scale})`,
                      filter:
                        'drop-shadow(0 1px 2px rgba(0,0,0,0.50)) drop-shadow(0 5px 16px rgba(0,0,0,0.38))',
                    }}
                  />
                </li>
              ))}
            </ul>

            <img
              src="/images/winrise.png"
              alt="Winrise Counselling & Wellness"
              width="256"
              height="173"
              loading="lazy"
              className="h-32 xl:h-40 w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)]"
            />

            {/*
              Set on two lines, and that is load-bearing rather than stylistic.
              At 120px, ".est 2024" on one line measures 545px, wider than the
              sheet has to offer at this depth at any laptop width. Stacked, the
              widest line ("2024") is 296px and clears comfortably. Put it back
              on one line and it will spill across the diagonal.
            */}
            <p
              className="font-ubuntu font-bold text-[120px] xl:text-[144px] leading-[0.82]
                         tracking-tight text-center [text-shadow:0_3px_16px_rgba(0,0,0,0.30)]"
              style={{ color: EST_COLOR }}
            >
              <span className="block">.est</span>
              <span className="block">2024</span>
            </p>
          </div>
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
          <div className="lg:pl-[62%] xl:pl-[58%] 2xl:pl-[54%]">
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
                className="h-28 w-auto object-contain mb-4"
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
                      width={mark.w}
                      height={mark.h}
                      loading="lazy"
                      className={`${mark.hSm} max-w-[120px] w-auto object-contain`}
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