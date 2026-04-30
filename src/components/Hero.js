import React from 'react';

const Hero = () => {
  return (
    <section className="pt-8 pb-16">
      <div className="relative rounded-3xl overflow-hidden min-h-[500px] flex items-center bg-stone-900 shadow-2xl mx-4 md:mx-8">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/60 to-transparent z-10"></div>
        <img 
          alt="Sindhri Mangoes" 
          className="absolute inset-0 w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAldBSy7sRhOCoD1JRtVEAHqlVg0ThTJIxPqPGQSUPqFTlc5JMCR9FC6lYC44_FV1NnH1DmRC860W5bPv4TGKe-YF3hxtbttfEki_GqTeaDrkEV0nPV6iBAv3X2R7X-zsrYclrPIYwgyT3zTAPGzDq4WSlUm6PLMOHaytkvnC9HqDomwzRKvqqNqQzf2a9kIi943sylYWBeeifKwAepmnGeBg7lcfIZCWYSjdcLGUXOYHkejQYJQGeHbis7o4UglYuWcVl2unSwvjDi"
        />
        <div className="relative z-20 px-8 md:px-16 max-w-2xl">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full text-label-sm mb-6 uppercase tracking-wider font-bold">In Season Now</span>
          <h1 className="font-display text-display text-white mb-6 leading-[1.1]">The King of Fruits: Sindhri Mangoes</h1>
          <p className="text-stone-200 text-body-lg mb-10 leading-relaxed">Experience the legendary sweetness and velvety texture of Sindhri mangoes, harvested at dawn from the sun-drenched orchards of Sindh.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary hover:bg-on-primary-fixed-variant text-white px-10 py-4 rounded-xl font-label-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              Shop Now
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white px-10 py-4 rounded-xl font-label-lg transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
