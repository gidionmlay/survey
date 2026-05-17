const fs = require('fs');
let content = fs.readFileSync('src/data/questions.ts', 'utf8');

// Update QuestionType
content = content.replace("export type QuestionType = 'single' | 'multiple' | 'scale' | 'boolean-text' | 'textarea';", "export type QuestionType = 'single' | 'multiple' | 'scale' | 'boolean-text' | 'textarea' | 'transition';");

// Update Question interface
content = content.replace(/export interface Question \{[\s\S]*?\}/, `export interface Question {
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
  followUp?: { en: string; sw: string };
  stage: string;
}`);

// Replace "text:" with "title:"
content = content.replace(/\btext:\s*\{/g, 'title: {');

// Add required: true to q3, q5, q10, q13, q14
const addRequired = (id) => {
  const regex = new RegExp(`(id:\\s*'${id}'[\\s\\S]*?type:\\s*'[a-z\\-]+',)`, 'g');
  content = content.replace(regex, `$1\n    required: true,`);
};

['q3', 'q5', 'q10', 'q13', 'q14'].forEach(addRequired);

fs.writeFileSync('src/data/questions.ts', content);
