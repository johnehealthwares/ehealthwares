'use client';

import { useState } from 'react';

const TESTIMONIALS = [
  {
    name: 'Dr. Amara Diallo',
    role: 'Chief Medical Officer',
    img: 'https://i.pravatar.cc/80?img=13',
    text: 'The unified record has transformed how our clinicians work. Labs, radiology, and notes all in one view — no more chasing results.',
  },
  {
    name: 'Dr. Sarah Okafor',
    role: 'Family Physician',
    img: 'https://i.pravatar.cc/80?img=47',
    text: 'Documentation used to eat up my evenings. With eHealthwares EMR templates, I finish clinical notes in minutes.',
  },
  {
    name: 'Adebayo Kalu',
    role: 'Hospital Administrator',
    img: 'https://i.pravatar.cc/80?img=12',
    text: 'Interoperability was the dealbreaker for us. HL7 and FHIR connectivity with our lab went live within weeks.',
  },
  {
    name: 'Dr. Maria Santos',
    role: 'Pediatrician',
    img: 'https://i.pravatar.cc/80?img=32',
    text: 'Prescriptions, billing, and patient records in one platform. My whole team is on the same page now.',
  },
];

export function EMRTestimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (index: number) => {
    if (index === active) return;
    setFading(true);
    window.setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 220);
  };

  const prev = () => goTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => goTo((active + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[active];

  return (
    <div className="testimonials-wrapper">
      <div className="testimonial-avatars" style={{ display: 'flex' }}>
        {TESTIMONIALS.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.name}
            src={item.img}
            alt={item.name}
            className={i === active ? 'active' : 'nav-avatar'}
            onClick={() => goTo(i)}
            loading="lazy"
          />
        ))}
      </div>
      <div
        className="testimonial-card"
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(8px)' : 'translateY(0px)',
          transition: 'opacity 0.22s ease-out, transform 0.22s ease-out',
        }}
      >
        <h4>{t.name}</h4>
        <span className="role">{t.role}</span>
        <p>{t.text}</p>
      </div>
      <div className="testimonial-controls">
        <button className="t-btn" type="button" onClick={prev} aria-label="Previous testimonial">
          <i className="fas fa-chevron-left" />
        </button>
        <button className="t-btn" type="button" onClick={next} aria-label="Next testimonial">
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}
