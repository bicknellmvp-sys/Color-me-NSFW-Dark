import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Palette, 
  RotateCcw, 
  Download, 
  Sparkles, 
  RefreshCw, 
  BookOpen,
  HelpCircle,
  Paintbrush,
  Eraser,
  Check
} from 'lucide-react';
import { ArchiveVolume } from '../types';
import { 
  COLOR_BY_NUMBER_TEMPLATES, 
  DARK_THEMED_PALETTES, 
  ColorByNumberTemplate,
  ColorByNumberPalette,
  ColorRegion
} from '../data/colorByNumbersData';
import { 
  basementProtocolImg, 
  midnightCrossfireImg, 
  steelPulseImg, 
  primalReckoningImg, 
  laceAndLongingImg, 
  tattooFlashImg 
} from '../data/volumes';

export interface AuthenticBookPlate {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
}

export const AUTHENTIC_STUDIO_PLATES: AuthenticBookPlate[] = [
  { id: 'art-demon-queen', title: 'Demon Queen & Skull Throne', category: 'Sigils & Occult', image: '/assets/aistudio/Gemini_Generated_Image_183bzd183bzd183b_59336018.jfif', desc: 'Horned queen on gothic skull throne' },
  { id: 'art-thorn-siren', title: 'Thorn Circle Siren', category: 'Erotic Geometry', image: '/assets/aistudio/Gemini_Generated_Image_z1x2a1z1x2a1z1x2_e8e4ae2d.jfif', desc: 'Sensual figure framed by thorn wreath' },
  { id: 'art-basement', title: 'Basement Protocol', category: 'Industrial Chains', image: basementProtocolImg, desc: 'Underground chamber & captive chair' },
  { id: 'art-midnight', title: 'Midnight Crossfire', category: 'Latex & Silhouette', image: midnightCrossfireImg, desc: 'Film noir detective leaping in neon rain' },
  { id: 'art-steel', title: 'Steel Pulse', category: 'Industrial Chains', image: steelPulseImg, desc: 'Biomechanical cyber minotaur' },
  { id: 'art-primal', title: 'Primal Reckoning', category: 'Sigils & Occult', image: primalReckoningImg, desc: 'Warrior battling shadow wolf' },
  { id: 'art-lace', title: 'Lace & Longing', category: 'Erotic Geometry', image: laceAndLongingImg, desc: 'Art Nouveau siren dancing in floral lace' },
  { id: 'art-tattoo', title: 'Tattoo Flash & Mandalas', category: 'Bondage Studies', image: tattooFlashImg, desc: 'Studio sketchbook flash sheet' },
];

interface DigitalColoringStudioProps {
  isOpen?: boolean;
  onClose?: () => void;
  selectedVolume?: ArchiveVolume | null;
  customPlate?: { svgUri: string; title: string } | null;
  isPageMode?: boolean;
}

