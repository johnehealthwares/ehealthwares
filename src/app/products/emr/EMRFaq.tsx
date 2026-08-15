'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export function EMRFaq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq-grid">
      {[items.slice(0, Math.ceil(items.length / 2)), items.slice(Math.ceil(items.length / 2))].map(
        (column, colIndex) => (
          <div className="faq-column" key={colIndex}>
            {column.map((item) => (
              <FaqRow key={item.q} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={open ? 'faq-item reveal active faq-expanded' : 'faq-item reveal active'}>
      <div
        className="faq-question"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {item.q} <i className="fas fa-plus" />
      </div>
      <p className="faq-answer">{item.a}</p>
    </div>
  );
}
