"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Linkedin, Github, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// --- LINKEDIN DATA (Manual Curation) ---
// Update these with your actual best posts. 
// For images, drop screenshots into public/social/ and reference them here.
const linkedinPosts = [
  {
    id: 1,
    date: "Featured Post",
    content: "Organizing a 24-hour hackathon taught me more about 'Distributed Systems' than any textbook. It's not just about uptime; it's about people management... 🧵",
    image: "https://placehold.co/600x400/png?text=Hackathon+Post", 
    stats: "405 Likes • 42 Comments",
    link: "https://linkedin.com/in/cainebenoy" 
  },
  {
    id: 2,
    date: "Latest Highlight",
    content: "Just deployed TruthChain! 🛡️ A hybrid blockchain/AI solution to combat deepfakes. It wasn't easy integrating Solidity with FastAPI, but here is how we did it...",
    image: "https://placehold.co/600x400/png?text=TruthChain+Launch",
    stats: "210 Likes • 15 Comments",
    link: "https://linkedin.com/in/cainebenoy"
  },
  {
    id: 3,
    date: "Community",
    content: "Unpopular opinion: Generalists are the new specialists. In the age of AI, being able to connect the dots is more valuable than just drawing them perfectly.",
    image: null, 
    stats: "890 Likes • 156 Comments",
    link: "https://linkedin.com/in/cainebenoy"
  }
];

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
}

export default function Socials() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch latest 6 pushed repos from GitHub
    fetch("https://api.github.com/users/cainebenoy/repos?sort=pushed&per_page=6")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  // Helper to format date "2 days ago"
  const getTimeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  return (
    <section id="socials" className="relative z-10 py-24">
      <div className="mx-auto max-w-6xl px-4">
        
        <div className="mb-16 text-center">
          <h2 className="font-display text-5xl md:text-7xl text-ink">Broadcasts</h2>
          <p className="mt-4 font-hand text-2xl text-gray-500">
            Signals from the network.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* --- LINKEDIN COLUMN (Newspaper Style) --- */}
          <div className="relative">
            <div className="absolute -left-4 -top-6 -rotate-6 rounded bg-blue-600 px-3 py-1 font-marker text-white shadow-md transform transition-transform hover:scale-110 hover:-rotate-3 cursor-default z-20">
              THOUGHT LEADERSHIP
            </div>
            
            <div className="space-y-6">
                {linkedinPosts.map((post, i) => (
                    <a 
                        key={post.id} 
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                            "block bg-white p-6 shadow-sm border-2 border-gray-100 transition-all duration-300 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.1)] hover:border-blue-300 hover:-translate-y-1 group relative overflow-hidden",
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                        )}
                    >  
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')]" ></div>

                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="bg-blue-100 p-1.5 rounded-md">
                                <Linkedin className="text-blue-600 w-4 h-4" />
                            </div>
                            <span className="font-code text-xs text-gray-400 uppercase tracking-wider">{post.date}</span>
                        </div>

                        <p className="font-sans text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all relative z-10">
                            {post.content}
                        </p>

                        {post.image && (
                            <div className="relative h-32 w-full mb-4 overflow-hidden rounded border border-gray-100 grayscale group-hover:grayscale-0 transition-all duration-500 z-10">
                                <img src={post.image} alt="Post" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}

                        <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center relative z-10">
                            <span className="font-hand text-gray-500 text-sm">{post.stats}</span>
                            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </a>
                ))}
            </div>
          </div>

          {/* --- GITHUB COLUMN (Blueprint Style) --- */}
          <div className="relative mt-12 lg:mt-0">
             <div className="absolute -right-4 -top-6 rotate-3 rounded bg-gray-800 px-3 py-1 font-marker text-white shadow-md transform transition-transform hover:scale-110 hover:rotate-6 cursor-default z-20">
              LATEST PUSHES
            </div>

            <div className="space-y-4 bg-gray-100/50 p-4 rounded-xl border border-gray-200">
                {loading ? (
                     [1,2,3,4,5,6].map((i) => (
                        <div key={i} className="h-32 bg-white animate-pulse rounded border border-gray-200"></div>
                   ))
                ) : (
                    repos.map((repo) => (
                    <a 
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer" 
                        className="block bg-[#0a192f] p-5 text-blue-100 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01] group relative overflow-hidden rounded border border-[#112240]"
                    >
                        {/* Grid Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none github-grid"></div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-code text-base font-bold text-cyan-400 group-hover:underline decoration-cyan-400/30 underline-offset-4">
                                    {repo.name}
                                </h3>
                                <Github className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                            </div>
                            
                            <p className="text-xs text-gray-400 font-sans mb-4 line-clamp-2 h-8">
                                {repo.description || "No description provided."}
                            </p>

                            <div className="flex justify-between items-center text-[10px] font-code text-gray-500 border-t border-gray-800 pt-3 mt-2">
                                <div className="flex gap-3">
                                    {repo.language && (
                                        <span className="flex items-center gap-1.5 text-gray-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_5px_rgba(250,204,21,0.5)]"></span>
                                            {repo.language}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
                                        <Star className="w-3 h-3" /> {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="w-3 h-3" /> {repo.forks_count}
                                    </span>
                                </div>
                                <span className="flex items-center gap-1 text-gray-600">
                                    <Clock className="w-3 h-3" /> {getTimeAgo(repo.pushed_at)}
                                </span>
                            </div>
                        </div>
                    </a>
                )))}
            </div>

            <div className="mt-8 text-center lg:text-right">
                <a 
                    href="https://github.com/cainebenoy" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-code text-xs text-gray-500 hover:text-ink border-b border-gray-300 hover:border-ink transition-colors pb-0.5 group"
                >
                    VIEW_FULL_LOG <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}