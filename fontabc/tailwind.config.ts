import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')
const { blackA, mauve, violet, indigo, purple } = require('@radix-ui/colors')
const config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...purple,
        ...indigo,
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'custom-color': 'rgba(38, 194, 126, .4)',
        'custom-color-hover': 'rgba(16, 105, 66, .4)'
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        enterFromRight: {
          from: { opacity: '0', transform: 'translateX(200px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        enterFromLeft: {
          from: { opacity: '0', transform: 'translateX(-200px)' },
          to: { opacity: '1', transform: 'translateX(0)' }
        },
        exitToRight: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(200px)' }
        },
        exitToLeft: {
          from: { opacity: '1', transform: 'translateX(0)' },
          to: { opacity: '0', transform: 'translateX(-200px)' }
        },
        scaleIn: {
          from: { opacity: '0', transform: 'rotateX(-10deg) scale(0.9)' },
          to: { opacity: '1', transform: 'rotateX(0deg) scale(1)' }
        },
        scaleOut: {
          from: { opacity: '1', transform: 'rotateX(0deg) scale(1)' },
          to: { opacity: '0', transform: 'rotateX(-10deg) scale(0.95)' }
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        custom: '0 0 14px rgba(1, 226, 99, .2)', // Thêm bóng đổ tùy chỉnh
        'custom-career': '0 10px 30px rgba(14, 166, 59, .2)'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(17, 215, 105, 0), #11d769 51.04%, rgba(17, 215, 105, 0))',
        'custom-gradient-banner': 'linear-gradient(83.78deg, #122235 1.64%, #1aa357 93.62%)',
        'custom-gradient-outstanding': 'linear-gradient(90deg, #06a76a 3.77%, rgba(6, 167, 106, 0) 105.36%)',
        'custom-gradient-counttime': 'linear-gradient(180deg, #06a76a, rgba(6, 167, 106, 0))',
        'custom-gradient-outstanding-employer': 'linear-gradient(201.63deg, #003e86 14.36%, #02d15e 95.71%)',
        'custom-gradient-desctiption-congty': 'linear-gradient(360deg, #fff, hsla(0, 0%, 100%, 0))'
      },
      dropShadow: {
        custom: '0 2.44297px 64.1279px rgba(146, 255, 178, .4)'
      },
      spacing: {
        '34': '34px'
      }
    },
    animation: {
      scaleIn: 'scaleIn 200ms ease',
      scaleOut: 'scaleOut 200ms ease',
      fadeIn: 'fadeIn 200ms ease',
      fadeOut: 'fadeOut 200ms ease',
      enterFromLeft: 'enterFromLeft 250ms ease',
      enterFromRight: 'enterFromRight 250ms ease',
      exitToLeft: 'exitToLeft 250ms ease',
      exitToRight: 'exitToRight 250ms ease'
    }
  },
  plugins: [
    require('tailwindcss-animate'),

    plugin(({ matchUtilities }: any) => {
      matchUtilities({
        perspective: (value: any) => ({
          perspective: value
        }),
        'transition-height': {
          transition: 'height 0.3s ease'
        }
      })
    })
  ]
} satisfies Config

export default config
