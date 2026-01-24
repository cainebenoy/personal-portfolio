"use client";

import { useEffect, useState, useRef } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function GithubGraph() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchGithubData() {
      try {
        // Public API to get contribution data without auth
        const res = await fetch("https://github-contributions-api.jogruber.de/v4/cainebenoy?y=last");
        const json = await res.json();
        
        // API returns { total: {...}, contributions: [...] }
        const contributions = json.contributions || [];
        
        // Use real data if available
        if (contributions && contributions.length > 0) {
            // Take last 40 days for the "Seismograph" look
            setData(contributions.slice(-40));
        } else {
            // Fallback mock data if API fails or rate limits
            const mock: ContributionDay[] = Array.from({ length: 50 }).map(() => ({
                date: "2024", 
                count: Math.floor(Math.random() * 10), 
                level: 0
            }));
            setData(mock);
        }
        setLoading(false);
      } catch (e) {
        console.error("Failed to fetch GH data", e);
        setLoading(false);
      }
    }

    fetchGithubData();
  }, []);

  // Generate SVG Path
  const generatePath = () => {
    if (data.length === 0) return "";
    
    // Normalize height: Max contributions -> 100px height
    const max = Math.max(...data.map(d => d.count), 5); // Avoid div by zero
    const widthPerPoint = 100 / (data.length - 1); // Percentage width
    
    let d = `M 0,100`; // Start at bottom left
    
    data.forEach((day, i) => {
      const x = i * widthPerPoint;
      const y = 100 - (day.count / max) * 80; // Leave 20% padding top
      // Add randomness for "Sketchy" look
      const jitterX = Math.random() * 0.5 - 0.25;
      const jitterY = Math.random() * 2 - 1;
      
      d += ` L ${x + jitterX},${y + jitterY}`;
    });

    return d;
  };

  return (
    <section className="relative z-10 py-12 flex justify-center">
      <div className="w-full max-w-4xl px-8">
        
        <div className="relative border-b-2 border-ink pb-8">
            <div className="flex justify-between items-end mb-4">
                <h3 className="font-display text-3xl text-ink">Code Frequency</h3>
                <div className="text-right">
                    <div className="font-code text-xs text-gray-400">SOURCE: GITHUB API</div>
                    <div className="font-marker text-xl text-highlight">
                        {loading ? "SCANNING..." : "LIVE FEED"}
                    </div>
                </div>
            </div>

            {/* The Graph Container */}
            <div ref={containerRef} className="relative h-32 w-full overflow-hidden">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none">
                    <div className="border-t border-ink w-full"></div>
                    <div className="border-t border-ink w-full"></div>
                    <div className="border-t border-ink w-full"></div>
                </div>

                {loading ? (
                    <div className="h-full flex items-center justify-center font-hand text-gray-400 animate-pulse">
                        Connecting to Satellite...
                    </div>
                ) : (
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        {/* The Shadow Line (Offset) */}
                        <path 
                            d={generatePath()} 
                            fill="none" 
                            stroke="rgba(0,0,0,0.1)" 
                            strokeWidth="4"
                            className="translate-x-1 translate-y-1"
                        />
                        {/* The Main Line */}
                        <path 
                            d={generatePath()} 
                            fill="none" 
                            stroke="var(--ink)" 
                            strokeWidth="2" 
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                            className="drop-shadow-sm"
                        >
                            <animate 
                                attributeName="stroke-dasharray" 
                                from="0, 1000" 
                                to="1000, 0" 
                                dur="2s" 
                                fill="freeze" 
                            />
                        </path>
                    </svg>
                )}
            </div>
            
            <div className="mt-2 flex justify-between font-hand text-sm text-gray-500">
                <span>30 Days Ago</span>
                <span>Today</span>
            </div>

            {/* Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 bg-paper px-2 font-code text-[10px] text-gray-300">
                SEISMOGRAPH
            </div>
        </div>

      </div>
    </section>
  );
}