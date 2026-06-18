import { Trophy, Award, X, ChevronLeft, ChevronRight, MapPin, Clock, Activity, Car } from 'lucide-react';
import { useRef, useState, MouseEvent, useEffect } from 'react';
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { hackathonsData } from '../../data/hackathonsData';

const Hackathon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHackathon, setSelectedHackathon] = useState<any>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedHackathon?.images) return;
        setCurrentImageIndex((prev) => (prev + 1) % selectedHackathon.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedHackathon?.images) return;
        setCurrentImageIndex((prev) => (prev - 1 + selectedHackathon.images.length) % selectedHackathon.images.length);
    };

    const handleOpen = (hackathon: any) => {
        setSelectedHackathon(hackathon);
        setCurrentImageIndex(0);
        setIsOpen(true);
    };

    const handleViewProject = () => {
        setIsOpen(false);
        const projectId = selectedHackathon?.id === 2 ? 'auramed' : 0;
        const event = new CustomEvent('trigger-project-view', { detail: { projectId } });
        window.dispatchEvent(event);
    };

    // Restored TiltCard Component
    const TiltCard = ({ children, className, onClick }: any) => {
        const ref = useRef<HTMLDivElement>(null);
        const [style, setStyle] = useState({
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
            transition: "transform 0.4s ease-out"
        });

        const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const x = (e.clientX - left - width / 2) / 25;
            const y = (e.clientY - top - height / 2) / 25;

            setStyle({
                transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`,
                transition: "none"
            });
        };

        const handleMouseLeave = () => {
            setStyle({
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
                transition: "transform 0.5s ease-out"
            });
        };

        return (
            <div
                ref={ref}
                onClick={onClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`group relative rounded-2xl border border-white/5 bg-white/5 
                hover:bg-[#020617] hover:border-yellow-500/30 overflow-hidden cursor-pointer
                transition-all duration-300 ${className}`}
                style={style}
            >
                {children}
            </div>
        );
    };

    // Simple icon placeholder helper
    const CarIconPlaceholder = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M2 12h12" /></svg>
    );

    return (
        <section id="hackathon" className="py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="section-title animate-slide-up flex items-center justify-center gap-3">
                        <Trophy className="text-yellow-500" size={32} />
                        Hackathon <span className="gradient-text from-yellow-400 to-orange-500">Achievements</span>
                    </h2>
                    <p className="section-subtitle animate-slide-up animation-delay-100">
                        Recognized for innovation and technical excellence in competitive environments
                    </p>
                </div>

                <div className="max-w-4xl mx-auto animate-slide-up animation-delay-200">
                    {hackathonsData.map((hackathon) => (
                        <TiltCard key={hackathon.id} className="relative group mb-8" onClick={() => handleOpen(hackathon)}>

                            {/* Golden Glow Effect on Hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent pointer-events-none" />

                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image Section */}
                                <div className="relative h-64 md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black/40 min-h-[250px] flex items-center justify-center">
                                    {hackathon.coverImage ? (
                                        <>
                                            <img
                                                src={hackathon.coverImage}
                                                alt={hackathon.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            {/* Placeholder Fallback */}
                                            <div className="hidden absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white/20">
                                                <Award size={64} />
                                                <span className="ml-2 font-mono text-sm">Image Not Found</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-black flex flex-col items-center justify-center p-6 text-center select-none w-full h-full">
                                            <span className="text-4xl mb-3">🥈</span>
                                            <p className="font-bold text-white text-lg tracking-wider mb-1">AI ASCEND 2026</p>
                                            <p className="text-xs text-muted-foreground">{hackathon.location}</p>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                                    <div className="absolute top-4 left-4 bg-yellow-500/20 backdrop-blur-md border border-yellow-500/50 text-yellow-400 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.3)] z-10">
                                        <Trophy size={14} fill="currentColor" />
                                        <span className="font-bold text-xs uppercase tracking-wider">{hackathon.achievement}</span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-8 md:p-10 flex flex-col justify-center relative">
                                    <Trophy className="absolute -right-6 -bottom-6 w-48 h-48 opacity-5 -rotate-12 text-yellow-500 pointer-events-none" />
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                        {hackathon.theme} – {hackathon.achievement === "Theme Winner" ? "Theme Victory" : hackathon.achievement}
                                    </h3>
                                    <p className="text-yellow-500/80 font-medium text-sm mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                        Powered by {hackathon.solutionName}
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                                        {hackathon.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {hackathon.technologies.map((tech: string) => (
                                            <span key={tech} className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5 group-hover:border-yellow-500/20 group-hover:bg-yellow-500/5 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>
            </div>

            {/* Detailed Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-5xl glass-card border-white/10 p-0 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto">
                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full p-2 bg-black/50 hover:bg-white/20 text-white transition-colors">
                        <X size={20} />
                    </DialogClose>

                    {/* Left Side: Image Carousel */}
                    <div className="w-full md:w-[40%] bg-black/50 relative flex flex-col h-1/3 md:h-auto border-b md:border-b-0 md:border-r border-white/10">
                        <div className="flex-1 relative overflow-hidden group bg-black/80 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {selectedHackathon?.images && selectedHackathon.images[currentImageIndex] ? (
                                    <img
                                        src={selectedHackathon.images[currentImageIndex]}
                                        alt={`${selectedHackathon.title} ${currentImageIndex + 1}`}
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-white/20">
                                        <Award size={80} className="w-1/3 h-1/3 opacity-20" />
                                        <span className="mt-4 font-mono text-xs tracking-widest opacity-40">NO IMAGES AVAILABLE</span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/50 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/50 hover:text-white hover:bg-black/60 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10"
                            >
                                <ChevronRight size={24} />
                            </button>
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {selectedHackathon?.images.map((_: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-yellow-500 w-4' : 'bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="w-full md:w-[60%] bg-[#0A0A0A] p-6 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[85vh] custom-scrollbar">
                        {selectedHackathon && (
                            <>
                                <div className="mb-6">
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-3">
                                        <Trophy size={12} fill="currentColor" />
                                        {selectedHackathon.achievement}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-2 leading-tight">
                                        {selectedHackathon.title} <span className="text-muted-foreground font-normal text-xl block mt-1">{selectedHackathon.theme}</span>
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <MapPin size={10} /> Location
                                        </p>
                                        <p className="font-semibold text-sm">{selectedHackathon.location}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Clock size={10} /> Duration
                                        </p>
                                        <p className="font-semibold text-sm">{selectedHackathon.duration}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-white/5 border border-white/5 col-span-2 md:col-span-1">
                                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                                            <Award size={10} /> Prize
                                        </p>
                                        <p className="font-semibold text-sm text-yellow-500">{selectedHackathon.prize}</p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base mb-8">
                                    {selectedHackathon.longDescription.map((para: string, idx: number) => (
                                        <p key={idx}>{para}</p>
                                    ))}
                                </div>
                                <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 mb-8 flex items-center gap-4 group cursor-pointer hover:bg-orange-500/5 transition-colors" onClick={handleViewProject}>
                                    <div className="p-3 rounded-lg bg-orange-500/20 text-orange-500">
                                        {selectedHackathon.id === 2 ? <Activity size={24} /> : <Car size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-0.5">Solution Used</p>
                                        <h4 className="font-bold text-white text-lg">{selectedHackathon.solutionName}</h4>
                                        <p className="text-muted-foreground text-xs">
                                            {selectedHackathon.id === 2 
                                                ? "Unified multi-pathology diagnostic suite using Vision Transformers." 
                                                : "Real-time fleet routing engine with decision-point stability."
                                            }
                                        </p>
                                    </div>
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500/20 text-muted-foreground group-hover:text-orange-500 transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                                <button
                                    onClick={handleViewProject}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold tracking-wide shadow-lg shadow-orange-900/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                                >
                                    View Full Project
                                </button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default Hackathon;
