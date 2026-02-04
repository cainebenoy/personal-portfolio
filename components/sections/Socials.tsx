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
    content: `How a Weekend Project Impressed EY.
     🚀 It started with a frantic call from my friend Jeffin Joy. With just four days left until the grand finale of The Upside Down Boardroom at LUFTETAR 2026—our National Level Intercollegiate Management Fest at Sahrdaya College of Advanced Studies—he threw me a challenge...`,
    image: "https://media.licdn.com/dms/image/v2/D5622AQFH95VPkbuYiA/feedshare-shrink_2048_1536/B56ZvcCIusH4Ak-/0/1768923107492?e=1770854400&v=beta&t=UwuGiyfQTMXlDIvsRiXIiYVKcbHJXbC0b_rgzIK0NIA", 
    stats: "405 Likes • 42 Comments",
    link: "https://www.linkedin.com/posts/cainebenoy_engineering-hardware-arduino-activity-7420320030812168192-xCDX?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEXLt0YBjg549kKUPcg9x84FuwkG9ciLHoU" 
  },
  { 
    id: 2,
    date: "Latest Highlight",
    content: `“They said I couldn’t do it. I did it not once, but twice.”

I’m writing this with a heart full of happiness and gratitude. Being someone who has attended a lot of hackathons, both online and offline, it has always been a dream of mine to organize a hackathon in my own college...`,
    image: "https://media.licdn.com/dms/image/v2/D5622AQGMJ1vauMU9ww/feedshare-shrink_2048_1536/B56ZvWZfg_HcAk-/0/1768828565937?e=1770854400&v=beta&t=TIs2BLfVvexwh0PUC2rqFWbwjPTlCTVOzVi7ylG0Ib0",
    stats: "210 Likes • 15 Comments",
    link: "https://www.linkedin.com/posts/cainebenoy_they-said-i-couldnt-do-it-i-did-it-not-activity-7419004762634809344-k8vN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEXLt0YBjg549kKUPcg9x84FuwkG9ciLHoU"
  },
  {
    id: 3,
    date: "Community",
    content: `"The future shouldn't just be inherited; it must be architected."

I wrote this line in my application a few days ago, and today, I’m excited to share that I’ve been selected as an SOF Insider.
My decision to join was solidified after a fantastic online discussion...`,
    image: "https://media.licdn.com/dms/image/v2/D5622AQFaUGCPm2xbrQ/feedshare-shrink_800/B56ZusRJMCIoAg-/0/1768121735747?e=1770854400&v=beta&t=5n0rmVdmhvm3JvQboEiWHEqWg98Q53GckzTyvfqwim8", 
    stats: "890 Likes • 156 Comments",
    link: "https://www.linkedin.com/posts/cainebenoy_sofinsider-building-future-activity-7416040073860714496-oo53?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAEXLt0YBjg549kKUPcg9x84FuwkG9ciLHoU"
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
    <section id="socials" className="relative z-10 py-16 animate-fade-in">
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
                            "block theme-surface p-6 shadow-sm border-2 theme-border transition-all duration-300 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.15)] hover:border-blue-400 hover:-translate-y-1 group relative overflow-hidden",
                            i % 2 === 0 ? "rotate-1" : "-rotate-1"
                        )}
                    >  
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;charset=utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/></svg>')]" ></div>

                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="theme-surface-alt p-1.5 rounded-md">
                                <Linkedin className="text-blue-600 w-4 h-4" />
                            </div>
                            <span className="font-code text-xs theme-muted uppercase tracking-wider">{post.date}</span>
                        </div>

                        <p className="font-sans text-ink text-sm leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all relative z-10">
                            {post.content}
                        </p>

                        {post.image && (
                            <div className="relative h-32 w-full mb-4 overflow-hidden rounded border theme-border grayscale group-hover:grayscale-0 transition-all duration-500 z-10">
                                <img src={post.image} alt="Post" className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700" />
                            </div>
                        )}

                        <div className="pt-4 border-t border-dashed theme-border flex justify-between items-center relative z-10">
                            <span className="font-hand theme-muted text-sm">{post.stats}</span>
                            <ExternalLink className="w-4 h-4 theme-muted group-hover:text-blue-600 transition-colors" />
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

            <div className="space-y-4 theme-surface-alt p-4 rounded-xl border theme-border">
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