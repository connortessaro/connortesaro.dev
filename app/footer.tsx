import { EMAIL, GITHUB_URL, RESUME_PATH } from './data'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/6 py-6">
      <div className="flex flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-zinc-950">Connor Tessaro</p>
          <p>Software Engineer</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={`mailto:${EMAIL}`} className="hover:text-zinc-950">
            {EMAIL}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-zinc-950">
            GitHub
          </a>
          <a href={RESUME_PATH} target="_blank" rel="noreferrer" className="hover:text-zinc-950">
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
