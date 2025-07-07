document.addEventListener('alpine:init', () => {
    // Kita mendaftarkan komponen data global bernama 'portfolio'
    Alpine.data('portfolio', () => ({

        // --- STATE (VARIABEL) ---
        // Salin semua state dari x-data Anda ke sini
        rotateX: 0, 
        rotateY: 0,
        isTransitioning: false,
        isCollapsing: false,
        cloneStyle: {},
        activeSection: null,
        planetOrigins: {},
        scrolled: false,
        navReady: false,
        heroReady: false,
        isMobileMenuOpen: false,
        overlayOpacity: 0, // State ini ada di fungsi Anda, lebih baik didefinisikan di awal

        // --- METHODS (FUNGSI) ---
        // Salin semua fungsi Anda ke sini
        lockScroll() {
            if (this.isMobileMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },

        zoomToSection(event, targetSectionId) {
            if (this.isTransitioning) return;

            const planet = event.currentTarget.querySelector('.planet');
            const rect = planet.getBoundingClientRect();

            this.isTransitioning = true;
            this.overlayOpacity = 0;

            this.cloneStyle = {
                left: `${rect.left}px`,
                top: `${rect.top}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                backgroundImage: window.getComputedStyle(planet).backgroundImage,
                backgroundSize: 'cover',
                borderRadius: '50%',
                opacity: 1,
                transform: 'scale(1)',
                animation: 'none',
                transition: 'transform 0.8s cubic-bezier(0.6, 0.04, 0.98, 0.335)'
            };

            let overlayFadeIn = setInterval(() => {
                this.overlayOpacity += 0.05;
                if (this.overlayOpacity >= 1) {
                    clearInterval(overlayFadeIn);
                }
            }, 30);

            setTimeout(() => {
                this.cloneStyle.transform = 'scale(60)';
            }, 20);

            setTimeout(() => {
                document.querySelector(targetSectionId).scrollIntoView({ behavior: 'auto' });
            }, 600);

            setTimeout(() => {
                this.isTransitioning = false;
            }, 1000);
        },

        // --- INITIALIZATION ---
        // Pindahkan semua kode dari x-init ke sini dalam sebuah fungsi init()
        init() {
            setTimeout(() => {
                for (const key in this.$refs) {
                    if (key.startsWith('planet_')) {
                        const el = this.$refs[key];
                        const rect = el.querySelector('.planet').getBoundingClientRect();
                        const sectionName = key.replace('planet_', '');
                        this.planetOrigins[sectionName] = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
                    }
                }
            }, 100);

            // Pemicu animasi intro
            setTimeout(() => { this.navReady = true; }, 700);
            setTimeout(() => { this.heroReady = true; }, 800);

            // Mengawasi perubahan status menu mobile untuk kunci scroll
            this.$watch('isMobileMenuOpen', value => this.lockScroll());
        }

        
    }));
});