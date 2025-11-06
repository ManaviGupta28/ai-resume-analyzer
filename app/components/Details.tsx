import React from 'react';
import { cn } from "~/lib/util";
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "~/components/Accordion";

// Local helper types for clarity
type Tip = {
  type: 'good' | 'improve';
  tip: string;
  explanation: string;
};

// Inline helper: ScoreBadge (local to this file)
const ScoreBadge: React.FC<{ score: number; className?: string }> = ({ score, className }) => {
  const green = score > 69;
  const yellow = !green && score > 39;

  const bg = green ? 'bg-green-100' : yellow ? 'bg-yellow-100' : 'bg-red-100';
  const text = green ? 'text-green-700' : yellow ? 'text-yellow-700' : 'text-red-700';
  const ring = green ? 'ring-green-200' : yellow ? 'ring-yellow-200' : 'ring-red-200';
  const icon = green ? '/icons/check.svg' : '/icons/warning.svg';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1',
        bg,
        text,
        ring,
        className
      )}
    >
      <img src={icon} alt={green ? 'Good' : 'Warning'} className="h-3.5 w-3.5" />
      <span>({Math.max(0, Math.min(100, Math.round(score)))})/100</span>
    </span>
  );
};

// Inline helper: CategoryHeader
const CategoryHeader: React.FC<{ title: string; categoryScore: number }> = ({ title, categoryScore }) => (
  <div className="flex items-center justify-between">
    <h4 className="text-base font-semibold text-gray-900">{title}</h4>
    <ScoreBadge score={categoryScore} />
  </div>
);

// Inline helper: CategoryContent
const CategoryContent: React.FC<{ tips: Tip[] }> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return <p className="text-sm text-gray-600">No tips available.</p>;
  }

  // Filter out tips with empty explanations and ensure both fields exist
  const validTips = tips.filter(t => t.tip && t.tip.trim() && t.explanation && t.explanation.trim());

  if (validTips.length === 0) {
    return <p className="text-sm text-gray-600">No valid tips available. Please re-analyze your resume.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Two-column tips grid */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {validTips.map((t, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <img
              src={t.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'}
              alt={t.type === 'good' ? 'Good' : 'Improve'}
              className="h-4 w-4 mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-gray-800">{t.tip}</span>
          </li>
        ))}
      </ul>

      {/* Explanations list */}
      <div className="space-y-2">
        {validTips.map((t, idx) => (
          <div
            key={`exp-${idx}`}
            className={cn(
              'rounded-lg border p-3 text-sm',
              t.type === 'good'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-yellow-50 border-yellow-200 text-yellow-800'
            )}
          >
            <p className="font-medium mb-1">{t.type === 'good' ? 'What you did well' : 'How to improve'}</p>
            <p className="text-[13px] leading-relaxed">{t.explanation || 'No explanation provided.'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const Details: React.FC<{ feedback: Feedback }> = ({ feedback }) => {
  const sections = [
    {
      id: 'tone',
      title: 'Tone & Style',
      score: feedback.toneAndStyle?.score ?? 0,
      tips: feedback.toneAndStyle?.tips ?? [],
    },
    { id: 'content', title: 'Content', score: feedback.content?.score ?? 0, tips: feedback.content?.tips ?? [] },
    { id: 'structure', title: 'Structure', score: feedback.structure?.score ?? 0, tips: feedback.structure?.tips ?? [] },
    { id: 'skills', title: 'Skills', score: feedback.skills?.score ?? 0, tips: feedback.skills?.tips ?? [] },
  ];

  return (
    <section className="w-full rounded-2xl bg-white shadow-md">
      <Accordion allowMultiple defaultOpen={sections[0].id} className="divide-y divide-gray-100">
        {sections.map((s) => (
          <AccordionItem key={s.id} id={s.id}>
            <AccordionHeader itemId={s.id} className="bg-white hover:bg-gray-50">
              <CategoryHeader title={s.title} categoryScore={s.score} />
            </AccordionHeader>
            <AccordionContent itemId={s.id}>
              <CategoryContent tips={s.tips as Tip[]} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Details;