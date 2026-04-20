// Illustrative, figurative motifs — each a small painted vignette.
// Uses layered fills, gradients and hand-feeling strokes.

const Motif = ({ kind, size = 80, color = "#3a2e1a" }) => {
  const s = size;
  const V = 100; // all motifs authored in a 100x100 viewBox
  const ink = color;
  const gold = "#b8892b";
  const goldBright = "#e0b850";

  const paths = {
    // 1. THE EXILE — white lotus rising from dark water under a jewelled night sky
    "lotus": (
      <g>
        {/* sky */}
        <rect x="0" y="0" width="100" height="62" fill="#2a3a4a" opacity="0.82"/>
        {/* stars */}
        {[[18,12],[32,20],[48,10],[64,18],[78,8],[88,22],[24,32],[72,30]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={0.9} fill="#f5e4a5"/>
        ))}
        {/* water */}
        <path d="M0,62 Q30,58 50,62 T100,62 L100,100 L0,100 Z" fill="#1a2a38"/>
        <path d="M0,72 Q25,70 50,72 T100,72" stroke="#3a5065" strokeWidth="0.6" fill="none" opacity="0.7"/>
        <path d="M0,82 Q30,80 55,82 T100,82" stroke="#3a5065" strokeWidth="0.5" fill="none" opacity="0.5"/>
        {/* lily pad */}
        <ellipse cx="30" cy="70" rx="14" ry="3" fill="#3a5a3a" opacity="0.7"/>
        <ellipse cx="75" cy="76" rx="10" ry="2.3" fill="#3a5a3a" opacity="0.6"/>
        {/* lotus back petals */}
        {[-55,-25,25,55].map((deg,i)=>(
          <ellipse key={i} cx="50" cy="50" rx="7" ry="16"
            transform={`rotate(${deg} 50 58)`}
            fill="#f6efdf" stroke="#c9a96a" strokeWidth="0.5"/>
        ))}
        {/* front petals */}
        {[-35,-10,10,35].map((deg,i)=>(
          <ellipse key={i} cx="50" cy="54" rx="5.5" ry="13"
            transform={`rotate(${deg} 50 60)`}
            fill="#fffaf0" stroke="#b8892b" strokeWidth="0.5"/>
        ))}
        <ellipse cx="50" cy="58" rx="3" ry="3" fill={gold}/>
      </g>
    ),

    // 2. SINCE THE BEGINNING — sunrise over grass & stream; bird in sky
    "morning-star": (
      <g>
        {/* sky gradient */}
        <defs>
          <linearGradient id={`sky-${size}-msb`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f9dba3"/>
            <stop offset="60%" stopColor="#f6c98a"/>
            <stop offset="100%" stopColor="#e0a574"/>
          </linearGradient>
        </defs>
        <rect width="100" height="60" fill={`url(#sky-${size}-msb)`}/>
        {/* sun rays */}
        {[0,30,60,90,120,150,180].map(a=>{
          const rad = a*Math.PI/180;
          return <line key={a} x1="50" y1="55" x2={50+Math.cos(rad-Math.PI)*50} y2={55+Math.sin(rad-Math.PI)*50} stroke="#f7d97a" strokeWidth="0.7" opacity="0.7"/>;
        })}
        <circle cx="50" cy="55" r="14" fill="#f9e9a8"/>
        <circle cx="50" cy="55" r="10" fill="#fff5c7"/>
        {/* lark */}
        <path d="M72,22 Q76,18 80,22 M80,22 Q84,18 88,22" stroke={ink} strokeWidth="1" fill="none" strokeLinecap="round"/>
        {/* horizon grass */}
        <path d="M0,60 L100,60 L100,100 L0,100 Z" fill="#b8c88a"/>
        <path d="M0,68 Q25,64 50,68 T100,68 L100,100 L0,100 Z" fill="#8fa06a"/>
        {/* blades */}
        {[8,22,38,55,72,88].map((x,i)=>(
          <path key={i} d={`M${x},90 Q${x+2},82 ${x+1},74`} stroke="#6a8050" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        ))}
        {/* stream */}
        <path d="M30,85 Q50,80 70,88" stroke="#7da8c0" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8"/>
      </g>
    ),

    // 3. IMAGO DEI — two figures in an arched vesica, temple curtain torn
    "vesica": (
      <g>
        {/* vesica frame */}
        <path d="M50,10 C25,30 25,70 50,90 C75,70 75,30 50,10 Z" fill="#f7ecd0" stroke={gold} strokeWidth="1.2"/>
        {/* torn veil */}
        <path d="M18,12 L22,88 M82,12 L78,88" stroke="#7a3a3a" strokeWidth="3" strokeLinecap="round"/>
        <path d="M22,88 L28,60 L24,50 L30,30 L26,18 L22,12" stroke="#7a3a3a" strokeWidth="0.6" fill="none" opacity="0.6"/>
        {/* two figures facing each other */}
        <circle cx="41" cy="40" r="5" fill="#c9a96a"/>
        <path d="M34,48 Q35,68 41,72 Q47,68 48,56 Q48,50 41,48 Z" fill="#6a8050"/>
        <circle cx="59" cy="40" r="5" fill="#c9a96a"/>
        <path d="M52,48 Q52,56 52,56 Q53,68 59,72 Q65,68 66,48 Z" fill="#a85a70"/>
        {/* joined hands */}
        <line x1="45" y1="58" x2="55" y2="58" stroke={gold} strokeWidth="1.5" strokeLinecap="round"/>
        {/* halo */}
        <path d="M30,20 Q50,8 70,20" stroke={gold} strokeWidth="0.8" fill="none"/>
      </g>
    ),

    // 4. A NAME UNTOLD — the Oaken Pilgrim — a great oak, staff, mountain behind
    "oak": (
      <g>
        {/* sky */}
        <rect width="100" height="56" fill="#dde4ca"/>
        {/* distant mountains */}
        <path d="M0,56 L18,34 L30,46 L45,28 L62,44 L78,30 L100,50 L100,56 Z" fill="#8fa28a" opacity="0.7"/>
        <path d="M0,56 L20,42 L35,50 L50,40 L70,52 L90,44 L100,56 Z" fill="#6a8072" opacity="0.8"/>
        {/* ground */}
        <path d="M0,56 L100,56 L100,100 L0,100 Z" fill="#c9b080"/>
        <path d="M0,66 Q50,62 100,66 L100,100 L0,100 Z" fill="#a8895a"/>
        {/* trunk */}
        <path d="M48,96 Q47,78 46,66 Q44,58 47,48 L53,48 Q56,58 54,66 Q53,78 52,96 Z" fill="#5a3a22"/>
        {/* canopy clusters */}
        <circle cx="50" cy="38" r="18" fill="#4a6238"/>
        <circle cx="34" cy="42" r="12" fill="#5a7042"/>
        <circle cx="66" cy="42" r="13" fill="#5a7042"/>
        <circle cx="42" cy="28" r="10" fill="#6a8050"/>
        <circle cx="58" cy="28" r="10" fill="#6a8050"/>
        {/* leaf highlights */}
        <circle cx="46" cy="36" r="1.3" fill="#8fa870" opacity="0.8"/>
        <circle cx="56" cy="34" r="1.3" fill="#8fa870" opacity="0.8"/>
        {/* acorn */}
        <ellipse cx="38" cy="56" rx="1.6" ry="2.2" fill="#6a4a2a"/>
        {/* pilgrim staff leaning */}
        <line x1="70" y1="96" x2="78" y2="52" stroke="#4a3020" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="78" cy="50" r="2" fill={gold}/>
      </g>
    ),

    // 5. EVEN GROUND — skylark in flight over meandering meadow
    "skylark": (
      <g>
        {/* sky */}
        <rect width="100" height="60" fill="#e6ecd6"/>
        {/* clouds */}
        <ellipse cx="22" cy="16" rx="14" ry="4" fill="#ffffff" opacity="0.7"/>
        <ellipse cx="72" cy="22" rx="16" ry="4" fill="#ffffff" opacity="0.7"/>
        {/* sun */}
        <circle cx="82" cy="18" r="7" fill="#f9e9a8" opacity="0.85"/>
        {/* skylark */}
        <path d="M38,30 Q44,24 50,32 Q56,24 62,30" stroke={ink} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <circle cx="50" cy="32" r="1.2" fill={ink}/>
        {/* meandering ground */}
        <path d="M0,60 Q20,55 40,62 T80,62 T100,60 L100,100 L0,100 Z" fill="#c5d08a"/>
        <path d="M0,72 Q25,68 50,74 T100,72 L100,100 L0,100 Z" fill="#9fb068"/>
        <path d="M0,84 Q25,82 55,86 T100,84 L100,100 L0,100 Z" fill="#7a8f4a"/>
        {/* path winding */}
        <path d="M20,98 Q30,80 50,72 Q70,64 82,54" stroke="#d9c89a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9"/>
        {/* tiny flowers */}
        {[[14,88],[30,90],[48,86],[68,84],[84,92]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="1.4" fill="#e4b570"/>
            <circle cx={x} cy={y} r="0.5" fill="#8a5a2a"/>
          </g>
        ))}
      </g>
    ),

    // 6. FOR LOVE, IN LOVE — descending dove over a beating heart, rays
    "dove": (
      <g>
        {/* warm sky */}
        <defs>
          <radialGradient id={`glow-${size}-dv`} cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fff3d3"/>
            <stop offset="70%" stopColor="#f3dda5"/>
            <stop offset="100%" stopColor="#e0c380"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#glow-${size}-dv)`}/>
        {/* rays */}
        {[-40,-20,0,20,40].map(a=>{
          const rad = (a-90)*Math.PI/180;
          return <line key={a} x1="50" y1="30" x2={50+Math.cos(rad)*40} y2={30+Math.sin(rad)*40} stroke="#f7d97a" strokeWidth="0.8" opacity="0.7"/>;
        })}
        {/* dove body */}
        <ellipse cx="50" cy="36" rx="12" ry="7" fill="#ffffff"/>
        {/* wings */}
        <path d="M38,34 Q28,20 42,30 Q36,32 38,34 Z" fill="#ffffff" stroke="#c9b68a" strokeWidth="0.4"/>
        <path d="M62,34 Q72,20 58,30 Q64,32 62,34 Z" fill="#ffffff" stroke="#c9b68a" strokeWidth="0.4"/>
        {/* head */}
        <circle cx="61" cy="34" r="3.2" fill="#ffffff"/>
        <circle cx="62.5" cy="33.5" r="0.5" fill={ink}/>
        <path d="M64,34 L67,34.5 L64,35" fill="#d9a436"/>
        {/* olive sprig in beak */}
        <line x1="67" y1="34.5" x2="74" y2="38" stroke="#5a7042" strokeWidth="0.6"/>
        <ellipse cx="72" cy="37" rx="1.5" ry="0.7" fill="#6a8050" transform="rotate(30 72 37)"/>
        <ellipse cx="74" cy="38" rx="1.2" ry="0.6" fill="#6a8050"/>
        {/* heart below */}
        <path d="M50,68 C40,56 32,70 50,82 C68,70 60,56 50,68 Z" fill="#c04a5a"/>
        <path d="M44,68 C42,64 46,62 48,66" stroke="#ffc8b5" strokeWidth="0.8" fill="none" opacity="0.7"/>
      </g>
    ),

    // 7. SWEET SOPHIA — seven-flame candelabrum, banquet veil
    "seven-petal": (
      <g>
        {/* deep violet back */}
        <rect width="100" height="100" fill="#4a2a58" opacity="0.12"/>
        {/* temple arch */}
        <path d="M20,90 L20,40 Q50,18 80,40 L80,90" stroke={gold} strokeWidth="1" fill="#f7ecd0" opacity="0.85"/>
        {/* menorah base */}
        <rect x="46" y="74" width="8" height="14" fill={gold}/>
        <rect x="38" y="86" width="24" height="4" fill={gold}/>
        {/* stem */}
        <line x1="50" y1="74" x2="50" y2="58" stroke={gold} strokeWidth="1.5"/>
        {/* 7 arms */}
        {[-3,-2,-1,0,1,2,3].map(i=>{
          const x = 50 + i*6;
          return (
            <g key={i}>
              <path d={`M50,60 Q${50+i*4},${56-Math.abs(i)*2} ${x},${54-Math.abs(i)*3}`} stroke={gold} strokeWidth="1.2" fill="none"/>
              {/* cup */}
              <rect x={x-1.5} y={52-Math.abs(i)*3} width="3" height="2" fill={gold}/>
              {/* flame */}
              <path d={`M${x},${50-Math.abs(i)*3} Q${x-1.3},${46-Math.abs(i)*3} ${x},${44-Math.abs(i)*3} Q${x+1.3},${46-Math.abs(i)*3} ${x},${50-Math.abs(i)*3} Z`} fill="#f7c44a"/>
              <path d={`M${x},${48.5-Math.abs(i)*3} Q${x-0.6},${46.5-Math.abs(i)*3} ${x},${45-Math.abs(i)*3} Q${x+0.6},${46.5-Math.abs(i)*3} ${x},${48.5-Math.abs(i)*3} Z`} fill="#fff5c7"/>
            </g>
          );
        })}
        {/* bread & wine on table below */}
        <ellipse cx="35" cy="90" rx="4" ry="2" fill="#b8833a"/>
        <rect x="60" y="84" width="4" height="6" fill="#8a2a3a"/>
        <ellipse cx="62" cy="84" rx="2" ry="0.6" fill="#6a1e28"/>
      </g>
    ),

    // 8. MY PEACE — olive branch, open hand, sunrise
    "olive": (
      <g>
        {/* sky */}
        <rect width="100" height="60" fill="#f2e8cc"/>
        {/* sun low on horizon */}
        <circle cx="50" cy="58" r="18" fill="#f9dba3" opacity="0.9"/>
        <circle cx="50" cy="58" r="12" fill="#fff0c3"/>
        {/* ground */}
        <path d="M0,60 L100,60 L100,100 L0,100 Z" fill="#c5cca4"/>
        <path d="M0,72 Q50,66 100,72 L100,100 L0,100 Z" fill="#9fa680" opacity="0.9"/>
        {/* olive branch curved */}
        <path d="M14,78 Q38,60 62,52 Q80,46 90,38" stroke="#4a3a22" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        {/* leaves */}
        {[[22,72,-30],[32,66,-25],[44,58,-20],[56,52,-15],[68,46,-10],[78,42,-5],[86,40,0],[28,76,150],[40,70,155],[52,62,160],[64,56,165],[74,50,170]].map(([x,y,r],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="4.5" ry="1.6" fill="#6a8050" transform={`rotate(${r} ${x} ${y})`} stroke="#4a6038" strokeWidth="0.3"/>
        ))}
        {/* olives */}
        <circle cx="34" cy="68" r="1.6" fill="#2a3a1a"/>
        <circle cx="58" cy="54" r="1.6" fill="#5a6a28"/>
        <circle cx="72" cy="48" r="1.6" fill="#2a3a1a"/>
        {/* dove silhouette small */}
        <path d="M78,22 Q82,18 86,22 M86,22 Q90,18 94,22" stroke={ink} strokeWidth="0.8" fill="none" opacity="0.6"/>
      </g>
    ),

    // 9. RADIANT KNIGHT — knight's helm with cross sword and shield
    "sword-shield": (
      <g>
        {/* misty light */}
        <defs>
          <radialGradient id={`rad-${size}-k`} cx="50%" cy="30%">
            <stop offset="0%" stopColor="#fff3d3"/>
            <stop offset="100%" stopColor="#d7d4c4"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#rad-${size}-k)`}/>
        {/* rays */}
        {[-30,-10,10,30].map(a=>{
          const rad = (a-90)*Math.PI/180;
          return <line key={a} x1="50" y1="20" x2={50+Math.cos(rad)*45} y2={20+Math.sin(rad)*45} stroke="#f7d97a" strokeWidth="0.6" opacity="0.55"/>;
        })}
        {/* shield */}
        <path d="M28,32 L72,32 L72,58 Q72,80 50,92 Q28,80 28,58 Z" fill="#c7b887" stroke="#7a5a28" strokeWidth="1.2"/>
        {/* cross on shield */}
        <rect x="46" y="38" width="8" height="44" fill="#7a2a2a"/>
        <rect x="32" y="52" width="36" height="8" fill="#7a2a2a"/>
        {/* sword laid behind shield */}
        <line x1="20" y1="14" x2="80" y2="92" stroke="#c9ccd0" strokeWidth="2.2" strokeLinecap="round"/>
        <line x1="20" y1="14" x2="80" y2="92" stroke="#ffffff" strokeWidth="0.6" strokeLinecap="round"/>
        {/* hilt */}
        <circle cx="18" cy="12" r="2.5" fill={gold}/>
        <line x1="10" y1="22" x2="26" y2="4" stroke={gold} strokeWidth="1.8" strokeLinecap="round"/>
      </g>
    ),

    // 10. POUR OUT MY SOUL — chalice with rising smoke/incense, gold bowls
    "chalice-incense": (
      <g>
        {/* sanctuary darkness */}
        <rect width="100" height="100" fill="#2a1e2a" opacity="0.85"/>
        {/* stained-glass light spill */}
        <rect x="14" y="8" width="18" height="28" fill="#4a3a7a" opacity="0.6"/>
        <rect x="68" y="8" width="18" height="28" fill="#7a3a4a" opacity="0.55"/>
        <line x1="23" y1="8" x2="23" y2="36" stroke="#1a1018" strokeWidth="0.6"/>
        <line x1="77" y1="8" x2="77" y2="36" stroke="#1a1018" strokeWidth="0.6"/>
        {/* smoke */}
        <path d="M50,40 Q45,30 52,22 Q48,14 54,6" stroke="#c9b68a" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.85"/>
        <path d="M44,44 Q40,34 46,26 Q42,18 48,12" stroke="#c9b68a" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6"/>
        <path d="M56,44 Q60,34 54,26 Q58,18 52,12" stroke="#c9b68a" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
        {/* chalice bowl */}
        <path d="M32,48 Q50,78 68,48 Z" fill={gold}/>
        <path d="M32,48 L68,48" stroke="#8a6418" strokeWidth="1"/>
        <ellipse cx="50" cy="48" rx="18" ry="2.2" fill={goldBright}/>
        {/* coals inside */}
        <circle cx="46" cy="50" r="1.5" fill="#f56a2a"/>
        <circle cx="52" cy="52" r="1.3" fill="#f68a3a"/>
        <circle cx="56" cy="50" r="1.2" fill="#e04a1a"/>
        {/* stem */}
        <rect x="47" y="72" width="6" height="14" fill={gold}/>
        <ellipse cx="50" cy="72" rx="3.5" ry="1" fill="#8a6418"/>
        <ellipse cx="50" cy="90" rx="12" ry="2.6" fill={gold}/>
      </g>
    ),

    // 11. ALL OF MY CREATURES — mountain, stars, lamb on hill with sun
    "lamb": (
      <g>
        {/* dusk sky */}
        <defs>
          <linearGradient id={`dusk-${size}-lb`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a4a6a"/>
            <stop offset="60%" stopColor="#e0a878"/>
            <stop offset="100%" stopColor="#f3c89a"/>
          </linearGradient>
        </defs>
        <rect width="100" height="62" fill={`url(#dusk-${size}-lb)`}/>
        {/* stars */}
        {[[12,10],[28,16],[46,8],[68,12],[88,18]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="0.8" fill="#fff5c7"/>
        ))}
        {/* sun setting */}
        <circle cx="82" cy="56" r="10" fill="#f9c878" opacity="0.85"/>
        {/* mountain */}
        <path d="M0,62 L20,36 L38,56 L58,28 L78,50 L100,40 L100,62 Z" fill="#5a6a7a"/>
        <path d="M20,36 L26,40 L22,42 Z" fill="#ffffff" opacity="0.8"/>
        <path d="M58,28 L64,34 L60,36 Z" fill="#ffffff" opacity="0.9"/>
        {/* hill */}
        <path d="M0,62 Q50,58 100,62 L100,100 L0,100 Z" fill="#8fa068"/>
        <path d="M0,78 Q40,74 100,78 L100,100 L0,100 Z" fill="#6a8048"/>
        {/* lamb body */}
        <ellipse cx="48" cy="78" rx="14" ry="9" fill="#f8f2e4"/>
        <circle cx="40" cy="74" r="4" fill="#f8f2e4"/>
        <circle cx="44" cy="72" r="4" fill="#f8f2e4"/>
        <circle cx="52" cy="70" r="5" fill="#f8f2e4"/>
        <circle cx="58" cy="72" r="4" fill="#f8f2e4"/>
        {/* head */}
        <ellipse cx="34" cy="76" rx="4" ry="3.5" fill="#e8dcc3"/>
        <circle cx="32" cy="75" r="0.5" fill={ink}/>
        {/* legs */}
        <line x1="42" y1="86" x2="42" y2="92" stroke="#4a3a24" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="52" y1="86" x2="52" y2="92" stroke="#4a3a24" strokeWidth="1.4" strokeLinecap="round"/>
        {/* halo */}
        <circle cx="34" cy="72" r="7" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.8"/>
      </g>
    ),

    // 12. THE ROSE BOWER — rose arbor with seats and light through
    "rose": (
      <g>
        {/* warm light */}
        <defs>
          <radialGradient id={`bow-${size}-r`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="#fff3d3"/>
            <stop offset="100%" stopColor="#f0d4b0"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#bow-${size}-r)`}/>
        {/* arbor arch */}
        <path d="M12,92 L12,50 Q50,14 88,50 L88,92" stroke="#6a4a2a" strokeWidth="1.8" fill="none"/>
        {/* vines on arch */}
        <path d="M14,88 Q18,70 22,56 Q28,42 36,32 Q50,20 64,32 Q72,42 78,56 Q82,70 86,88" stroke="#3a5028" strokeWidth="0.9" fill="none" opacity="0.85"/>
        {/* leaves */}
        {[[16,70],[20,58],[28,42],[36,30],[50,22],[64,30],[72,42],[80,58],[84,70]].map(([x,y],i)=>(
          <ellipse key={i} cx={x} cy={y} rx="3" ry="1.4" fill="#4a6238" transform={`rotate(${i*30} ${x} ${y})`}/>
        ))}
        {/* roses */}
        {[[18,74],[26,54],[38,36],[50,26],[62,36],[74,54],[82,74],[42,54],[58,54]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="3" fill="#c04868"/>
            <circle cx={x} cy={y} r="1.8" fill="#e87a92"/>
            <circle cx={x-0.6} cy={y-0.6} r="0.8" fill="#f8a8b8"/>
          </g>
        ))}
        {/* bench inside */}
        <rect x="30" y="72" width="40" height="4" fill="#7a5a3a"/>
        <rect x="32" y="76" width="3" height="10" fill="#6a4a2a"/>
        <rect x="65" y="76" width="3" height="10" fill="#6a4a2a"/>
        {/* path */}
        <path d="M40,88 Q50,82 60,88" stroke="#d9c89a" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* fallen petals */}
        <ellipse cx="34" cy="90" rx="1.2" ry="0.6" fill="#c04868" opacity="0.7"/>
        <ellipse cx="66" cy="90" rx="1.2" ry="0.6" fill="#e87a92" opacity="0.7"/>
      </g>
    ),

    // 13. COMMUNION — the set table: bread, chalice, candles — a homecoming
    "chalice": (
      <g>
        {/* warm interior */}
        <defs>
          <radialGradient id={`tab-${size}-c`} cx="50%" cy="40%">
            <stop offset="0%" stopColor="#f9e5bd"/>
            <stop offset="100%" stopColor="#c68a4a"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#tab-${size}-c)`}/>
        {/* window behind */}
        <rect x="36" y="8" width="28" height="36" fill="#d9e5ea" opacity="0.8"/>
        <line x1="50" y1="8" x2="50" y2="44" stroke="#8a6418" strokeWidth="0.6"/>
        <line x1="36" y1="26" x2="64" y2="26" stroke="#8a6418" strokeWidth="0.6"/>
        {/* table */}
        <path d="M6,62 L94,62 L86,78 L14,78 Z" fill="#b88a4a"/>
        <line x1="6" y1="62" x2="94" y2="62" stroke="#8a6418" strokeWidth="0.8"/>
        {/* linen */}
        <path d="M20,62 L80,62 L76,70 L24,70 Z" fill="#f8eed2"/>
        {/* chalice */}
        <path d="M40,42 Q50,62 60,42 Z" fill={gold}/>
        <ellipse cx="50" cy="42" rx="10" ry="2" fill={goldBright}/>
        <ellipse cx="50" cy="44" rx="8.5" ry="1.3" fill="#8a2a3a"/>
        <rect x="48" y="58" width="4" height="6" fill={gold}/>
        <ellipse cx="50" cy="64" rx="7" ry="1.4" fill={gold}/>
        {/* bread loaf */}
        <ellipse cx="26" cy="58" rx="8" ry="4" fill="#e4b570"/>
        <path d="M20,58 Q26,54 32,58" stroke="#8a5a2a" strokeWidth="0.5" fill="none"/>
        <path d="M22,60 L30,60" stroke="#8a5a2a" strokeWidth="0.4"/>
        {/* candle */}
        <rect x="74" y="46" width="3" height="14" fill="#f4e9d0"/>
        <path d="M75.5,46 Q74,42 75.5,38 Q77,42 75.5,46 Z" fill="#f9c44a"/>
        {/* grapes */}
        <g>
          {[[68,62],[70,64],[72,62],[69,66],[71,66]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1.4" fill="#5a2858"/>
          ))}
        </g>
      </g>
    ),
  };

  const content = paths[kind] || <circle cx="50" cy="50" r="30" fill={ink} opacity="0.3"/>;

  return (
    <svg width={s} height={s} viewBox={`0 0 ${V} ${V}`} style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={`clip-${kind}-${size}`}>
          <circle cx="50" cy="50" r="46"/>
        </clipPath>
      </defs>
      <g clipPath={`url(#clip-${kind}-${size})`}>
        {content}
      </g>
      {/* subtle frame */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
};

window.Motif = Motif;