export const DigitalColoringStudio: React.FC<DigitalColoringStudioProps> = ({
  isOpen = true,
  onClose,
  selectedVolume,
  customPlate,
  isPageMode = false,
}) => {
  // Studio Mode: 'color-by-number' (Interactive Vector Tap-to-Fill) or 'freehand' (Brush tinting)
  const [studioMode, setStudioMode] = useState<'color-by-number' | 'freehand'>('color-by-number');

  // Selected Active Template / Plate
  const [activeTemplate, setActiveTemplate] = useState<ColorByNumberTemplate>(COLOR_BY_NUMBER_TEMPLATES[0]);
  const [activeBookPlate, setActiveBookPlate] = useState<AuthenticBookPlate>(AUTHENTIC_STUDIO_PLATES[0]);

  // Palette (Abyssal Blood & Onyx default)
  const [activePalette, setActivePalette] = useState<ColorByNumberPalette>(DARK_THEMED_PALETTES[0]);
  const [activeNumber, setActiveNumber] = useState<number>(1);

  // Filled regions state for color-by-number mode
  const [filledRegions, setFilledRegions] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Array<Record<string, string>>>([]);

  // Freehand canvas drawing state
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasHistoryRef = useRef<ImageData[]>([]);
  const [brushSize, setBrushSize] = useState<number>(16);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.7);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Notification message
  const [message, setMessage] = useState<string>('Step 1: Pick a color number below. Step 2: Tap matching sections on the picture to color them!');
  const [showQuickTips, setShowQuickTips] = useState<boolean>(() => {
    return !localStorage.getItem('color_me_nsfw_seen_tips');
  });

  // Handle external custom plate loading
  useEffect(() => {
    if (customPlate) {
      const matchTpl = COLOR_BY_NUMBER_TEMPLATES.find(t => customPlate.title.includes(t.title));
      if (matchTpl) {
        setActiveTemplate(matchTpl);
        setStudioMode('color-by-number');
      } else {
        const matchPlate = AUTHENTIC_STUDIO_PLATES.find(p => customPlate.title.includes(p.title) || p.image === customPlate.svgUri);
        if (matchPlate) {
          setActiveBookPlate(matchPlate);
        } else {
          setActiveBookPlate({
            id: 'custom',
            title: customPlate.title,
            category: 'Custom Plate',
            image: customPlate.svgUri,
            desc: 'Custom loaded artwork'
          });
        }
        setStudioMode('freehand');
      }
      setMessage(`Loaded "${customPlate.title}". Start coloring below!`);
    }
  }, [customPlate]);

  // Sync palette when template changes
  useEffect(() => {
    const defPal = DARK_THEMED_PALETTES.find(p => p.id === activeTemplate.defaultPaletteId);
    if (defPal) setActivePalette(defPal);
    setFilledRegions({});
    setHistory([]);
  }, [activeTemplate.id]);

  const activeColorItem = activePalette.colors.find(c => c.number === activeNumber) || activePalette.colors[0];

  // Vector region click handler
  const handleRegionClick = (region: ColorRegion) => {
    const newFilled = {
      ...filledRegions,
      [region.id]: activeColorItem.hex
    };
    setHistory(prev => [...prev.slice(-15), filledRegions]);
    setFilledRegions(newFilled);

    // Check if all regions for this number are completed
    const remaining = activeTemplate.regions.filter(r => r.number === activeNumber && !newFilled[r.id]);
    if (remaining.length === 0) {
      setMessage(`✦ Color #${activeNumber} (${activeColorItem.name}) completed! Choose another number.`);
      const nextNum = activePalette.colors.find(c => c.number !== activeNumber && activeTemplate.regions.some(r => r.number === c.number && !newFilled[r.id]));
      if (nextNum) setActiveNumber(nextNum.number);
    } else {
      setMessage(`Painted segment #${region.number} with ${activeColorItem.name}. ${remaining.length} segments left for this color.`);
    }
  };

  // Freehand drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (canvasHistoryRef.current.length > 10) canvasHistoryRef.current.shift();
    canvasHistoryRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    let clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = brushSize * 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = activeColorItem.hex;
      ctx.globalAlpha = brushOpacity;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleExport = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.fillStyle = '#08080a';
      ctx.fillRect(0, 0, 1200, 1200);
      ctx.drawImage(img, 0, 0, 1200, 1200);

      if (studioMode === 'freehand' && drawCanvasRef.current) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.drawImage(drawCanvasRef.current, 0, 0, 1200, 1200);
      }

      ctx.font = 'bold 16px monospace';
      ctx.fillStyle = '#e60026';
      ctx.textAlign = 'center';
      ctx.fillText('COLOR ME NSFW • ARTWORK MASTERPIECE', 600, 1180);

      const a = document.createElement('a');
      a.download = `ColorMeNSFW-Masterpiece.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
      setMessage('Masterpiece saved successfully!');
    };
    img.src = studioMode === 'freehand' ? activeBookPlate.image : activeBookPlate.image;
  };

  if (!isOpen && !isPageMode) return null;

  return (
    <div className={isPageMode ? "min-h-screen bg-[#08080a] text-[#e0e0e0] pt-4 pb-28 px-4 md:px-8 flex flex-col" : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md"}>
      
      <div className={isPageMode ? "w-full max-w-5xl mx-auto flex flex-col gap-4" : "w-full max-w-4xl bg-[#0c0c0e] border border-[#26262a] h-[92vh] flex flex-col shadow-2xl overflow-hidden"}>
        
        {/* TOP BAR: Title, Mode Selector, Close */}
        <div className="bg-[#121214] border-b border-[#26262a] p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1c0307] border border-[#e60026]/60 flex items-center justify-center">
              <Palette className="w-5 h-5 text-[#e60026]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#e60026] tracking-widest font-bold block">
                Coloring Studio
              </span>
              <h1 className="font-headline text-base sm:text-lg text-white uppercase font-bold tracking-tight">
                {studioMode === 'color-by-number' ? activeTemplate.title : activeBookPlate.title}
              </h1>
            </div>
          </div>

          {/* Simple Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#08080a] p-1 border border-[#26262a]">
            <button
              onClick={() => setStudioMode('color-by-number')}
              className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all ${
                studioMode === 'color-by-number' ? 'bg-[#e60026] text-white' : 'text-[#888888] hover:text-white'
              }`}
            >
              Paint By Number
            </button>
            <button
              onClick={() => setStudioMode('freehand')}
              className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all ${
                studioMode === 'freehand' ? 'bg-[#e60026] text-white' : 'text-[#888888] hover:text-white'
              }`}
            >
              Freehand Tint
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="py-1.5 px-3 bg-[#e60026] text-white text-xs font-mono font-bold uppercase hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            {!isPageMode && onClose && (
              <button
                onClick={onClose}
                className="p-1.5 text-[#888888] hover:text-[#e60026] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* SIMPLIFIED INSTRUCTION BANNER */}
        <div className="bg-[#16161c] border-b border-[#26262a] px-4 py-2.5 flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-[#e60026] shrink-0" />
          <p className="text-xs font-mono text-[#cbd5e1] truncate">
            {message}
          </p>
        </div>

        {/* WORKSPACE & CANVAS */}
        <div className="flex-grow flex flex-col md:flex-row overflow-hidden bg-[#070709]">
          
          {/* Center Stage: Canvas */}
          <div className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
            {studioMode === 'color-by-number' ? (
              <div className="w-full max-w-[480px] aspect-square relative border border-[#26262a] bg-[#0c0c0e] shadow-2xl flex items-center justify-center">
                <svg
                  viewBox={activeTemplate.viewBox}
                  className="w-full h-full cursor-pointer select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="800" height="800" fill="#0c0c0e" />
                  {activeTemplate.regions.map((region) => {
                    const isFilled = !!filledRegions[region.id];
                    const fillColor = isFilled ? filledRegions[region.id] : '#121216';
                    const isTarget = region.number === activeNumber;

                    return (
                      <g key={region.id} onClick={() => handleRegionClick(region)}>
                        <path
                          d={region.d}
                          fill={fillColor}
                          stroke={isTarget && !isFilled ? '#e60026' : '#26262f'}
                          strokeWidth={isTarget && !isFilled ? 2.5 : 1}
                          className="transition-all hover:opacity-90"
                        />
                        {!isFilled && (
                          <text
                            x={region.cx}
                            y={region.cy + 4}
                            textAnchor="middle"
                            fontSize="11"
                            fontFamily="monospace"
                            fontWeight="bold"
                            fill={isTarget ? '#ffffff' : '#888888'}
                            pointerEvents="none"
                          >
                            {region.number}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            ) : (
              <div className="w-full max-w-[420px] aspect-[3/4] relative border border-[#26262a] bg-[#0c0c0e] shadow-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={activeBookPlate.image}
                  alt={activeBookPlate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
                <canvas
                  ref={drawCanvasRef}
                  width={1200}
                  height={1600}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ mixBlendMode: 'multiply' }}
                  className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                />
              </div>
            )}
          </div>

          {/* Right Sidebar / Selector for Pictures & Tools */}
          <div className="w-full md:w-72 bg-[#0e0e10] border-t md:border-t-0 md:border-l border-[#26262a] p-4 flex flex-col gap-4 overflow-y-auto max-h-[240px] md:max-h-none">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#e60026] font-bold tracking-widest block mb-2">
                Select Picture
              </span>
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2 max-h-40 md:max-h-60 overflow-y-auto pr-1">
                {studioMode === 'color-by-number' ? (
                  COLOR_BY_NUMBER_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setActiveTemplate(tpl)}
                      className={`p-2 text-left border text-xs font-headline uppercase font-bold truncate transition-all ${
                        activeTemplate.id === tpl.id ? 'border-[#e60026] bg-[#1a0408] text-white' : 'border-[#26262a] bg-[#08080a] text-[#888888]'
                      }`}
                    >
                      {tpl.title}
                    </button>
                  ))
                ) : (
                  AUTHENTIC_STUDIO_PLATES.map((plate) => (
                    <button
                      key={plate.id}
                      onClick={() => setActiveBookPlate(plate)}
                      className={`p-1.5 text-left border flex items-center gap-2 transition-all ${
                        activeBookPlate.id === plate.id ? 'border-[#e60026] bg-[#1a0408] text-white' : 'border-[#26262a] bg-[#08080a] text-[#888888]'
                      }`}
                    >
                      <img src={plate.image} alt={plate.title} className="w-8 h-10 object-cover shrink-0" />
                      <span className="text-[11px] font-headline uppercase font-bold truncate">{plate.title}</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {studioMode === 'freehand' && (
              <div className="border-t border-[#26262a] pt-3 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase text-[#e60026] font-bold tracking-widest block">
                  Tool
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsEraser(false)}
                    className={`py-1.5 text-xs font-mono uppercase font-bold border ${!isEraser ? 'bg-[#e60026] text-white border-[#e60026]' : 'bg-[#08080a] text-[#888888] border-[#333333]'}`}
                  >
                    Brush
                  </button>
                  <button
                    onClick={() => setIsEraser(true)}
                    className={`py-1.5 text-xs font-mono uppercase font-bold border ${isEraser ? 'bg-[#e60026] text-white border-[#e60026]' : 'bg-[#08080a] text-[#888888] border-[#333333]'}`}
                  >
                    Eraser
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* BOTTOM PALETTE BAR (1–8 Color Swatches) */}
        <div className="bg-[#121214] border-t border-[#26262a] p-3 flex items-center justify-center gap-2 overflow-x-auto">
          {activePalette.colors.map((colorItem) => {
            const isSelected = activeNumber === colorItem.number && !isEraser;
            return (
              <button
                key={colorItem.number}
                onClick={() => {
                  setActiveNumber(colorItem.number);
                  setIsEraser(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all shrink-0 ${
                  isSelected ? 'border-[#e60026] bg-[#1a0408] ring-1 ring-[#e60026]' : 'border-[#26262a] bg-[#0c0c0e] hover:border-[#444444]'
                }`}
              >
                <div
                  className="w-5 h-5 border border-black/80 flex items-center justify-center font-mono text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: colorItem.hex, color: colorItem.textColor || '#fff' }}
                >
                  {colorItem.number}
                </div>
                <span className="text-xs font-mono text-white hidden sm:inline">{colorItem.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Quick Tips Pop-up Overlay */}
      {showQuickTips && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#121216] border border-[#e60026]/60 max-w-md w-full p-6 flex flex-col gap-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#26262a] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#e60026]" />
                <h3 className="font-headline text-lg uppercase font-bold text-white tracking-wide">Quick Tips & Studio Guide</h3>
              </div>
              <button 
                onClick={() => {
                  setShowQuickTips(false);
                  localStorage.setItem('color_me_nsfw_seen_tips', 'true');
                }}
                className="text-[#888888] hover:text-[#e60026]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex flex-col gap-3 font-inter text-sm text-[#b0b0b0]">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#e60026] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">1</span>
                <p><strong className="text-white">Paint By Number Mode:</strong> Tap any number swatch in the bottom palette (1–8), then tap matching numbered segments on the artwork to fill them instantly.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1c0307] border border-[#e60026] text-[#ffb3ae] font-mono text-xs font-bold flex items-center justify-center shrink-0">2</span>
                <p><strong className="text-white">Freehand Tint Mode:</strong> Switch to Freehand mode at the top to paint custom strokes and rich color tints directly over authentic book plates.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#1c0307] border border-[#e60026] text-[#ffb3ae] font-mono text-xs font-bold flex items-center justify-center shrink-0">3</span>
                <p><strong className="text-white">Save Masterpieces:</strong> Click the <span className="text-[#e60026] font-semibold">Save</span> button at any time to export your high-resolution colored artwork.</p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowQuickTips(false);
                localStorage.setItem('color_me_nsfw_seen_tips', 'true');
              }}
              className="mt-2 w-full py-3 bg-[#e60026] text-white text-xs font-mono font-bold uppercase tracking-widest hover:bg-[#ffb3ae] hover:text-black transition-colors"
            >
              Got it, let's color!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
