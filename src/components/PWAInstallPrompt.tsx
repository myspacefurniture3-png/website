
"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PWAInstallPrompt() {
  const pathname = usePathname();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  if (!showPrompt || pathname?.startsWith('/studio')) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <div style={{
        background: '#fff',
        color: '#222',
        borderRadius: 8,
        boxShadow: '0 2px 16px rgba(0,0,0,0.12)',
        padding: '18px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        pointerEvents: 'auto',
      }}>
        <span style={{ fontWeight: 500 }}>Install this app for a better experience!</span>
        <button
          onClick={handleInstall}
          style={{
            background: '#b8845c',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '8px 18px',
            fontWeight: 600,
            cursor: 'pointer',
            marginRight: 8,
          }}
        >
          Install
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          aria-label="Close install prompt"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#888',
            fontSize: 22,
            fontWeight: 700,
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0 6px',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
