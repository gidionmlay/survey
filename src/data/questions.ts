import type { Question } from '../types/survey';

// Re-export all shared types so existing imports from this module continue to work.
export type { QuestionType, SurveyStage, Language, Option, LocalizedText } from '../types/survey';
export type { Question };

/**
 * Cadence — The Rhythm of Money
 * Full survey question sequence, designed as a psychological emotional journey.
 *
 * Stage architecture:
 *   awareness   → emotional safety, easy entry, low friction
 *   reflection  → identify patterns, stress triggers, rhythms
 *   exploration → deeper emotional insight, money relationship
 *   vision      → hopeful future, aspirations, positive closure
 *
 * Interaction ratio targets:
 *   ~75% selectable  |  ~20% optional reflection  |  ~5% required text
 */
export const questions: Question[] = [

  // ─────────────────────────────────────────────────────────────────────────
  // STAGE 1 — AWARENESS
  // Goal: emotional safety, build trust, easy participation, low friction
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'q1',
    type: 'single',
    stage: 'awareness',
    emotionalTone: 'grounding',
    title: {
      en: 'How would you describe your relationship with money right now?',
      sw: 'Kwa sasa, ungeelezeaje uhusiano wako na pesa?',
    },
    subtitle: {
      en: 'There\'s no right or wrong answer here — just your honest feeling.',
      sw: 'Hakuna jibu sahihi au baya — ni hisia yako halisi tu.',
    },
    options: [
      { id: 'q1_calm',    label: { en: 'Calm and grounded',               sw: 'Utulivu na nina udhibiti' } },
      { id: 'q1_okay',    label: { en: 'Managing day-to-day',             sw: 'Sawa, nasimamia matumizi ya kila siku' } },
      { id: 'q1_uneasy',  label: { en: 'A little uncertain',              sw: 'Nina wasiwasi kidogo' } },
      { id: 'q1_stress',  label: { en: 'Stressed or overwhelmed',         sw: 'Ninahisi msongo wa mawazo' } },
      { id: 'q1_avoid',   label: { en: 'I prefer not to think about it',  sw: 'Huepuka kufikiria kuhusu pesa' } },
    ],
  },

  {
    id: 'q2',
    type: 'single',
    stage: 'awareness',
    emotionalTone: 'orientation',
    title: {
      en: 'Which statement feels most like your current financial reality, {firstName}?',
      sw: 'Ni kauli ipi inaelezea vizuri hali yako ya kifedha kwa sasa, {firstName}?',
    },
    options: [
      { id: 'q2_control',  label: { en: 'I have a clear picture of where my money goes',  sw: 'Nina picha wazi ya matumizi yangu ya kila mwezi' } },
      { id: 'q2_mostly',   label: { en: 'I have a general sense, but miss the details',   sw: 'Nina wazo la jumla, lakini nakosa maelezo ya kina' } },
      { id: 'q2_blur',     label: { en: 'It often feels unpredictable',                   sw: 'Huwa inabadilika na kutabirika kwa shida' } },
      { id: 'q2_chaos',    label: { en: 'It feels disconnected from my daily reality',    sw: 'Huwa inahisi kama kitendawili' } },
    ],
  },

  {
    id: 'q3',
    type: 'single',
    stage: 'awareness',
    emotionalTone: 'habit-orientation',
    title: {
      en: 'How do you usually keep track of what you spend?',
      sw: 'Kwa kawaida unafuatiliaje matumizi yako ya kila siku?',
    },
    options: [
      { id: 'q3_mental',    label: { en: 'I keep a mental note',              sw: 'Naweka kumbukumbu kichwani' } },
      { id: 'q3_notebook',  label: { en: 'I write it down in a notebook',     sw: 'Naandika kwenye daftari' } },
      { id: 'q3_sheet',     label: { en: 'I use a spreadsheet',               sw: 'Natumia laha (spreadsheet)' } },
      { id: 'q3_app',       label: { en: 'I rely on a digital app',           sw: 'Natumia app kwenye simu' } },
      { id: 'q3_bank',      label: { en: 'I review my bank statements',       sw: 'Napitia taarifa za benki' } },
      { id: 'q3_none',      label: { en: 'I prefer to just let it flow naturally', sw: 'Sifuatilii sana, naacha mambo yajipeleke' } },
    ],
  },

  // Stage transition: Awareness → Reflection
  {
    id: 'transition_to_reflection',
    type: 'transition',
    stage: 'reflection',
    emotionalTone: 'bridge',
    title: {
      en: 'Thank you for sharing that.\n\nNow let\'s gently explore the moments when money feels most challenging.',
      sw: 'Asante kwa kuwa mkweli.\n\nSasa hebu tuangazie kwa upole zile nyakati ambapo masuala ya kifedha huwa na changamoto zaidi.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STAGE 2 — REFLECTION
  // Goal: identify financial patterns, stress triggers, behavioral rhythms
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'q4',
    type: 'hybrid',
    stage: 'reflection',
    emotionalTone: 'pattern-recognition',
    required: true,
    title: {
      en: 'Which of these experiences feels most familiar right now?',
      sw: 'Ni yapi kati ya haya yanayoelezea zaidi hali unayopitia sasa?',
    },
    subtitle: {
      en: 'Select all that resonate — you can choose up to 3.',
      sw: 'Chagua yote yanayokugusa — unaweza kuchagua hadi 3.',
    },
    options: [
      { id: 'q4_debt',      label: { en: 'Managing ongoing debt',               sw: 'Shinikizo la kulipa madeni' } },
      { id: 'q4_income',    label: { en: 'Navigating an inconsistent income',   sw: 'Kipato kinachobadilika mara kwa mara' } },
      { id: 'q4_saving',    label: { en: 'Finding it difficult to build savings', sw: 'Ugumu wa kujenga akiba' } },
      { id: 'q4_spending',  label: { en: 'Making unplanned purchases',          sw: 'Kufanya matumizi yasiyopangwa' } },
      { id: 'q4_anxiety',   label: { en: 'Carrying financial worry',            sw: 'Wasiwasi wa mara kwa mara kuhusu pesa' } },
      { id: 'q4_future',    label: { en: 'Feeling uncertain about the future',  sw: 'Kutokuwa na uhakika wa kifedha wa baadaye' } },
      { id: 'q4_vanish',    label: { en: 'Feeling like money slips away too quickly', sw: 'Kuhisi kama pesa inayeyuka haraka sana' } },
    ],
    maxSelect: 3,
    allowOptionalText: true,
    optionalTextPrompt: {
      en: 'Would you like to share a little more about this?',
      sw: 'Ungependa kuelezea zaidi kuhusu hili?',
    },
    placeholder: {
      en: 'Share as little or as much as you\'d like...',
      sw: 'Shiriki kidogo au kiasi unachojisikia...',
    },
  },

  {
    id: 'q5',
    type: 'scale',
    stage: 'reflection',
    required: true,
    emotionalTone: 'stress-calibration',
    title: {
      en: 'How would you describe the impact of financial pressure on your daily life?',
      sw: 'Kwa sasa, masuala ya kifedha yanaathiri vipi amani yako ya moyo na maisha ya kila siku?',
    },
    helperText: {
      en: 'Tap the number that feels most true to you right now.',
      sw: 'Gusa nambari inayokuhisi kweli zaidi sasa hivi.',
    },
    scaleLabels: {
      1: { en: 'It rarely crosses my mind',          sw: 'Hayaathiri amani yangu mara nyingi' },
      2: { en: 'It occasionally surfaces',           sw: 'Huja akilini mara kwa mara' },
      3: { en: 'It\'s a noticeable background presence', sw: 'Yapo nyuma ya akili yangu kila wakati' },
      4: { en: 'It often feels heavy',               sw: 'Yananiwekea uzito mara nyingi' },
      5: { en: 'It feels constant and overwhelming', sw: 'Yananisonga na kunichosha kila wakati' },
    },
  },

  {
    id: 'q6',
    type: 'boolean-text',
    stage: 'reflection',
    emotionalTone: 'moment-recall',
    title: {
      en: '{firstName}, do you ever experience that sudden realization of, "Wait, where did my money go?"',
      sw: '{firstName}, umewahi kushtuka na kujiuliza, "Hivi pesa yangu imeishaje?"',
    },
    subtitle: {
      en: 'It\'s a deeply common experience — you\'re not alone in feeling this way.',
      sw: 'Hii ni hali ya kawaida sana inayowatokea watu wengi.',
    },
    options: [
      { id: 'yes', label: { en: 'Yes, quite often', sw: 'Ndiyo, mara nyingi' } },
      { id: 'no',  label: { en: 'Rarely, if ever',  sw: 'Hapana, mara chache sana' } },
    ],
    followUp: {
      en: 'If you\'re comfortable, what usually triggers that moment for you?',
      sw: 'Ikiwa utapenda kushiriki, ni nini hasa huchangia wakati huo kwako?',
    },
    placeholder: {
      en: 'Share what you remember — even a brief description...',
      sw: 'Shiriki unachokumbuka — hata maelezo mafupi...',
    },
  },

  {
    id: 'q7',
    type: 'single',
    stage: 'reflection',
    emotionalTone: 'frequency-check',
    title: {
      en: 'As the month comes to a close, how do you typically feel about your standing?',
      sw: 'Kila mwezi unapokaribia kuisha, huwa unajisikiaje kuhusu hali yako ya kifedha?',
    },
    options: [
      { id: 'q7_rarely',   label: { en: 'Grounded and secure',                         sw: 'Nakuwa imara na salama' } },
      { id: 'q7_sometimes',label: { en: 'It fluctuates depending on the month',        sw: 'Hubadilika kulingana na mwezi' } },
      { id: 'q7_often',    label: { en: 'Often catching up from behind',               sw: 'Mara nyingi najikuta niko nyuma' } },
      { id: 'q7_always',   label: { en: 'Constantly trying to find balance',           sw: 'Huwa najitahidi sana kuweka mambo sawa lakini haitoshi' } },
    ],
  },

  // Stage transition: Reflection → Exploration
  {
    id: 'transition_to_exploration',
    type: 'transition',
    stage: 'exploration',
    emotionalTone: 'bridge',
    title: {
      en: 'Thank you for reflecting on that.\n\nNow, let\'s look closer at the habits and deeper feelings connected to your financial rhythm.',
      sw: 'Asante sana kwa kutafakari hili kwa kina.\n\nSasa, hebu tuangazie zaidi tabia na hisia zinazoathiri mwenendo wako wa kifedha.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STAGE 3 — EXPLORATION
  // Goal: deeper emotional insight, habits, emotional responses to money
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'q8',
    type: 'hybrid',
    stage: 'exploration',
    emotionalTone: 'emotional-response',
    title: {
      en: 'Which emotions feel most present when you think about your finances right now?',
      sw: 'Ni hisia zipi zinajitokeza zaidi unapofikiria hali yako ya kifedha sasa hivi?',
    },
    subtitle: {
      en: 'Choose up to 3 that feel most honest.',
      sw: 'Chagua hadi 3 zinazohisi kweli zaidi.',
    },
    options: [
      { id: 'q8_stress',   label: { en: 'Stress or anxiety',               sw: 'Msongo wa mawazo au wasiwasi' } },
      { id: 'q8_shame',    label: { en: 'A sense of guilt or regret',      sw: 'Kujutia au kujilaumu' } },
      { id: 'q8_hope',     label: { en: 'Hope and quiet optimism',         sw: 'Matumaini na imani' } },
      { id: 'q8_numb',     label: { en: 'A desire to avoid thinking about it', sw: 'Haja ya kukwepa kufikiria' } },
      { id: 'q8_frustr',   label: { en: 'Frustration or impatience',       sw: 'Kukatishwa tamaa' } },
      { id: 'q8_content',  label: { en: 'Calm and contentment',            sw: 'Utulivu na kuridhika' } },
      { id: 'q8_fear',     label: { en: 'Worry about the future',          sw: 'Wasiwasi kuhusu kesho' } },
      { id: 'q8_determ',   label: { en: 'A strong motivation to change',   sw: 'Ari kubwa ya kufanya mabadiliko' } },
    ],
    maxSelect: 3,
    allowOptionalText: true,
    optionalTextPrompt: {
      en: 'If you\'d like, say more about the emotions you\'re experiencing.',
      sw: 'Ikiwa ungependa, elezea zaidi kuhusu hisia unazozipitia.',
    },
    placeholder: {
      en: 'In your own words...',
      sw: 'Kwa maneno yako mwenyewe...',
    },
  },

  {
    id: 'q9',
    type: 'single',
    stage: 'exploration',
    emotionalTone: 'trigger-identification',
    title: {
      en: 'When unplanned spending happens, what usually initiates it?',
      sw: 'Unapofanya matumizi yasiyopangwa, huwa mara nyingi ni nini kimekuchochea?',
    },
    options: [
      { id: 'q9_emotion',  label: { en: 'Seeking comfort during stressful moments',  sw: 'Kutafuta faraja wakati wa msongo' } },
      { id: 'q9_social',   label: { en: 'Social environments and connecting with others', sw: 'Kuwa na marafiki na mazingira ya kijamii' } },
      { id: 'q9_sales',    label: { en: 'An unexpected opportunity or discount',     sw: 'Fursa au ofa isiyotarajiwa' } },
      { id: 'q9_boredom',  label: { en: 'Filling empty time',                        sw: 'Kuondoa uchovu au upweke' } },
      { id: 'q9_habit',    label: { en: 'Unconscious habit',                         sw: 'Tabia ambayo sijaipa umakini' } },
      { id: 'q9_none',     label: { en: 'It rarely happens',                         sw: 'Mara chache sana hufanya hivyo' } },
    ],
  },

  {
    id: 'q10',
    type: 'hybrid',
    stage: 'exploration',
    emotionalTone: 'past-attempts',
    title: {
      en: 'Looking back, how would you describe your past attempts to shift your financial habits?',
      sw: 'Ukikumbuka nyuma, unaelezeaje juhudi zako za kubadili tabia zako za kifedha?',
    },
    options: [
      { id: 'q10_yes_worked',  label: { en: 'I found a rhythm that works for me',      sw: 'Nimepata mfumo unaonifaa' } },
      { id: 'q10_yes_partial', label: { en: 'I made progress, but it\'s been inconsistent', sw: 'Nimepiga hatua, lakini inabadilika-badilika' } },
      { id: 'q10_yes_fail',    label: { en: 'I tried, but it was hard to sustain',     sw: 'Nilijaribu, lakini ilikuwa ngumu kudumisha' } },
      { id: 'q10_no',          label: { en: 'I\'m just beginning to explore this',     sw: 'Ndio kwanza naanza kufikiria mabadiliko haya' } },
    ],
    allowOptionalText: true,
    optionalTextPrompt: {
      en: 'What approach did you try, and what did you learn from it?',
      sw: 'Ulijaribu mbinu gani, na umejifunza nini kutokana na hilo?',
    },
    placeholder: {
      en: 'Even a short reflection is helpful...',
      sw: 'Hata tafakuri fupi itasaidia...',
    },
  },

  {
    id: 'q11',
    type: 'scale',
    stage: 'exploration',
    required: true,
    emotionalTone: 'clarity-confidence',
    title: {
      en: 'At this moment in your life, how deep is your understanding of your financial flow?',
      sw: 'Katika kipindi hiki cha maisha yako, unaelewa kwa kina kiasi gani kuhusu mtiririko wako wa kifedha?',
    },
    helperText: {
      en: 'Be honest — this helps us understand the gap between knowing and not knowing.',
      sw: 'Kuwa mkweli — hii inatusaidia kuelewa pengo kati ya kujua na kutojua.',
    },
    scaleLabels: {
      1: { en: 'It feels unclear and disconnected',      sw: 'Haieleweki na ina mkanganyiko' },
      2: { en: 'I only see the surface',                 sw: 'Naona kwa juu juu tu' },
      3: { en: 'I grasp the big picture, but not the nuances', sw: 'Naelewa picha kubwa, lakini si kwa undani' },
      4: { en: 'I have a solid understanding',           sw: 'Nina uelewa mzuri na imara' },
      5: { en: 'I feel deeply attuned to my flow',       sw: 'Naelewa kikamilifu mtiririko wangu' },
    },
  },

  // Stage transition: Exploration → Vision
  {
    id: 'transition_to_vision',
    type: 'transition',
    stage: 'vision',
    emotionalTone: 'bridge',
    title: {
      en: 'You\'ve been incredibly insightful.\n\nFinally, let\'s look forward. Let\'s envision what financial clarity could look like for you.',
      sw: 'Umeonyesha utambuzi mkubwa.\n\nMwisho, hebu tuangalie mbele. Tufikirie jinsi uwazi na amani ya kifedha inavyoweza kuwa kwako.',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // STAGE 4 — VISION
  // Goal: hope, aspirations, positive closure — end the experience positively
  // ─────────────────────────────────────────────────────────────────────────

  {
    id: 'q12',
    type: 'hybrid',
    stage: 'vision',
    required: true,
    emotionalTone: 'aspiration',
    title: {
      en: 'Imagine a financial companion that genuinely understands you. What would it help you achieve?',
      sw: 'Fikiria msaidizi wa kifedha anayekuelewa kikweli. Je, angekusaidia kufikia nini?',
    },
    subtitle: {
      en: 'Choose up to 3 features that would actually change things for you.',
      sw: 'Chagua hadi vipengele 3 ambavyo vingekubadilishia mambo kweli kweli.',
    },
    options: [
      { id: 'q12_where',   label: { en: 'Illuminating my daily spending patterns',       sw: 'Kuangazia mwenendo wa matumizi yangu' } },
      { id: 'q12_predict', label: { en: 'Anticipating my future financial needs',        sw: 'Kutabiri mahitaji yangu ya kifedha ya baadaye' } },
      { id: 'q12_save',    label: { en: 'Gently encouraging a lasting saving routine',   sw: 'Kunipa hamasa ya kujenga tabia ya akiba' } },
      { id: 'q12_alerts',  label: { en: 'Offering timely, gentle nudges',                sw: 'Kunipa taarifa muhimu kwa wakati sahihi' } },
      { id: 'q12_goals',   label: { en: 'Clarifying the steps to my bigger goals',       sw: 'Kuweka wazi hatua za kufikia malengo yangu makubwa' } },
      { id: 'q12_insight', label: { en: 'Revealing the emotional "why" behind my spending', sw: 'Kufunua hisia zilizo nyuma ya matumizi yangu' } },
      { id: 'q12_coach',   label: { en: 'Providing personalized guidance and support',   sw: 'Kutoa mwongozo na ushauri wa kibinafsi' } },
    ],
    maxSelect: 3,
    allowOptionalText: true,
    optionalTextPrompt: {
      en: 'What is the one thing you feel is missing from the tools you\'ve used before?',
      sw: 'Kuna kitu kipi muhimu unachohisi kinakosekana kwenye mifumo uliyowahi kutumia?',
    },
    placeholder: {
      en: 'Something a tool has never quite got right for you...',
      sw: 'Kitu ambacho chombo hakijawahi kukufanyia vizuri...',
    },
  },

  {
    id: 'q13',
    type: 'scale',
    stage: 'vision',
    required: true,
    emotionalTone: 'openness',
    title: {
      en: 'How ready do you feel right now to gently shift your financial rhythms?',
      sw: 'Unajisikia tayari kiasi gani kuanza kuboresha mwenendo wako wa kifedha?',
    },
    helperText: {
      en: 'No commitment — this helps us understand where you are right now.',
      sw: 'Bila ahadi — hii inatusaidia kuelewa uko wapi sasa hivi.',
    },
    scaleLabels: {
      1: { en: 'It feels too overwhelming right now',   sw: 'Inahisi kama mzigo mkubwa sasa hivi' },
      2: { en: 'I need more time to think',             sw: 'Nahitaji muda zaidi wa kutafakari' },
      3: { en: 'I\'m cautious, but receptive',          sw: 'Niko makini, lakini nipo tayari kujaribu' },
      4: { en: 'I\'m curious and willing to explore',   sw: 'Nina udadisi na utayari wa kujifunza' },
      5: { en: 'I\'m fully ready for a positive change',sw: 'Niko tayari kabisa kwa mabadiliko chanya' },
    },
  },

  {
    id: 'q14',
    type: 'single',
    stage: 'vision',
    emotionalTone: 'vision-self',
    title: {
      en: 'If you were to experience greater financial harmony a year from now, what would be the most meaningful change in your life?',
      sw: 'Endapo utapata utulivu zaidi wa kifedha mwaka mmoja kuanzia sasa, ni jambo gani litakalokuwa na maana zaidi kwenye maisha yako?',
    },
    subtitle: {
      en: 'Pick what resonates most deeply with you.',
      sw: 'Chagua inayokugusa zaidi ndani yako.',
    },
    options: [
      { id: 'q14_peace',   label: { en: 'Experiencing a quieter mind and less anxiety', sw: 'Kupata utulivu wa akili na kupunguza wasiwasi' } },
      { id: 'q14_control', label: { en: 'Regaining a sense of personal agency',         sw: 'Kuwa na udhibiti kamili wa maisha yangu' } },
      { id: 'q14_family',  label: { en: 'Providing a stronger foundation for my family', sw: 'Kujenga msingi imara kwa ajili ya familia yangu' } },
      { id: 'q14_freedom', label: { en: 'Gaining the freedom to make authentic choices', sw: 'Kuwa na uhuru wa kufanya maamuzi sahihi' } },
      { id: 'q14_save',    label: { en: 'Feeling deeply confident in my path',          sw: 'Kuwa na uhakika na njia ninayoipitia' } },
      { id: 'q14_sleep',   label: { en: 'Finally resting easy at night',                sw: 'Kupata usingizi mnono bila hofu' } },
    ],
  },

  // Final open reflection — the only required textarea (5% target)
  {
    id: 'final_reflection',
    type: 'textarea',
    stage: 'vision',
    emotionalTone: 'closure',
    required: false,
    title: {
      en: 'As we close this reflection, {firstName}, is there anything else weighing on your mind or that you hope for your financial journey?',
      sw: 'Tunapohitimisha tafakari hii, {firstName}, kuna jambo lingine lolote lililo moyoni mwako ambalo ungependa tulijue kuhusu safari yako ya kifedha?',
    },
    subtitle: {
      en: 'This space is entirely yours to share freely.',
      sw: 'Nafasi hii ni yako kabisa, jisikie huru kueleza.',
    },
    placeholder: {
      en: 'Your thoughts, your words — no pressure at all...',
      sw: 'Mawazo yako, maneno yako — hakuna shinikizo kabisa...',
    },
  },
];
