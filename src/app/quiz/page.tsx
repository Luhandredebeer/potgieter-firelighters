'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import {
  QUIZ_OUTCOMES,
  getProductById,
  getBundleById,
} from '@/data/products';
import { formatZAR } from '@/lib/constants';
import type { QuizOutcome } from '@/types';

// =================================================================
// QUIZ DEFINITION
// =================================================================
// Each answer contributes weighted points to one or more outcomes.
// The outcome with the highest score wins.
// =================================================================
type Outcome = QuizOutcome;
type Weights = Partial<Record<Outcome, number>>;

interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; weights: Weights }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'location',
    question: 'Where are you spending the weekend?',
    options: [
      {
        label: 'At home with family',
        weights: { 'braai-night': 3, 'loadshedding-prep': 1 },
      },
      {
        label: 'Camping somewhere quiet',
        weights: { 'camping-weekend': 3, 'bushveld-trip': 1 },
      },
      {
        label: 'On a hunting / bushveld trip',
        weights: { 'bushveld-trip': 3, 'camping-weekend': 1 },
      },
      {
        label: 'Stuck inside (probably loadshedding)',
        weights: { 'loadshedding-prep': 3, 'braai-night': 1 },
      },
    ],
  },
  {
    id: 'group',
    question: 'Who\'s coming?',
    options: [
      {
        label: 'Just family',
        weights: { 'braai-night': 2, 'loadshedding-prep': 1 },
      },
      {
        label: 'Mates for the rugby',
        weights: { 'braai-night': 3 },
      },
      {
        label: 'A small camping crew',
        weights: { 'camping-weekend': 3, 'bushveld-trip': 1 },
      },
      {
        label: 'Just me and the boys',
        weights: { 'bushveld-trip': 3, 'camping-weekend': 1 },
      },
    ],
  },
  {
    id: 'fire-size',
    question: 'What kind of fire are you building?',
    options: [
      {
        label: 'Quick weekday braai',
        weights: { 'braai-night': 3, 'loadshedding-prep': 1 },
      },
      {
        label: 'Big Saturday braai',
        weights: { 'braai-night': 3, 'bushveld-trip': 1 },
      },
      {
        label: 'Campfire under the stars',
        weights: { 'camping-weekend': 3, 'bushveld-trip': 2 },
      },
      {
        label: 'Need to cook when the lights are out',
        weights: { 'loadshedding-prep': 3 },
      },
    ],
  },
  {
    id: 'conditions',
    question: 'What conditions are you working with?',
    options: [
      {
        label: 'Calm and dry',
        weights: { 'braai-night': 2, 'camping-weekend': 1 },
      },
      {
        label: 'Wind and possibly damp wood',
        weights: { 'bushveld-trip': 3, 'camping-weekend': 2 },
      },
      {
        label: 'Whatever Eskom throws at me',
        weights: { 'loadshedding-prep': 3 },
      },
      {
        label: 'Cold, early morning',
        weights: { 'camping-weekend': 2, 'bushveld-trip': 2 },
      },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => setStep(0);

  const handleAnswer = (questionId: string, optionIndex: number) => {
    setAnswers((a) => ({ ...a, [questionId]: optionIndex }));
    setTimeout(() => setStep((s) => s + 1), 300);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const calculateOutcome = (): Outcome => {
    const scores: Record<Outcome, number> = {
      'braai-night': 0,
      'camping-weekend': 0,
      'loadshedding-prep': 0,
      'bushveld-trip': 0,
    };
    QUESTIONS.forEach((q) => {
      const idx = answers[q.id];
      if (idx == null) return;
      const weights = q.options[idx].weights;
      (Object.entries(weights) as [Outcome, number][]).forEach(([k, v]) => {
        scores[k] += v;
      });
    });
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as Outcome) ||
      'braai-night';
  };

  const isComplete = step >= QUESTIONS.length;
  const outcome = isComplete ? QUIZ_OUTCOMES[calculateOutcome()] : null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire to your email provider (Klaviyo, Mailchimp, Shopify Customer)
    // Or send to Typeform via webhook for unified CRM
    setSubmitted(true);
  };

  return (
    <section className="min-h-[100svh] bg-cream-50 pt-32 pb-20 sm:pt-40 sm:pb-28 relative overflow-hidden">
      {/* Subtle ember glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ember-glow opacity-30 pointer-events-none" />

      <Container size="narrow" className="relative">
        {/* Progress */}
        {step >= 0 && !isComplete && (
          <div className="mb-12">
            <div className="flex items-center justify-between text-xs tracking-widest uppercase text-coal-700 mb-3">
              <span>Question {step + 1} of {QUESTIONS.length}</span>
              <button
                onClick={handleBack}
                disabled={step === 0}
                className="hover:text-ember-600 disabled:opacity-30 transition-colors"
              >
                ← Back
              </button>
            </div>
            <div className="h-1 bg-coal-900/10 overflow-hidden">
              <motion.div
                className="h-full bg-ember-500"
                animate={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Intro */}
          {step === -1 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <p className="eyebrow">The Weekend Quiz</p>
              <h1 className="mt-4 font-display uppercase text-display-sm sm:text-display-md md:text-display-lg tracking-wide leading-[0.88] text-balance">
                What Kind <br />
                Of Weekend <br />
                <span className="text-ember-500">Are You In For?</span>
              </h1>
              <p className="mt-7 max-w-md mx-auto text-coal-700 leading-relaxed">
                Four quick questions. We'll match you with the products you actually
                need for the weekend you're actually planning.
              </p>
              <Button onClick={handleStart} variant="primary" size="lg" className="mt-10">
                Start The Quiz
              </Button>
              <p className="mt-6 text-xs text-coal-700/60">Takes 30 seconds</p>
            </motion.div>
          )}

          {/* Questions */}
          {step >= 0 && step < QUESTIONS.length && (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-display uppercase text-display-xs sm:text-display-sm tracking-wide leading-[0.95] text-balance">
                {QUESTIONS[step].question}
              </h2>

              <div className="mt-10 space-y-3">
                {QUESTIONS[step].options.map((opt, i) => {
                  const selected = answers[QUESTIONS[step].id] === i;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleAnswer(QUESTIONS[step].id, i)}
                      className={`w-full text-left flex items-center gap-4 p-5 sm:p-6 border-2 transition-all ${
                        selected
                          ? 'bg-coal-900 border-coal-900 text-cream-50'
                          : 'bg-cream-100/50 border-coal-900/15 text-coal-900 hover:border-coal-900 hover:bg-cream-100'
                      }`}
                    >
                      <span
                        className={`w-9 h-9 flex items-center justify-center font-display tracking-widest text-sm shrink-0 ${
                          selected
                            ? 'bg-ember-500 text-cream-50'
                            : 'bg-cream-50 text-coal-900 border border-coal-900/20'
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="font-medium text-base sm:text-lg">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Result */}
          {isComplete && outcome && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <p className="eyebrow">Your Match</p>
                <h2 className="mt-4 font-display uppercase text-display-xs sm:text-display-sm md:text-display-md tracking-wide leading-[0.92] text-balance">
                  {outcome.title}
                </h2>
                <p className="mt-6 max-w-xl mx-auto text-coal-700 leading-relaxed">
                  {outcome.blurb}
                </p>
              </div>

              {/* Recommended products */}
              <div className="mt-14">
                <p className="eyebrow text-center mb-6">What You'll Need</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {outcome.recommendedProductIds.map((id) => {
                    const p = getProductById(id);
                    if (!p) return null;
                    return (
                      <Link
                        key={p.id}
                        href={`/shop?product=${p.handle}`}
                        className="group bg-cream-100 p-4 flex gap-4 items-center hover:bg-cream-200/50 transition-colors"
                      >
                        <div className="relative w-20 h-20 shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display tracking-wide text-lg text-coal-900 leading-tight">
                            {p.name}
                          </p>
                          <p className="text-xs text-coal-700 mt-1 line-clamp-2">
                            {p.tagline}
                          </p>
                          <p className="mt-2 font-display tracking-wide text-sm">
                            {formatZAR(p.price)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Recommended bundle */}
              {outcome.recommendedBundleIds[0] &&
                getBundleById(outcome.recommendedBundleIds[0]) && (
                  <div className="mt-14 bg-coal-900 text-cream-50 p-8 sm:p-10">
                    <p className="eyebrow text-ember-400">Or Grab The Kit</p>
                    {(() => {
                      const b = getBundleById(outcome.recommendedBundleIds[0])!;
                      return (
                        <>
                          <h3 className="mt-3 font-display text-3xl sm:text-4xl tracking-wide leading-none">
                            {b.name}
                          </h3>
                          <p className="mt-4 text-cream-200/80 max-w-md leading-relaxed">
                            {b.description}
                          </p>
                          <div className="mt-6 flex items-center gap-4">
                            <span className="font-display text-2xl tracking-wide">
                              {formatZAR(b.price)}
                            </span>
                            <Button
                              href={`/shop?bundle=${b.handle}`}
                              variant="secondary"
                              size="md"
                            >
                              Add Bundle
                            </Button>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                )}

              {/* Email capture */}
              {!submitted ? (
                <form
                  onSubmit={handleEmailSubmit}
                  className="mt-14 bg-cream-100 p-7 sm:p-10 text-center"
                >
                  <h3 className="font-display text-2xl sm:text-3xl tracking-wide text-coal-900 leading-none">
                    Want this saved?
                  </h3>
                  <p className="mt-3 text-coal-700 max-w-md mx-auto text-sm">
                    We'll email your results and the occasional weekend discount.
                  </p>
                  <div className="mt-5 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.co.za"
                      className="flex-1 bg-cream-50 px-4 py-3 outline-none text-coal-900 border border-coal-900/15 focus:border-coal-900"
                    />
                    <button
                      type="submit"
                      className="font-display tracking-widest text-sm bg-coal-900 hover:bg-ember-600 text-cream-50 px-6 py-3 transition-colors"
                    >
                      Email My Results
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-14 bg-veld-600/10 border border-veld-600/30 p-7 text-center">
                  <p className="font-display text-2xl tracking-wide text-veld-700">
                    Sent! Check your inbox.
                  </p>
                </div>
              )}

              <div className="mt-10 text-center">
                <button
                  onClick={() => {
                    setStep(-1);
                    setAnswers({});
                    setSubmitted(false);
                    setEmail('');
                  }}
                  className="font-display tracking-widest text-xs text-coal-700 hover:text-ember-600 transition-colors border-b border-coal-700 hover:border-ember-600 pb-1"
                >
                  Retake The Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
}
