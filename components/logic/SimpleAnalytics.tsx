"use client";

import { useEffect, useRef } from "react";

/**
 * CLIENT-SIDE UTILITIES
 */

// 1. Generate or Retrieve a Session ID to group events from the same user session
const getSessionId = () => {
  if (typeof window === "undefined") return "server-side";
  let sid = sessionStorage.getItem("analytics_session_id");
  if (!sid) {
    // Generate a simple unique ID
    sid = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    sessionStorage.setItem("analytics_session_id", sid);
  }
  return sid;
};

// 2. The Sender Function
// This sends data to your /api/analytics endpoint
export const trackEvent = async (eventName: string, properties?: Record<string, unknown>) => {
  const sessionId = getSessionId();
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics 📡] ${eventName}`, properties);
  }

  try {
    // We use fetch with "keepalive" so the request completes even if the page closes
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        sessionId,
        properties,
        url: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : ""
      }),
      keepalive: true,
    });
  } catch (err) {
    console.error("Analytics tracking failed:", err);
  }
};

/**
 * ANALYTICS COMPONENT
 * Handles passive tracking (page views and section visibility)
 * Refactored to use standard browser APIs to ensure compatibility
 */
export default function SimpleAnalytics() {
  const lastPath = useRef<string>("");

  // 1. Track Page Views
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleView = () => {
      const currentPath = window.location.pathname;
      if (currentPath !== lastPath.current) {
        trackEvent("page_view", { 
          path: currentPath,
          search: window.location.search
        });
        lastPath.current = currentPath;
      }
    };

    // Initial track on mount
    handleView();

    // Listen for navigation changes (popstate covers back/forward)
    window.addEventListener("popstate", handleView);
    
    // Custom event listener if you use pushState in other parts of the app
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      handleView();
    };
    
    return () => {
      window.removeEventListener("popstate", handleView);
      window.history.pushState = originalPushState;
    };
  }, []);

  // 2. Track Section Visibility (Intersection Observer)
  // This detects which sections recruiters are actually looking at
  useEffect(() => {
    // List of section IDs to monitor
    const sections = ["hero", "work", "manifesto", "experience", "skills", "contact"];
    
    // Configuration: Trigger when 50% of the section is visible in the viewport
    const observerOptions = { threshold: 0.5 };
    const timers = new Map<string, NodeJS.Timeout>();

    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;

        if (entry.isIntersecting) {
          // Debounce: Recruiter must look for 1.5 seconds to count as a "View"
          const timer = setTimeout(() => {
            trackEvent("section_view", { section: id });
          }, 1500);
          timers.set(id, timer);
        } else {
          // If they scroll away before 1.5s, cancel the track event
          if (timers.has(id)) {
            clearTimeout(timers.get(id)!);
            timers.delete(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  return null; // This is a logic-only component
}