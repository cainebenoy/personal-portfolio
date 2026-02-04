"use client";

import { X, ExternalLink, Code, Layers, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle animation state - trigger animation after isOpen changes
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Small delay to ensure the DOM is ready
      const timer = requestAnimationFrame(() => {
        setIsAnimating(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isOpen]);

  if (!project || !mounted || !isOpen) return null;

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsClosing(true);
      setIsAnimating(false);
      // Match the animation duration (600ms)
      setTimeout(() => onClose(), 600);
    }
  };

  const modalContent = (
    <>
      {/* Backdrop - Full screen blur */}
      <div 
        className={`backdrop-blur-md fixed inset-0 w-screen h-screen transition-opacity duration-600 ease-out ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
        style={{ 
          zIndex: 9998,
        }}
      />

      {/* Modal Container - Fixed positioning for viewport centering */}
      <div 
        className="fixed inset-0 w-screen h-screen flex items-center justify-center pointer-events-none transition-opacity duration-600 ease-out"
        style={{
          zIndex: 9999,
          opacity: isAnimating ? 1 : 0,
        }}
      >
        {/* Modal Content */}
        <div 
          className={`w-full max-w-4xl bg-white rounded-lg shadow-2xl border-t-8 border-gray-800 overflow-hidden cursor-default pointer-events-auto transition-all duration-600 ease-out transform ${
            isAnimating 
              ? 'scale-100 opacity-100' 
              : 'scale-90 opacity-0'
          }`}
          style={{
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: '1rem auto',
          }}
        >
        
        {/* Tab Label */}
        <div className="relative h-6 mb-4 flex items-center">
          <div className="absolute -top-8 left-8 h-8 px-6 bg-white rounded-t-lg flex items-center font-code text-xs text-gray-600 border-t border-l border-r border-gray-800">
            CASE_ID: {project.title.toUpperCase().replace(/\s/g, "_")}
          </div>
        </div>

        {/* Header */}
        <div className="bg-gray-100 p-6 flex justify-between items-start border-b border-gray-300">
          <div>
            <div className="font-marker text-red-600 text-xl rotate-[-1deg] mb-1">CONFIDENTIAL</div>
            <h2 className="font-display text-4xl text-gray-900">{project.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors" aria-label="Close modal" title="Close">
            <X size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto max-h-[70vh] bg-[url('https://www.transparenttextures.com/patterns/lined-paper-2.png')]">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: The "Problem" & Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 shadow-sm rotate-1 border border-gray-300">
                <h3 className="font-bold font-sans text-lg mb-3 flex items-center gap-2 text-gray-900">
                  <Layers size={18} /> The Challenge
                </h3>
                <p className="font-hand text-lg text-gray-800 leading-relaxed mb-4">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Stack Tags */}
              <div>
                <h3 className="font-bold text-sm text-gray-900 mb-3 uppercase font-code">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-900 text-white px-3 py-1 font-code text-xs rounded-full">
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
                      ? 'bg-white border-gray-900 text-gray-900 hover:bg-gray-50 cursor-pointer'
                      : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                    <Github size={18} /> {project.githubUrl ? 'View Source Code' : 'Source Not Available'}
                 </button>
              </div>

              {/* URLs for reference */}
              {(project.liveUrl || project.githubUrl) && (
                <div className="text-xs font-code space-y-1 p-3 bg-gray-100 rounded border border-gray-300">
                  {project.liveUrl && (
                    <div className="text-gray-900">
                      <span className="font-bold">Live:</span>
                      <br />
                      <span className="break-all text-gray-600">{project.liveUrl}</span>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="text-gray-900">
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
    </>
  );

  return createPortal(modalContent, document.body);
}