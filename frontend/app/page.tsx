import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFE6F2] via-[#EDE7FF] to-[#DFF8FF] px-6">

      
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 max-w-5xl w-full p-10 flex flex-col items-center">

        
        <h1
          className={`${playfair.className} text-5xl md:text-6xl font-bold text-[#2F2A45] text-center`}
        >
          Mood Share
        </h1>

        
        <p className="text-[#6D6A7C] text-center mt-4 max-w-2xl">
          A beautiful place to release what you feel — safely,
          softly, and anonymously.
        </p>

      
        <div className="relative mt-10 w-[440px] h-[340px] rounded-full shadow-xl border border-[#F1EEF7] bg-white">
          <img
            src="https://i.pinimg.com/1200x/ee/1d/56/ee1d56fa7bf36f8481c4f188aedf8b75.jpg"
            alt="mood"
            className="w-full h-full object-cover"
          />
        </div>

        
        <div className="mt-10 flex gap-4">
          <a
            href="/signup"
            className="bg-[#FF7EB6] text-white px-7 py-3 rounded-2xl shadow hover:opacity-90 transition"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="bg-white/70 border border-[#E3DFFF] text-[#463969] px-7 py-3 rounded-2xl shadow hover:bg-white transition"
          >
            Login
          </a>
        </div>

        
        <p className="text-xs text-[#8A8997] mt-6">
          No emails. No real identities. Just you — and your thoughts 
        </p>
      </div>
    </div>
  );
}