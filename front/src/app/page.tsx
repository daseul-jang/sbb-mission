import BoardList from '@/components/BoardList';

export default function Home() {
  return (
    <section className='w-full flex flex-col p-4 bg-white mt-14 rounded-xl'>
      <BoardList />
    </section>
  );
}
