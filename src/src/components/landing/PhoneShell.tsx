import React from "react";

/**
 * Realistic iPhone 15 Pro frame with dynamic island, side buttons, and a
 * subtle screen reflection overlay. Renders any screenshot URL inside.
 */
export function PhoneShell({
  src,
  alt,
  tilt = 0,
  z = 1,
  width = 280,
  glow = true,
  reflection = true,
  className = "",
  children,
}: {
  src?: string;
  alt?: string;
  tilt?: number;
  z?: number;
  width?: number;
  glow?: boolean;
  reflection?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const height = Math.round(width * 2.165); // iPhone 15 Pro aspect ratio ~19.5:9

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ zIndex: z, perspective: "1200px" }}
    >
      {glow && (
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(22,163,74,0.45), rgba(22,163,74,0) 70%)",
            filter: "blur(20px)",
          }}
        />
      )}
      <div
        className="relative transition-transform duration-700 ease-out hover:scale-[1.02]"
        style={{
          width,
          height,
          transform: `rotate(${tilt}deg)`,
          filter:
            "drop-shadow(0 30px 60px rgba(0,0,0,0.35)) drop-shadow(0 10px 20px rgba(0,0,0,0.25))",
        }}
      >
        {/* Titanium frame */}
        <div
          className="absolute inset-0 rounded-[2.6rem]"
          style={{
            background:
              "linear-gradient(135deg, #2a2a2e 0%, #0a0a0c 40%, #1a1a1e 60%, #050507 100%)",
            padding: 3,
          }}
        >
          {/* Inner bezel */}
          <div
            className="w-full h-full rounded-[2.5rem] bg-black overflow-hidden relative"
            style={{ padding: 6 }}
          >
            <div className="w-full h-full rounded-[2.1rem] overflow-hidden relative bg-black">
              {children ? (
                <div className="absolute inset-0 w-full h-full overflow-hidden select-none">
                  {children}
                </div>
              ) : (
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="block w-full h-full object-cover select-none"
                  draggable={false}
                />
              )}
              {/* Dynamic island */}
              <div
                aria-hidden
                className="absolute top-2.5 left-1/2 -translate-x-1/2 h-7 w-[35%] rounded-full bg-black z-20"
              />
              {/* Screen reflection */}
              {reflection && (
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(115deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.06) 100%)",
                  }}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none rounded-[2.1rem]"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 30px rgba(0,0,0,0.4)",
                }}
              />
            </div>
          </div>
        </div>
        {/* Side buttons */}
        <span
          aria-hidden
          className="absolute -left-[3px] top-[22%] w-[3px] h-9 rounded-l bg-[#1a1a1e]"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[34%] w-[3px] h-14 rounded-l bg-[#1a1a1e]"
        />
        <span
          aria-hidden
          className="absolute -left-[3px] top-[48%] w-[3px] h-14 rounded-l bg-[#1a1a1e]"
        />
        <span
          aria-hidden
          className="absolute -right-[3px] top-[30%] w-[3px] h-20 rounded-r bg-[#1a1a1e]"
        />
      </div>
    </div>
  );
}
