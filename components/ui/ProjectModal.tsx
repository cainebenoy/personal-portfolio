"use client";

import { X, ExternalLink, Code, Layers } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    tags: string[];
    emoji: string;
    color: string;
    rotate: string;
  } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />

      {/* Case File Folder */}
      <div className="relative w-full max-w-4xl bg-[#f0e6d2] rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-t-8 border-[#e6dcc0]">
        
        {/* Tab Label */}
        <div className="absolute -top-8 left-8 h-8 px-6 bg-[#f0e6d2] rounded-t-lg flex items-center font-code text-xs text-gray-500 border-t border-l border-r border-[#dcd0b0]">
          CASE_ID: {project.title.toUpperCase().replace(/\s/g, "_")}
        </div>

        {/* Header */}
        <div className="bg-[#e6dcc0] p-6 flex justify-between items-start border-b border-[#dcd0b0]">
          <div>
            <div className="font-marker text-red-600 text-xl rotate-[-1deg] mb-1">CONFIDENTIAL</div>
            <h2 className="font-display text-4xl text-ink">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors">
            <X size={24} className="text-ink" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[70vh] bg-[url('https://www.transparenttextures.com/patterns/lined-paper-2.png')]">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: The "Problem" */}
            <div className="space-y-6">
              <div className="bg-white p-6 shadow-sm rotate-1 border border-gray-200">
                <h3 className="font-bold font-sans text-lg mb-2 flex items-center gap-2">
                  <Layers size={18} /> The Challenge
                </h3>
                <p className="font-hand text-xl text-gray-600 leading-relaxed">
                  {project.description} 
                  <br/><br/>
                  &ldquo;We needed a way to bridge the gap between complex blockchain logic and user-friendly interfaces without sacrificing security.&rdquo;
                </p>
              </div>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="bg-ink text-white px-3 py-1 font-code text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: "Evidence" (Wireframes/Code) */}
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

              <div className="flex gap-4">
                 <button className="flex-1 bg-highlight text-white py-3 font-bold hover:bg-red-600 transition-colors shadow-md flex items-center justify-center gap-2">
                    <ExternalLink size={18} /> Live Demo
                 </button>
                 <button className="flex-1 bg-white border-2 border-ink text-ink py-3 font-bold hover:bg-gray-50 transition-colors shadow-md flex items-center justify-center gap-2">
                    <Code size={18} /> Source Code
                 </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}