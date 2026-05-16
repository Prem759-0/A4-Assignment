import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, User, ArrowRight, ChevronDown, X, Plus, Instagram, Twitter, Facebook, Mail, Hexagon } from "lucide-react";

/**
 * DEEPSTYLE FASHION - ASSIGNMENT FOUR FINAL VERSION
 * A hyper-detailed reconstruction of the reference image with advanced UX features.
 */

// --- Design Tokens & Data ---

const COLORS = {
  tan: "#E9D5C3",
  teal: "#42BBAA",
  yellow: "#FCD95B", 
  orange: "#FF8A50",
  blue: "#2EA9E0",
  green: "#A3D2A2",
  bg: "#FFFFFF",
};

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  color: string;
  category: string;
  position: string; // Used for grid mapping
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Marine Stripe",
    price: "$85.00",
    description: "Authentic nautical stripes on heavyweight organic cotton. A timeless foundation for any coastal wardrobe.",
    image: "https://images.unsplash.com/photo-1548142723-aae7678fad5d?q=80&w=1000",
    color: COLORS.tan,
    category: "New Season",
    position: "top-center-left",
  },
  {
    id: "p2",
    name: "Heritage Explorer Parka",
    price: "$195.00",
    description: "Rugged yet refined. Features water-resistant canvas, a wide-brim utility cap, and reinforced seams for urban exploration.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000",
    color: COLORS.orange,
    category: "Summer Collection",
    position: "left-sidebar",
  },
  {
    id: "p3",
    name: "Duo-Tone Studio Jersey",
    price: "$110.00",
    description: "The centerpiece of the collection. Features high-contrast pastel blocking in a premium breathable mesh silhouette.",
    image: "https://images.unsplash.com/photo-1618151313441-bc79b11e5090?q=80&w=1000",
    color: COLORS.yellow,
    category: "Main Piece",
    position: "center",
  },
  {
    id: "p4",
    name: "Violet Storm Anorak",
    price: "$145.00",
    description: "Technical outerwear with a bold editorial hue. Fully adjustable oversized hood and recycled polyester construction.",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1000",
    color: COLORS.orange,
    category: "Outerwear",
    position: "top-center-right",
  },
  {
    id: "p5",
    name: "Varsity Athletic Cap",
    price: "$45.00",
    description: "Vintage-inspired athletic cap with high-density embroidery and an adjustable leather strap.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000",
    color: COLORS.teal,
    category: "Accessories",
    position: "bottom-center-left",
  },
  {
    id: "p6",
    name: "Cloud Cotton Pullover",
    price: "$90.00",
    description: "Exceptional softness. This oversized pullover is crafted from brushed cotton for ultimate comfort.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000",
    color: COLORS.blue,
    category: "Basics",
    position: "bottom-center-right",
  },
  {
    id: "p7",
    name: "Crimson Rib Beanie",
    price: "$35.00",
    description: "Vibrant and warm. A traditional fisherman-style beanie knit from premium wool blend.",
    image: "https://images.unsplash.com/photo-1521119989659-a83eee488204?q=80&w=1000",
    color: COLORS.green,
    category: "Accessories",
    position: "right-sidebar",
  }
];

// --- Components ---

const Particle = ({ delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.1, 0.3, 0.1], 
      scale: [1, 1.2, 1],
      y: [0, -20, 0],
      x: [0, 10, 0]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      delay, 
      ease: "easeInOut" 
    }}
    className="absolute pointer-events-none rounded-full blur-3xl opacity-20"
    style={{ 
      width: '100px', 
      height: '100px', 
      backgroundColor: COLORS.tan,
      ...style 
    }}
  />
);

const NavLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="text-sm font-medium hover:text-brand-orange transition-colors duration-300 tracking-tight"
    onClick={(e) => {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }}
  >
    {children}
  </a>
);

interface GridItemProps {
  product: Product;
  onClick: (p: Product) => void;
  className?: string;
  parallaxSpeed?: number;
}

