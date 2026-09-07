"use client";

import { useEffect } from "react";

const AGENT_ID = "agent_2701m1h5394kf2w90hgq8xa9n4a1";
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

const BRAND_NAME = "Bleibsichtbar";
const BRAND_URL = "https://bleibsichtbar.com";
const DARK = "#0a0a0a";

/** Rewrite the widget's "Powered by …" attribution to the Bleibsichtbar credit. */
function applyBranding(root: ParentNode) {
  root.querySelectorAll("a").forEach((a) => {
    const txt = (a.textContent || "").toLowerCase();
    if (
      !txt.includes("elevenlabs") &&
      !txt.includes("elevenagents") &&
      !txt.includes("bleibsichtbar") &&
      !txt.includes("powered by")
    ) {
      return;
    }

    if (a.textContent !== BRAND_NAME) a.textContent = BRAND_NAME;
    a.setAttribute("href", BRAND_URL);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
    a.style.color = DARK;
    a.style.fontWeight = "700";
    a.style.opacity = "1";

    const p = a.closest("p") ?? a.parentElement;
    if (p instanceof HTMLElement) {
      p.style.color = DARK;
      p.querySelectorAll("span").forEach((s) => {
        s.style.opacity = "1";
        s.style.color = DARK;
      });
    }
  });
}

/**
 * Mounts the ElevenLabs ConvAI assistant widget at the end of <body> on every
 * page (the root component persists across route changes). Idempotent.
 */
export function ElevenLabsWidget() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!document.querySelector("elevenlabs-convai")) {
      const el = document.createElement("elevenlabs-convai");
      el.setAttribute("agent-id", AGENT_ID);
      el.setAttribute("variant", "compact");
      el.setAttribute("dismissible", "true");
      el.setAttribute("disable-banner", "true");
      el.setAttribute("action-text", "Frage stellen");
      el.setAttribute("expand-text", "Chat öffnen");
      el.setAttribute("collapse-text", "Schliessen");
      document.body.appendChild(el);
    }

    if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.type = "text/javascript";
      document.body.appendChild(s);
    }

    const host = document.querySelector("elevenlabs-convai");

    // Scope strictly to the widget — never touch the rest of the page.
    const roots = (): ParentNode[] => {
      if (!host) return [];
      const list: ParentNode[] = [host];
      if (host.shadowRoot) list.push(host.shadowRoot);
      return list;
    };

    const run = () => roots().forEach(applyBranding);
    run();

    const interval = window.setInterval(run, 700);
    const observers: MutationObserver[] = [];
    for (const r of roots()) {
      const mo = new MutationObserver(run);
      mo.observe(r as Node, { childList: true, subtree: true });
      observers.push(mo);
    }

    const stop = window.setTimeout(() => {
      window.clearInterval(interval);
    }, 20000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return null;
}

export default ElevenLabsWidget;
