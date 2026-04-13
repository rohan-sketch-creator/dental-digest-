import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollExpandMedia from '../components/ui/ScrollExpandMedia';

const mediaContent = {
  image: {
    src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1280&auto=format&fit=crop',
    background: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1920&auto=format&fit=crop',
    title: 'Modern Dental Excellence',
    date: 'Demo Dental Clinic',
    scrollToExpand: '↓ Scroll to Explore',
    about: {
      overview:
        'At Demo Dental, we combine cutting-edge technology with compassionate care to deliver exceptional dental experiences. Our state-of-the-art facility features the latest in diagnostic imaging, laser dentistry, and cosmetic treatments.',
      conclusion:
        'Whether you need a routine checkup or a complete smile transformation, our team of experienced professionals is here to help. Book your appointment today and experience the difference.',
    },
  },
};

const ShowcaseContent = () => {
  const content = mediaContent.image;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-dental-dark dark:text-white font-display">
        Why Choose Demo Dental?
      </h2>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {content.about.overview}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { icon: '🦷', title: 'Advanced Technology', desc: 'Digital X-rays, 3D imaging, and laser treatments' },
          { icon: '💚', title: 'Patient Comfort', desc: 'Sedation options and a relaxing atmosphere' },
          { icon: '⚡', title: 'Same-Day Service', desc: 'Emergency appointments and quick turnarounds' },
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 text-center">
            <span className="text-4xl block mb-3">{item.icon}</span>
            <h3 className="font-display font-bold text-dental-dark dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 leading-relaxed">
        {content.about.conclusion}
      </p>

      <div className="flex gap-4">
        <Link to="/book" className="btn-primary">
          Book Appointment
        </Link>
        <Link to="/pricing" className="btn-secondary">
          View Plans
        </Link>
      </div>
    </div>
  );
};

export default function Showcase() {
  const content = mediaContent.image;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={content.src}
        bgImageSrc={content.background}
        title={content.title}
        date={content.date}
        scrollToExpand={content.scrollToExpand}
        textBlend
      >
        <ShowcaseContent />
      </ScrollExpandMedia>
    </div>
  );
}
