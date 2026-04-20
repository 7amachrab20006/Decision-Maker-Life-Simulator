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
  requiredLevel: number;
  questions: Question[];
}

export const CATEGORIES: QuizCategory[] = [
  {
    id: 'geography',
    name: 'Geography',
    icon: 'Globe',
    description: 'Countries, capitals, and the wonders of our planet.',
    difficulty: 'Easy',
    requiredLevel: 1,
    questions: [
      { id: 'g1', text: 'What is the largest continent by area?', options: ['Africa', 'Europe', 'Asia', 'North America'], correctAnswer: 2 },
      { id: 'g2', text: 'Which country has the largest population?', options: ['India', 'China', 'USA', 'Indonesia'], correctAnswer: 1 },
      { id: 'g3', text: 'What is the capital city of France?', options: ['Lyon', 'Marseille', 'Paris', 'Bordeaux'], correctAnswer: 2 },
      { id: 'g4', text: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], correctAnswer: 2 },
      { id: 'g5', text: 'Which river is the longest in the world?', options: ['Amazon', 'Nile', 'Mississippi', 'Yangtze'], correctAnswer: 1 },
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: 'History',
    description: 'Fun questions about the past.',
    difficulty: 'Easy',
    requiredLevel: 1,
    questions: [
      { id: 'h1', text: 'Who was the first President of the USA?', options: ['George Washington', 'Abraham Lincoln', 'John F. Kennedy', 'Barack Obama'], correctAnswer: 0 },
      { id: 'h2', text: 'In which country are the Great Pyramids located?', options: ['Mexico', 'Egypt', 'China', 'Greece'], correctAnswer: 1 },
      { id: 'h3', text: 'What was the titanic?', options: ['A plane', 'A car', 'A ship', 'A train'], correctAnswer: 2 },
      { id: 'h4', text: 'Which ancient people built the Colosseum?', options: ['Greeks', 'Romans', 'Egyptians', 'Mayans'], correctAnswer: 1 },
      { id: 'h5', text: 'Who discovered America in 1492?', options: ['Christopher Columbus', 'Marco Polo', 'Neil Armstrong', 'Albert Einstein'], correctAnswer: 0 },
    ]
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: 'Trophy',
    description: 'From the pitch to the court, how much do you know?',
    difficulty: 'Easy',
    requiredLevel: 2,
    questions: [
      { id: 's1', text: 'How many players are on a standard football team?', options: ['9', '10', '11', '12'], correctAnswer: 2 },
      { id: 's2', text: 'Which country won the 2022 World Cup?', options: ['France', 'Brazil', 'Argentina', 'Germany'], correctAnswer: 2 },
      { id: 's3', text: 'How long is a marathon in kilometers?', options: ['21.1', '42.2', '50', '100'], correctAnswer: 1 },
      { id: 's4', text: 'In which sport is "Love" used as a score?', options: ['Badminton', 'Tennis', 'Squash', 'Golf'], correctAnswer: 1 },
      { id: 's5', text: 'Who has won the most Ballon d\'Or awards?', options: ['Cristiano Ronaldo', 'Lionel Messi', 'Pele', 'Zidane'], correctAnswer: 1 },
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: 'FlaskConical',
    description: 'Explore the elements, reactions, and the composition of atoms.',
    difficulty: 'Medium',
    requiredLevel: 2,
    questions: [
      { id: 'c1', text: 'What is the chemical symbol for Gold?', options: ['Ag', 'Fe', 'Au', 'Pb'], correctAnswer: 2 },
      { id: 'c2', text: 'Which gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correctAnswer: 2 },
      { id: 'c3', text: 'What is the pH value of pure water?', options: ['1', '7', '14', '10'], correctAnswer: 1 },
      { id: 'c4', text: 'Which element is the primary constituent of diamonds?', options: ['Carbon', 'Silicon', 'Oxygen', 'Nitrogen'], correctAnswer: 0 },
      { id: 'c5', text: 'What is the lightest element in the periodic table?', options: ['Helium', 'Oxygen', 'Hydrogen', 'Lithium'], correctAnswer: 2 },
    ]
  },
  {
    id: 'tech',
    name: 'Technology',
    icon: 'Cpu',
    description: 'Easy questions about computers and gadgets.',
    difficulty: 'Easy',
    requiredLevel: 3,
    questions: [
      { id: 't1', text: 'Which company makes the iPhone?', options: ['Google', 'Samsung', 'Apple', 'Nokia'], correctAnswer: 2 },
      { id: 't2', text: 'What does WWW stand for?', options: ['World Wide Web', 'World Wide Word', 'World Wide Work', 'Web World Wide'], correctAnswer: 0 },
      { id: 't3', text: 'Which of these is used to type on a computer?', options: ['Mouse', 'Keyboard', 'Monitor', 'Printer'], correctAnswer: 1 },
      { id: 't4', text: 'What do you use to search for things on the internet?', options: ['Facebook', 'Google', 'WhatsApp', 'Netflix'], correctAnswer: 1 },
      { id: 't5', text: 'What is a "laptop"?', options: ['A type of car', 'A portable computer', 'A kitchen tool', 'A musical instrument'], correctAnswer: 1 },
    ]
  },
  {
    id: 'logic',
    name: 'Logic & IQ',
    icon: 'Brain',
    description: 'Fun riddles and simple puzzles.',
    difficulty: 'Medium',
    requiredLevel: 3,
    questions: [
      { id: 'l1', text: 'What has a face and two hands but no arms or legs?', options: ['A clock', 'A person', 'A ghost', 'A chair'], correctAnswer: 0 },
      { id: 'l2', text: 'What has keys but can’t open any locks?', options: ['A door', 'A piano', 'A chest', 'A safe'], correctAnswer: 1 },
      { id: 'l3', text: 'If you have three apples and you take away two, how many apples do you have?', options: ['One', 'Two', 'Three', 'Zero'], correctAnswer: 1 },
      { id: 'l4', text: 'Which is heavier: 1kg of feathers or 1kg of stones?', options: ['Feathers', 'Stones', 'They are both 1kg', 'Neither'], correctAnswer: 2 },
      { id: 'l5', text: 'What can you catch but not throw?', options: ['A ball', 'A cold', 'A stick', 'A rock'], correctAnswer: 1 },
    ]
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: 'Zap',
    description: 'Basic facts about how things move and work.',
    difficulty: 'Medium',
    requiredLevel: 4,
    questions: [
      { id: 'p1', text: 'What pulls objects toward the Earth?', options: ['Magnetism', 'Gravity', 'Wind', 'Electricity'], correctAnswer: 1 },
      { id: 'p2', text: 'Which planet is known as the "Red Planet"?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
      { id: 'p3', text: 'What do you use to measure temperature?', options: ['Thermometer', 'Barometer', 'Speedometer', 'Compass'], correctAnswer: 0 },
      { id: 'p4', text: 'What does water turn into when it freezes?', options: ['Steam', 'Oil', 'Ice', 'Gas'], correctAnswer: 2 },
      { id: 'p5', text: 'Which of these is the source of light for our planet?', options: ['The Moon', 'The Sun', 'Mars', 'Jupiter'], correctAnswer: 1 },
    ]
  },
  {
    id: 'philosophy',
    name: 'Philosophy',
    icon: 'BookOpen',
    description: 'Interesting thoughts about big ideas.',
    difficulty: 'Medium',
    requiredLevel: 4,
    questions: [
      { id: 'ph1', text: 'Which of these means "I think, therefore I am"?', options: ['Descartes', 'Socrates', 'Plato', 'Aristotle'], correctAnswer: 0 },
      { id: 'ph2', text: 'Who is the teacher of Plato?', options: ['Socrates', 'Aristotle', 'Homer', 'Alexander'], correctAnswer: 0 },
      { id: 'ph3', text: 'What is the study of right and wrong called?', options: ['Ethics', 'Math', 'Science', 'History'], correctAnswer: 0 },
      { id: 'ph4', text: 'Which ancient city is famous for its philosophers?', options: ['Athens', 'London', 'Paris', 'New York'], correctAnswer: 0 },
      { id: 'ph5', text: 'What is a "philosopher"?', options: ['A lover of wisdom', 'A professional athlete', 'A cook', 'A builder'], correctAnswer: 0 },
    ]
  },
  {
    id: 'biology',
    name: 'Biology (SVT)',
    icon: 'Microscope',
    description: 'Learn about animals, plants, and your body.',
    difficulty: 'Easy',
    requiredLevel: 5,
    questions: [
      { id: 'b1', text: 'What do plants need to grow?', options: ['Water and Sun', 'Soda', 'Pizza', 'Sand'], correctAnswer: 0 },
      { id: 'b2', text: 'How many legs does a spider have?', options: ['4', '6', '8', '10'], correctAnswer: 2 },
      { id: 'b3', text: 'Which organ pumps blood through your body?', options: ['Lungs', 'Stomach', 'Heart', 'Brain'], correctAnswer: 2 },
      { id: 'b4', text: 'What is the largest animal in the ocean?', options: ['Shark', 'Blue Whale', 'Dolphin', 'Octopus'], correctAnswer: 1 },
      { id: 'b5', text: 'Where does a bird live?', options: ['In a nest', 'In the water', 'Underground', 'In a cave'], correctAnswer: 0 },
    ]
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: 'Calculator',
    description: 'Challenge your mental arithmetic and logic.',
    difficulty: 'Medium',
    requiredLevel: 5,
    questions: [
      { id: 'm1', text: 'What is the value of Pi to 2 decimal places?', options: ['3.14', '3.16', '3.12', '3.18'], correctAnswer: 0 },
      { id: 'm2', text: 'What is 15% of 200?', options: ['20', '30', '40', '50'], correctAnswer: 1 },
      { id: 'm3', text: 'Solve for x: 2x + 10 = 20', options: ['5', '10', '15', '20'], correctAnswer: 0 },
      { id: 'm4', text: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correctAnswer: 2 },
      { id: 'm5', text: 'What follows 1, 1, 2, 3, 5, 8...?', options: ['12', '13', '14', '15'], correctAnswer: 1 },
    ]
  },
  {
    id: 'culture',
    name: 'Culture',
    icon: 'Library',
    description: 'Traditions, arts, and global heritage.',
    difficulty: 'Easy',
    requiredLevel: 1,
    questions: [
      { id: 'cu1', text: 'In which country is the Eiffel Tower?', options: ['Germany', 'France', 'Italy', 'Spain'], correctAnswer: 1 },
      { id: 'cu2', text: 'Which language is most spoken in Brazil?', options: ['Spanish', 'French', 'Portuguese', 'English'], correctAnswer: 2 },
      { id: 'cu3', text: 'What is the traditional Japanese dress called?', options: ['Sari', 'Kimono', 'Hanbok', 'Kilt'], correctAnswer: 1 },
      { id: 'cu4', text: 'Which city is known as the "Big Apple"?', options: ['Los Angeles', 'Chicago', 'New York', 'Miami'], correctAnswer: 2 },
      { id: 'cu5', text: 'Who painted the Mona Lisa?', options: ['Van Gogh', 'Picasso', 'Leonardo da Vinci', 'Monet'], correctAnswer: 2 },
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'GraduationCap',
    description: 'General knowledge boost for students.',
    difficulty: 'Easy',
    requiredLevel: 1,
    questions: [
      { id: 'ed1', text: 'How many colors are in a rainbow?', options: ['5', '6', '7', '8'], correctAnswer: 2 },
      { id: 'ed2', text: 'What is the largest planet in our solar system?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 2 },
      { id: 'ed3', text: 'Which animal is known as the "King of the Jungle"?', options: ['Tiger', 'Lion', 'Elephant', 'Giraffe'], correctAnswer: 1 },
      { id: 'ed4', text: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], correctAnswer: 2 },
      { id: 'ed5', text: 'What is 5 x 5?', options: ['10', '20', '25', '30'], correctAnswer: 2 },
    ]
  },
  {
    id: 'dailylife',
    name: 'Daily Life',
    icon: 'Coffee',
    description: 'Common sense and everyday practicalities.',
    difficulty: 'Easy',
    requiredLevel: 2,
    questions: [
      { id: 'dl1', text: 'What is the primary ingredient in bread?', options: ['Sugar', 'Flour', 'Milk', 'Eggs'], correctAnswer: 1 },
      { id: 'dl2', text: 'How many hours are in a full day?', options: ['12', '24', '48', '60'], correctAnswer: 1 },
      { id: 'dl3', text: 'Which of these is used to tell time?', options: ['Ruler', 'Watch', 'Compass', 'Scale'], correctAnswer: 1 },
      { id: 'dl4', text: 'What do you use to wash your hair?', options: ['Soap', 'Shampoo', 'Lotion', 'Toothpaste'], correctAnswer: 1 },
      { id: 'dl5', text: 'Where do you usually go to sleep?', options: ['Kitchen', 'Bedroom', 'Garage', 'Garden'], correctAnswer: 1 },
    ]
  },
  {
    id: 'fun',
    name: 'Fun & Entertainment',
    icon: 'PartyPopper',
    description: 'Movies, music, and pop culture.',
    difficulty: 'Easy',
    requiredLevel: 2,
    questions: [
      { id: 'fn1', text: 'Who is the famous mouse created by Disney?', options: ['Jerry', 'Mickey Mouse', 'Speedy Gonzales', 'Stuart Little'], correctAnswer: 1 },
      { id: 'fn2', text: 'Which superhero uses a shield?', options: ['Batman', 'Spider-Man', 'Captain America', 'Iron Man'], correctAnswer: 2 },
      { id: 'fn3', text: 'Which of these is a famous social media app?', options: ['Excel', 'TikTok', 'Word', 'Calculator'], correctAnswer: 1 },
      { id: 'fn4', text: 'How many strings does a standard guitar have?', options: ['4', '5', '6', '7'], correctAnswer: 2 },
      { id: 'fn5', text: 'Which movie features a lion named Simba?', options: ['Toy Story', 'The Lion King', 'Finding Nemo', 'Shrek'], correctAnswer: 1 },
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: 'Briefcase',
    description: 'Foundations of economics and commerce.',
    difficulty: 'Medium',
    requiredLevel: 4,
    questions: [
      { id: 'bz1', text: 'What does "CEO" stand for?', options: ['Chief Executive Officer', 'Chief Energy Officer', 'Central Executive Office', 'Chief Electric Officer'], correctAnswer: 0 },
      { id: 'bz2', text: 'Which company was founded by Bill Gates?', options: ['Apple', 'Microsoft', 'Amazon', 'Facebook'], correctAnswer: 1 },
      { id: 'bz3', text: 'What is the currency of the USA?', options: ['Euro', 'Pound', 'Dollar', 'Yen'], correctAnswer: 2 },
      { id: 'bz4', text: 'Which of these is a place where stocks are traded?', options: ['Supermarket', 'Stock Exchange', 'Library', 'Post Office'], correctAnswer: 1 },
      { id: 'bz5', text: 'What is "Marketing"?', options: ['Buying cars', 'Promoting products', 'Baking cakes', 'Cleaning offices'], correctAnswer: 1 },
    ]
  },
  {
    id: 'science',
    name: 'Advanced Science',
    icon: 'Atom',
    description: 'Deep dive into complex scientific theories.',
    difficulty: 'Hard',
    requiredLevel: 4,
    questions: [
      { id: 'sc1', text: 'What is the smallest unit of life?', options: ['Atom', 'Molecule', 'Cell', 'Organ'], correctAnswer: 2 },
      { id: 'sc2', text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Plasma'], correctAnswer: 1 },
      { id: 'sc3', text: 'Which gas is most abundant in Earth atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'], correctAnswer: 2 },
      { id: 'sc4', text: 'Who developed the three laws of motion?', options: ['Einstein', 'Newton', 'Darwin', 'Hawking'], correctAnswer: 1 },
      { id: 'sc5', text: 'What is the boiling point of water at sea level?', options: ['50°C', '100°C', '150°C', '200°C'], correctAnswer: 1 },
    ]
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: 'Languages',
    description: 'Vocabulary and linguistics from around the world.',
    difficulty: 'Medium',
    requiredLevel: 5,
    questions: [
      { id: 'la1', text: 'What is the most spoken language in the world?', options: ['English', 'Spanish', 'Mandarin Chinese', 'Hindi'], correctAnswer: 2 },
      { id: 'la2', text: 'How do you say "Hello" in Spanish?', options: ['Bonjour', 'Ciao', 'Hola', 'Sawubona'], correctAnswer: 2 },
      { id: 'la3', text: 'Which of these is a Romance language?', options: ['German', 'French', 'Russian', 'Japanese'], correctAnswer: 1 },
      { id: 'la4', text: 'What is the study of language called?', options: ['Biology', 'Linguistics', 'Geology', 'Sociology'], correctAnswer: 1 },
      { id: 'la5', text: 'How many letters are in the English alphabet?', options: ['24', '25', '26', '27'], correctAnswer: 2 },
    ]
  },
  {
    id: 'religion',
    name: 'Religion & Faith',
    icon: 'Church',
    description: 'Understanding global beliefs and traditions.',
    difficulty: 'Medium',
    requiredLevel: 5,
    questions: [
      { id: 're1', text: 'Which book is the central religious text of Islam?', options: ['Bible', 'Torah', 'Quran', 'Vedas'], correctAnswer: 2 },
      { id: 're2', text: 'In which religion is Christmas a major holiday?', options: ['Judaism', 'Buddhism', 'Christianity', 'Hinduism'], correctAnswer: 2 },
      { id: 're3', text: 'What is the name of the spiritual leader in Buddhism?', options: ['Pope', 'Rabbi', 'Dalai Lama', 'Imam'], correctAnswer: 2 },
      { id: 're4', text: 'Which of these is the holiest city in Islam?', options: ['Cairo', 'Mecca', 'Istanbul', 'Dubai'], correctAnswer: 1 },
      { id: 're5', text: 'What is "Faith"?', options: ['A type of car', 'A strong belief', 'A physical sport', 'A chemical reaction'], correctAnswer: 1 },
    ]
  }
];
