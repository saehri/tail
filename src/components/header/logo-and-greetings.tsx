import {generateGreetings} from '@/lib/generate-greetings';

export default function LogoAndGreetings() {
  const greetings = generateGreetings();

  return (
    <section className='flex flex-col-reverse leading-4'>
      <p className='text-foreground font-semibold'>TAILO</p>

      <small className='text-muted-foreground'>{greetings}</small>
    </section>
  );
}
