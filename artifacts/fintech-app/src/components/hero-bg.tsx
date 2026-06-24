export function HeroBg() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Base gradient */}
          <radialGradient id="bg-grad" cx="50%" cy="45%" r="75%">
            <stop offset="0%" stopColor="#1a0a3a" />
            <stop offset="55%" stopColor="#0d0620" />
            <stop offset="100%" stopColor="#060412" />
          </radialGradient>

          {/* Orb gradients */}
          <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orb4" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </radialGradient>

          {/* Node glow */}
          <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-glow-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="node-glow-cyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          {/* Line gradient */}
          <linearGradient id="line-grad-h" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="30%" stopColor="#7c3aed" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="line-grad-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>

          {/* Hexagon clip */}
          <clipPath id="hex-clip">
            <polygon points="100,0 200,50 200,150 100,200 0,150 0,50" />
          </clipPath>

          {/* Blur filter */}
          <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
          <filter id="orb-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
        </defs>

        {/* Background */}
        <rect width="1440" height="900" fill="url(#bg-grad)" />

        {/* Large glowing orbs */}
        <g filter="url(#orb-blur)">
          <ellipse cx="320" cy="350" rx="380" ry="320" fill="url(#orb1)">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 30,-20; -15,25; 0,0" dur="18s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1100" cy="280" rx="300" ry="260" fill="url(#orb2)">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; -25,15; 20,-30; 0,0" dur="22s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="720" cy="700" rx="250" ry="200" fill="url(#orb3)">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 20,10; -30,-15; 0,0" dur="16s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="1300" cy="650" rx="200" ry="180" fill="url(#orb4)">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; -15,-20; 25,10; 0,0" dur="20s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* Mesh grid — horizontal lines */}
        {[120, 220, 320, 420, 520, 620, 720, 820].map((y, i) => (
          <line key={`h${i}`} x1="0" y1={y} x2="1440" y2={y}
            stroke="url(#line-grad-h)" strokeWidth="0.6" opacity="0.7" />
        ))}
        {/* Mesh grid — vertical lines */}
        {[0, 120, 240, 360, 480, 600, 720, 840, 960, 1080, 1200, 1320, 1440].map((x, i) => (
          <line key={`v${i}`} x1={x} y1="0" x2={x} y2="900"
            stroke="url(#line-grad-v)" strokeWidth="0.6" opacity="0.5" />
        ))}

        {/* Diagonal accent lines */}
        <line x1="0" y1="0" x2="500" y2="900" stroke="#7c3aed" strokeWidth="0.8" opacity="0.12" />
        <line x1="200" y1="0" x2="700" y2="900" stroke="#3b82f6" strokeWidth="0.6" opacity="0.1" />
        <line x1="940" y1="0" x2="1440" y2="600" stroke="#7c3aed" strokeWidth="0.8" opacity="0.1" />
        <line x1="1100" y1="0" x2="600" y2="900" stroke="#06b6d4" strokeWidth="0.6" opacity="0.08" />

        {/* Floating hexagons */}
        <g opacity="0.12">
          <polygon points="80,60 110,43 140,60 140,94 110,111 80,94" fill="none" stroke="#7c3aed" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-12;0,0" dur="6s" repeatCount="indefinite" />
          </polygon>
          <polygon points="1300,100 1330,83 1360,100 1360,134 1330,151 1300,134" fill="none" stroke="#3b82f6" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,10;0,0" dur="8s" repeatCount="indefinite" />
          </polygon>
          <polygon points="200,720 240,697 280,720 280,766 240,789 200,766" fill="none" stroke="#06b6d4" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="7s" repeatCount="indefinite" />
          </polygon>
          <polygon points="1180,700 1210,683 1240,700 1240,734 1210,751 1180,734" fill="none" stroke="#a855f7" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="translate" values="0,0;0,9;0,0" dur="9s" repeatCount="indefinite" />
          </polygon>
          {/* Large faint hexagon */}
          <polygon points="660,50 760,0 860,50 860,200 760,250 660,200" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" values="0 760 125;3 760 125;0 760 125" dur="20s" repeatCount="indefinite" />
          </polygon>
        </g>

        {/* Floating geometric rings */}
        <circle cx="150" cy="450" r="70" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity="0.15" strokeDasharray="8 4">
          <animateTransform attributeName="transform" type="rotate" values="0 150 450;360 150 450" dur="30s" repeatCount="indefinite" />
        </circle>
        <circle cx="1290" cy="420" r="90" fill="none" stroke="#3b82f6" strokeWidth="0.7" opacity="0.12" strokeDasharray="12 5">
          <animateTransform attributeName="transform" type="rotate" values="360 1290 420;0 1290 420" dur="25s" repeatCount="indefinite" />
        </circle>
        <circle cx="720" cy="200" r="120" fill="none" stroke="#7c3aed" strokeWidth="0.6" opacity="0.08" strokeDasharray="6 8">
          <animateTransform attributeName="transform" type="rotate" values="0 720 200;360 720 200" dur="40s" repeatCount="indefinite" />
        </circle>

        {/* Glowing nodes at grid intersections */}
        {[
          [120,120,"node-glow"], [360,120,"node-glow-blue"], [600,220,"node-glow"],
          [840,120,"node-glow-cyan"], [1080,220,"node-glow-blue"], [1320,120,"node-glow"],
          [240,420,"node-glow-cyan"], [480,320,"node-glow-blue"], [720,420,"node-glow"],
          [960,320,"node-glow-cyan"], [1200,420,"node-glow-blue"],
          [120,620,"node-glow-blue"], [360,520,"node-glow"], [600,620,"node-glow-cyan"],
          [840,520,"node-glow"], [1080,620,"node-glow-blue"], [1320,520,"node-glow-cyan"],
        ].map(([cx, cy, grad], i) => (
          <g key={i}>
            {/* Glow halo */}
            <circle cx={cx} cy={cy} r="12" fill={`url(#${grad})`} opacity="0.6">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
              <animate attributeName="r" values="10;16;10" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
            {/* Core dot */}
            <circle cx={cx} cy={cy} r="2" fill="white" opacity="0.8">
              <animate attributeName="opacity" values="0.5;1;0.5" dur={`${3 + (i % 4)}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Floating particles */}
        {[
          [450,180,2.5,"#7c3aed",5],[850,80,2,"#3b82f6",7],[1150,300,1.8,"#06b6d4",6],
          [300,550,2,"#a855f7",8],[1050,500,2.5,"#7c3aed",5],[680,750,2,"#3b82f6",6],
          [1380,250,1.5,"#7c3aed",9],[100,300,2,"#06b6d4",7],[920,680,1.8,"#a855f7",5],
        ].map(([cx, cy, r, fill, dur], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={fill as string} opacity="0.6">
            <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${dur}s`} repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate"
              values={`0,0;${i%2===0?4:-4},${-6};0,0`} dur={`${(dur as number)+1}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Abstract curved paths */}
        <path d="M0,450 Q360,300 720,450 Q1080,600 1440,450"
          fill="none" stroke="#7c3aed" strokeWidth="1" opacity="0.1" strokeDasharray="20 10" />
        <path d="M0,550 Q400,380 800,500 Q1100,580 1440,400"
          fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.08" strokeDasharray="15 12" />

        {/* Bottom fade to background */}
        <defs>
          <linearGradient id="fade-bottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="60%" stopColor="#060412" stopOpacity="0" />
            <stop offset="100%" stopColor="#060412" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#fade-bottom)" />
      </svg>
    </div>
  );
}
