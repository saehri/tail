import {generateGreetings} from '@/lib/generate-greetings';

export default function LogoAndGreetings() {
  const greetings = generateGreetings();

  return (
    <section className='flex flex-col-reverse leading-4'>
      <p className='text-slate-900 dark:text-slate-50 font-semibold'>TAILO</p>

      <small className='text-slate-500 dark:text-slate-300'>{greetings}</small>
    </section>
  );
}
