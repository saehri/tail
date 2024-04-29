const greetingMessages: string[] = [
  'Welcome back to:',
  "Let's get shit done with",
  'Live, laugh, and',
  'Living with razle dazle because of',
];

export {generateGreetings};

function generateGreetings(): string {
  const randomIndex = Math.floor(Math.random() * greetingMessages.length);
  return greetingMessages[randomIndex];
}
