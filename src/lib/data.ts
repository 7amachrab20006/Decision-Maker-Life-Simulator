export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
}

export const CATEGORIES: QuizCategory[] = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: 'Calculator',
    description: 'Challenge your mental arithmetic and logic.',
    difficulty: 'Medium',
    questions: [
      { id: 'm1', text: 'What is the value of Pi to 2 decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correctAnswer: 0 },
      { id: 'm2', text: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: 1 },
      { id: 'm3', text: 'Solve for x: 2x + 10 = 20', options: ['5', '10', '15', '20'], correctAnswer: 0 },
      { id: 'm4', text: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2 },
      { id: 'm5', text: 'What follows 1, 1, 2, 3, 5, 8...?', options: ['12', '13', '14', '15'], correctAnswer: 1 },
    ]
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: 'Cpu',
    description: 'Hardware, software, and the future of computation.',
    difficulty: 'Hard',
    questions: [
      { id: 't1', text: 'Which language is used for web rendering?', options: ['Python', 'HTML', 'Java', 'C++'], correctAnswer: 1 },
      { id: 't2', text: 'What does CPU stand for?', options: ['Central Process Unit', 'Central Processing Unit', 'Computer Personal Unit', 'Core Processing Unit'], correctAnswer: 1 },
      { id: 't3', text: 'Which company developed the React library?', options: ['Google', 'Apple', 'Meta', 'Microsoft'], correctAnswer: 2 },
      { id: 't4', text: 'What is the main purpose of a database?', options: ['Styling', 'Storage', 'Logic', 'Networking'], correctAnswer: 1 },
      { id: 't5', text: 'Which protocol is used for secure web browsing?', options: ['HTTP', 'FTP', 'HTTPS', 'SSH'], correctAnswer: 2 },
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Trophy',
    description: 'From the pitch to the court, how much do you know?',
    difficulty: 'Easy',
    questions: [
      { id: 's1', text: 'How many players are on a standard football team?', options: ['9', '10', '11', '12'], correctAnswer: 2 },
      { id: 's2', text: 'Which country won the 2022 World Cup?', options: ['France', 'Brazil', 'Argentina', 'Germany'], correctAnswer: 2 },
      { id: 's3', text: 'How long is a marathon in kilometers?', options: ['21.1', '42.2', '50', '100'], correctAnswer: 1 },
      { id: 's4', text: 'In which sport is "Love" used as a score?', options: ['Badminton', 'Tennis', 'Squash', 'Golf'], correctAnswer: 1 },
      { id: 's5', text: 'Who has won the most Ballon d\'Or awards?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Pele', 'Zidane'], correctAnswer: 1 },
    ]
  },
  {
    id: 'logic',
    name: 'Logic & IQ',
    icon: 'Brain',
    description: 'Test your reasoning with these riddles.',
    difficulty: 'Hard',
    questions: [
      { id: 'l1', text: 'What comes once in a minute, twice in a moment, but never in a thousand years?', options: ['The letter M', 'A breath', 'A second', 'An eye-blink'], correctAnswer: 0 },
      { id: 'l2', text: 'If you have me, you want to share me. If you share me, you haven\'t got me. What am I?', options: ['Money', 'A Secret', 'Love', 'Time'], correctAnswer: 1 },
      { id: 'l3', text: 'Which word becomes shorter when you add two letters to it?', options: ['Long', 'Small', 'Short', 'Brief'], correctAnswer: 2 },
      { id: 'l4', text: 'If 3 people can bake 3 cakes in 3 hours, how many hours does it take 1 person to bake 1 cake?', options: ['1', '3', '9', '2'], correctAnswer: 1 },
      { id: 'l5', text: 'What has keys but can\'t open locks?', options: ['A piano', 'A door', 'A map', 'A safe'], correctAnswer: 0 },
    ]
  }
];
