import React from 'react';

export type ATSSuggestion = {
  type: 'good' | 'improve';
  tip: string;
};

type ATSProps = {
  score: number; // 0-100
  suggestions: ATSSuggestion[];
};

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));

  let fromClass = 'from-red-100';
  let icon = '/icons/ats-bad.svg';

  if (clamped > 69) {
    fromClass = 'from-green-100';
    icon = '/icons/ats-good.svg';
  } else if (clamped > 49) {
    fromClass = 'from-yellow-100';
    icon = '/icons/ats-warning.svg';
  }

  const suggestionIcon = (type: ATSSuggestion['type']) =>
    type === 'good' ? '/icons/check.svg' : '/icons/warning.svg';

  return (
    <section
      className={`bg-gradient-to-br ${fromClass} to-white rounded-2xl shadow-md p-6 w-full`}
      aria-label="ATS score and suggestions"
    >
      {/* Top section: icon + headline */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={icon}
          alt={
            clamped > 69
              ? 'Great ATS compatibility'
              : clamped > 49
              ? 'Moderate ATS compatibility'
              : 'Low ATS compatibility'
          }
          className="h-10 w-10"
        />
        <h3 className="text-xl font-semibold">ATS Score – {clamped}/100</h3>
      </div>

      {/* Description section */}
      <div className="flex flex-col gap-2">
        <p className="text-base font-medium">Applicant Tracking System readiness</p>
        <p className="text-sm text-gray-600">
          This score estimates how well your resume content and formatting can be parsed by
          Applicant Tracking Systems recruiters use to filter candidates.
        </p>
      </div>

      {/* Suggestions list */}
      {suggestions && suggestions.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {suggestions.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <img
                src={suggestionIcon(s.type)}
                alt={s.type === 'good' ? 'Good' : 'Improve'}
                className="h-5 w-5 mt-0.5"
              />
              <span className="text-sm text-gray-800">{s.tip}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-gray-600">No suggestions at the moment.</p>
      )}

      {/* Closing line */}
      <p className="mt-5 text-sm text-gray-700">
        Keep refining your resume for better ATS compatibility and higher visibility.
      </p>
    </section>
  );
};

export default ATS;