const GridItem = ({ product, onClick, className = "", parallaxSpeed = 0 }: GridItemProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);

  return (
    <motion.div 
      ref={container}
      whileHover={{ scale: 1.01, y: -5 }}
      onClick={() => onClick(product)}
      className={`relative overflow-hidden rounded-[45px] cursor-pointer group shadow-sm transition-shadow hover:shadow-2xl ${className}`}
      style={{ backgroundColor: product.color }}
      aria-label={`View details for ${product.name}`}
    >
      <motion.img 
        loading="lazy"
        src={product.image} 
        alt={product.name}
        style={{ y }}
        className="h-full w-full object-cover transition-transform duration-1000 ease-[0.16, 1, 0.3, 1] group-hover:scale-110"
      />
      
      {/* Quick View Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
         <div className="bg-white/95 backdrop-blur-xl px-6 py-4 rounded-[30px] flex flex-col items-center gap-1 shadow-2xl w-full max-w-[200px] text-center border border-white/50">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">{product.category}</span>
           <span className="text-sm font-bold text-zinc-900 leading-tight">{product.name}</span>
           <div className="mt-2 w-8 h-[2px] bg-brand-orange/30 rounded-full" />
         </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Advanced Parallax Scales
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroRotate = useTransform(scrollY, [0, 800], [0, 2]);
  const bgOpacity = useTransform(scrollY, [0, 400, 1000], [1, 0.4, 0.1]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] selection:bg-brand-orange selection:text-white pb-12 font-sans text-zinc-900">
      
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Particle style={{ top: '10%', left: '5%', backgroundColor: COLORS.tan }} delay={0} />
        <Particle style={{ top: '60%', right: '10%', backgroundColor: COLORS.blue, opacity: 0.1 }} delay={2} />
        <Particle style={{ bottom: '5%', left: '20%', backgroundColor: COLORS.green }} delay={4} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-[100] px-6 lg:px-16 py-7 transition-all duration-500 animate-fade-down" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(32px)',
        borderBottom: '1px solid rgba(0,0,0,0.03)'
      }}>
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-bold tracking-tighter flex items-center group cursor-pointer font-display"
          >
            Deep<span className="text-brand-orange group-hover:rotate-[30deg] transition-transform duration-500 origin-center ml-0.5">°</span>style
          </div>
          
          <div className="hidden lg:flex items-center space-x-14">
            <NavLink href="#arrivals">New Arrivals</NavLink>
            <NavLink href="#shop">Shop</NavLink>
            <NavLink href="#beauty">Beauty</NavLink>
            <NavLink href="#sale">Sale</NavLink>
            <NavLink href="#journal">Journal</NavLink>
          </div>
          
          <div className="flex items-center space-x-6">
            <button aria-label="Search" className="hover:scale-110 active:scale-95 transition-transform"><Search size={22} /></button>
            <button aria-label="Account" className="hover:scale-110 active:scale-95 transition-transform"><Hexagon size={22} /></button>
            <button aria-label="Cart" className="relative p-2.5 bg-black text-white rounded-full hover:scale-110 active:scale-90 transition-transform">
              <ShoppingBag size={18} />
              <motion.span 
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-brand-orange text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white"
              >2</motion.span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-24" id="arrivals">
        {/* HERO TITLE - Correct Puns/Spelling from Ref */}
        <motion.div 
          ref={heroRef}
          style={{ y: heroY, rotate: heroRotate, opacity: bgOpacity }}
          className="relative mb-40 text-center flex flex-col items-center z-10"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 -translate-x-12 -translate-y-20 animate-float opacity-90">
             <span className="text-7xl">🌻</span>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-12 translate-y-12 animate-float opacity-80" style={{ animationDelay: '2s' }}>
             <span className="text-6xl text-brand-orange">🌺</span>
          </div>

          <h1 className="text-6xl md:text-[9.2vw] font-display font-black tracking-tight leading-[0.9] text-zinc-900 filter drop-shadow-2xl">
            Make Your Fashion Look <br /> 
            <span className="relative inline-block mt-4 sm:mt-8">
              More Charming
            </span>
          </h1>
        </motion.div>

        {/* CSS GRID CLUSTER - EXACT MATCH */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 items-start mb-48 z-20">
          
          {/* STAR ICON (FIXED POSITION RELATIVE TO CENTER) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-14 z-30 pointer-events-none group">
            <svg viewBox="0 0 100 100" className="w-16 h-16 fill-black drop-shadow-xl animate-pulse">
              <path d="M50 0L58 42L100 50L58 58L50 100L42 58L0 50L42 42L50 0Z" />
            </svg>
          </div>

          {/* COLUMN 1: LEFT SIDEBAR */}
          <div className="space-y-14">
            <div className="space-y-4">
              <p className="font-black tracking-[0.5em] text-zinc-400 text-[9.5px] uppercase">Summer Collection</p>
              <h2 className="text-[26px] font-display font-black leading-[1.05] tracking-tight">
                TRANDY AND <br /> 
                CLUSSI FOR <br /> 
                NEW SEASSON
              </h2>
            </div>
            {/* The Person with cap and backpack */}
            <GridItem product={PRODUCTS[1]} onClick={setSelectedProduct} className="aspect-[3.5/5] rounded-[55px] shadow-lg border-4 border-white/40" parallaxSpeed={-50} />
            <div className="relative pt-12">
               <span className="text-[120px] font-serif italic text-brand-orange opacity-10 absolute -top-8 -left-4 pointer-events-none">“</span>
            </div>
          </div>

          {/* COLUMN 2: CENTER-LEFT */}
          <div className="flex flex-col gap-10 lg:pt-36">
            <div className="relative">
              {/* Tan box striped shirt */}
              <GridItem product={PRODUCTS[0]} onClick={setSelectedProduct} className="aspect-[4/3] rounded-[48px]" parallaxSpeed={25} />
              <div className="absolute -top-6 -left-6 drop-shadow-md z-30 transition-transform hover:scale-125 duration-500">
                <span className="text-4xl">🌼</span>
              </div>
            </div>
            {/* Teal box baseball cap */}
            <GridItem product={PRODUCTS[4]} onClick={setSelectedProduct} className="aspect-square rounded-[48px]" parallaxSpeed={-20} />
          </div>

          {/* COLUMN 3: MAIN TALL CENTER PIECE */}
          <div className="lg:pt-20">
            {/* YELLOW BOX: PINK/BLUE COLORBLOCK TEE */}
            <GridItem product={PRODUCTS[2]} onClick={setSelectedProduct} className="h-[680px] rounded-[60px] shadow-2xl border-2 border-white" parallaxSpeed={65} />
          </div>

          {/* COLUMN 4: CENTER-RIGHT */}
          <div className="flex flex-col gap-10 lg:pt-16">
            {/* PURPLE HOODIE */}
            <GridItem product={PRODUCTS[3]} onClick={setSelectedProduct} className="aspect-[4/5.5] rounded-[50px] shadow-md" parallaxSpeed={-35} />
            {/* WHITE SWEATSHIRT */}
            <GridItem product={PRODUCTS[5]} onClick={setSelectedProduct} className="aspect-[4/5] rounded-[50px] shadow-sm" parallaxSpeed={15} />
          </div>

          {/* COLUMN 5: RIGHT SIDEBAR */}
          <div className="space-y-24 flex flex-col items-center self-end pb-4">
            {/* ROTATING EXPLORE BUTTON */}
            <div className="group relative w-44 h-44 flex items-center justify-center cursor-pointer">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path id="circlePath" fill="none" d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
                  <text className="uppercase font-black tracking-[0.25em] fill-zinc-300 transition-colors group-hover:fill-zinc-900 text-[10px]">
                    <textPath xlinkHref="#circlePath">Explore more Collection • Explore more Collection •</textPath>
                  </text>
                </svg>
              </motion.div>
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center pl-1.5 transition-all group-hover:scale-110 shadow-2xl group-active:scale-95">
                <ArrowRight size={26} />
              </div>
            </div>

            <div className="space-y-8 flex flex-col items-center">
              <div className="relative group/beanie">
                {/* GREEN BOX RED BEANIE */}
                <GridItem product={PRODUCTS[6]} onClick={setSelectedProduct} className="w-64 aspect-square rounded-[50px] shadow-xl" parallaxSpeed={45} />
                <div className="absolute -bottom-6 -right-6 drop-shadow-xl z-30 transition-all duration-500 group-hover/beanie:rotate-[24deg] group-hover/beanie:scale-125">
                   <span className="text-5xl">🍒</span>
                </div>
              </div>
              <div className="text-4xl font-display font-black tracking-tighter text-zinc-200 hover:text-brand-orange transition-colors duration-500 select-none">
                #2022
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: SIGNATURE & NEWSLETTER */}
        <section className="flex flex-col lg:flex-row items-end justify-between gap-24 pt-12" id="journal">
          <div className="max-w-xl space-y-12">
            <p className="text-2xl md:text-3xl font-display font-bold leading-relaxed text-zinc-500 selection:bg-zinc-900 selection:text-white">
              <span className="text-zinc-900">I'm very much of the 'buy less but buy better'</span> <br /> 
              philosophy. It's what I've never really knew.
            </p>
            <div className="relative inline-block pb-6 group">
               <span className="signature text-5xl md:text-6xl font-serif italic text-zinc-900 transition-transform duration-500 group-hover:-translate-y-1 block">Josh Luchpovic</span>
               <div className="absolute bottom-4 left-0 w-full h-2.5 bg-brand-yellow/80 -skew-x-[20deg] px-2 transition-transform duration-500 group-hover:scale-x-105" />
               <div className="absolute -top-12 -right-12 animate-float">
                 <span className="text-4xl text-brand-orange">🌸</span>
               </div>
            </div>
            
            {/* Newsletter Integration */}
            <form onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} className="flex flex-col gap-4 mt-8">
              <label htmlFor="email" className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400">Join our journal</label>
              <div className="flex gap-2">
                <input 
                  id="email"
                  type="email" 
                  placeholder="name@email.com" 
                  className="flex-1 h-14 bg-zinc-50 border border-zinc-100 rounded-2xl px-6 outline-none focus:border-brand-orange transition-colors"
                  required
                />
                <button type="submit" className="px-8 h-14 bg-black text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange transition-colors active:scale-95 shadow-lg">Submit</button>
              </div>
            </form>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-14 lg:pb-8">
             <button className="h-[75px] bg-[#FFFFFF] border border-zinc-100 rounded-[28px] px-12 font-black uppercase text-[10px] tracking-[0.4em] flex items-center gap-5 transition-all hover:border-black hover:shadow-xl active:scale-95 group">
                SCROLL DOWN <ChevronDown className="transition-transform group-hover:translate-y-1.5" size={18} />
             </button>

             {/* DIAG DECORATOR FROM IMAGE */}
             <div className="hidden lg:block w-[1px] h-20 bg-zinc-100 rotate-[35deg] mx-4" />

             <div className="relative flex items-center gap-10">
                <div className="text-[9.5vw] font-display font-black text-zinc-100 opacity-60 leading-none select-none absolute right-full -mr-8">01</div>
                <div>
                   <p className="text-[10px] font-black text-zinc-400 mb-1 uppercase tracking-widest flex items-center gap-2">
                     <span className="w-4 h-[1.5px] bg-zinc-200" /> 31 May 2022 • Blog
                   </p>
                   <p className="text-xl font-display font-bold leading-[1.2] max-w-[200px] text-zinc-900 group cursor-pointer hover:text-brand-orange transition-colors">
                     Always be strong <br /> 
                     and have <span className="underline decoration-brand-yellow decoration-4 underline-offset-4">valus</span>
                   </p>
                </div>
                <button aria-label="Next Post" className="h-16 w-16 bg-black text-white rounded-full flex items-center justify-center transition-all hover:scale-110 hover:-rotate-12 active:scale-90 shadow-2xl group flex-shrink-0">
                  <ArrowRight size={28} className="transition-transform group-hover:translate-x-1" />
                </button>
             </div>
          </div>
        </section>
      </main>

      {/* PRODUCT MODAL WITH ZOOM & SOCIALS */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-zinc-900/40 backdrop-blur-3xl"
            />
            
            <motion.div 
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="relative bg-white w-full max-w-6xl rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-8 right-8 z-[210] w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-90 shadow-2xl border border-zinc-50"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-[50%] p-5 md:p-12 flex flex-col items-center justify-center">
                <div 
                  className="w-full h-full min-h-[400px] md:min-h-[650px] rounded-[40px] overflow-hidden relative shadow-inner group/zoom"
                  style={{ backgroundColor: selectedProduct.color }}
                >
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="h-full w-full object-cover transition-all duration-700 ease-out group-hover/zoom:scale-150 group-hover/zoom:translate-x-20 group-hover/zoom:translate-y-20 origin-center" 
                  />
                  
                  {/* Decorative Badge */}
                  <div className="absolute top-8 left-8 px-6 py-2.5 bg-white/95 backdrop-blur-xl rounded-full font-black uppercase tracking-[0.25em] text-[9px] shadow-xl border border-white">
                    {selectedProduct.category}
                  </div>

                  {/* Zoom Indicator */}
                  <div className="absolute bottom-8 right-8 bg-black/80 text-white/80 p-3 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-opacity">
                     <Plus size={20} />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[50%] p-10 md:p-20 flex flex-col justify-center">
                <div className="mb-8 flex items-center gap-3">
                   <div className="h-px w-8 bg-zinc-200" />
                   <span className="font-black tracking-[0.6em] text-zinc-300 text-[10px] uppercase">Curated Product</span>
                </div>

                <h2 className="text-4xl md:text-[5vw] font-display font-black leading-[0.95] mb-8 tracking-tight">{selectedProduct.name}</h2>
                <div className="flex items-baseline gap-4 mb-10">
                   <p className="text-4xl font-display text-brand-orange font-bold uppercase">{selectedProduct.price}</p>
                   <span className="text-xs font-bold text-zinc-300 line-through tracking-widest">$245.00</span>
                </div>

                <p className="text-zinc-500 leading-relaxed mb-12 text-lg font-medium selection:bg-brand-orange selection:text-white">
                  {selectedProduct.description}
                </p>

                <div className="space-y-6">
                  <button className="w-full h-20 bg-black text-white rounded-[28px] font-black uppercase tracking-[0.25em] shadow-2xl transition-all flex items-center justify-center gap-4 hover:bg-brand-orange hover:shadow-brand-orange/40 active:scale-95 text-[11px]">
                    ADD TO BAG <ShoppingBag size={22} className="mb-0.5" />
                  </button>

                  <div className="flex gap-4">
                    <button className="flex-1 h-20 bg-[#F7F7F7] border border-zinc-100 rounded-[28px] font-black uppercase tracking-[0.3em] text-[9.5px] transition-all hover:border-black active:scale-95">Find in Store</button>
                    
                    {/* Social Shares */}
                    <div className="flex gap-2">
                       {[Instagram, Twitter, Facebook, Mail].map((Icon, idx) => (
                         <button key={idx} className="w-20 h-20 bg-[#F7F7F7] border border-zinc-100 rounded-[28px] flex items-center justify-center transition-all hover:border-brand-orange hover:bg-white active:scale-90 group shadow-sm">
                           <Icon size={22} className="group-hover:text-brand-orange transition-colors" />
                         </button>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-down { animation: fade-down 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        .signature { font-family: 'Playfair Display', serif; }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        
        /* Custom scrollbar for aesthetic consistency */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #FFFFFF; }
        ::-webkit-scrollbar-thumb { background: #F0F0F0; border-radius: 10px; border: 2px solid white; }
        ::-webkit-scrollbar-thumb:hover { background: #E0E0E0; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
