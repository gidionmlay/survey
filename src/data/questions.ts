export type QuestionType = 'single' | 'multiple' | 'scale' | 'boolean-text' | 'textarea' | 'transition';

export interface Option {
  id: string;
  label: { en: string; sw: string };
}

export interface Question {
  id: string;
  type: QuestionType;
  title: { en: string; sw: string };
  required?: boolean;
  options?: Option[];
  maxSelect?: number;
  conditional?: {
    dependsOn: string;
    value: any;
  };
  followUp?: { en: string; sw: string }; // For boolean-text
  stage: string;
}

export const questions: Question[] = [
  {
    id: 'q1',
    type: 'single',
    title: {
      en: "Hey {firstName}, when you think about your day-to-day financial life, how do you generally feel?",
      sw: "Hujambo {firstName}, unapofikiria kuhusu maisha yako ya kifedha ya kila siku, kwa ujumla unajisikiaje?"
    },
    options: [
      { id: 'q1_1', label: { en: "I feel mostly in control of my money", sw: "Ninajihisi kudhibiti pesa zangu zaidi" } },
      { id: 'q1_2', label: { en: "I manage it fairly well but sometimes feel uncertain", sw: "Ninaisimamia vizuri lakini wakati mwingine nahisi kutokuwa na uhakika" } },
      { id: 'q1_3', label: { en: "I often feel unsure about where my money goes", sw: "Mara nyingi ninahisi kutokuwa na uhakika pesa zangu zinaenda wapi" } },
      { id: 'q1_4', label: { en: "I rarely track it — I just deal with things as they come", sw: "Sifuatilii sana — Ninakabiliana na mambo yanavyotokea" } }
    ],
    stage: 'understanding'
  },
  {
    id: 'q2',
    type: 'single',
    title: {
      en: "How do you usually keep track of your spending?",
      sw: "Kwa kawaida unafuatiliaje matumizi yako?"
    },
    options: [
      { id: 'q2_1', label: { en: "I don’t track it at all", sw: "Sifuatilii kabisa" } },
      { id: 'q2_2', label: { en: "I keep track mentally", sw: "Ninafuatilia akilini" } },
      { id: 'q2_3', label: { en: "Notebook / written notes", sw: "Daftari / maelezo yaliyoandikwa" } },
      { id: 'q2_4', label: { en: "Spreadsheet", sw: "Laha (Spreadsheet)" } },
      { id: 'q2_5', label: { en: "Mobile finance apps", sw: "Programu za kifedha kwenye simu" } },
      { id: 'q2_6', label: { en: "Bank statements", sw: "Taarifa za benki" } },
      { id: 'q2_7', label: { en: "Other", sw: "Nyinginezo" } }
    ],
    stage: 'understanding'
  },
  {
    id: 'q3',
    type: 'scale',
    required: true,
    title: {
      en: "At the end of a typical month, how clearly do you understand where your money went?",
      sw: "Mwishoni mwa mwezi wa kawaida, unaelewa kwa kiasi gani pesa zako zilienda wapi?"
    },
    stage: 'understanding'
  },
  {
    id: 'q4',
    type: 'boolean-text',
    title: {
      en: "{firstName}, have you ever had a moment where you asked yourself: 'Where did all my money go?'",
      sw: "{firstName}, umewahi kuwa na wakati ambapo ulijiuliza: 'Pesa zangu zote zilienda wapi?'"
    },
    options: [
      { id: 'yes', label: { en: "Yes", sw: "Ndiyo" } },
      { id: 'no', label: { en: "No", sw: "Hapana" } }
    ],
    followUp: {
      en: "Can you briefly describe that moment?",
      sw: "Je, unaweza kueleza kwa ufupi wakati huo?"
    },
    stage: 'reflecting'
  },
  {
    id: 'q5',
    type: 'multiple',
    required: true,
    maxSelect: 3,
    title: {
      en: "Which of these financial challenges do you experience most often?",
      sw: "Ni changamoto zipi kati ya hizi za kifedha unazokumbana nazo mara nyingi?"
    },
    options: [
      { id: 'q5_1', label: { en: "Losing track of daily spending", sw: "Kupoteza mwelekeo wa matumizi ya kila siku" } },
      { id: 'q5_2', label: { en: "Difficulty saving money", sw: "Ugumu wa kuweka akiba" } },
      { id: 'q5_3', label: { en: "Unexpected expenses", sw: "Gharama zisizotarajiwa" } },
      { id: 'q5_4', label: { en: "Poor budgeting discipline", sw: "Nidhamu duni ya kupanga bajeti" } },
      { id: 'q5_5', label: { en: "Irregular income", sw: "Kipato kisichotabirika" } },
      { id: 'q5_6', label: { en: "Feeling anxious about money", sw: "Kuhisi wasiwasi kuhusu pesa" } },
      { id: 'q5_7', label: { en: "Not knowing my financial future", sw: "Kutojua mustakabali wangu wa kifedha" } },
      { id: 'q5_8', label: { en: "Feeling like money disappears too quickly", sw: "Kuhisi kama pesa inapotea haraka sana" } }
    ],
    stage: 'reflecting'
  },
  {
    id: 'q6',
    type: 'single',
    title: {
      en: "How often do financial worries affect your peace of mind?",
      sw: "Ni mara ngapi wasiwasi wa kifedha unaathiri amani ya akili yako?"
    },
    options: [
      { id: 'q6_1', label: { en: "Rarely", sw: "Mara chache" } },
      { id: 'q6_2', label: { en: "Sometimes", sw: "Wakati mwingine" } },
      { id: 'q6_3', label: { en: "Often", sw: "Mara nyingi" } },
      { id: 'q6_4', label: { en: "Very often", sw: "Mara nyingi sana" } }
    ],
    stage: 'reflecting'
  },
  {
    id: 'q7',
    type: 'textarea',
    title: {
      en: "If you could change ONE thing about how you currently manage money, what would it be?",
      sw: "Kama ungeweza kubadilisha kitu KIMOJA kuhusu jinsi unavyosimamia pesa kwa sasa, kingekuwa nini?"
    },
    stage: 'exploring'
  },
  {
    id: 'q8',
    type: 'single',
    title: {
      en: "What tools or methods do you currently use to manage your finances?",
      sw: "Ni zana au mbinu gani unazotumia kwa sasa kusimamia fedha zako?"
    },
    options: [
      { id: 'q8_1', label: { en: "Nothing specific", sw: "Hakuna maalum" } },
      { id: 'q8_2', label: { en: "Notebook / manual notes", sw: "Daftari / maelezo ya mwongozo" } },
      { id: 'q8_3', label: { en: "Spreadsheet", sw: "Laha (Spreadsheet)" } },
      { id: 'q8_4', label: { en: "Mobile finance apps", sw: "Programu za kifedha kwenye simu" } },
      { id: 'q8_5', label: { en: "Bank apps", sw: "Programu za benki" } },
      { id: 'q8_6', label: { en: "Advice from family or friends", sw: "Ushauri kutoka kwa familia au marafiki" } },
      { id: 'q8_7', label: { en: "Other", sw: "Nyinginezo" } }
    ],
    stage: 'exploring'
  },
  {
    id: 'q9',
    type: 'textarea',
    title: {
      en: "What frustrates you most about the way you currently manage your money?",
      sw: "Ni nini kinachokukatisha tamaa zaidi kuhusu jinsi unavyosimamia pesa zako kwa sasa?"
    },
    stage: 'exploring'
  },
  {
    id: 'q10',
    type: 'scale',
    required: true,
    title: {
      en: "Managing money can sometimes feel emotionally draining. How stressful or frustrating is it for you personally?",
      sw: "Kusimamia pesa wakati mwingine inaweza kuhisiwa inachosha kihisia. Je, inakupa msongo au kukukatisha tamaa kiasi gani binafsi?"
    },
    stage: 'exploring'
  },
  {
    id: 'q11',
    type: 'single',
    title: {
      en: "Have you ever tried to improve the way you manage your money?",
      sw: "Je, umewahi kujaribu kuboresha jinsi unavyosimamia pesa zako?"
    },
    options: [
      { id: 'q11_1', label: { en: "Yes, I’ve tried several methods", sw: "Ndiyo, nimejaribu mbinu kadhaa" } },
      { id: 'q11_2', label: { en: "Yes, but nothing really worked", sw: "Ndiyo, lakini hakuna kilichofanya kazi" } },
      { id: 'q11_3', label: { en: "I tried once or twice", sw: "Nilijaribu mara moja au mbili" } },
      { id: 'q11_4', label: { en: "No, I’ve never tried", sw: "Hapana, sijawahi kujaribu" } }
    ],
    stage: 'imagining'
  },
  {
    id: 'q12',
    type: 'textarea',
    title: {
      en: "What methods or tools have you tried before?",
      sw: "Ni mbinu au zana gani umejaribu hapo awali?"
    },
    stage: 'imagining'
  },
  {
    id: 'q13',
    type: 'multiple',
    required: true,
    maxSelect: 3,
    title: {
      en: "If a tool could help you better understand your finances, what would be most valuable to you?",
      sw: "Kama zana ingeweza kukusaidia kuelewa vyema fedha zako, nini kingekuwa cha thamani zaidi kwako?"
    },
    options: [
      { id: 'q13_1', label: { en: "Seeing exactly where my money goes", sw: "Kuona kwa usahihi pesa zangu zinaenda wapi" } },
      { id: 'q13_2', label: { en: "Predicting future cash flow", sw: "Kutabiri mtiririko wa pesa ujao" } },
      { id: 'q13_3', label: { en: "Improving saving discipline", sw: "Kuboresha nidhamu ya kuweka akiba" } },
      { id: 'q13_4', label: { en: "Alerts when spending becomes unhealthy", sw: "Taarifa matumizi yanapokuwa yasiyofaa" } },
      { id: 'q13_5', label: { en: "Understanding financial habits and patterns", sw: "Kuelewa tabia na mifumo ya kifedha" } },
      { id: 'q13_6', label: { en: "Better budgeting support", sw: "Msaada bora wa kupanga bajeti" } },
      { id: 'q13_7', label: { en: "Planning future financial goals", sw: "Kupanga malengo ya kifedha ya baadaye" } }
    ],
    stage: 'imagining'
  },
  {
    id: 'q14',
    type: 'scale',
    required: true,
    title: {
      en: "If a tool existed that helped you clearly understand the rhythm of your money, how likely would you be to try it?",
      sw: "Kama kungekuwa na zana iliyokusaidia kuelewa wazi mwenendo wa pesa zako, ungekuwa na uwezekano gani wa kuijaribu?"
    },
    stage: 'imagining'
  },
  {
    id: 'q15',
    type: 'textarea',
    title: {
      en: "If this financial challenge disappeared tomorrow, {firstName}, how would your life be different?",
      sw: "Kama changamoto hii ya kifedha ingepotea kesho, {firstName}, maisha yako yangekuwaje tofauti?"
    },
    stage: 'imagining'
  },
  {
    id: 'final_reflection',
    type: 'textarea',
    title: {
      en: "If you could clearly see the rhythm of your money — how it flows, where it goes, and what your future finances might look like — how do you think it would change your financial life?",
      sw: "Kama ungeweza kuona wazi mwenendo wa pesa zako — jinsi inavyotiririka, inaenda wapi, na mustakabali wako wa kifedha ungekuwaje — unafikiri ingebadilishaje maisha yako ya kifedha?"
    },
    stage: 'imagining'
  }
];
