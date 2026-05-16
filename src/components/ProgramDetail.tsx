import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Clock, Monitor, Award, ChevronDown, ChevronUp, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { programs } from '../data/programs';
import RegistrationModal from './RegistrationModal';
import { GradientCard } from './ui/gradient-card';
import MarqueeBanner from './MarqueeBanner';
import { useConsentTimer } from './ConsentTimerContext';
import { setSEO } from '../utils/seo';

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [isSticky, setIsSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const { countdown, consentAgreed, setConsentAgreed, startSession, endSession, isActive: isTimerActive } = useConsentTimer();

  const program = programs.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (program) {
      setSEO({
        title: program.title,
        description: program.shortDescription,
        canonicalPath: `/programs/${program.id}`,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Course',
          name: program.title,
          description: program.shortDescription,
          url: `https://fluentfutureacademy.org/programs/${program.id}`,
          provider: {
            '@type': 'EducationalOrganization',
            name: 'Fluent Future Academy LLC',
            url: 'https://fluentfutureacademy.org',
            sameAs: 'https://fluentfutureacademy.org',
          },
          inLanguage: 'en',
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'Online',
            courseWorkload: program.duration || 'PT40H',
          },
        },
      });
    } else {
      setSEO({ title: 'Program Not Found', noindex: true });
    }
  }, [id, program]);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (program?.id === 'spanish-travel-business' && isTimerActive && !isConsentOpen) {
      setIsConsentOpen(true);
    }
  }, [program?.id, isTimerActive]);

  const toggleModule = (index: number) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!program) {
    return (
      <div className="min-h-screen bg-white pt-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Program Not Found</h1>
          <p className="text-gray-600 mb-8">The program you're looking for doesn't exist.</p>
          <Link to="/programs" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold w-full sm:w-auto max-w-xs mx-auto sm:max-w-none">
            Browse All Programs
          </Link>
        </div>
      </div>
    );
  }

  const Icon = program.icon;
  const isForeignLanguageProgram = ['spanish-travel-business', 'arabic-travel-business', 'mandarin-travel-business'].includes(program.id);

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24">
      {isForeignLanguageProgram && (
        <div className="w-full bg-gray-900 text-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-base sm:text-lg italic font-light">When Language is no longer a barrier, the world opens differently</p>
          </div>
        </div>
      )}
      {program.id === 'spanish-travel-business' && <MarqueeBanner />}
      {program.image && (
        <div className="relative max-h-96 overflow-hidden bg-gray-900">
          <img src={program.image} alt={program.title} className="w-full h-auto object-cover" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        </div>
      )}
      <div className={`bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-900 text-white transition-all duration-300 ${isSticky ? 'pt-20' : 'pt-24'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link to="/" className="text-blue-200 hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-blue-300" />
            <Link to="/programs" className="text-blue-200 hover:text-white transition-colors">Programs</Link>
            <ChevronRight className="w-4 h-4 text-blue-300" />
            <span className="text-white font-medium">{program.title}</span>
          </nav>

          <div className="flex items-start space-x-4 mb-4">
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center flex-shrink-0`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">{program.title}</h1>
              {program.subtitle && (
                <p className="text-xl text-blue-100">{program.subtitle}</p>
              )}
            </div>
          </div>

          <p className="text-lg text-blue-100 max-w-3xl">{program.shortDescription}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Program Overview</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{program.overview}</p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What You Will Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Should Enroll</h2>
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl p-8">
                <p className="text-gray-700 mb-4 font-medium">This program is ideal for:</p>
                <ul className="space-y-3">
                  {program.targetAudience.map((audience, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700">{audience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Curriculum</h2>
              <div className="space-y-4">
                {program.curriculum.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleModule(index)}
                      className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                          {module.duration && (
                            <p className="text-sm text-gray-600 mt-1">{module.duration}</p>
                          )}
                        </div>
                      </div>
                      {expandedModules.includes(index) ? (
                        <ChevronUp className="w-6 h-6 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </button>
                    {expandedModules.includes(index) && (
                      <div className="px-6 pb-6 bg-gray-50">
                        <ul className="space-y-3 mt-4">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-start space-x-3">
                              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
              <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{program.instructor.name}</h3>
                <p className="text-blue-200 mb-4">{program.instructor.title}</p>
                <p className="text-blue-100 leading-relaxed">{program.instructor.bio}</p>
              </div>
            </section>

            {program.testimonial && !isForeignLanguageProgram && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">What Our Students Say</h2>
                <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-2xl p-8">
                  <p className="text-lg text-gray-700 italic mb-4">"{program.testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-gray-900">{program.testimonial.author}</p>
                    <p className="text-gray-600 text-sm">{program.testimonial.role}</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className={`bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 ${isSticky ? 'lg:sticky lg:top-24' : ''}`}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">At a Glance</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Duration</p>
                    <p className="text-gray-900 font-semibold">{program.duration}{program.weeks ? ` | ${program.weeks}` : ''}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Monitor className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Format</p>
                    <p className="text-gray-900 font-semibold">{program.format}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Class Capacity</p>
                    <p className="text-gray-900 font-semibold">{program.classCapacity}</p>
                  </div>
                </div>

                {program.certification && (
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Certification</p>
                      <p className="text-gray-900 font-semibold">{program.certification}</p>
                    </div>
                  </div>
                )}

                {program.price && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 font-medium mb-1">Investment</p>
                    <p className="text-3xl font-bold text-emerald-600">{program.price}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (program.id === 'spanish-travel-business') {
                    startSession();
                    setIsConsentOpen(true);
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                className="w-full px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 font-bold text-lg shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-0.5 mb-4"
              >
                {isForeignLanguageProgram ? 'START YOUR 3 WEEKS PROGRAM — ENROLL NOW' : 'Register Now'}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Request Information
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Questions about this program?</p>
                <div className="space-y-2 text-sm">
                  <a href="tel:7819854558" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors">
                    <span className="font-medium">Call:</span>
                    <span>781-985-4558</span>
                  </a>
                  <a href="mailto:hben@fluentfutureacademy.org" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors">
                    <span className="font-medium">Email:</span>
                    <span>hben@fluentfutureacademy.org</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/17819854558"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all duration-200 hover:scale-110 z-50 group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
        <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
          Chat with us
        </span>
      </a>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        programTitle={program?.title}
      />

      <AnimatePresence>
        {isConsentOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => { setIsConsentOpen(false); endSession(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <GradientCard>
                <h2 className="text-2xl font-bold text-white mb-2">Before You Continue</h2>
                <p className="text-blue-200/80 mb-6">Please review and agree to our policies before proceeding to enrollment</p>

                <div className="space-y-3 mb-6">
                  <Link to="/privacy-policy" className="block text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors">Privacy Policy</Link>
                  <Link to="/refund-policy" className="block text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors">Refund Policy</Link>
                  <Link to="/terms-and-conditions" className="block text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 transition-colors">Terms &amp; Conditions</Link>
                </div>

                <label className="flex items-start space-x-3 mb-8 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentAgreed}
                    onChange={(e) => setConsentAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-emerald-500/30 bg-transparent text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 flex-shrink-0 accent-emerald-500"
                  />
                  <span className="text-sm text-blue-100/80">I have read and agree to the Terms &amp; Conditions, Privacy Policy, and Refund Policy of Fluent Future Academy</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={countdown === 0 && consentAgreed ? "https://checkout.teachable.com/secure/2706005/checkout/order_kmqn0952" : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { if (countdown === 0 && consentAgreed) { setIsConsentOpen(false); endSession(); } }}
                    className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-lg transition-all duration-200 ${
                      countdown === 0 && consentAgreed
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40'
                        : 'bg-white/5 text-white/30 cursor-not-allowed pointer-events-none border border-white/10'
                    }`}
                    aria-disabled={countdown > 0 || !consentAgreed}
                  >
                    {countdown > 0 ? `Please wait... ${countdown}s` : 'Continue to Enrollment'}
                  </a>
                  <button
                    onClick={() => { setIsConsentOpen(false); endSession(); }}
                    className="flex-1 px-6 py-3 border-2 border-white/20 text-blue-100/80 rounded-lg hover:bg-white/5 hover:border-white/30 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </GradientCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
