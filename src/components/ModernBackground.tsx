
const ModernBackground = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
            {/* Deep Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-background/80 z-0" />

            {/* Primary Glow (Cyan) - Top Left */}
            <div
                className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow"
                style={{ animationDuration: '4s' }}
            />

            {/* Secondary Glow (Violet) - Bottom Right */}
            <div
                className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] animate-pulse-glow"
                style={{ animationDuration: '5s', animationDelay: '1s' }}
            />

            {/* Accent Glow (Cyan) - Center Right */}
            <div
                className="absolute top-[40%] right-[10%] w-[30%] h-[30%] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow"
                style={{ animationDuration: '6s', animationDelay: '2s' }}
            />

            {/* Accent Glow (Violet) - Center Left */}
            <div
                className="absolute bottom-[30%] left-[20%] w-[25%] h-[25%] rounded-full bg-secondary/10 blur-[100px] animate-pulse-glow"
                style={{ animationDuration: '7s', animationDelay: '0.5s' }}
            />

            {/* Grid Pattern Overlay for texture */}
            <div
                className="absolute inset-0 z-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
          linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '4rem 4rem'
                }}
            />
        </div>
    );
};

export default ModernBackground;
