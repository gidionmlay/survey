/**
 * Cadence — The Rhythm of Money
 * Centralized survey type system.
 * All components MUST import from here. No local type re-definitions.
 * Designed for Phase 1 emotional UX + Phase 2 adaptive intelligence readiness.
 */

export interface LocalizedText {
  en: string;
  sw: string;
}

export interface Option {
  id: string;
  label: LocalizedText;
}

/**
 * The four emotional journey stages of the Cadence survey.
 * Each stage has a distinct emotional tone and visual theme.
 */
export type SurveyStage =
  | 'awareness'    // Gentle entry — emotional safety, low friction
  | 'reflection'   // Identifying patterns, stress triggers, rhythms
  | 'exploration'  // Deeper emotional insight, habits, money relationship
  | 'vision';      // Hopeful future — aspirations, closure, optimism

export type QuestionType =
  | 'single'          // One selection, auto-advances
  | 'multiple'        // Multi-select with optional cap
  | 'scale'           // Emotionally labeled 1–5 scale
  | 'textarea'        // Required open reflection (use sparingly — 5% target)
  | 'boolean-text'    // Yes/No with conditional follow-up
  | 'hybrid'          // Selection + optional reflection textarea (core UX pattern)
  | 'transition';     // Emotional bridge between stages

export interface Question {
  id: string;
  type: QuestionType;
  stage: SurveyStage;

  /** Emotional character of this question — for future AI tagging (Phase 2) */
  emotionalTone?: string;

  /** Primary question text */
  title: LocalizedText;

  /** Softer secondary framing shown below the title */
  subtitle?: LocalizedText;

  /** Small helper text shown at bottom of question (guidance, not instruction) */
  helperText?: LocalizedText;

  /** Options for single, multiple, boolean-text, and hybrid question types */
  options?: Option[];

  /** Textarea placeholder text */
  placeholder?: LocalizedText;

  /** Max number of selections for multiple/hybrid types */
  maxSelect?: number;

  /** Whether the question must be answered to proceed */
  required?: boolean;

  /**
   * Hybrid questions: after selection, show an optional textarea.
   * Implements the 20% "optional reflection" UX ratio.
   */
  allowOptionalText?: boolean;

  /** Label for the optional textarea reveal — replaces generic "Share more?" */
  optionalTextPrompt?: LocalizedText;

  /** For boolean-text: the follow-up question shown when user selects 'yes' */
  followUp?: LocalizedText;

  /**
   * Emotionally descriptive scale labels (1–5).
   * Replaces plain numbers with human-centered emotional anchors.
   */
  scaleLabels?: {
    1: LocalizedText;
    2: LocalizedText;
    3: LocalizedText;
    4: LocalizedText;
    5: LocalizedText;
  };

  /**
   * Phase 2 readiness: conditional display logic.
   * Reserved for adaptive branching — not yet active.
   */
  conditional?: {
    dependsOn: string;
    value: string;
  };
}

export type Language = 'en' | 'sw';
