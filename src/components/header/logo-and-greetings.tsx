import {generateGreetings} from '@/lib/generate-greetings';

export default function LogoAndGreetings() {
  const greetings = generateGreetings();

  return (
    <div className='flex flex-col-reverse leading-4'>
      <p className='text-foreground font-semibold'>TAIL</p>

      <small className='text-muted-foreground'>{greetings}</small>
    </div>
  );
}
