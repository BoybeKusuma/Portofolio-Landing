tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Poppins', 'sans-serif'],
                'display': ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                'brand-pink': '#FF71CD',
                'brand-yellow': '#F9F871',
                'brand-purple': '#8E44AD',
                'brand-blue': '#3498DB',
                'dark-bg': '#0A0A14',
            },
            animation: {
                'star-twinkle': 'star-twinkle 2s ease-in-out infinite alternate',
                'shooting-star': 'shooting-star 10s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                'star-twinkle': {
                    '0%': { opacity: 0.1, transform: 'scale(0.8)' },
                    '100%': { opacity: 0.8, transform: 'scale(1)' },
                },
                'shooting-star': {
                    '0%': { transform: 'translateX(0) translateY(0) rotate(45deg)', opacity: 1 },
                    '100%': { transform: 'translateX(300px) translateY(300px) rotate(45deg)', opacity: 0 },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            }
        }
    }
};