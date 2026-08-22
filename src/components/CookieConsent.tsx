"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, Settings, X } from "lucide-react";

interface CookieConsentProps {
  onClose?: () => void;
}

export default function CookieConsent({ onClose }: CookieConsentProps) {
  const [showConsent, setShowConsent] = useState(false);
  const [settingsMode, setSettingsMode] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent");
    const showBanner = !hasConsent;
    setShowConsent(showBanner);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentEssential", "accepted");
    setShowConsent(false);
    onClose?.();
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieConsentEssential", "accepted");
    setShowConsent(false);
    onClose?.();
  };

  const handleSettings = () => {
    setSettingsMode(true);
  };

  const handleSettingsSave = () => {
    localStorage.setItem("cookieConsent", "settings");
    setShowConsent(false);
    setSettingsMode(false);
    onClose?.();
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0e17] border-t border-[rgba(255,255,255,0.07)] shadow-2xl">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Icon and Text */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex-shrink-0">
              <Cookie className="h-6 w-6 text-[#8ce62c]" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base text-[#c5cbd7] leading-relaxed">
                We use cookies to ensure you get the best experience on our website. Some cookies are essential for the site to function properly, while others help us improve your experience.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {!settingsMode ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]"
                  onClick={handleSettings}
                >
                  <Settings className="h-3 w-3 mr-1.5" />
                  Settings
                </Button>
                <Button
                  size="sm"
                  className="bg-[#8ce62c] hover:bg-[#7adf22] text-black border-[#8ce62c] font-medium"
                  onClick={handleAccept}
                >
                  Accept All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#9ca3af] hover:text-white hover:bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)]"
                  onClick={() => setSettingsMode(false)}
                >
                  <X className="h-3 w-3 mr-1.5" />
                  Back
                </Button>
                <Button
                  size="sm"
                  className="bg-[#8ce62c] hover:bg-[#7adf22] text-black border-[#8ce62c] font-medium"
                  onClick={handleSettingsSave}
                >
                  Save Settings
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}