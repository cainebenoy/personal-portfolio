"use client";

import { useEffect, useState } from "react";
import { Star, GitFork, ExternalLink, Linkedin, Github } from "lucide-react";
import { cn } from "@/lib/utils";

// --- LINKEDIN DATA (Manual Curation) ---
// Since LinkedIn API is closed, paste your best 3 posts here.
// Tips: Use a screenshot of the post for 'image', and summarize the 'text'.
const linkedinPosts = [
  {
    id: 1,
    date: "2 days ago",
    content: "Organizing a 24-hour hackathon taught me more about 'Distributed Systems' than any textbook. It's not just about uptime; it's about people management... 🧵",
    image: "https://placehold.co/600x400/png?text=Hackathon+Post", // Replace with screenshot of post
    stats: "405 Likes • 42 Comments",
    link: "https://linkedin.com/in/cainebenoy" // Replace with actual post link
  },
  {
    id: 2,
    date: "1 week ago",
    content: "Just deployed TruthChain! 🛡️ A hybrid blockchain/AI solution to combat deepfakes. It wasn't easy integrating Solidity with FastAPI, but here is how we did it...",
    image: "https://placehold.co/600x400/png?text=TruthChain+Launch",
    stats: "210 Likes • 15 Comments",
    link: "https://linkedin.com/in/cainebenoy"
  },
  {
    id: 3,
    date: "2 weeks ago",
    content: "Unpopular opinion: Generalists are the new specialists. In the age of AI, being able to connect the dots is more valuable than just drawing them perfectly. Here is why...",
    image: null, // Text only post example
    stats: "890 Likes • 156 Comments",
    link: "https://linkedin.com/in/cainebenoy"
  }
];

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

export default function Socials() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    // Fetch latest 3 updated repos from GitHub
    fetch("https://api.github.com/users/cainebenoy/repos?sort=updated&per_page=3")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRepos(data);
      })
      .catch((e) => console.error(e));
  }, []);

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
            <div className="absolute -left-4 -top-6 -rotate-6 rounded bg-blue-600 px-3 py-1 font-marker text-white shadow-md">
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
                            "block bg-white p-6 shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300 group relative overflow-hidden",
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                        )}
                    >
                        {/* Paper Texture */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")' }}></div>

                        <div className="flex items-center gap-3 mb-4">
                            <Linkedin className="text-blue-600 w-5 h-5" />
                            <span className="font-code text-xs text-gray-400 uppercase">{post.date}</span>
                        </div>

                        <p className="font-sans text-gray-700 text-sm leading-relaxed mb-4">
                            {post.content}
                        </p>

                        {post.image && (
                            <div className="relative h-40 w-full mb-4 overflow-hidden rounded border border-gray-100 grayscale group-hover:grayscale-0 transition-all">
                                <img src={post.image} alt="Post" className="object-cover w-full h-full" />
                            </div>
                        )}

                        <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                            <span className="font-hand text-gray-500">{post.stats}</span>
                            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </a>
                ))}
            </div>
          </div>

          {/* --- GITHUB COLUMN (Blueprint Style) --- */}
          <div className="relative mt-12 lg:mt-0">
             <div className="absolute -right-4 -top-6 rotate-3 rounded bg-gray-800 px-3 py-1 font-marker text-white shadow-md">
              LATEST COMMITS
            </div>

            <div className="space-y-4">
                {repos.length > 0 ? repos.map((repo) => (
                    <a 
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noreferrer" 
                        className="block bg-[#0a192f] p-6 text-blue-100 shadow-xl transition-transform hover:-translate-y-1 group relative overflow-hidden rounded-sm"
                    >
                         {/* Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none" 
                             style={{ backgroundImage: 'linear-gradient(#64ffda 1px, transparent 1px), linear-gradient(90deg, #64ffda 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-code text-lg font-bold text-cyan-400 group-hover:underline">{repo.name}</h3>
                                <Github className="w-5 h-5 text-gray-500" />
                            </div>
                            
                            <p className="text-xs text-gray-400 font-sans mb-4 line-clamp-2">
                                {repo.description || "No description provided."}
                            </p>

                            <div className="flex gap-4 text-xs font-code text-gray-500">
                                {repo.language && (
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                                        {repo.language}
                                    </span>
                                )}
                                <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3" /> {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                    <GitFork className="w-3 h-3" /> {repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </a>
                )) : (
                    // Loading State
                    [1,2,3].map((i) => (
                         <div key={i} className="h-32 bg-gray-100 animate-pulse rounded-sm border-2 border-gray-200"></div>
                    ))
                )}
            </div>

            <div className="mt-8 text-center lg:text-right">
                <a 
                    href="https://github.com/cainebenoy" 
                    target="_blank"
                    className="font-code text-xs text-gray-500 hover:text-ink border-b border-gray-300 hover:border-ink transition-colors pb-0.5"
                >
                    VIEW_FULL_LOG &rarr;
                </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}