import React, { useRef, useState, useEffect } from 'react';
import { 
  X, 
  Palette, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Check, 
  Eye, 
  EyeOff, 
  HelpCircle, 
  Wand2, 
  Paintbrush, 
  Eraser,
  Layers, 
  Share2, 
  ChevronRight,
  RefreshCw,
  BookOpen,
  Sliders
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
  { id: 'art-basement', title: 'Basement Protocol', category: 'Industrial Chains', image: basementProtocolImg, desc: 'Underground dungeon chamber & captive linework' },
  { id: 'art-midnight', title: 'Midnight Crossfire', category: 'Latex & Silhouette', image: midnightCrossfireImg, desc: 'Film noir detective leaping in neon rain' },
  { id: 'art-steel', title: 'Steel Pulse', category: 'Industrial Chains', image: steelPulseImg, desc: 'Biomechanical cyber minotaur with battle axe' },
  { id: 'art-primal', title: 'Primal Reckoning', category: 'Sigils & Occult', image: primalReckoningImg, desc: 'Warrior battling shadow wolf in Gothic cathedral' },
  { id: 'art-lace', title: 'Lace & Longing', category: 'Erotic Geometry', image: laceAndLongingImg, desc: 'Art Nouveau siren dancing in floral lace negligee' },
  { id: 'art-tattoo', title: 'Tattoo Flash & Mandalas', category: 'Bondage Studies', image: tattooFlashImg, desc: 'Eagle, poppies, tiger face & sacred mandalas' },
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
  // Studio Mode: 'book-art' (Freehand Tint on authentic plates) or 'color-by-number' (Vector SVG numbered zones)
  const [studioType, setStudioType] = useState<'book-art' | 'color-by-number'>('book-art');

  // Selected Authentic Book Plate
  const [activeBookPlate, setActiveBookPlate] = useState<AuthenticBookPlate>(AUTHENTIC_STUDIO_PLATES[0]);

  // Template selection for vector mode
  const [activeTemplate, setActiveTemplate] = useState<ColorByNumberTemplate>(
    COLOR_BY_NUMBER_TEMPLATES[0]
  );

  // Palette selection (default to Abyssal Blood & Onyx)
  const [activePalette, setActivePalette] = useState<ColorByNumberPalette>(
    DARK_THEMED_PALETTES[0]
  );

  // Currently selected color number (1 to 8)
  const [activeNumber, setActiveNumber] = useState<number>(1);

  // Map of regionId -> filled color string (for vector mode)
  const [filledRegions, setFilledRegions] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Array<Record<string, string>>>([]);

  // Brush settings for authentic plate canvas coloring
  const [brushSize, setBrushSize] = useState<number>(18);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.65);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Canvas Refs
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasHistoryRef = useRef<ImageData[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Visual toggles
  const [showNumbers, setShowNumbers] = useState<boolean>(true);
  const [highlightActiveNumber, setHighlightActiveNumber] = useState<boolean>(true);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'success' | 'warn' | 'info' } | null>(null);
  const [hintRegionId, setHintRegionId] = useState<string | null>(null);
  const [completedNumbers, setCompletedNumbers] = useState<number[]>([]);

  // Active color item
  const activeColorItem = activePalette.colors.find(c => c.number === activeNumber) || activePalette.colors[0];

  // Handle customPlate passed from external gallery
  useEffect(() => {
    if (customPlate) {
      const match = AUTHENTIC_STUDIO_PLATES.find(p => p.image === customPlate.svgUri || customPlate.title.includes(p.title));
      if (match) {
        setActiveBookPlate(match);
        setStudioType('book-art');
      } else {
        // If not in authentic list, could be vector plate
        const vectorMatch = COLOR_BY_NUMBER_TEMPLATES.find(t => customPlate.title.includes(t.title));
        if (vectorMatch) {
          setActiveTemplate(vectorMatch);
          setStudioType('color-by-number');
        } else {
          setActiveBookPlate({
            id: 'custom',
            title: customPlate.title,
            category: 'Custom Plate',
            image: customPlate.svgUri,
            desc: 'Loaded custom plate from archive'
          });
          setStudioType('book-art');
        }
      }
      setFeedbackMessage({
        text: `Loaded "${customPlate.title}". Choose your palette tint to begin coloring!`,
        type: 'info'
      });
    }
  }, [customPlate]);

  // Clear paint canvas when book plate changes
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvasHistoryRef.current = [];
      }
    }
  }, [activeBookPlate.id]);

  // Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save history
    if (canvasHistoryRef.current.length > 15) {
      canvasHistoryRef.current.shift();
    }
    canvasHistoryRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
      }
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

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

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

  const handleUndoCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas || canvasHistoryRef.current.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const previousState = canvasHistoryRef.current.pop();
    if (previousState) {
      ctx.putImageData(previousState, 0, 0);
      setFeedbackMessage({ text: 'Reverted last brush stroke.', type: 'info' });
    }
  };

  const handleClearCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasHistoryRef.current = [];
    setFeedbackMessage({ text: 'Plate paint cleared. Ready for fresh colors.', type: 'info' });
  };

  // Sync palette with template in vector mode
  useEffect(() => {
    const defaultPal = DARK_THEMED_PALETTES.find(p => p.id === activeTemplate.defaultPaletteId);
    if (defaultPal) {
      setActivePalette(defaultPal);
    }
    setFilledRegions({});
    setHistory([]);
    setCompletedNumbers([]);
  }, [activeTemplate.id]);

  // Check completion of numbers whenever filledRegions changes
  useEffect(() => {
    const newCompleted: number[] = [];
    for (let num = 1; num <= 8; num++) {
      const regionsForNum = activeTemplate.regions.filter(r => r.number === num);
      if (regionsForNum.length > 0 && regionsForNum.every(r => !!filledRegions[r.id])) {
        newCompleted.push(num);
      }
    }
    setCompletedNumbers(newCompleted);
  }, [filledRegions, activeTemplate]);

  if (!isOpen && !isPageMode) return null;

  // Handle clicking a region (vector mode)
  const handleRegionClick = (region: ColorRegion) => {
    const currentColor = activeColorItem.hex;
    if (region.number === activeNumber) {
      const nextState = {
        ...filledRegions,
        [region.id]: currentColor
      };
      setHistory(prev => [...prev.slice(-20), filledRegions]);
      setFilledRegions(nextState);

      const remainingForThisNumber = activeTemplate.regions.filter(
        r => r.number === activeNumber && r.id !== region.id && !filledRegions[r.id]
      );

      if (remainingForThisNumber.length === 0) {
        setFeedbackMessage({
          text: `✦ Color #${activeNumber} (${activeColorItem.name}) fully completed!`,
          type: 'success'
        });
        const nextIncomplete = activePalette.colors.find(
          c => c.number !== activeNumber && activeTemplate.regions.some(r => r.number === c.number && !nextState[r.id])
        );
        if (nextIncomplete) {
          setTimeout(() => setActiveNumber(nextIncomplete.number), 600);
        }
      }
    } else {
      setFeedbackMessage({
        text: `Segment #${region.number}! Switched to Color #${region.number} for you.`,
        type: 'warn'
      });
      setActiveNumber(region.number);
      setHintRegionId(region.id);
      setTimeout(() => setHintRegionId(null), 1200);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setFilledRegions(prev);
    setHistory(h => h.slice(0, -1));
    setFeedbackMessage({ text: 'Reverted previous action.', type: 'info' });
  };

  const handleExport = () => {
    if (studioType === 'book-art') {
      // Export painted book plate composite
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = 1200;
      exportCanvas.height = 1600;
      const ctx = exportCanvas.getContext('2d');
      if (!ctx) return;

      const baseImg = new Image();
      baseImg.crossOrigin = 'anonymous';
      baseImg.onload = () => {
        // Draw black background & base artwork
        ctx.fillStyle = '#08080a';
        ctx.fillRect(0, 0, 1200, 1600);
        ctx.drawImage(baseImg, 0, 0, 1200, 1600);

        // Blend painted layer on top with multiply for rich ink depth
        const paintCanvas = drawCanvasRef.current;
        if (paintCanvas) {
          ctx.globalCompositeOperation = 'multiply';
          ctx.drawImage(paintCanvas, 0, 0, 1200, 1600);
          ctx.globalCompositeOperation = 'source-over';
        }

        // Signature Watermark
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = '#e60026';
        ctx.textAlign = 'center';
        ctx.fillText(`COLOR ME NSFW • ${activeBookPlate.title.toUpperCase()}`, 600, 1560);

        const a = document.createElement('a');
        a.download = `ColorMeNSFW-${activeBookPlate.id}.png`;
        a.href = exportCanvas.toDataURL('image/png');
        a.click();
        setFeedbackMessage({ text: 'Masterpiece exported in ultra-high resolution!', type: 'success' });
      };
      baseImg.src = activeBookPlate.image;
    } else {
      // Vector SVG export
      if (!svgRef.current) return;
      const svgEl = svgRef.current;
      const svgData = new XMLSerializer().serializeToString(svgEl);
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 1200;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.fillStyle = '#08080a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#e60026';
        ctx.textAlign = 'center';
        ctx.fillText('COLOR ME NSFW • COLOR BY NUMBERS ARCHIVE', 600, 1160);

        const a = document.createElement('a');
        a.download = `ColorMeNSFW-${activeTemplate.id}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
        URL.revokeObjectURL(url);
        setFeedbackMessage({ text: 'Artwork exported in ultra-high resolution!', type: 'success' });
      };
      img.src = url;
    }
  };

  const containerClasses = isPageMode
    ? "w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6"
    : "relative w-full max-w-6xl bg-[#0c0c0c] border border-[#333333] h-[94vh] flex flex-col z-10 shadow-2xl overflow-hidden";

  return (
    <div className={isPageMode ? "min-h-screen bg-[#08080a] text-[#e0e0e0] pt-6 pb-20" : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"}>
      {!isPageMode && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={containerClasses}>
        
        {/* Studio Top Navigation & Mode Switcher */}
        <div className="bg-[#121214] border border-[#26262a] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1c0307] border border-[#e60026]/60 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-[#e60026]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase text-[#e60026] tracking-widest font-bold">
                  Dark Studio Suite
                </span>
                <span className="text-[9px] bg-[#e60026]/20 text-[#ffb3ae] px-1.5 py-0.5 border border-[#e60026]/40 font-mono uppercase">
                  {studioType === 'book-art' ? 'Authentic Book Artwork' : 'Color By Numbers'}
                </span>
              </div>
              <h1 className="font-headline text-lg md:text-xl text-[#ffffff] uppercase font-bold tracking-tight">
                {studioType === 'book-art' ? activeBookPlate.title : activeTemplate.title}
              </h1>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-[#08080a] p-1 border border-[#26262a]">
            <button
              onClick={() => setStudioType('book-art')}
              className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all flex items-center gap-1.5 ${
                studioType === 'book-art'
                  ? 'bg-[#e60026] text-white shadow'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Authentic Book Plates</span>
            </button>
            <button
              onClick={() => setStudioType('color-by-number')}
              className={`px-3 py-1.5 text-xs font-mono uppercase font-bold transition-all flex items-center gap-1.5 ${
                studioType === 'color-by-number'
                  ? 'bg-[#e60026] text-white shadow'
                  : 'text-[#888888] hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Color By Numbers (1–8)</span>
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {studioType === 'book-art' ? (
              <>
                <button
                  onClick={handleUndoCanvas}
                  className="p-2 bg-[#1a1a20] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-mono transition-colors flex items-center gap-1.5"
                  title="Undo last stroke"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#e60026]" />
                  <span className="hidden sm:inline">Undo</span>
                </button>
                <button
                  onClick={handleClearCanvas}
                  className="p-2 bg-[#1a1a20] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-mono transition-colors flex items-center gap-1.5"
                  title="Clear paint on plate"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#888888]" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleUndo}
                  disabled={history.length === 0}
                  className="p-2 bg-[#1a1a20] border border-[#333333] hover:border-[#e60026] text-[#e0e0e0] hover:text-[#e60026] text-xs font-mono transition-colors flex items-center gap-1.5 disabled:opacity-30"
                  title="Undo last segment"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#e60026]" />
                  <span className="hidden sm:inline">Undo</span>
                </button>
              </>
            )}

            <button
              onClick={handleExport}
              className="py-2 px-3 bg-[#e60026] text-white text-xs font-mono font-bold uppercase hover:bg-[#ffb3ae] hover:text-black transition-colors flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save Artwork</span>
            </button>

            {!isPageMode && onClose && (
              <button
                onClick={onClose}
                className="p-2 text-[#888888] hover:text-[#e60026] transition-colors ml-2"
                aria-label="Close Studio"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Feedback Toast */}
        {feedbackMessage && (
          <div className={`px-4 py-2 text-xs font-mono flex items-center gap-2 border transition-all ${
            feedbackMessage.type === 'success'
              ? 'bg-[#152419] border-[#2e5e3b] text-[#86efac]'
              : feedbackMessage.type === 'warn'
              ? 'bg-[#291417] border-[#801b2b] text-[#fca5a5]'
              : 'bg-[#16161c] border-[#2e2e38] text-[#cbd5e1]'
          }`}>
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#e60026]" />
            <span>{feedbackMessage.text}</span>
          </div>
        )}

        {/* Main Interactive Studio Grid */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4 overflow-hidden min-h-[580px]">
          
          {/* Left Sidebar: Controls & Selector */}
          <div className="lg:col-span-4 bg-[#121214] border border-[#26262a] p-4 flex flex-col gap-5 overflow-y-auto max-h-[78vh]">
            
            {/* Color Palette Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase text-[#e60026] font-bold tracking-wider">
                  Palette Colors (1–8)
                </span>
                <span className="text-[10px] font-mono text-[#888888] uppercase">
                  Dark Gothic
                </span>
              </div>

              {/* Theme Selector Dropdown */}
              <div className="mb-3">
                <select
                  value={activePalette.id}
                  onChange={(e) => {
                    const selected = DARK_THEMED_PALETTES.find(p => p.id === e.target.value);
                    if (selected) setActivePalette(selected);
                  }}
                  className="w-full bg-[#08080a] border border-[#333333] text-xs font-mono text-[#ffffff] px-2.5 py-1.5 focus:border-[#e60026] focus:outline-none uppercase"
                >
                  {DARK_THEMED_PALETTES.map((pal) => (
                    <option key={pal.id} value={pal.id}>
                      Palette: {pal.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8 Color Swatches */}
              <div className="grid grid-cols-2 gap-2">
                {activePalette.colors.map((colorItem) => {
                  const isSelected = activeNumber === colorItem.number && !isEraser;
                  return (
                    <button
                      key={colorItem.number}
                      onClick={() => {
                        setActiveNumber(colorItem.number);
                        setIsEraser(false);
                      }}
                      className={`relative p-2 border transition-all text-left flex items-center justify-between group ${
                        isSelected
                          ? 'border-[#e60026] bg-[#1a0408] shadow-md'
                          : 'border-[#26262a] bg-[#0c0c0e] hover:border-[#444444]'
                      }`}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div 
                          className="w-5 h-5 border border-black/80 flex items-center justify-center shrink-0 shadow-inner"
                          style={{ backgroundColor: colorItem.hex }}
                        >
                          <span 
                            className="font-mono text-[9px] font-bold"
                            style={{ color: colorItem.textColor || '#ffffff' }}
                          >
                            {colorItem.number}
                          </span>
                        </div>
                        <span className={`text-[11px] font-mono font-semibold truncate ${isSelected ? 'text-white' : 'text-[#a0a0a0]'}`}>
                          {colorItem.name}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-1.5 h-1.5 bg-[#e60026] rounded-full animate-ping shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brush & Coloring Tools (for Authentic Plates) */}
            {studioType === 'book-art' && (
              <div className="border-t border-[#26262a] pt-4 flex flex-col gap-3">
                <span className="text-xs font-mono uppercase text-[#e60026] font-bold tracking-wider block">
                  Brush Tools & Tint
                </span>
                
                {/* Tool Selection: Brush vs Eraser */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsEraser(false)}
                    className={`py-2 px-3 border text-xs font-mono flex items-center justify-center gap-2 transition-colors ${
                      !isEraser
                        ? 'border-[#e60026] bg-[#1c0307] text-white font-bold'
                        : 'border-[#333333] bg-[#08080a] text-[#888888]'
                    }`}
                  >
                    <Paintbrush className="w-3.5 h-3.5 text-[#e60026]" />
                    <span>Tint Brush</span>
                  </button>

                  <button
                    onClick={() => setIsEraser(true)}
                    className={`py-2 px-3 border text-xs font-mono flex items-center justify-center gap-2 transition-colors ${
                      isEraser
                        ? 'border-[#e60026] bg-[#1c0307] text-white font-bold'
                        : 'border-[#333333] bg-[#08080a] text-[#888888]'
                    }`}
                  >
                    <Eraser className="w-3.5 h-3.5 text-[#e60026]" />
                    <span>Eraser</span>
                  </button>
                </div>

                {/* Brush Size */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#888888] mb-1">
                    <span>Brush Size:</span>
                    <span className="text-white font-bold">{brushSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full accent-[#e60026] cursor-pointer"
                  />
                </div>

                {/* Brush Opacity */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#888888] mb-1">
                    <span>Tint Opacity:</span>
                    <span className="text-white font-bold">{Math.round(brushOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={brushOpacity}
                    onChange={(e) => setBrushOpacity(Number(e.target.value))}
                    className="w-full accent-[#e60026] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Plate Switcher Section */}
            <div className="border-t border-[#26262a] pt-4">
              <span className="text-xs font-mono uppercase text-[#e60026] font-bold tracking-wider block mb-2">
                {studioType === 'book-art' ? 'Select Book Plate to Color' : 'Select Numbered Template'}
              </span>

              {studioType === 'book-art' ? (
                <div className="flex flex-col gap-2">
                  {AUTHENTIC_STUDIO_PLATES.map((plate) => (
                    <button
                      key={plate.id}
                      onClick={() => setActiveBookPlate(plate)}
                      className={`p-2 text-left border transition-all flex items-center gap-3 ${
                        activeBookPlate.id === plate.id
                          ? 'border-[#e60026] bg-[#1a0408]/60 text-white'
                          : 'border-[#26262a] bg-[#08080a] text-[#a0a0a0] hover:border-[#444444]'
                      }`}
                    >
                      <img 
                        src={plate.image} 
                        alt={plate.title} 
                        className="w-10 h-13 object-cover border border-[#333333] shrink-0" 
                      />
                      <div className="overflow-hidden">
                        <span className="text-xs font-headline uppercase font-bold block text-white truncate">
                          {plate.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#777777] block truncate">
                          {plate.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {COLOR_BY_NUMBER_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setActiveTemplate(tpl)}
                      className={`p-2.5 text-left border transition-all flex items-center justify-between ${
                        activeTemplate.id === tpl.id
                          ? 'border-[#e60026] bg-[#1a0408]/60 text-white'
                          : 'border-[#26262a] bg-[#08080a] text-[#a0a0a0] hover:border-[#444444]'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-headline uppercase font-bold block text-white">
                          {tpl.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#777777] block">
                          {tpl.category} • {tpl.regions.length} segments
                        </span>
                      </div>
                      {activeTemplate.id === tpl.id && (
                        <ChevronRight className="w-4 h-4 text-[#e60026] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Area: Interactive Canvas Studio Stage */}
          <div className="lg:col-span-8 bg-[#08080a] border border-[#26262a] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            
            {/* Top Canvas Status Overlay */}
            <div className="absolute top-4 left-4 z-20 bg-black/85 border border-[#333333] px-3 py-1.5 text-xs font-mono flex items-center gap-2">
              <span className="text-[#888888]">Active Tool:</span>
              <div 
                className="w-3.5 h-3.5 border border-white"
                style={{ backgroundColor: isEraser ? '#ffffff' : activeColorItem.hex }}
              />
              <span className="font-bold text-[#e60026]">
                {isEraser ? 'Eraser' : `#${activeNumber} — ${activeColorItem.name}`}
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 text-[10px] font-mono text-[#777777] bg-black/70 px-2.5 py-1 border border-[#222222]">
              {studioType === 'book-art' ? 'Paint over plate to tint & color lines' : `Click cell matching #${activeNumber} to paint`}
            </div>

            {/* ARTWORK DISPLAY & DRAWING STAGE */}
            {studioType === 'book-art' ? (
              /* Authentic Book Plate Coloring Canvas */
              <div className="w-full max-w-[540px] aspect-[3/4] relative shadow-2xl border border-[#26262a] bg-[#0c0c0e] flex items-center justify-center overflow-hidden">
                {/* Background Authentic Art Page */}
                <img
                  src={activeBookPlate.image}
                  alt={activeBookPlate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain pointer-events-none select-none"
                />

                {/* Interactive Drawing Canvas Layer (Multiply blend allows black linework to stay sharp) */}
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
            ) : (
              /* Vector SVG Color By Numbers Canvas */
              <div className="w-full max-w-[600px] aspect-square relative shadow-2xl border border-[#26262a] bg-[#060608] flex items-center justify-center">
                <svg
                  ref={svgRef}
                  viewBox={activeTemplate.viewBox}
                  className="w-full h-full select-none cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="800" height="800" fill="#070709" />
                  <g id="color-regions">
                    {activeTemplate.regions.map((region) => {
                      const isFilled = !!filledRegions[region.id];
                      const fillColor = isFilled ? filledRegions[region.id] : '#0c0c0e';
                      const isTargetNumber = region.number === activeNumber;
                      const isHinted = hintRegionId === region.id;

                      return (
                        <path
                          key={region.id}
                          id={region.id}
                          d={region.d}
                          fill={fillColor}
                          stroke={
                            isHinted
                              ? '#ff0033'
                              : isTargetNumber && highlightActiveNumber && !isFilled
                              ? '#e60026'
                              : '#2b2b30'
                          }
                          strokeWidth={
                            isHinted
                              ? 3.5
                              : isTargetNumber && highlightActiveNumber && !isFilled
                              ? 2
                              : 1
                          }
                          strokeDasharray={
                            isTargetNumber && highlightActiveNumber && !isFilled
                              ? '6 3'
                              : 'none'
                          }
                          onClick={() => handleRegionClick(region)}
                          className={`transition-all duration-200 ${
                            !isFilled
                              ? 'hover:brightness-150'
                              : 'hover:opacity-95'
                          }`}
                        />
                      );
                    })}
                  </g>

                  {/* Numbers Overlay */}
                  {showNumbers && (
                    <g id="number-labels" pointerEvents="none">
                      {activeTemplate.regions.map((region) => {
                        const isFilled = !!filledRegions[region.id];
                        if (isFilled) return null;
                        const isTargetNumber = region.number === activeNumber;
                        return (
                          <g key={`num-${region.id}`}>
                            <circle
                              cx={region.cx}
                              cy={region.cy}
                              r={isTargetNumber ? 12 : 10}
                              fill={isTargetNumber ? '#e60026' : '#141416'}
                              stroke={isTargetNumber ? '#ffffff' : '#3d3d44'}
                              strokeWidth={isTargetNumber ? 1.5 : 1}
                              opacity={0.9}
                            />
                            <text
                              x={region.cx}
                              y={region.cy + 4}
                              textAnchor="middle"
                              fontSize={isTargetNumber ? '11' : '10'}
                              fontFamily="monospace"
                              fontWeight="bold"
                              fill={isTargetNumber ? '#ffffff' : '#a0a0a0'}
                            >
                              {region.number}
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  )}
                </svg>
              </div>
            )}

            {/* Bottom Status Bar */}
            <div className="w-full mt-4 flex items-center justify-between text-xs font-mono text-[#888888] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e60026]" />
                Palette: {activePalette.name}
              </span>
              <span>
                {studioType === 'book-art' ? 'Authentic Book Page Tinting Active' : 'Occult Vector Matrix Active'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
