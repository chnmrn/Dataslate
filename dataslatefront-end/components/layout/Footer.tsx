export default function Footer() {
  return (
    <footer className="w-full py-8 bg-black border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">


        <p className="text-white-500">
          © {new Date().getFullYear()} Dataslate — Built by Chnmrn
        </p>

        <div className="flex gap-6">
          <a
            href="https://github.com/chnmrn"
            target="_blank"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href="https://chnmrn.github.io/NewPortfolio/"
            target="_blank"
            className="hover:text-white transition"
          >
            Portfolio
          </a>

          <a
            href="https://www.linkedin.com/in/jdsang/"
            target="_blank"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}

