import re

with open('src/data/questions.ts', 'r') as f:
    content = f.read()

# Update QuestionType
content = content.replace(
    "export type QuestionType = 'single' | 'multiple' | 'scale' | 'boolean-text' | 'textarea';",
    "export type QuestionType = 'single' | 'multiple' | 'scale' | 'boolean-text' | 'textarea' | 'transition';"
)

# Update Question interface
interface_pattern = re.compile(r'export interface Question \{[\s\S]*?\}')
new_interface = """export interface Question {
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
}"""
content = interface_pattern.sub(new_interface, content)

# Replace "text:" with "title:"
content = re.sub(r'\btext:\s*\{', 'title: {', content)

# Add required: true to q3, q5, q10, q13, q14
for q_id in ['q3', 'q5', 'q10', 'q13', 'q14']:
    pattern = re.compile(f"(id:\\s*'{q_id}'[\\s\\S]*?type:\\s*'[a-z\\-]+',)")
    content = pattern.sub(r'\1\n    required: true,', content)

with open('src/data/questions.ts', 'w') as f:
    f.write(content)
