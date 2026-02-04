"use client";

import { X, ExternalLink, Code, Layers, Github } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    longDescription?: string;
    tags: string[];
    emoji: string;
    color: string;
    rotate: string;
    liveUrl?: string;
    githubUrl?: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  const handleLiveDemo = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleSourceCode = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      {/* Case File Folder */}
      <div className="relative w-full max-w-4xl theme-surface rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-t-8 theme-border">
        
        {/* Tab Label */}
        <div className="absolute -top-8 left-8 h-8 px-6 theme-surface-alt rounded-t-lg flex items-center font-code text-xs theme-muted border-t border-l border-r theme-border">
          CASE_ID: {project.title.toUpperCase().replace(/\s/g, "_")}
        </div>

        {/* Header */}
        <div className="theme-surface-alt p-6 flex justify-between items-start border-b theme-border">
          <div>
            <div className="font-marker text-highlight text-xl rotate-[-1deg] mb-1">CONFIDENTIAL</div>
            <h2 className="font-display text-4xl text-ink">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Close modal" title="Close">
            <X size={24} className="text-ink" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[70vh] bg-[url('https://www.transparenttextures.com/patterns/lined-paper-2.png')]">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: The "Problem" & Details */}
            <div className="space-y-6">
              <div className="theme-surface p-6 shadow-sm rotate-1 border theme-border">
                <h3 className="font-bold font-sans text-lg mb-3 flex items-center gap-2 text-ink">
                  <Layers size={18} /> The Challenge
                </h3>
                <p className="font-hand text-lg text-ink leading-relaxed mb-4">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Stack Tags */}
              <div>
                <h3 className="font-bold text-sm text-ink mb-3 uppercase font-code">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="bg-ink text-paper px-3 py-1 font-code text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: "Evidence" (Code snippet) & Action Buttons */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-4 shadow-inner font-code text-xs text-green-400 overflow-hidden relative">
                <div className="absolute top-2 right-2 text-gray-500 text-[10px]">main.tsx</div>
                <pre className="opacity-80">
{`function ${project.title.replace(/\s/g, "")}() {
  // Initializing Core Systems...
  const [data, setData] = useState(null);
  
  useEffect(() => {
    connectToBlockchain();
  }, []);

  return <View data={data} />;
}`}
                </pre>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleLiveDemo}
                  disabled={!project.liveUrl}
                  className={`w-full py-3 font-bold transition-colors shadow-md flex items-center justify-center gap-2 rounded ${
                    project.liveUrl 
                      ? 'bg-highlight text-white hover:bg-red-600 cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                    <ExternalLink size={18} /> {project.liveUrl ? 'Live Demo' : 'Demo Not Available'}
                 </button>
                 <button 
                  onClick={handleSourceCode}
                  disabled={!project.githubUrl}
                  className={`w-full py-3 font-bold transition-colors shadow-md flex items-center justify-center gap-2 rounded border-2 ${
                    project.githubUrl
                      ? 'bg-paper border-ink text-ink hover:bg-gray-100 cursor-pointer'
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                    <Github size={18} /> {project.githubUrl ? 'View Source Code' : 'Source Not Available'}
                 </button>
              </div>

              {/* URLs for reference */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="text-xs font-code space-y-1 p-3 bg-gray-100 rounded border theme-border">
                  {project.liveUrl && (
                    <div className="text-ink">
                      <span className="font-bold">Live:</span>
                      <br />
                      <span className="break-all text-gray-600">{project.liveUrl}</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="text-ink">
                      <span className="font-bold">GitHub:</span>
                      <br />
                      <span className="break-all text-gray-600">{project.githubUrl}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}