const greetingMessages: string[] = [
  'Welcome Back to',
  "Let's get shit done with",
  'Live, laugh, and',
  'Living with razle dazle because of',
];

export {generateGreetings};

function generateGreetings(): string {
  const randomIndex = Math.floor(Math.random() * greetingMessages.length);
  return greetingMessages[randomIndex];
}
