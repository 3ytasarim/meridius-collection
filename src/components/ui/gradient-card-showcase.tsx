import React from 'react';

export type ShowcaseCard = {
  title: string;
  desc: string;
  gradientFrom: string;
  gradientTo: string;
  icon?: React.ReactNode;
  href?: string;
  cta?: string;
};

const defaultCards: ShowcaseCard[] = [
  {
    title: 'Card one',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#6330C7',
    gradientTo: '#7C45E8',
  },
  {
    title: 'Card two',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#7C45E8',
    gradientTo: '#A77AF4',
  },
  {
    title: 'Card three',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    gradientFrom: '#A77AF4',
    gradientTo: '#6330C7',
  },
];

export default function SkewCards({
  cards = defaultCards,
}: {
  cards?: ShowcaseCard[];
}) {
  return (
    <>
      <div className="flex justify-center items-center flex-wrap py-10">
        {cards.map(({ title, desc, gradientFrom, gradientTo, href, cta }, idx) => (
          <div
            key={idx}
            className="group relative w-[320px] h-[400px] m-[40px_30px] transition-all duration-500"
          >
            {/* Skewed gradient panels */}
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />
            <span
              className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
              style={{
                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
              }}
            />

            {/* Animated blurs */}
            <span className="pointer-events-none absolute inset-0 z-10">
              <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
              <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.1)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
            </span>

            {/* Content */}
            <div className="relative z-20 left-0 p-[20px_40px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[60px_40px]">
              <h2 className="text-2xl mb-2">{title}</h2>
              <p className="text-lg leading-relaxed mb-2">{desc}</p>
              <a
                href={href ?? '#'}
                className="inline-block text-lg font-bold text-[#2B2433] bg-white px-3 py-2 rounded hover:bg-[#F4EFFF] hover:border hover:border-[rgba(124,69,232,0.4)] hover:shadow-md"
              >
                {cta ?? 'Mehr erfahren'}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind custom utilities for animation and shadows */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translateY(10px); }
          50% { transform: translate(-10px); }
        }
        .animate-blob { animation: blob 2s ease-in-out infinite; }
        .animation-delay-1000 { animation-delay: -1s; }
      `}</style>
    </>
  );
}
