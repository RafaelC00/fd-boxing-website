'use client';

export default function VideoBackground() {
    return (
        <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/videos/Boxing_Legend_Shadowboxing_Video.mp4" type="video/mp4" />
            </video>

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                <h2 className="font-[family-name:var(--font-geist-mono)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                    REAL BOXING FOR EVERYONE
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                    Experience world-class boxing training with Federico Devesa.
                    From beginners to professionals, elevate your skills with proven techniques
                    refined through years of championship experience.
                </p>
            </div>
        </section>
    );
}
