(function () {
  'use strict';

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  var BOARD_COLORS = ['#23a37e', '#ff8a6b', '#f7b04a', '#5aa7f0', '#9a7bf0', '#e8729e', '#43b6c9', '#6fc79f'];
  var DAY_MS = 86400000;

  var COLOR_KEYS = {
    '#23a37e': 'emerald',
    '#ff8a6b': 'coral',
    '#f7b04a': 'amber',
    '#5aa7f0': 'arctic',
    '#9a7bf0': 'galaxy',
    '#e8729e': 'sakura',
    '#43b6c9': 'abyss',
    '#6fc79f': 'mist'
  };

  var THEMES = {
    emerald: {
      vars: {
        '--bg0': '#0d2b22', '--bg1': '#12382b',
        '--card': 'rgba(26,66,52,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(111,199,159,0.16)', '--line-soft': 'rgba(111,199,159,0.1)',
        '--bord': 'rgba(141,225,180,0.18)', '--bord-strong': 'rgba(141,225,180,0.4)',
        '--field-bg': 'rgba(10,30,24,0.7)', '--field-bg-focus': 'rgba(10,30,24,0.9)',
        '--modal-bg': 'rgba(20,52,40,0.95)',
        '--ink': '#f0fff6', '--ink-soft': '#a9d4bf', '--muted': '#6f9c86',
        '--primary': '#3ecfa0', '--primary-deep': '#1f9c74', '--primary-soft': 'rgba(62,207,160,0.16)',
        '--lav': '#6fd6a3', '--cyan': '#8ff0c8', '--pink': '#ffd0a6',
        '--btn-top': '#7be8bd', '--btn-bot': '#1f9c74', '--btn-ink': '#06231a',
        '--acc-a': '130,235,190', '--acc-b': '190,250,215', '--prim-a': '62,207,160',
        '--halo-a': '220,255,235', '--halo-b': '143,240,200', '--halo-c': '111,199,159',
        '--aurora1': '#1d6b4f', '--aurora2': '#2f9e6e', '--aurora3': '#0f5c4a',
        '--focus': 'rgba(130,235,190,0.6)',
        '--c-axis': '#14402f', '--c-txt': '#7fb798',
        '--c-bar': '#6fd6a3', '--c-bar-hi': '#a7f2cf',
        '--c-line': '#4fd1a2', '--c-line-hi': '#7be8bd',
        '--c-total': '#6fd6a3', '--c-total-hi': '#a7f2cf'
      },
      star: {
        stars: ['255,255,255', '185,245,215', '170,255,225'],
        glow: ['150,240,200', '180,255,220'],
        meteor: '200,255,225'
      }
    },
    coral: {
      vars: {
        '--bg0': '#3a1512', '--bg1': '#55211c',
        '--card': 'rgba(97,38,30,0.42)', '--card-soft': 'rgba(255,255,255,0.04)',
        '--line': 'rgba(255,150,120,0.16)', '--line-soft': 'rgba(255,150,120,0.1)',
        '--bord': 'rgba(255,150,120,0.18)', '--bord-strong': 'rgba(255,150,120,0.4)',
        '--field-bg': 'rgba(44,16,12,0.7)', '--field-bg-focus': 'rgba(44,16,12,0.9)',
        '--modal-bg': 'rgba(78,32,26,0.95)',
        '--ink': '#fff4ef', '--ink-soft': '#e0b8a8', '--muted': '#a0786a',
        '--primary': '#ff9a72', '--primary-deep': '#e75f36', '--primary-soft': 'rgba(255,138,107,0.16)',
        '--lav': '#ffb58a', '--cyan': '#ffd19c', '--pink': '#ff9ec7',
        '--btn-top': '#ffb08f', '--btn-bot': '#e75f36', '--btn-ink': '#3a1006',
        '--acc-a': '255,170,130', '--acc-b': '255,205,150', '--prim-a': '255,138,107',
        '--halo-a': '255,225,205', '--halo-b': '255,170,130', '--halo-c': '255,190,150',
        '--aurora1': '#a63a2a', '--aurora2': '#d96a3f', '--aurora3': '#7a2c4a',
        '--focus': 'rgba(255,170,130,0.6)',
        '--c-axis': '#5c2a20', '--c-txt': '#c08a74',
        '--c-bar': '#ff9a72', '--c-bar-hi': '#ffc49e',
        '--c-line': '#ff9a72', '--c-line-hi': '#ffb58a',
        '--c-total': '#ffb58a', '--c-total-hi': '#ffd19c'
      },
      star: {
        stars: ['255,255,255', '255,200,170', '255,170,130'],
        glow: ['255,185,145', '255,205,165'],
        meteor: '255,220,190'
      }
    },
    amber: {
      vars: {
        '--bg0': '#33200b', '--bg1': '#4a2f12',
        '--card': 'rgba(84,54,20,0.42)', '--card-soft': 'rgba(255,255,255,0.04)',
        '--line': 'rgba(247,176,74,0.16)', '--line-soft': 'rgba(247,176,74,0.1)',
        '--bord': 'rgba(247,176,74,0.18)', '--bord-strong': 'rgba(247,176,74,0.4)',
        '--field-bg': 'rgba(44,28,10,0.7)', '--field-bg-focus': 'rgba(44,28,10,0.9)',
        '--modal-bg': 'rgba(74,48,18,0.95)',
        '--ink': '#fff7e8', '--ink-soft': '#e8c99b', '--muted': '#a8875c',
        '--primary': '#ffb74d', '--primary-deep': '#e08f1f', '--primary-soft': 'rgba(255,183,77,0.16)',
        '--lav': '#ffd08a', '--cyan': '#ffc06a', '--pink': '#ff9ec7',
        '--btn-top': '#ffc36b', '--btn-bot': '#e08f1f', '--btn-ink': '#3a2406',
        '--acc-a': '255,205,130', '--acc-b': '255,190,90', '--prim-a': '255,183,77',
        '--halo-a': '255,235,200', '--halo-b': '255,205,130', '--halo-c': '255,190,110',
        '--aurora1': '#8a5a1a', '--aurora2': '#c9851f', '--aurora3': '#6b3f12',
        '--focus': 'rgba(255,205,130,0.6)',
        '--c-axis': '#5c4018', '--c-txt': '#b08c55',
        '--c-bar': '#ffc36b', '--c-bar-hi': '#ffdfa0',
        '--c-line': '#ffb74d', '--c-line-hi': '#ffcf86',
        '--c-total': '#ffcf86', '--c-total-hi': '#ffe3ad'
      },
      star: {
        stars: ['255,255,255', '255,225,175', '255,205,140'],
        glow: ['255,215,160', '255,225,185'],
        meteor: '255,235,200'
      }
    },
    arctic: {
      vars: {
        '--bg0': '#0f1e38', '--bg1': '#16294c',
        '--card': 'rgba(30,52,96,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(130,170,255,0.16)', '--line-soft': 'rgba(130,170,255,0.1)',
        '--bord': 'rgba(140,180,255,0.18)', '--bord-strong': 'rgba(140,180,255,0.4)',
        '--field-bg': 'rgba(12,24,44,0.7)', '--field-bg-focus': 'rgba(12,24,44,0.9)',
        '--modal-bg': 'rgba(26,46,84,0.95)',
        '--ink': '#f0f5ff', '--ink-soft': '#b6c8ea', '--muted': '#7c90b8',
        '--primary': '#6fb0ff', '--primary-deep': '#3c7fe0', '--primary-soft': 'rgba(111,176,255,0.16)',
        '--lav': '#8fc0ff', '--cyan': '#a6e3ff', '--pink': '#ff9ec7',
        '--btn-top': '#7fc4ff', '--btn-bot': '#3c7fe0', '--btn-ink': '#061e38',
        '--acc-a': '150,195,255', '--acc-b': '175,225,255', '--prim-a': '111,176,255',
        '--halo-a': '230,240,255', '--halo-b': '160,200,255', '--halo-c': '180,225,255',
        '--aurora1': '#1f4a8a', '--aurora2': '#2a6bb5', '--aurora3': '#12306e',
        '--focus': 'rgba(160,200,255,0.6)',
        '--c-axis': '#16345c', '--c-txt': '#8aa3c9',
        '--c-bar': '#8fc0ff', '--c-bar-hi': '#bcd9ff',
        '--c-line': '#6fb0ff', '--c-line-hi': '#8fc0ff',
        '--c-total': '#a6e3ff', '--c-total-hi': '#cfe9ff'
      },
      star: {
        stars: ['255,255,255', '200,225,255', '175,230,255'],
        glow: ['175,210,255', '200,235,255'],
        meteor: '220,240,255'
      }
    },
    galaxy: {
      vars: {
        '--bg0': '#151039', '--bg1': '#241c55',
        '--card': 'rgba(44,34,96,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(184,167,255,0.16)', '--line-soft': 'rgba(184,167,255,0.1)',
        '--bord': 'rgba(184,167,255,0.18)', '--bord-strong': 'rgba(184,167,255,0.4)',
        '--field-bg': 'rgba(20,14,50,0.7)', '--field-bg-focus': 'rgba(20,14,50,0.9)',
        '--modal-bg': 'rgba(38,30,84,0.95)',
        '--ink': '#f0edff', '--ink-soft': '#b6aede', '--muted': '#7d72ad',
        '--primary': '#6fe3c9', '--primary-deep': '#3ecfa8', '--primary-soft': 'rgba(111,227,201,0.16)',
        '--lav': '#b8a7ff', '--cyan': '#8fe6ff', '--pink': '#ff9ec7',
        '--btn-top': '#8ff0d8', '--btn-bot': '#3ecfa8', '--btn-ink': '#0a2432',
        '--acc-a': '184,167,255', '--acc-b': '143,230,255', '--prim-a': '111,227,201',
        '--halo-a': '240,237,255', '--halo-b': '184,167,255', '--halo-c': '143,230,255',
        '--aurora1': '#6f5bd0', '--aurora2': '#2fa8c9', '--aurora3': '#c75ba6',
        '--focus': 'rgba(143,230,255,0.6)',
        '--c-axis': '#3a3270', '--c-txt': '#9b90cf',
        '--c-bar': '#b8a7ff', '--c-bar-hi': '#8fe6ff',
        '--c-line': '#8fe6ff', '--c-line-hi': '#6fd2f0',
        '--c-total': '#6fe3c9', '--c-total-hi': '#3ecfa8'
      },
      star: {
        stars: ['255,255,255', '184,167,255', '143,230,255', '255,158,199'],
        glow: ['184,167,255', '143,230,255', '255,158,199'],
        meteor: '214,190,255'
      }
    },
    sakura: {
      vars: {
        '--bg0': '#38122a', '--bg1': '#521c3d',
        '--card': 'rgba(94,34,66,0.42)', '--card-soft': 'rgba(255,255,255,0.04)',
        '--line': 'rgba(255,160,200,0.16)', '--line-soft': 'rgba(255,160,200,0.1)',
        '--bord': 'rgba(255,160,200,0.18)', '--bord-strong': 'rgba(255,160,200,0.4)',
        '--field-bg': 'rgba(44,16,32,0.7)', '--field-bg-focus': 'rgba(44,16,32,0.9)',
        '--modal-bg': 'rgba(78,30,56,0.95)',
        '--ink': '#fff1f7', '--ink-soft': '#eab8cd', '--muted': '#a47c8e',
        '--primary': '#ff8fb8', '--primary-deep': '#e05f92', '--primary-soft': 'rgba(255,143,184,0.16)',
        '--lav': '#ffa9c8', '--cyan': '#ffc4dd', '--pink': '#ff9ec7',
        '--btn-top': '#ff9dc2', '--btn-bot': '#e05f92', '--btn-ink': '#3a0f22',
        '--acc-a': '255,170,200', '--acc-b': '255,200,225', '--prim-a': '255,143,184',
        '--halo-a': '255,225,238', '--halo-b': '255,170,200', '--halo-c': '255,190,215',
        '--aurora1': '#8a2f5c', '--aurora2': '#c74a80', '--aurora3': '#5a2450',
        '--focus': 'rgba(255,170,200,0.6)',
        '--c-axis': '#5c2040', '--c-txt': '#b38093',
        '--c-bar': '#ffa9c8', '--c-bar-hi': '#ffd2e4',
        '--c-line': '#ff8fb8', '--c-line-hi': '#ffa9c8',
        '--c-total': '#ffc4dd', '--c-total-hi': '#ffe0ec'
      },
      star: {
        stars: ['255,255,255', '255,210,228', '255,180,210'],
        glow: ['255,195,220', '255,215,232'],
        meteor: '255,225,238'
      }
    },
    abyss: {
      vars: {
        '--bg0': '#0c2430', '--bg1': '#123540',
        '--card': 'rgba(22,58,72,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(90,200,225,0.16)', '--line-soft': 'rgba(90,200,225,0.1)',
        '--bord': 'rgba(100,210,235,0.18)', '--bord-strong': 'rgba(100,210,235,0.4)',
        '--field-bg': 'rgba(10,30,38,0.7)', '--field-bg-focus': 'rgba(10,30,38,0.9)',
        '--modal-bg': 'rgba(20,52,66,0.95)',
        '--ink': '#eefaff', '--ink-soft': '#a8cedb', '--muted': '#6f96a4',
        '--primary': '#3ed3e8', '--primary-deep': '#179db4', '--primary-soft': 'rgba(62,211,232,0.16)',
        '--lav': '#6fdcee', '--cyan': '#a4e9f5', '--pink': '#ff9ec7',
        '--btn-top': '#62e6f5', '--btn-bot': '#179db4', '--btn-ink': '#06303a',
        '--acc-a': '130,230,242', '--acc-b': '170,240,248', '--prim-a': '62,211,232',
        '--halo-a': '220,248,252', '--halo-b': '130,230,242', '--halo-c': '175,238,248',
        '--aurora1': '#0f5c70', '--aurora2': '#179db4', '--aurora3': '#0a3a4a',
        '--focus': 'rgba(130,230,242,0.6)',
        '--c-axis': '#123d4a', '--c-txt': '#7da4b2',
        '--c-bar': '#6fdcee', '--c-bar-hi': '#aef0f7',
        '--c-line': '#3ed3e8', '--c-line-hi': '#6fdcee',
        '--c-total': '#a4e9f5', '--c-total-hi': '#d4f6fb'
      },
      star: {
        stars: ['255,255,255', '185,240,250', '150,225,242'],
        glow: ['160,235,245', '195,245,250'],
        meteor: '215,250,255'
      }
    },
    mist: {
      vars: {
        '--bg0': '#12281f', '--bg1': '#1a362a',
        '--card': 'rgba(34,66,52,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(150,215,180,0.16)', '--line-soft': 'rgba(150,215,180,0.1)',
        '--bord': 'rgba(150,215,180,0.18)', '--bord-strong': 'rgba(150,215,180,0.4)',
        '--field-bg': 'rgba(14,32,24,0.7)', '--field-bg-focus': 'rgba(14,32,24,0.9)',
        '--modal-bg': 'rgba(28,58,44,0.95)',
        '--ink': '#f0fff6', '--ink-soft': '#b3d8c4', '--muted': '#7ba28c',
        '--primary': '#8ee8bf', '--primary-deep': '#57c89a', '--primary-soft': 'rgba(142,232,191,0.16)',
        '--lav': '#a4e6c9', '--cyan': '#c3f2dc', '--pink': '#ffd0a6',
        '--btn-top': '#9df0cb', '--btn-bot': '#57c89a', '--btn-ink': '#06261a',
        '--acc-a': '175,240,215', '--acc-b': '205,248,228', '--prim-a': '142,232,191',
        '--halo-a': '228,250,240', '--halo-b': '175,240,215', '--halo-c': '205,248,228',
        '--aurora1': '#2a7a55', '--aurora2': '#4d9e75', '--aurora3': '#1f5f46',
        '--focus': 'rgba(175,240,215,0.6)',
        '--c-axis': '#16402e', '--c-txt': '#85ab96',
        '--c-bar': '#a4e6c9', '--c-bar-hi': '#d0f5e2',
        '--c-line': '#8ee8bf', '--c-line-hi': '#a4e6c9',
        '--c-total': '#c3f2dc', '--c-total-hi': '#e0f9ec'
      },
      star: {
        stars: ['255,255,255', '200,245,222', '175,235,205'],
        glow: ['185,240,215', '215,250,232'],
        meteor: '230,255,240'
      }
    },
    mono: {
      vars: {
        '--bg0': '#04120a', '--bg1': '#071b10',
        '--card': 'rgba(10,38,22,0.55)', '--card-soft': 'rgba(61,242,106,0.055)',
        '--line': 'rgba(61,242,106,0.2)', '--line-soft': 'rgba(61,242,106,0.1)',
        '--bord': 'rgba(61,242,106,0.3)', '--bord-strong': 'rgba(61,242,106,0.6)',
        '--field-bg': 'rgba(4,20,11,0.85)', '--field-bg-focus': 'rgba(4,20,11,0.95)',
        '--modal-bg': 'rgba(6,26,14,0.97)',
        '--ink': '#c9ffd8', '--ink-soft': '#8fd6a4', '--muted': '#4d8f66',
        '--primary': '#3df26a', '--primary-deep': '#1f9c46', '--primary-soft': 'rgba(61,242,106,0.13)',
        '--lav': '#6bff94', '--cyan': '#9dffbe', '--pink': '#ffcc55',
        '--btn-top': '#3df26a', '--btn-bot': '#16a349', '--btn-ink': '#04180b',
        '--acc-a': '61,242,106', '--acc-b': '154,255,190', '--prim-a': '61,242,106',
        '--halo-a': '200,255,214', '--halo-b': '109,255,148', '--halo-c': '90,220,130',
        '--aurora1': '#0c3d1e', '--aurora2': '#1f7a3d', '--aurora3': '#062814',
        '--focus': 'rgba(61,242,106,0.65)',
        '--c-axis': '#0e3320', '--c-txt': '#5ea877',
        '--c-bar': '#2ecf5e', '--c-bar-hi': '#7dffa3',
        '--c-line': '#3df26a', '--c-line-hi': '#7dffa3',
        '--c-total': '#ffcc55', '--c-total-hi': '#ffe08a',
        '--font-num': '"Cascadia Mono", ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace',
        '--font-body': '"Cascadia Mono", ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace',
        '--font-serif': '"Cascadia Mono", ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace'
      },
      star: {
        stars: ['61,242,106', '154,255,190', '255,204,85'],
        glow: ['61,242,106', '154,255,190'],
        meteor: '255,204,85'
      }
    },
    cyberpunk: {
      vars: {
        '--bg0': '#0a0016', '--bg1': '#1a0338',
        '--card': 'rgba(38,8,70,0.45)', '--card-soft': 'rgba(255,255,255,0.04)',
        '--line': 'rgba(255,45,149,0.16)', '--line-soft': 'rgba(255,45,149,0.1)',
        '--bord': 'rgba(0,240,255,0.2)', '--bord-strong': 'rgba(0,240,255,0.45)',
        '--field-bg': 'rgba(12,2,30,0.72)', '--field-bg-focus': 'rgba(12,2,30,0.92)',
        '--modal-bg': 'rgba(24,4,48,0.96)',
        '--ink': '#f2f4ff', '--ink-soft': '#bcb4da', '--muted': '#7f6ea8',
        '--primary': '#00f0ff', '--primary-deep': '#00a8d6', '--primary-soft': 'rgba(0,240,255,0.14)',
        '--lav': '#c96bff', '--cyan': '#00f0ff', '--pink': '#ff2d95',
        '--btn-top': '#ff2d95', '--btn-bot': '#7a1fd0', '--btn-ink': '#2a0020',
        '--acc-a': '255,45,149', '--acc-b': '0,240,255', '--prim-a': '0,240,255',
        '--halo-a': '255,220,242', '--halo-b': '255,45,149', '--halo-c': '0,240,255',
        '--aurora1': '#5a0aa8', '--aurora2': '#c90075', '--aurora3': '#2a3a8a',
        '--focus': 'rgba(0,240,255,0.6)',
        '--c-axis': '#2a0a4a', '--c-txt': '#8d6fb8',
        '--c-bar': '#ff2d95', '--c-bar-hi': '#ff8ac2',
        '--c-line': '#00f0ff', '--c-line-hi': '#7df6ff',
        '--c-total': '#ff2d95', '--c-total-hi': '#ffd166',
        '--font-num': '"Cascadia Mono", ui-monospace, "Cascadia Mono", Menlo, Consolas, monospace'
      },
      star: {
        stars: ['255,255,255', '0,240,255', '255,45,149'],
        glow: ['0,240,255', '255,45,149'],
        meteor: '255,224,64'
      }
    },
    lotus: {
      vars: {
        '--bg0': '#0c2626', '--bg1': '#143b3c',
        '--card': 'rgba(28,66,70,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(150,215,195,0.16)', '--line-soft': 'rgba(150,215,195,0.1)',
        '--bord': 'rgba(165,220,205,0.18)', '--bord-strong': 'rgba(165,220,205,0.4)',
        '--field-bg': 'rgba(10,36,38,0.7)', '--field-bg-focus': 'rgba(10,36,38,0.9)',
        '--modal-bg': 'rgba(22,54,56,0.95)',
        '--ink': '#effbf7', '--ink-soft': '#b9d8d0', '--muted': '#7fa39b',
        '--primary': '#7fd8c0', '--primary-deep': '#4cb8a0', '--primary-soft': 'rgba(127,216,192,0.16)',
        '--lav': '#c9a8e8', '--cyan': '#a9e6da', '--pink': '#f2a7c3',
        '--btn-top': '#8fe6cd', '--btn-bot': '#4cb8a0', '--btn-ink': '#06231f',
        '--acc-a': '168,208,255', '--acc-b': '196,190,255', '--prim-a': '127,216,192',
        '--halo-a': '232,248,242', '--halo-b': '168,208,255', '--halo-c': '255,205,222',
        '--aurora1': '#2a7a6a', '--aurora2': '#3f9c86', '--aurora3': '#1f5f58',
        '--focus': 'rgba(168,208,255,0.6)',
        '--c-axis': '#14423e', '--c-txt': '#8db0a8',
        '--c-bar': '#a9e6da', '--c-bar-hi': '#f2b6cd',
        '--c-line': '#7fd8c0', '--c-line-hi': '#a9e6da',
        '--c-total': '#f2a7c3', '--c-total-hi': '#ffd2e2',
        '--font-serif': '"Noto Serif SC", "Songti SC", STSong, "SimSun", serif'
      },
      star: {
        stars: ['255,255,255', '168,208,255', '255,205,222', '196,190,255'],
        glow: ['168,208,255', '196,190,255', '255,205,222'],
        meteor: '216,235,255'
      }
    },
    rose: {
      vars: {
        '--bg0': '#2a0e1a', '--bg1': '#3e1628',
        '--card': 'rgba(74,28,48,0.42)', '--card-soft': 'rgba(255,255,255,0.045)',
        '--line': 'rgba(255,140,170,0.16)', '--line-soft': 'rgba(255,140,170,0.1)',
        '--bord': 'rgba(255,150,180,0.18)', '--bord-strong': 'rgba(255,150,180,0.4)',
        '--field-bg': 'rgba(30,12,22,0.7)', '--field-bg-focus': 'rgba(30,12,22,0.9)',
        '--modal-bg': 'rgba(58,24,40,0.95)',
        '--ink': '#fff2f5', '--ink-soft': '#e7bccb', '--muted': '#a87e8e',
        '--primary': '#ff7fa3', '--primary-deep': '#e64f78', '--primary-soft': 'rgba(255,127,163,0.16)',
        '--stop': '#ff7d9d', '--stop-deep': '#f55c84', '--stop-soft': 'rgba(255,125,157,0.16)',
        '--lav': '#ffb0c8', '--cyan': '#9fe6c0', '--pink': '#ff9ec7',
        '--btn-top': '#ff8fb0', '--btn-bot': '#e64f78', '--btn-ink': '#3a0f1d',
        '--acc-a': '255,140,170', '--acc-b': '255,190,210', '--prim-a': '255,127,163',
        '--halo-a': '255,230,238', '--halo-b': '255,140,170', '--halo-c': '255,190,210',
        '--aurora1': '#5a1f3a', '--aurora2': '#8a2f5c', '--aurora3': '#3f5a3a',
        '--focus': 'rgba(255,140,170,0.6)',
        '--c-axis': '#4a2034', '--c-txt': '#b38093',
        '--c-bar': '#ff9ebc', '--c-bar-hi': '#ffd0e0',
        '--c-line': '#ff7fa3', '--c-line-hi': '#ffb0c8',
        '--c-total': '#9fe6c0', '--c-total-hi': '#cdf3da',
        '--font-serif': '"Noto Serif SC", "Songti SC", STSong, "SimSun", serif'
      },
      star: {
        stars: ['255,255,255', '255,170,200', '255,205,222', '159,230,192'],
        glow: ['255,195,220', '255,215,232', '159,230,192'],
        meteor: '255,225,238'
      }
    }
  };

  var SCENES = {
    emerald: {
      back: 'none',
      meteors: false,
      species: { firefly: 26, star: 40 },
      colors: { a: '150,240,200', b: '180,255,220' }
    },
    coral: {
      back: 'sun',
      meteors: false,
      species: { ember: 44, star: 30 },
      colors: { a: '255,170,130', b: '255,205,150' }
    },
    amber: {
      back: 'candle',
      meteors: false,
      species: { dust: 36, star: 24 },
      colors: { a: '255,205,130', b: '255,190,90' }
    },
    arctic: {
      back: 'aurora',
      meteors: false,
      species: { snow: 70, star: 16 },
      colors: { a: '150,195,255', b: '175,225,255', c: '130,220,180' }
    },
    galaxy: {
      back: 'nebula',
      meteors: true,
      species: { star: 120, dust: 22 },
      colors: { a: '184,167,255', b: '143,230,255', c: '255,158,199' }
    },
    sakura: {
      back: 'moon',
      meteors: false,
      species: { petal: 26, star: 20 },
      colors: { a: '255,170,200', b: '255,200,225' }
    },
    abyss: {
      back: 'rays',
      meteors: false,
      species: { bubble: 26, star: 14 },
      colors: { a: '130,230,242', b: '170,240,248' }
    },
    mist: {
      back: 'fog',
      meteors: false,
      species: { fog: 9, star: 26 },
      colors: { a: '175,240,215', b: '205,248,228' }
    },
    mono: {
      back: 'grid',
      meteors: false,
      species: { glyph: 44, star: 16 },
      colors: { a: '61,242,106', b: '154,255,190', c: '255,204,85' }
    },
    cyberpunk: {
      back: 'holo',
      meteors: false,
      species: { rain: 90, star: 12 },
      colors: { a: '0,240,255', b: '255,45,149', c: '255,224,64' }
    },
    lotus: {
      back: 'pond',
      meteors: false,
      species: { rain: 70, lotus: 3, pad: 9, ripple: 9 },
      colors: { a: '168,208,255', b: '196,190,255', c: '255,170,205' }
    },
    rose: {
      back: 'garden',
      meteors: false,
      species: { rose: 12, rosepetal: 22, leaf: 10, star: 24 },
      colors: { a: '255,140,170', b: '255,190,210', c: '159,230,192' }
    }
  };

  var starScene = SCENES.galaxy;
  var starCtrl = null;

  var MODE_LABELS = { day: '按日 · 近14天', week: '按周 · 近12周', month: '按月 · 近6月' };
  var THEME_COST = 3;

  /* ---------------- 更新检查 ---------------- */
  var APP_VERSION = '';
  var UPDATE_API = 'https://api.github.com/repos/cheudv/Timer/releases/latest';
  var UPDATE_URL = 'https://github.com/cheudv/Timer/releases';

  function ensureVersion() {
    return fetch('/api/version', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (d && d.version) APP_VERSION = String(d.version);
        return APP_VERSION;
      })
      .catch(function () { return APP_VERSION; });
  }

  function openExternal(url) {
    if (typeof window.shiluOpenUrl === 'function') window.shiluOpenUrl(url);
    else window.open(url, '_blank');
  }

  function cmpVers(a, b) {
    var pa = String(a || '').replace(/^v/i, '').split('.');
    var pb = String(b || '').replace(/^v/i, '').split('.');
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var x = parseInt(pa[i] || '0', 10) || 0;
      var y = parseInt(pb[i] || '0', 10) || 0;
      if (x !== y) return x - y;
    }
    return 0;
  }

  function checkForUpdate(silent) {
    var btn = $('#btn-check-update');
    if (btn) { btn.disabled = true; btn.textContent = '检查中…'; }
    var ctrl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    ensureVersion().then(function () {
      if (!APP_VERSION) {
        if (!silent) toast('无法获取本地版本号，已跳过检查', true);
        clearTimeout(timer);
        if (btn) { btn.disabled = false; btn.textContent = '检查更新'; }
        return;
      }
      fetch(UPDATE_API, { cache: 'no-store', signal: ctrl && ctrl.signal })
        .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)); })
        .then(function (d) {
          var remote = d.tag_name || '';
          if (cmpVers(remote, APP_VERSION) > 0) {
            if (askConfirm('发现新版本 ' + remote + '，是否前往下载？')) openExternal(UPDATE_URL);
          } else if (!silent) {
            toast('已是最新版本');
          }
        })
        .catch(function () {
          if (!silent) toast('连接失败，无法检查更新', true);
        })
        .then(function () {
          clearTimeout(timer);
          if (btn) { btn.disabled = false; btn.textContent = '检查更新'; }
        });
    });
  }

  // 限定主题注册表（商城数据驱动，新增主题只需在此登记）。
  // 新增一个限定主题的完整步骤：
  //   1. THEMES 中添加同名 key（CSS 变量 + star 配色）；
  //   2.（可选）SCENES 中添加场景，不添加则回退到 galaxy；
  //   3. 在 style.css 中添加 html.theme-<key> 全量样式块；
  //   4. 在本注册表中登记 name/desc/cost/accent。
  var LIMITED_THEMES = {
    mono: {
      name: 'CRT 终端',
      desc: '复古磷光绿屏终端：扫描线、代码字符与闪烁光标，所有元素全新换装。',
      cost: THEME_COST,
      accent: '#3df26a'
    },
    cyberpunk: {
      name: '赛博霓虹',
      desc: '数字雨倾泻的赛博之夜：全息网格、霓虹品红与青色数据流在代码中流动。',
      cost: THEME_COST,
      accent: '#ff2d95'
    },
    lotus: {
      name: '烟雨荷塘',
      desc: '烟雨荷塘：绵绵细雨敲开水面的涟漪，荷花在碧波间摇曳，禅意与宁静交织。',
      cost: THEME_COST,
      accent: '#f2a7c3'
    },
    rose: {
      name: '玫瑰花丛',
      desc: '暮色玫瑰花丛：层叠盛放的玫瑰在微风里轻摇，花瓣与绿叶缓缓飘落，浪漫与温柔交织。',
      cost: THEME_COST,
      accent: '#ff7fa3'
    }
  };

  var state = {
    boards: [],
    records: [],
    ui: { lastBoard: null, lastView: 'timer', running: null },
    modes: { single: 'day', weekavg: 'week' },
    themeUnlocks: {},
    loaded: false
  };

  var saveTimer = null;
  var rafId = null;

  /* ---------------- 存储 ---------------- */
  function loadStore() {
    if (location.protocol === 'file:') {
      $('#server-banner').classList.remove('hidden');
      return;
    }
    fetch('/api/store', { cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        state.boards = d.boards || [];
        state.records = d.records || [];
        state.ui = Object.assign({ lastBoard: null, lastView: 'timer', running: null }, d.ui || {});
        state.themeUnlocks = d.themeUnlocks || {};
        state.loaded = true;
        init();
      })
      .catch(function (e) {
        $('#server-banner').classList.remove('hidden');
        toast('数据加载失败：' + e.message, true);
      });
  }

  function save(immediate) {
    if (!state.loaded) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(doSave, immediate ? 0 : 300);
  }

  function doSave() {
    fetch('/api/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ boards: state.boards, records: state.records, ui: state.ui, themeUnlocks: state.themeUnlocks })
    }).catch(function (e) { toast('保存失败：' + e.message, true); });
  }

  /* ---------------- 工具 ---------------- */
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function askConfirm(msg) {
    if (typeof window.shiluConfirm === 'function') return window.shiluConfirm(msg);
    return window.confirm(msg);
  }

  function fmtClock(ms) {
    var s = Math.floor(ms / 1000);
    var hh = String(Math.floor(s / 3600)).padStart(2, '0');
    var mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    var ss = String(s % 60).padStart(2, '0');
    return hh + ':' + mm + ':' + ss;
  }

  function fmtDur(ms) {
    if (!ms || ms <= 0) return '0分钟';
    var s = Math.round(ms / 1000);
    var sec = s % 60;
    var m = Math.floor(s / 60);
    var min = m % 60;
    var h = Math.floor(m / 60);
    var parts = [];
    if (h) parts.push(h + '小时');
    if (m) parts.push(min + '分');
    if (sec) parts.push(sec + '秒');
    return parts.length ? parts.join('') : '1秒';
  }

  function fmtClockHMS(ts) {
    var d = new Date(ts);
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function dateKey(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function dayStart(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function startOfWeek(d) {
    var x = new Date(d);
    x.setDate(x.getDate() - (x.getDay() + 6) % 7);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  function lastDaysArr(n) {
    var out = [], now = new Date();
    for (var i = n - 1; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      out.push({ ts: d.getTime(), key: dateKey(d), label: (d.getMonth() + 1) + '/' + d.getDate() });
    }
    return out;
  }

  function lastWeeksArr(n) {
    var out = [], cur = startOfWeek(new Date());
    for (var i = n - 1; i >= 0; i--) {
      var w = new Date(cur);
      w.setDate(w.getDate() - 7 * i);
      out.push({ ts: w.getTime(), m: w.getMonth() + 1, d: w.getDate(), isThis: i === 0 });
    }
    return out;
  }

  function lastMonthsArr(n) {
    var out = [], now = new Date();
    for (var i = n - 1; i >= 0; i--) {
      var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({
        ts: d.getTime(),
        end: new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime(),
        label: (d.getMonth() + 1) + '月',
        isThis: i === 0
      });
    }
    return out;
  }

  function boardById(id) {
    for (var i = 0; i < state.boards.length; i++) if (state.boards[i].id === id) return state.boards[i];
    return null;
  }

  function activeBoard() {
    return boardById(state.ui.lastBoard) || state.boards[0] || null;
  }

  /* ---------------- 积分与打卡 ---------------- */
  function checkinDates(boardId) {
    var set = {}, out = [];
    for (var i = 0; i < state.records.length; i++) {
      var r = state.records[i];
      if (r.boardId !== boardId) continue;
      var k = dateKey(new Date(r.start));
      if (!set[k]) { set[k] = 1; out.push(k); }
    }
    return out.sort();
  }

  function redeemedCost(boardId) {
    var u = state.themeUnlocks[boardId];
    var sum = 0;
    if (u) {
      for (var k in u) sum += (LIMITED_THEMES[k] && LIMITED_THEMES[k].cost) || THEME_COST;
    }
    return sum;
  }

  function pointsFor(boardId) {
    return Math.max(0, checkinDates(boardId).length - redeemedCost(boardId));
  }

  function totalPoints() {
    var t = 0;
    for (var i = 0; i < state.boards.length; i++) t += pointsFor(state.boards[i].id);
    return t;
  }

  function renderPointsBadge() {
    var b = activeBoard();
    var n = b ? pointsFor(b.id) : 0;
    var badge = $('#points-badge');
    if (badge) badge.textContent = String(n);
    var btn = $('#btn-points');
    if (btn) btn.classList.toggle('has-pts', n > 0);
  }

  /* ---------------- 计时器 ---------------- */
  function toggleTimer() {
    if (themePreview) {
      toast('预览模式下无法计时，请先退出预览', true);
      return;
    }
    if (state.ui.running) {
      stopTimer();
    } else {
      var b = activeBoard();
      if (!b) { openAddModal(); return; }
      state.ui.running = { boardId: b.id, start: Date.now() };
      save(true);
      renderTimer();
      tick();
    }
  }

  function stopTimer() {
    var r = state.ui.running;
    if (!r) return;
    var end = Date.now();
    state.records.push({ id: uid(), boardId: r.boardId, start: r.start, end: end, dur: end - r.start });
    state.ui.running = null;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    save(true);
    renderTimer();
    renderSessions();
    renderPointsBadge();
    toast('已保存');
  }

  function updateStartIcon(running) {
    var svg = $('#btn-icon');
    if (!svg) return;
    svg.innerHTML = running
      ? '<rect x="6.5" y="6.5" width="11" height="11" rx="2.4"/>'
      : '<path d="M8 5.5v13a1 1 0 0 0 1.53.85l11-6.5a1 1 0 0 0 0-1.7l-11-6.5A1 1 0 0 0 8 5.5z"/>';
  }

  /* ---------------- 主题粒子场景 ---------------- */
  function initStars() {
    var c = document.getElementById('stars');
    if (!c || !c.getContext) return;
    var ctx = c.getContext('2d');
    var W, H, dpr;
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var particles = [];
    var lastMeteor = 0;
    var animRaf = null;
    var animPaused = false;
    var pauseAt = 0;
    var pauseAccum = 0;
    var lastDraw = 0;

    function animTime() {
      return performance.now() - pauseAccum;
    }

    function pauseAnim() {
      if (animPaused || reduced) return;
      animPaused = true;
      pauseAt = performance.now();
      if (animRaf) { cancelAnimationFrame(animRaf); animRaf = null; }
    }

    function resumeAnim() {
      if (!animPaused) return;
      animPaused = false;
      pauseAccum += performance.now() - pauseAt;
      if (!reduced) animRaf = requestAnimationFrame(frame);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      c.style.width = W + 'px';
      c.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function pick(arr) { return arr[(Math.random() * arr.length) | 0]; }

    function makeParticle(type) {
      var s = starScene;
      var p = {
        type: type, x: Math.random() * W, y: Math.random() * H,
        r: 1, vx: 0, vy: 0, base: 0.5, amp: 0.35, speed: 1,
        phase: Math.random() * 6.28, drift: 0, sway: 0, rot: Math.random() * 6.28, vrot: 0,
        color: '255,255,255'
      };
      if (type === 'star') {
        p.r = Math.random() < 0.85 ? Math.random() * 1.1 + 0.3 : Math.random() * 1.7 + 1.4;
        p.base = Math.random() * 0.5 + 0.35;
        p.amp = Math.random() * 0.45;
        p.speed = Math.random() * 1.6 + 0.4;
        p.drift = Math.random() * 0.08 + 0.02;
        p.color = Math.random() < 0.45 ? '255,255,255' : pick([s.colors.a, s.colors.b, s.colors.c].filter(Boolean));
      } else if (type === 'firefly') {
        p.r = Math.random() * 1.4 + 1.2;
        p.base = 0.55; p.amp = 0.4; p.speed = Math.random() * 2 + 1.5;
        p.vx = (Math.random() - 0.5) * 0.3; p.vy = (Math.random() - 0.5) * 0.3;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'ember') {
        p.r = Math.random() * 1.2 + 0.8;
        p.vy = -(Math.random() * 0.5 + 0.35);
        p.sway = Math.random() * 1.2 + 0.6;
        p.base = 0.5; p.amp = 0.35; p.speed = Math.random() * 1.5 + 0.8;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'snow') {
        p.r = Math.random() * 1.6 + 0.6;
        p.vy = Math.random() * 0.4 + 0.2;
        p.sway = Math.random() * 0.6 + 0.2;
        p.color = '255,255,255';
      } else if (type === 'petal') {
        p.r = Math.random() * 3 + 2;
        p.vy = Math.random() * 0.5 + 0.35;
        p.sway = Math.random() * 0.9 + 0.4;
        p.vrot = (Math.random() - 0.5) * 0.03;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'bubble') {
        p.r = Math.random() * 4 + 2;
        p.vy = -(Math.random() * 0.5 + 0.3);
        p.sway = Math.random() * 0.5 + 0.2;
        p.base = Math.random() * 0.3 + 0.2;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'fog') {
        p.r = Math.random() * 120 + 90;
        p.vx = Math.random() * 0.25 + 0.08;
        p.base = Math.random() * 0.05 + 0.03;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'dust') {
        p.r = Math.random() * 1.6 + 0.8;
        p.vy = -(Math.random() * 0.25 + 0.12);
        p.sway = Math.random() * 0.5 + 0.2;
        p.base = Math.random() * 0.3 + 0.3;
        p.amp = Math.random() * 0.3;
        p.speed = Math.random() * 1.5 + 0.6;
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'glyph') {
        p.r = Math.random() * 1.1 + 0.7;
        p.vy = -(Math.random() * 0.35 + 0.18);
        p.sway = Math.random() * 0.6 + 0.25;
        p.base = Math.random() * 0.25 + 0.3;
        p.amp = Math.random() * 0.25;
        p.speed = Math.random() * 1.4 + 0.6;
        p.char = pick('0123456789ABCDEF#$%&*+=/|;:<>[]{}█_>'.split(''));
        p.size = Math.random() * 9 + 10;
        p.color = Math.random() < 0.25 ? s.colors.c : pick([s.colors.a, s.colors.b]);
      } else if (type === 'rain') {
        p.rect = s.back === 'holo';
        p.size = p.rect ? (Math.random() * 4 + 2) : (Math.random() * 1.6 + 0.7);
        p.vy = Math.random() * 2.4 + 0.9;
        p.x = Math.random() * W;
        p.y = -p.size * 2 - Math.random() * H;
        p.base = Math.random() * 0.3 + 0.5;
        p.amp = Math.random() * 0.22;
        p.speed = Math.random() * 1.6 + 0.5;
        p.phase = Math.random() * 6.28;
        p.color = Math.random() < 0.2 ? s.colors.b : (Math.random() < 0.1 ? s.colors.c : s.colors.a);
        p.lead = Math.random() < 0.12;
      } else if (type === 'lotus') {
        p.r = Math.random() * 15 + 13;
        p.x = Math.random() * W;
        p.y = H * (0.62 + Math.random() * 0.34);
        p.vx = (Math.random() - 0.5) * 0.18;
        p.sway = Math.random() * 0.9 + 0.5;
        p.base = Math.random() * 0.18 + 0.5;
        p.amp = Math.random() * 0.12;
        p.speed = Math.random() * 1.2 + 0.6;
        p.phase = Math.random() * 6.28;
        p.rot = Math.random() * 0.5 - 0.25;
        p.baseRot = p.rot;
        p.blue = Math.random() < 0.5;
      } else if (type === 'pad') {
        p.r = Math.random() * 15 + 13;
        p.x = Math.random() * W;
        p.y = H * (0.62 + Math.random() * 0.34);
        p.vx = (Math.random() - 0.5) * 0.18;
        p.sway = Math.random() * 0.9 + 0.5;
        p.base = Math.random() * 0.18 + 0.5;
        p.amp = Math.random() * 0.12;
        p.speed = Math.random() * 1.2 + 0.6;
        p.phase = Math.random() * 6.28;
        p.rot = Math.random() * 0.5 - 0.25;
        p.baseRot = p.rot;
        p.g = Math.random() < 0.5 ? '74,150,110' : '90,168,120';
      } else if (type === 'ripple') {
        p.r = 4;
        p.base = Math.random() * 0.4 + 0.3;
        p.phase = Math.random() * 6.28;
        p.sway = Math.random() * 0.5 + 0.8;
        p.x = Math.random() * W;
        p.y = H * (0.7 + Math.random() * 0.28);
        p.color = pick([s.colors.a, s.colors.b]);
      } else if (type === 'rose') {
        p.r = Math.random() * 14 + 18;
        p.x = Math.random() * W;
        p.y = H * (0.56 + Math.random() * 0.4);
        p.vx = (Math.random() - 0.5) * 0.16;
        p.sway = Math.random() * 0.8 + 0.4;
        p.base = Math.random() * 0.16 + 0.62;
        p.amp = Math.random() * 0.1;
        p.speed = Math.random() * 1.1 + 0.6;
        p.phase = Math.random() * 6.28;
        p.rot = Math.random() * 6.28;
        p.baseRot = p.rot;
        p.red = Math.random() < 0.42;
        p.layers = 4;
      } else if (type === 'rosepetal') {
        p.r = Math.random() * 3.4 + 2.6;
        p.x = Math.random() * W;
        p.y = -p.r * 2 - Math.random() * H;
        p.vy = Math.random() * 0.55 + 0.4;
        p.sway = Math.random() * 0.9 + 0.45;
        p.vrot = (Math.random() - 0.5) * 0.04;
        p.base = Math.random() * 0.2 + 0.6;
        p.amp = Math.random() * 0.18;
        p.speed = Math.random() * 1.4 + 0.7;
        p.phase = Math.random() * 6.28;
        p.rot = Math.random() * 6.28;
        p.color = Math.random() < 0.3 ? s.colors.b : pick([s.colors.a, s.colors.b]);
      } else if (type === 'leaf') {
        p.r = Math.random() * 5 + 4;
        p.x = Math.random() * W;
        p.y = Math.random() * H;
        p.vx = (Math.random() - 0.5) * 0.5 - 0.15;
        p.vy = Math.random() * 0.35 + 0.18;
        p.sway = Math.random() * 0.7 + 0.35;
        p.vrot = (Math.random() - 0.5) * 0.03;
        p.base = Math.random() * 0.2 + 0.4;
        p.amp = Math.random() * 0.2;
        p.speed = Math.random() * 1.3 + 0.6;
        p.phase = Math.random() * 6.28;
        p.rot = Math.random() * 6.28;
        p.g = Math.random() < 0.5 ? '120,186,134' : '96,168,118';
      }
      return p;
    }

    function particleRatio() {
      var f = state.ui.particleFps || 60;
      if (f <= 15) return 0.5;
      if (f <= 30) return 0.75;
      return 1;
    }

    function build() {
      particles = [];
      var spec = starScene.species;
      var ratio = particleRatio();
      for (var type in spec) {
        var n = Math.max(1, Math.round(spec[type] * ratio));
        for (var i = 0; i < n; i++) particles.push(makeParticle(type));
      }
    }

    function dot(x, y, r, rgb, a) {
      ctx.fillStyle = 'rgba(' + rgb + ',' + a + ')';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    }

    function glow(x, y, r, rgb, a) {
      var g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(' + rgb + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + rgb + ',0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    }

    function updateParticle(p, t) {
      var s = starScene;
      if (p.type === 'star') {
        p.x += p.drift;
        if (p.x > W + 2) p.x = -2;
      } else if (p.type === 'firefly') {
        p.vx += (Math.random() - 0.5) * 0.06;
        p.vy += (Math.random() - 0.5) * 0.06;
        var sp = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (sp > 0.5) { p.vx *= 0.5 / sp; p.vy *= 0.5 / sp; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      } else if (p.type === 'ember') {
        p.y += p.vy;
        p.x += Math.sin(t / 700 + p.phase) * p.sway * 0.15;
        if (p.y < -20) { p.x = Math.random() * W; p.y = H + 20; }
      } else if (p.type === 'snow') {
        p.y += p.vy;
        p.x += Math.sin(t / 900 + p.phase) * p.sway;
        if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
      } else if (p.type === 'petal') {
        p.y += p.vy;
        p.x += Math.sin(t / 800 + p.phase) * p.sway;
        p.rot += p.vrot;
        if (p.y > H + 12) { p.y = -12; p.x = Math.random() * W; p.rot = Math.random() * 6.28; }
      } else if (p.type === 'bubble') {
        p.y += p.vy;
        p.x += Math.sin(t / 600 + p.phase) * p.sway;
        if (p.y < -20) { p.x = Math.random() * W; p.y = H + 20; }
      } else if (p.type === 'fog') {
        p.x += p.vx;
        if (p.x - p.r > W) p.x = -p.r;
        if (p.x + p.r < 0) p.x = W + p.r;
      } else if (p.type === 'dust') {
        p.y += p.vy;
        p.x += Math.sin(t / 900 + p.phase) * p.sway * 0.3;
        if (p.y < -20) { p.x = Math.random() * W; p.y = H + 20; }
      } else if (p.type === 'glyph') {
        p.y += p.vy;
        p.x += Math.sin(t / 700 + p.phase) * p.sway * 0.25;
        if (p.y < -24) { p.x = Math.random() * W; p.y = H + 24; }
      } else if (p.type === 'rain') {
        p.y += p.vy;
        if (p.y > H + p.size * 2) { p.x = Math.random() * W; p.y = -p.size * 2 - Math.random() * H; }
      } else if (p.type === 'lotus') {
        p.x += p.vx;
        p.y += Math.sin(t / 2600 + p.phase) * 0.18;
        p.rot = p.baseRot + Math.sin(t / 5200 + p.phase) * 0.05;
        if (p.x < -p.r * 2) { p.x = W + p.r * 2; p.y = H * (0.62 + Math.random() * 0.34); }
        if (p.x > W + p.r * 2) { p.x = -p.r * 2; p.y = H * (0.62 + Math.random() * 0.34); }
      } else if (p.type === 'pad') {
        p.x += p.vx;
        p.y += Math.sin(t / 2600 + p.phase) * 0.18;
        p.rot = p.baseRot + Math.sin(t / 5200 + p.phase) * 0.05;
        if (p.x < -p.r * 2) { p.x = W + p.r * 2; p.y = H * (0.62 + Math.random() * 0.34); }
        if (p.x > W + p.r * 2) { p.x = -p.r * 2; p.y = H * (0.62 + Math.random() * 0.34); }
      } else if (p.type === 'ripple') {
        p.r += p.sway;
        if (p.r > 92) { p.r = 4; p.x = Math.random() * W; p.y = H * (0.7 + Math.random() * 0.28); p.phase = Math.random() * 6.28; }
      } else if (p.type === 'rose') {
        p.x += p.vx;
        p.y += Math.sin(t / 2600 + p.phase) * 0.16;
        p.rot = p.baseRot + Math.sin(t / 5200 + p.phase) * 0.05;
        if (p.x < -p.r * 2) { p.x = W + p.r * 2; p.y = H * (0.56 + Math.random() * 0.4); }
        if (p.x > W + p.r * 2) { p.x = -p.r * 2; p.y = H * (0.56 + Math.random() * 0.4); }
      } else if (p.type === 'rosepetal') {
        p.y += p.vy;
        p.x += Math.sin(t / 800 + p.phase) * p.sway;
        p.rot += p.vrot;
        if (p.y > H + 14) { p.y = -14; p.x = Math.random() * W; p.rot = Math.random() * 6.28; }
      } else if (p.type === 'leaf') {
        p.x += p.vx;
        p.y += p.vy;
        p.x += Math.sin(t / 900 + p.phase) * p.sway * 0.3;
        p.rot += p.vrot;
        if (p.y > H + 14) { p.y = -14; p.x = Math.random() * W; }
        if (p.x < -14) { p.x = W + 14; }
        if (p.x > W + 14) { p.x = -14; }
      }
    }

    function drawParticle(p, t) {
      var o;
      if (p.type === 'star') {
        o = Math.max(0.05, Math.min(1, p.base + p.amp * Math.sin(t / 1000 * p.speed + p.phase)));
        if (p.r > 1.4) glow(p.x, p.y, p.r * 4, p.color, o * 0.45);
        dot(p.x, p.y, p.r, p.color, o);
      } else if (p.type === 'firefly') {
        o = Math.max(0.25, Math.min(1, p.base + p.amp * Math.sin(t / 900 * p.speed + p.phase)));
        glow(p.x, p.y, p.r * 6, p.color, o * 0.5);
        dot(p.x, p.y, p.r * 1.3, '255,255,255', o);
      } else if (p.type === 'ember') {
        o = Math.max(0.2, p.base + p.amp * Math.sin(t / 800 * p.speed + p.phase));
        glow(p.x, p.y, p.r * 3.2, p.color, o * 0.5);
        dot(p.x, p.y, p.r, p.color, o);
      } else if (p.type === 'snow') {
        dot(p.x, p.y, p.r, p.color, 0.8);
      } else if (p.type === 'petal') {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = 'rgba(' + p.color + ',0.85)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.55, 0, 0, 7);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'bubble') {
        ctx.strokeStyle = 'rgba(' + p.color + ',' + (p.base + 0.1) + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 7);
        ctx.stroke();
        ctx.fillStyle = 'rgba(' + p.color + ',0.25)';
        ctx.beginPath();
        ctx.arc(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.18, 0, 7);
        ctx.fill();
      } else if (p.type === 'fog') {
        var a = p.base * (0.7 + 0.3 * Math.sin(t / 6000 + p.phase));
        glow(p.x, p.y, p.r, p.color, a);
      } else if (p.type === 'dust') {
        o = Math.max(0.1, p.base + p.amp * Math.sin(t / 1000 * p.speed + p.phase));
        glow(p.x, p.y, p.r * 3, p.color, o * 0.45);
        dot(p.x, p.y, p.r, p.color, o);
      } else if (p.type === 'glyph') {
        o = Math.max(0.08, p.base + p.amp * Math.sin(t / 900 * p.speed + p.phase));
        glow(p.x, p.y, p.size * 1.5, p.color, o * 0.16);
        ctx.font = 'bold ' + p.size + 'px "Cascadia Mono", ui-monospace, monospace';
        ctx.fillStyle = 'rgba(' + p.color + ',' + o + ')';
        ctx.fillText(p.char, p.x, p.y);
      } else if (p.type === 'rain') {
        o = Math.max(0.25, p.base + p.amp * Math.sin(t / 900 * p.speed + p.phase));
        var ts = p.size * (p.rect ? 7 : 5);
        var tg = ctx.createLinearGradient(0, p.y - ts, 0, p.y);
        tg.addColorStop(0, 'rgba(' + p.color + ',0)');
        tg.addColorStop(1, 'rgba(' + p.color + ',' + (o * (p.rect ? 0.55 : 0.32)).toFixed(3) + ')');
        ctx.fillStyle = tg;
        if (p.rect) {
          ctx.fillRect(p.x - p.size / 2, p.y - ts, p.size, ts);
        } else {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y - ts / 2, p.size * 0.35, ts / 2, 0, 0, 7);
          ctx.fill();
        }
        if (p.rect) glow(p.x, p.y, p.size * 3.5, p.color, o * 0.5);
        ctx.fillStyle = p.lead ? 'rgba(255,255,255,' + (p.rect ? '0.95' : '0.7') + ')' : 'rgba(' + p.color + ',' + Math.min(1, o * (p.rect ? 1.5 : 1.05)).toFixed(3) + ')';
        if (p.rect) {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.5, p.size * 0.6, 0, 0, 7);
          ctx.fill();
        }
      } else if (p.type === 'lotus') {
        var oo = Math.max(0.35, p.base + p.amp * Math.sin(t / 2200 * p.speed + p.phase));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        var pad = p.r * 1.9;
        ctx.fillStyle = 'rgba(74,150,110,0.55)';
        ctx.beginPath();
        ctx.ellipse(0, p.r * 0.35, pad, pad * 0.4, 0, 0, 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(222,246,228,' + (0.2 * oo).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var v = 0; v < 10; v++) {
          var va = v / 10 * 6.283;
          ctx.moveTo(0, p.r * 0.35);
          ctx.lineTo(Math.cos(va) * pad, p.r * 0.35 + Math.sin(va) * pad * 0.4);
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-pad * 0.5, p.r * 0.35);
        ctx.lineTo(0, p.r * 0.35 - pad * 0.18);
        ctx.lineTo(pad * 0.5, p.r * 0.35);
        ctx.closePath();
        ctx.fill();
        var petal = p.blue ? '255,252,255' : '255,170,205';
        for (var pi = 0; pi < 3; pi++) {
          var pa = -0.8 + pi * 0.8 + Math.sin(t / 900 + p.phase + pi) * 0.04;
          ctx.fillStyle = 'rgba(' + petal + ',' + (0.75 * oo).toFixed(3) + ')';
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r * 0.52, p.r * 0.34, pa, 0, 7);
          ctx.fill();
        }
        ctx.fillStyle = 'rgba(255,235,245,' + oo.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.16, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(245,205,120,' + oo.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.09, 0, 7);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'pad') {
        var oo = Math.max(0.4, p.base + p.amp * Math.sin(t / 2400 * p.speed + p.phase));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        var pad = p.r * 1.9;
        var lg = ctx.createRadialGradient(0, 0, 0, 0, 0, pad);
        lg.addColorStop(0, 'rgba(' + p.g + ',' + (0.6 * oo).toFixed(3) + ')');
        lg.addColorStop(1, 'rgba(46,108,74,' + (0.48 * oo).toFixed(3) + ')');
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.ellipse(0, 0, pad, pad * 0.4, 0, 0, 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(222,246,228,' + (0.32 * oo).toFixed(3) + ')';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var v = 0; v < 12; v++) {
          var va = v / 12 * 6.283;
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(va) * pad, Math.sin(va) * pad * 0.4);
        }
        ctx.stroke();
        ctx.fillStyle = 'rgba(20,70,46,' + (0.55 * oo).toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, pad * 0.09, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(30,90,60,' + (0.5 * oo).toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(-pad * 0.5, 0);
        ctx.lineTo(0, -pad * 0.18);
        ctx.lineTo(pad * 0.5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'ripple') {
        var ra = Math.max(0, 1 - p.r / 92);
        ctx.strokeStyle = 'rgba(' + p.color + ',' + (0.3 * ra).toFixed(3) + ')';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 0.3, 0, 0, 7);
        ctx.stroke();
        if (p.r > 26) {
          ctx.strokeStyle = 'rgba(' + p.color + ',' + (0.16 * ra).toFixed(3) + ')';
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.r * 0.62, p.r * 0.2, 0, 0, 7);
          ctx.stroke();
        }
      } else if (p.type === 'rose') {
        var oo = Math.max(0.45, Math.min(1, p.base + p.amp * Math.sin(t / 2200 * p.speed + p.phase)));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        for (var L = 0; L < p.layers; L++) {
          var lr = p.r * (1 - L * 0.17);
          var petals = 5 + L;
          var shade = p.layers > 1 ? L / (p.layers - 1) : 0;
          var rr = 255;
          var gg = p.red ? (90 + shade * 70) : (130 + shade * 70);
          var bb = p.red ? (120 + shade * 62) : (160 + shade * 55);
          for (var k = 0; k < petals; k++) {
            var ang = (k / petals) * 6.283 + L * 0.5 + Math.sin(t / 1600 + p.phase + L) * 0.015;
            ctx.save();
            ctx.rotate(ang);
            ctx.fillStyle = 'rgba(' + rr + ',' + gg + ',' + bb + ',' + (0.82 * oo).toFixed(3) + ')';
            ctx.beginPath();
            ctx.ellipse(0, -lr * 0.62, lr * 0.36, lr * 0.6, 0, 0, 7);
            ctx.fill();
            ctx.restore();
          }
        }
        ctx.fillStyle = 'rgba(255,236,210,' + oo.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.16, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(245,205,120,' + oo.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.09, 0, 7);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'rosepetal') {
        var o = Math.max(0.35, p.base + p.amp * Math.sin(t / 1000 * p.speed + p.phase));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = 'rgba(' + p.color + ',' + o.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(0, -p.r);
        ctx.quadraticCurveTo(p.r * 0.95, -p.r * 0.1, 0, p.r);
        ctx.quadraticCurveTo(-p.r * 0.95, -p.r * 0.1, 0, -p.r);
        ctx.fill();
        ctx.restore();
      } else if (p.type === 'leaf') {
        var ol = Math.max(0.3, p.base + p.amp * Math.sin(t / 1100 * p.speed + p.phase));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = 'rgba(' + p.g + ',' + (0.72 * ol).toFixed(3) + ')';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.46, 0, 0, 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.22)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-p.r * 0.9, 0);
        ctx.lineTo(p.r * 0.9, 0);
        ctx.stroke();
        ctx.restore();
      }
    }

    function drawScene(t) {
      var s = starScene;
      var i, q, g, r, sx, sy, cx, cy;
      if (s.back === 'nebula') {
        var spots = [
          [W * 0.2, H * 0.28, Math.min(W, H) * 0.4, s.colors.a],
          [W * 0.82, H * 0.6, Math.min(W, H) * 0.34, s.colors.b],
          [W * 0.55, H * 0.88, Math.min(W, H) * 0.3, s.colors.c]
        ];
        for (i = 0; i < 3; i++) {
          q = spots[i];
          sx = q[0] + Math.sin(t / 42000 + i * 2.1) * 70;
          sy = q[1] + Math.cos(t / 52000 + i) * 45;
          g = ctx.createRadialGradient(sx, sy, 0, sx, sy, q[2]);
          g.addColorStop(0, 'rgba(' + q[3] + ',0.14)');
          g.addColorStop(1, 'rgba(' + q[3] + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(sx, sy, q[2], 0, 7);
          ctx.fill();
        }
      } else if (s.back === 'sun') {
        sx = W * 0.5; sy = H * 0.34;
        r = Math.min(W, H) * 0.26 * (1 + 0.04 * Math.sin(t / 2600));
        g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
        g.addColorStop(0, 'rgba(255,214,166,0.5)');
        g.addColorStop(0.5, 'rgba(255,150,90,0.2)');
        g.addColorStop(1, 'rgba(255,120,80,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,236,210,0.42)';
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.2, 0, 7);
        ctx.fill();
      } else if (s.back === 'candle') {
        cx = W * 0.5; cy = H * 0.94;
        r = Math.min(W, H) * 0.55;
        var fl = 1 + 0.06 * Math.sin(t / 320) + 0.045 * Math.sin(t / 720 + 1.3);
        g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, 'rgba(255,196,116,' + (0.2 * fl) + ')');
        g.addColorStop(0.6, 'rgba(255,176,84,' + (0.08 * fl) + ')');
        g.addColorStop(1, 'rgba(255,176,84,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, 7);
        ctx.fill();
      } else if (s.back === 'aurora') {
        for (i = 0; i < 3; i++) {
          var col = [s.colors.a, s.colors.b, s.colors.c][i];
          var ph = t / 3200 + i * 2.1;
          ctx.strokeStyle = 'rgba(' + col + ',0.15)';
          ctx.lineWidth = 26;
          ctx.lineCap = 'round';
          ctx.beginPath();
          for (var x = 0; x <= W; x += 10) {
            var y = H * 0.5 + Math.sin(x * 0.005 + ph) * H * 0.12 + Math.sin(x * 0.014 + ph * 1.7) * H * 0.05;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (s.back === 'rays') {
        for (i = -2; i <= 2; i++) {
          var x0 = W * 0.5 + i * W * 0.18;
          g = ctx.createLinearGradient(x0, 0, x0, H);
          g.addColorStop(0, 'rgba(' + s.colors.a + ',0.11)');
          g.addColorStop(1, 'rgba(' + s.colors.a + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.moveTo(x0 - W * 0.05, 0);
          ctx.lineTo(x0 + W * 0.05, 0);
          ctx.lineTo(x0 + W * 0.11, H);
          ctx.lineTo(x0 - W * 0.11, H);
          ctx.closePath();
          ctx.fill();
        }
      } else if (s.back === 'fog') {
        for (i = 0; i < 2; i++) {
          var fy = H * (0.3 + i * 0.32) + Math.sin(t / 14000 + i) * 26;
          r = Math.min(W, H) * 0.62;
          g = ctx.createRadialGradient(W * 0.5, fy, 0, W * 0.5, fy, r);
          g.addColorStop(0, 'rgba(' + s.colors.a + ',0.1)');
          g.addColorStop(1, 'rgba(' + s.colors.a + ',0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(W * 0.5, fy, r, 0, 7);
          ctx.fill();
        }
      } else if (s.back === 'moon') {
        sx = W * 0.72; sy = H * 0.2;
        r = Math.min(W, H) * 0.13;
        g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 2.4);
        g.addColorStop(0, 'rgba(255,240,246,0.28)');
        g.addColorStop(0.45, 'rgba(255,214,228,0.1)');
        g.addColorStop(1, 'rgba(255,214,228,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 2.4, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,248,250,0.55)';
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, 7);
        ctx.fill();
      } else if (s.back === 'grid') {
        var gstep = Math.max(34, Math.round(W / 18));
        ctx.strokeStyle = 'rgba(' + s.colors.a + ',0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var gx = 0; gx <= W; gx += gstep) { ctx.moveTo(gx + 0.5, 0); ctx.lineTo(gx + 0.5, H); }
        for (var gy = 0; gy <= H; gy += gstep) { ctx.moveTo(0, gy + 0.5); ctx.lineTo(W, gy + 0.5); }
        ctx.stroke();

        var bandY = (t / 95) % (H + 180) - 90;
        var bgrad = ctx.createLinearGradient(0, bandY - 50, 0, bandY + 50);
        bgrad.addColorStop(0, 'rgba(' + s.colors.a + ',0)');
        bgrad.addColorStop(0.5, 'rgba(' + s.colors.a + ',0.055)');
        bgrad.addColorStop(1, 'rgba(' + s.colors.a + ',0)');
        ctx.fillStyle = bgrad;
        ctx.fillRect(0, bandY - 50, W, 100);
      } else if (s.back === 'holo') {
        var horizon = H * 0.78;
        var vanishX = W * 0.5;
        ctx.strokeStyle = 'rgba(' + s.colors.a + ',0.06)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        var hrows = 9;
        for (i = 1; i <= hrows; i++) {
          var hy = horizon + (H - horizon) * Math.pow(i / hrows, 1.7);
          ctx.moveTo(0, hy);
          ctx.lineTo(W, hy);
        }
        var vcols = 14;
        for (i = 0; i <= vcols; i++) {
          var vx = vanishX + (i / vcols - 0.5) * W * 2.4;
          ctx.moveTo(vx, horizon);
          ctx.lineTo(vanishX + (vx - vanishX) * 0.15, H);
        }
        ctx.stroke();
        var hg = ctx.createLinearGradient(0, horizon - 80, 0, horizon + 200);
        hg.addColorStop(0, 'rgba(' + s.colors.b + ',0)');
        hg.addColorStop(0.5, 'rgba(' + s.colors.b + ',0.16)');
        hg.addColorStop(1, 'rgba(' + s.colors.a + ',0.06)');
        ctx.fillStyle = hg;
        ctx.fillRect(0, horizon - 80, W, 280);
        if (Math.sin(t / 7000) > 0.86) {
          ctx.fillStyle = 'rgba(' + (Math.random() < 0.5 ? s.colors.b : s.colors.a) + ',0.08)';
          ctx.fillRect(0, (Math.random() * H) | 0, W, 2 + Math.random() * 40);
        }
      } else if (s.back === 'pond') {
        var wy = H * 0.64;
        var wg = ctx.createLinearGradient(0, wy, 0, H);
        wg.addColorStop(0, 'rgba(' + s.colors.b + ',0)');
        wg.addColorStop(0.22, 'rgba(' + s.colors.b + ',0.09)');
        wg.addColorStop(1, 'rgba(' + s.colors.a + ',0.15)');
        ctx.fillStyle = wg;
        ctx.fillRect(0, wy, W, H - wy);
        ctx.strokeStyle = 'rgba(' + s.colors.a + ',0.12)';
        ctx.lineWidth = 1;
        for (i = 0; i < 5; i++) {
          var ly = wy + (H - wy) * (0.16 + i * 0.18) + Math.sin(t / 5000 + i * 1.7) * 3;
          ctx.beginPath();
          for (var lx = 0; lx <= W; lx += 8) {
            var lwy = ly + Math.sin(lx * 0.02 + t / 2600 + i) * 2.2;
            if (lx === 0) ctx.moveTo(lx, lwy); else ctx.lineTo(lx, lwy);
          }
          ctx.stroke();
        }
        var mrx = Math.min(W, H) * 0.12;
        var mg = ctx.createRadialGradient(W * 0.78, H * 0.28, 0, W * 0.78, H * 0.28, mrx * 2.6);
        mg.addColorStop(0, 'rgba(235,240,255,0.22)');
        mg.addColorStop(0.45, 'rgba(200,210,240,0.08)');
        mg.addColorStop(1, 'rgba(200,210,240,0)');
        ctx.fillStyle = mg;
        ctx.beginPath();
        ctx.arc(W * 0.78, H * 0.28, mrx * 2.6, 0, 7);
        ctx.fill();
        ctx.fillStyle = 'rgba(240,244,255,0.5)';
        ctx.beginPath();
        ctx.arc(W * 0.78, H * 0.28, mrx * 0.62, 0, 7);
        ctx.fill();
      } else if (s.back === 'garden') {
        var gspots = [
          [W * 0.18, H * 0.92, Math.min(W, H) * 0.5, s.colors.a],
          [W * 0.82, H * 0.88, Math.min(W, H) * 0.46, s.colors.b],
          [W * 0.5, H * 0.99, Math.min(W, H) * 0.55, s.colors.c]
        ];
        for (i = 0; i < 3; i++) {
          var gq = gspots[i];
          var gsx = gq[0] + Math.sin(t / 30000 + i * 2) * 40;
          var gsy = gq[1] + Math.cos(t / 36000 + i) * 24;
          var gg2 = ctx.createRadialGradient(gsx, gsy, 0, gsx, gsy, gq[2]);
          gg2.addColorStop(0, 'rgba(' + gq[3] + ',0.12)');
          gg2.addColorStop(1, 'rgba(' + gq[3] + ',0)');
          ctx.fillStyle = gg2;
          ctx.beginPath();
          ctx.arc(gsx, gsy, gq[2], 0, 7);
          ctx.fill();
        }
        var hg2 = ctx.createLinearGradient(0, H, 0, H * 0.78);
        hg2.addColorStop(0, 'rgba(96,168,118,0.1)');
        hg2.addColorStop(1, 'rgba(96,168,118,0)');
        ctx.fillStyle = hg2;
        ctx.fillRect(0, H * 0.78, W, H * 0.22);
      }
    }

    function frame() {
      animRaf = requestAnimationFrame(frame);
      var t = animTime();
      var interval = 1000 / (state.ui.particleFps || 60);
      if (t - lastDraw < interval) return;
      lastDraw = t;
      ctx.clearRect(0, 0, W, H);
      drawScene(t);

      if (starScene.meteors && !reduced && t - lastMeteor > 3000 + Math.random() * 5000 && meteorsLen() < 2) {
        lastMeteor = t;
        particles.push({ type: 'meteor', x: W * 0.15 + Math.random() * W * 0.7, y: Math.random() * H * 0.3, vx: -(2.6 + Math.random() * 2.6), vy: 2.2 + Math.random() * 2.2, life: 1, color: starScene.colors.a });
      }

      for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
        if (p.type === 'meteor') {
          p.x += p.vx; p.y += p.vy; p.life -= 0.013;
          if (p.life <= 0 || p.x < -50 || p.y > H + 50) { particles.splice(i, 1); continue; }
          var grad = ctx.createLinearGradient(p.x, p.y, p.x - p.vx * 9, p.y - p.vy * 9);
          grad.addColorStop(0, 'rgba(' + p.color + ',' + (0.9 * p.life) + ')');
          grad.addColorStop(1, 'rgba(' + p.color + ',0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 9, p.y - p.vy * 9);
          ctx.stroke();
          continue;
        }
        updateParticle(p, t);
        drawParticle(p, t);
      }
    }

    function meteorsLen() {
      var n = 0;
      for (var i = 0; i < particles.length; i++) if (particles[i].type === 'meteor') n++;
      return n;
    }

    resize();
    build();
    window.addEventListener('resize', function () { resize(); build(); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pauseAnim();
      else resumeAnim();
    });
    if (!reduced) animRaf = requestAnimationFrame(frame);

    starCtrl = {
      recolor: function () { build(); }
    };
  }

  function themeKeyFor(board) {
    if (board && board.theme && LIMITED_THEMES[board.theme]) return board.theme;
    var eff = (board && board.color) || state.ui.defaultTheme || null;
    return (eff && COLOR_KEYS[eff]) || 'galaxy';
  }

  function applyThemeKey(key) {
    var T = THEMES[key] || THEMES.galaxy;
    if (!THEMES[key]) key = 'galaxy';
    var el = document.documentElement;
    var keep = [];
    el.classList.forEach(function (c) {
      if (c.indexOf('theme-') !== 0) keep.push(c);
    });
    el.className = 'theme-' + key + (keep.length ? ' ' + keep.join(' ') : '');
    for (var v in T.vars) el.style.setProperty(v, T.vars[v]);
    starScene = SCENES[key] || SCENES.galaxy;
    if (starCtrl) starCtrl.recolor();
  }

  function applyTheme(board) {
    if (themePreview) return;
    applyThemeKey(themeKeyFor(board));
  }

  /* ---------------- 限定主题全局预览 ---------------- */
  var themePreview = null;

  function enterThemePreview(key) {
    if (!LIMITED_THEMES[key]) return;
    if (state.ui.running) {
      toast('计时进行中，请先停止计时再预览', true);
      return;
    }
    themePreview = { key: key };
    applyThemeKey(key);
    closeModals();
    document.documentElement.classList.add('previewing');
    $('#theme-preview-name').textContent = LIMITED_THEMES[key].name;
    $('#theme-preview-bar').classList.remove('hidden');
  }

  function exitThemePreview() {
    if (!themePreview) return;
    themePreview = null;
    document.documentElement.classList.remove('previewing');
    $('#theme-preview-bar').classList.add('hidden');
    applyTheme(activeBoard());
  }

  var lastTick = 0;
  function tick() {
    var r = state.ui.running;
    if (!r) { rafId = null; return; }
    var now = Date.now();
    if (now - lastTick >= 1000) {
      lastTick = now;
      $('#time-display').textContent = fmtClock(now - r.start);
    }
    rafId = requestAnimationFrame(tick);
  }

  /* ---------------- 渲染：板块 ---------------- */
  var dragActive = false;

  function renderBoards() {
    var wrap = $('#boards');
    wrap.innerHTML = '';

    state.boards.forEach(function (b) {
      var chip = document.createElement('button');
      chip.id = 'chip-' + b.id;
      chip.dataset.id = b.id;
      chip.className = 'board-chip' + (b.id === state.ui.lastBoard ? ' active' : '');
      chip.style.setProperty('--chip-color', b.color);
      var dot = document.createElement('span');
      dot.className = 'dot';
      var label = document.createElement('span');
      label.textContent = b.name;
      chip.appendChild(dot);
      chip.appendChild(label);
      chip.addEventListener('click', function () {
        if (dragActive) return;
        selectBoard(b.id);
      });
      wrap.appendChild(chip);
    });

    var add = document.createElement('button');
    add.className = 'board-add';
    add.textContent = '＋ 添加板块';
    add.addEventListener('click', openAddModal);
    wrap.appendChild(add);
  }

  function initSortable() {
    if (!window.Sortable) return;
    new Sortable(document.getElementById('boards'), {
      draggable: '.board-chip',
      animation: 150,
      forceFallback: true,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      placeholderClass: 'sortable-placeholder',
      onStart: function () { dragActive = true; },
      onEnd: function () {
        dragActive = false;
        var ids = [];
        $$('#boards .board-chip').forEach(function (el) { ids.push(el.dataset.id); });
        var idx = {};
        for (var i = 0; i < ids.length; i++) idx[ids[i]] = i;
        state.boards.sort(function (a, b) { return idx[a.id] - idx[b.id]; });
        save(true);
        renderPointsBadge();
        if (state.ui.lastView === 'stats') renderStats();
      }
    });
  }

  function selectBoard(id) {
    state.ui.lastBoard = id;
    var b = boardById(id);
    applyTheme(b);
    save();
    renderBoards();
    renderTimer();
    renderSessions();
    renderPointsBadge();
    if (state.ui.lastView === 'stats') renderStats();
  }

  /* ---------------- 渲染：计时 ---------------- */
  function renderTimer() {
    var b = activeBoard();
    var running = state.ui.running;
    var stage = $('#timer-stage');

    $('#board-name').textContent = b ? b.name : '—';
    $('#empty-board').classList.toggle('hidden', !!b);
    $('#timer-panel').classList.toggle('hidden', !b);

    stage.classList.toggle('running', !!running);
    var btn = $('#btn-start');
    btn.classList.toggle('running', !!running);
    btn.setAttribute('aria-label', running ? '停止计时' : '开始计时');
    updateStartIcon(!!running);

    $('#status-dot').classList.toggle('live', !!running);
    $('#status-text').textContent = running ? '计时中 · 点击停止并保存' : (b ? '点击开始计时' : '请先添加板块');

    if (running) {
      $('#time-display').textContent = fmtClock(Date.now() - running.start);
    } else {
      $('#time-display').textContent = '00:00:00';
    }
  }

  function renderSessions() {
    var b = activeBoard();
    var list = $('#session-list');
    var empty = $('#empty-sessions');
    list.innerHTML = '';
    if (!b) return;

    var todayStart = dayStart(new Date()).getTime();
    var recs = state.records
      .filter(function (r) { return r.boardId === b.id && r.start >= todayStart; })
      .sort(function (a, b2) { return b2.start - a.start; });

    var total = 0;
    recs.forEach(function (r) { total += r.dur; });
    $('#today-total').textContent = fmtDur(total);

    empty.classList.toggle('hidden', recs.length > 0);
    recs.forEach(function (r) {
      var li = document.createElement('li');
      var range = document.createElement('span');
      range.className = 's-range';
      range.textContent = fmtClockHMS(r.start) + ' – ' + fmtClockHMS(r.end);
      var dur = document.createElement('strong');
      dur.className = 's-dur';
      dur.textContent = fmtDur(r.dur);
      var actions = document.createElement('span');
      actions.className = 's-actions';
      var note = document.createElement('button');
      note.className = 's-note' + (r.note ? ' has-note' : '');
      note.setAttribute('type', 'button');
      note.setAttribute('aria-label', r.note ? '编辑备注' : '添加备注');
      note.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>';
      note.addEventListener('click', function () { openNoteModal(r.id); });
      var del = document.createElement('button');
      del.className = 's-del';
      del.setAttribute('type', 'button');
      del.setAttribute('aria-label', '删除该记录');
      del.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>';
      del.addEventListener('click', function () { deleteRecord(r.id); });
      actions.appendChild(dur);
      actions.appendChild(note);
      actions.appendChild(del);
      li.appendChild(range);
      li.appendChild(actions);
      if (r.note) {
        var nt = document.createElement('div');
        nt.className = 's-note-txt';
        nt.textContent = r.note;
        li.appendChild(nt);
      }
      list.appendChild(li);
    });
  }

  function deleteRecord(id) {
    var r = null;
    for (var i = 0; i < state.records.length; i++) {
      if (state.records[i].id === id) { r = state.records[i]; break; }
    }
    if (!r) return;
    if (!askConfirm('删除该记录：' + fmtClockHMS(r.start) + ' – ' + fmtClockHMS(r.end) +
      '（' + fmtDur(r.dur) + '）？\n删除后今日累计、统计与打卡积分将同步更新。')) return;
    state.records = state.records.filter(function (x) { return x.id !== id; });
    save(true);
    renderSessions();
    renderPointsBadge();
    if (state.ui.lastView === 'stats') renderStats();
    toast('已删除该记录');
  }

  /* ---------------- 会话备注 ---------------- */
  var editingNoteId = null;

  function openNoteModal(id) {
    var r = null;
    for (var i = 0; i < state.records.length; i++) {
      if (state.records[i].id === id) { r = state.records[i]; break; }
    }
    if (!r) return;
    editingNoteId = id;
    var inp = $('#note-input');
    inp.value = r.note || '';
    $('#note-count').textContent = inp.value.length;
    $('#btn-note-del').classList.toggle('hidden', !r.note);
    closeModals();
    openModal('modal-note');
    setTimeout(function () { inp.focus(); }, 60);
  }

  function updateNoteCount() {
    $('#note-count').textContent = $('#note-input').value.length;
  }

  function saveNote() {
    var id = editingNoteId;
    if (!id) return;
    var r = null;
    for (var i = 0; i < state.records.length; i++) {
      if (state.records[i].id === id) { r = state.records[i]; break; }
    }
    if (!r) return;
    var v = $('#note-input').value.slice(0, 50).trim();
    if (v) r.note = v;
    else delete r.note;
    save(true);
    closeModals();
    editingNoteId = null;
    renderSessions();
    if (state.ui.lastView === 'stats') renderStats();
    toast(v ? '备注已保存' : '备注已清除');
  }

  function deleteNote() {
    if (!askConfirm('确定删除这条备注吗？')) return;
    var id = editingNoteId;
    if (!id) return;
    var r = null;
    for (var i = 0; i < state.records.length; i++) {
      if (state.records[i].id === id) { r = state.records[i]; break; }
    }
    if (r) delete r.note;
    save(true);
    closeModals();
    editingNoteId = null;
    renderSessions();
    if (state.ui.lastView === 'stats') renderStats();
    toast('备注已删除');
  }

  /* ---------------- 渲染：统计 ---------------- */
  function recordsForStats() {
    var b = activeBoard();
    if (!b) return [];
    return state.records.filter(function (r) { return r.boardId === b.id; });
  }

  function renderStats() {
    var b = activeBoard();
    var recs = recordsForStats();
    $('#stat-board-label').innerHTML = b
      ? '当前板块：<b>' + b.name + '</b>'
      : '请先在顶栏添加并选择板块';
    var now = new Date();
    var nowTs = now.getTime();
    var todayStart = dayStart(now).getTime();
    var weekStart = startOfWeek(now).getTime();
    var monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    var todayM = metricsForRange(recs, todayStart, nowTs);
    var wkM = metricsForRange(recs, weekStart, nowTs);
    var moM = metricsForRange(recs, monthStart, nowTs);

    $('#sc-today').textContent = fmtDur(todayM.max);
    $('#sc-weekavg').textContent = fmtDur(avgOfDailyMax(wkM));
    $('#sc-weekmax').textContent = fmtDur(wkM.max);
    $('#sc-monthavg').textContent = fmtDur(avgOfDailyMax(moM));
    $('#sc-monthmax').textContent = fmtDur(moM.max);

    var todayKey = dateKey(now);

    ['single', 'weekavg'].forEach(function (k) {
      var box = $('.chart-mode[data-mode="' + k + '"]');
      if (!box) return;
      box.querySelector('.mode-label').textContent = MODE_LABELS[state.modes[k]] || state.modes[k];
      box.querySelectorAll('.mode-opt').forEach(function (o) {
        o.setAttribute('aria-selected', o.dataset.val === state.modes[k] ? 'true' : 'false');
      });
    });

    Charts.bar($('#chart-single'), buildChartItems(recs, state.modes.single, function (m) { return m.max; }));
    Charts.line($('#chart-weekavg'), buildChartItems(recs, state.modes.weekavg, avgOfDailyMax));
  }

  function periodsForMode(mode) {
    var now = new Date();
    if (mode === 'week') {
      return lastWeeksArr(12).map(function (w) {
        return { ts: w.ts, end: w.ts + 7 * DAY_MS, label: w.m + '/' + w.d, isThis: w.isThis };
      });
    }
    if (mode === 'month') {
      return lastMonthsArr(6).map(function (m) {
        return { ts: m.ts, end: m.end, label: m.label, isThis: m.isThis };
      });
    }
    return lastDaysArr(14).map(function (d) {
      return { ts: d.ts, end: d.ts + DAY_MS, label: d.label, isThis: d.key === dateKey(now) };
    });
  }

  function metricsForRange(recs, from, to) {
    var total = 0, count = 0, max = 0, days = {}, dayMax = {};
    for (var i = 0; i < recs.length; i++) {
      var r = recs[i];
      if (r.start >= from && r.start < to) {
        total += r.dur;
        count++;
        if (r.dur > max) max = r.dur;
        var dk = dateKey(new Date(r.start));
        days[dk] = 1;
        if (!dayMax[dk] || r.dur > dayMax[dk]) dayMax[dk] = r.dur;
      }
    }
    var dayMaxSum = 0;
    for (var k in dayMax) dayMaxSum += dayMax[k];
    return { total: total, count: count, max: max, days: Object.keys(days).length, dayMaxSum: dayMaxSum };
  }

  function avgOfDailyMax(m) {
    return m.days ? m.dayMaxSum / m.days : 0;
  }

  function buildChartItems(recs, mode, pick) {
    return periodsForMode(mode).map(function (p) {
      return { label: p.label, value: pick(metricsForRange(recs, p.ts, p.end)), highlight: p.isThis };
    });
  }

  /* ---------------- 视图切换 ---------------- */
  function setView(v) {
    state.ui.lastView = v;
    save();
    $('#view-timer').classList.toggle('hidden', v !== 'timer');
    $('#view-stats').classList.toggle('hidden', v !== 'stats');
    $$('.vs-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.view === v); });
    if (v === 'stats') renderStats();
  }

  /* ---------------- 设置 ---------------- */
  function renderSettings() {
    var list = $('#board-manage');
    list.innerHTML = '';

    state.boards.forEach(function (b) {
      var row = document.createElement('li');
      row.className = 'mng-row';

      var dot = document.createElement('span');
      dot.className = 'mng-dot';
      dot.style.background = b.color;

      var name = document.createElement('input');
      name.className = 'mng-name';
      name.value = b.name;
      name.maxLength = 12;
      name.addEventListener('change', function () {
        var v = name.value.trim();
        if (!v) { name.value = b.name; return; }
        b.name = v;
        save();
        renderBoards();
        renderTimer();
        toast('板块已重命名');
      });

      var colors = document.createElement('div');
      colors.className = 'mng-colors';
      BOARD_COLORS.forEach(function (c) {
        var sw = document.createElement('button');
        sw.className = 'swatch' + (c === b.color ? ' active' : '');
        sw.style.background = c;
        sw.setAttribute('aria-label', c);
        sw.addEventListener('click', function () {
          b.color = c;
          b.theme = null;
          save();
          applyTheme(b);
          renderSettings();
          renderBoards();
          renderTimer();
          renderStats();
          renderPointsBadge();
          toast('颜色已更新');
        });
        colors.appendChild(sw);
      });

      var del = document.createElement('button');
      del.className = 'mng-del';
      del.textContent = '删除';
      del.addEventListener('click', function () {
        if (!askConfirm('确定删除板块「' + b.name + '」？其全部计时记录将一并删除。')) return;
        state.records = state.records.filter(function (r) { return r.boardId !== b.id; });
        state.boards = state.boards.filter(function (x) { return x.id !== b.id; });
        if (state.ui.running && state.ui.running.boardId === b.id) state.ui.running = null;
        if (state.ui.lastBoard === b.id) state.ui.lastBoard = state.boards.length ? state.boards[0].id : null;
        delete state.themeUnlocks[b.id];
        save(true);
        applyTheme(state.ui.lastBoard ? boardById(state.ui.lastBoard) : null);
        renderSettings();
        renderBoards();
        renderTimer();
        renderSessions();
        renderPointsBadge();
        if (state.ui.lastView === 'stats') renderStats();
        toast('板块已删除');
      });

      row.appendChild(dot);
      row.appendChild(name);
      row.appendChild(colors);
      row.appendChild(del);
      list.appendChild(row);
    });

    if (!state.boards.length) {
      var none = document.createElement('li');
      none.style.cssText = 'color:var(--muted);font-size:13px;padding:10px 2px;border-top:1px solid var(--line-soft);';
      none.textContent = '暂无板块，点击下方按钮添加。';
      list.appendChild(none);
    }

    var defPalette = $('#theme-default-palette');
    if (defPalette) {
      defPalette.innerHTML = '';
      BOARD_COLORS.forEach(function (c) {
        var sw = document.createElement('button');
        sw.className = 'swatch' + (state.ui.defaultTheme === c ? ' active' : '');
        sw.style.background = c;
        sw.setAttribute('aria-label', c);
        sw.addEventListener('click', function () {
          state.ui.defaultTheme = c;
          save();
          applyTheme(activeBoard());
          renderSettings();
          toast('默认主题已设置');
        });
        defPalette.appendChild(sw);
      });
    }

    var fpsWrap = $('#fps-picker');
    if (fpsWrap) {
      fpsWrap.innerHTML = '';
      var cur = state.ui.particleFps || 60;
      [[60, '最高 60'], [30, '中等 30'], [15, '最小 15']].forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'fps-opt' + (o[0] === cur ? ' active' : '');
        b.setAttribute('aria-label', '帧率 ' + o[0]);
        b.textContent = o[1];
        b.addEventListener('click', function () {
          state.ui.particleFps = o[0];
          save();
          if (starCtrl) starCtrl.recolor();
          renderSettings();
          toast('全屏动画帧率已设为 ' + o[0] + ' 帧');
        });
        fpsWrap.appendChild(b);
      });
    }
  }

  /* ---------------- 弹窗 ---------------- */
  function openModal(id) {
    $('#' + id).classList.remove('hidden');
  }

  function closeModals() {
    $$('.modal-backdrop').forEach(function (m) { m.classList.add('hidden'); });
  }

  function openSettings() {
    renderSettings();
    openModal('modal-settings');
  }

  function openAddModal() {
    closeModals();
    var palette = $('#color-palette');
    var picked = state._pickedColor || state.ui.defaultTheme || BOARD_COLORS[0];
    palette.innerHTML = '';
    BOARD_COLORS.forEach(function (c) {
      var sw = document.createElement('button');
      sw.className = 'swatch' + (c === picked ? ' active' : '');
      sw.style.background = c;
      sw.addEventListener('click', function () {
        picked = c;
        state._pickedColor = c;
        $$('#color-palette .swatch').forEach(function (s) { s.classList.remove('active'); });
        sw.classList.add('active');
      });
      palette.appendChild(sw);
    });
    $('#add-name').value = '';
    openModal('modal-add');
    setTimeout(function () { $('#add-name').focus(); }, 60);
  }

  function confirmAdd() {
    var name = $('#add-name').value.trim();
    if (!name) {
      toast('请输入板块名称', true);
      $('#add-name').focus();
      return;
    }
    var b = { id: uid(), name: name, color: state._pickedColor || state.ui.defaultTheme || BOARD_COLORS[0], createdAt: Date.now() };
    state.boards.push(b);
    state.ui.lastBoard = b.id;
    state._pickedColor = null;
    save(true);
    closeModals();
    applyTheme(b);
    renderBoards();
    renderTimer();
    renderSessions();
    renderPointsBadge();
    if (state.ui.lastView === 'stats') renderStats();
    toast('板块「' + name + '」已创建');
  }

  /* ---------------- 导入导出 ---------------- */
  /* ---------------- 打卡日历 ---------------- */
  var cal = { boardId: null, y: null, m: null, sel: null };

  function openCheckinModal() {
    var b = activeBoard();
    cal.boardId = b ? b.id : (state.boards[0] ? state.boards[0].id : null);
    var now = new Date();
    cal.y = now.getFullYear();
    cal.m = now.getMonth();
    cal.sel = null;
    renderCheckinBoardRow();
    renderCalendar();
    openModal('modal-checkin');
  }

  function renderCheckinBoardRow() {
    var row = $('#cal-board-row');
    row.innerHTML = '';
    if (!state.boards.length) {
      var p = document.createElement('span');
      p.className = 'hint';
      p.textContent = '请先添加板块，再查看打卡记录。';
      row.appendChild(p);
      return;
    }
    state.boards.forEach(function (b) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'board-chip' + (b.id === cal.boardId ? ' active' : '');
      chip.style.setProperty('--chip-color', b.color);
      var dot = document.createElement('span');
      dot.className = 'dot';
      var label = document.createElement('span');
      label.textContent = b.name;
      chip.appendChild(dot);
      chip.appendChild(label);
      chip.addEventListener('click', function () {
        cal.boardId = b.id;
        cal.sel = null;
        renderCheckinBoardRow();
        renderCalendar();
      });
      row.appendChild(chip);
    });
  }

  function renderCalendar() {
    if (!cal.boardId) return;
    var b = boardById(cal.boardId);
    $('#cal-title').textContent = cal.y + '年' + (cal.m + 1) + '月';

    var wk = $('#cal-week');
    wk.innerHTML = '';
    ['一', '二', '三', '四', '五', '六', '日'].forEach(function (w) {
      var s = document.createElement('span');
      s.textContent = w;
      wk.appendChild(s);
    });

    var daysInMonth = new Date(cal.y, cal.m + 1, 0).getDate();
    var lead = (new Date(cal.y, cal.m, 1).getDay() + 6) % 7;
    var set = {};
    checkinDates(cal.boardId).forEach(function (k) { set[k] = 1; });
    var now = new Date();
    var todayKey = dateKey(now);
    var prefix = cal.y + '-' + String(cal.m + 1).padStart(2, '0');
    var monthCount = 0;

    var grid = $('#cal-grid');
    grid.innerHTML = '';
    var totalCells = Math.ceil((lead + daysInMonth) / 7) * 7;
    for (var i = 0; i < totalCells; i++) {
      var day = i - lead + 1;
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'cal-day';
      if (day < 1 || day > daysInMonth) {
        cell.classList.add('off');
        cell.textContent = '';
        grid.appendChild(cell);
        continue;
      }
      var k = cal.y + '-' + String(cal.m + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
      cell.textContent = String(day);
      if (set[k]) {
        cell.classList.add('done');
        monthCount++;
        var dp = document.createElement('span');
        dp.className = 'cal-dot';
        dp.style.background = b ? b.color : 'var(--primary)';
        cell.appendChild(dp);
      }
      if (k === todayKey) cell.classList.add('today');
      if (k > todayKey) cell.classList.add('future');
      if (cal.sel === k) cell.classList.add('sel');
      if (k <= todayKey) {
        (function (kk) {
          cell.addEventListener('click', function () {
            cal.sel = cal.sel === kk ? null : kk;
            renderCalendar();
          });
        })(k);
      }
      grid.appendChild(cell);
    }

    $('#cal-summary').textContent = b
      ? '本月打卡 ' + monthCount + ' 天 · 累计打卡 ' + checkinDates(cal.boardId).length + ' 天 · 当前积分 ' + pointsFor(cal.boardId) + ' 分'
      : '';
    renderCalDetail();
  }

  function renderCalDetail() {
    var box = $('#cal-detail');
    var list = $('#cal-detail-list');
    list.innerHTML = '';
    if (!cal.boardId || !cal.sel) { box.classList.add('hidden'); return; }
    var parts = cal.sel.split('-');
    var dayStart = new Date(+parts[0], +parts[1] - 1, +parts[2]).getTime();
    var recs = state.records
      .filter(function (r) { return r.boardId === cal.boardId && r.start >= dayStart && r.start < dayStart + DAY_MS; })
      .sort(function (a, b2) { return a.start - b2.start; });
    var total = recs.reduce(function (s, r) { return s + r.dur; }, 0);
    $('#cal-detail-title').textContent = cal.sel + ' · 打卡详情' + (recs.length ? ' · 共 ' + fmtDur(total) + ' · +1分' : '');
    box.classList.remove('hidden');
    if (!recs.length) {
      var li = document.createElement('li');
      li.className = 'cal-detail-empty';
      li.textContent = '当日无计时记录。';
      list.appendChild(li);
      return;
    }
    recs.forEach(function (r) {
      var li = document.createElement('li');
      var range = document.createElement('span');
      range.textContent = fmtClockHMS(r.start) + ' – ' + fmtClockHMS(r.end);
      var dur = document.createElement('strong');
      dur.className = 's-dur';
      dur.textContent = fmtDur(r.dur);
      li.appendChild(range);
      li.appendChild(dur);
      if (r.note) {
        var nt = document.createElement('div');
        nt.className = 'cal-note';
        nt.textContent = '备注：' + r.note;
        li.appendChild(nt);
      }
      list.appendChild(li);
    });
  }

  /* ---------------- 积分兑换 ---------------- */
  function openPointsModal() {
    renderPointsModal();
    openModal('modal-points');
  }

  function renderPointsModal() {
    var list = $('#pts-list');
    list.innerHTML = '';
    if (!state.boards.length) {
      var none = document.createElement('li');
      none.className = 'pts-row pts-none';
      none.textContent = '暂无板块，请先添加板块。';
      list.appendChild(none);
    }
    state.boards.forEach(function (b) {
      var li = document.createElement('li');
      li.className = 'pts-row';
      var dot = document.createElement('span');
      dot.className = 'mng-dot';
      dot.style.cssText = 'background:' + b.color + ';box-shadow:0 0 9px ' + b.color + ';';
      var nm = document.createElement('span');
      nm.className = 'pts-name';
      nm.textContent = b.name;
      var val = document.createElement('strong');
      val.className = 'pts-val';
      val.textContent = pointsFor(b.id) + ' 分';
      li.appendChild(dot);
      li.appendChild(nm);
      li.appendChild(val);
      list.appendChild(li);
    });
    renderThemeShop();
  }

  function renderThemeShop() {
    var shop = $('#theme-shop');
    shop.innerHTML = '';
    var keys = Object.keys(LIMITED_THEMES);
    if (!keys.length) {
      var none = document.createElement('p');
      none.className = 'hint';
      none.textContent = '暂无限定主题。';
      shop.appendChild(none);
      return;
    }
    keys.forEach(function (key) {
      var t = LIMITED_THEMES[key];
      var card = document.createElement('div');
      card.className = 'theme-card';

      var head = document.createElement('div');
      head.className = 'theme-head';
      var dot = document.createElement('span');
      dot.className = 'theme-accent';
      dot.style.background = t.accent || 'var(--primary)';
      dot.style.color = t.accent || 'var(--primary)';
      var name = document.createElement('h4');
      name.textContent = t.name;
      head.appendChild(dot);
      head.appendChild(name);

      var body = document.createElement('div');
      body.className = 'theme-body';
      var desc = document.createElement('p');
      desc.textContent = t.desc;
      body.appendChild(desc);

      var foot = document.createElement('div');
      foot.className = 'theme-foot';

      if (!state.boards.length) {
        var np = document.createElement('span');
        np.className = 'hint';
        np.textContent = '请先添加板块。';
        foot.appendChild(np);
      } else {
        state._shopSel = state._shopSel || {};
        var selBoardId = (state._shopSel[key] && boardById(state._shopSel[key]))
          ? state._shopSel[key]
          : (activeBoard() ? activeBoard().id : state.boards[0].id);
        var selWrap = document.createElement('div');
        selWrap.className = 'theme-select-wrap';
        var sel = document.createElement('select');
        sel.className = 'theme-board-select';
        sel.setAttribute('aria-label', '选择兑换板块');
        state.boards.forEach(function (b) {
          var opt = document.createElement('option');
          opt.value = b.id;
          opt.textContent = b.name + '（' + pointsFor(b.id) + ' 分）';
          if (b.id === selBoardId) opt.selected = true;
          sel.appendChild(opt);
        });
        sel.addEventListener('change', function () {
          state._shopSel[key] = sel.value;
          renderThemeShop();
        });
        selWrap.appendChild(sel);
        foot.appendChild(selWrap);

        var tb = boardById(selBoardId);
        var has = state.themeUnlocks[selBoardId] && state.themeUnlocks[selBoardId][key];
        var status = document.createElement('div');
        status.className = 'theme-status';
        var act = document.createElement('button');
        act.type = 'button';
        if (has) {
          var owned = document.createElement('span');
          owned.className = 'ts-owned';
          owned.textContent = '已兑换';
          status.appendChild(owned);
          act.className = 'btn-ghost btn-sm';
          act.textContent = tb && tb.theme === key ? '恢复默认主题' : '应用主题';
          act.addEventListener('click', function () {
            if (tb.theme === key) {
              tb.theme = null;
              toast('已恢复默认颜色主题');
            } else {
              tb.theme = key;
              toast('已应用限定主题「' + t.name + '」');
            }
            save();
            exitThemePreview();
            if (state.ui.lastBoard === tb.id) applyTheme(tb);
            renderPointsModal();
            renderPointsBadge();
            renderTimer();
          });
        } else {
          var pts = pointsFor(selBoardId);
          var cost = document.createElement('span');
          cost.className = 'ts-cost';
          cost.textContent = t.cost + ' 分';
          var cur = document.createElement('span');
          cur.className = 'ts-pts';
          cur.textContent = '当前 ' + pts + ' 分';
          status.appendChild(cost);
          status.appendChild(cur);
          act.className = 'btn-primary btn-sm';
          act.textContent = '兑换';
          if (pts < t.cost) act.disabled = true;
          act.addEventListener('click', function () {
            redeemTheme(tb.id, key);
          });
        }
        foot.appendChild(status);

        var prev = document.createElement('button');
        prev.type = 'button';
        prev.className = 'btn-ghost btn-sm';
        prev.textContent = '预览';
        prev.addEventListener('click', function () {
          enterThemePreview(key);
        });
        foot.appendChild(prev);
        foot.appendChild(act);
      }

      card.appendChild(head);
      card.appendChild(body);
      card.appendChild(foot);
      shop.appendChild(card);
    });
  }

  function redeemTheme(boardId, key) {
    var b = boardById(boardId);
    var t = LIMITED_THEMES[key];
    if (!b || !t) return;
    if (state.themeUnlocks[boardId] && state.themeUnlocks[boardId][key]) {
      toast('该板块已拥有此主题', true);
      return;
    }
    if (pointsFor(boardId) < t.cost) {
      toast('积分不足，兑换需 ' + t.cost + ' 分', true);
      return;
    }
    if (!askConfirm('消耗 ' + t.cost + ' 分兑换限定主题「' + t.name + '」，并绑定到板块「' + b.name + '」？')) return;
    state.themeUnlocks[boardId] = state.themeUnlocks[boardId] || {};
    state.themeUnlocks[boardId][key] = Date.now();
    b.theme = key;
    save(true);
    exitThemePreview();
    if (state.ui.lastBoard === b.id) applyTheme(b);
    renderPointsModal();
    renderPointsBadge();
    toast('兑换成功！主题「' + t.name + '」已应用到「' + b.name + '」');
  }

  /* ---------------- 提示 ---------------- */
  function toast(msg, isErr) {
    var el = document.createElement('div');
    el.className = 'toast' + (isErr ? ' err' : '');
    el.textContent = msg;
    $('#toast').appendChild(el);
    requestAnimationFrame(function () { el.classList.add('show'); });
    setTimeout(function () {
      el.classList.remove('show');
      setTimeout(function () { el.remove(); }, 300);
    }, 2200);
  }

  /* ---------------- 全屏 ---------------- */
  function enterFullscreen() {
    var el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  }

  function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }

  function toggleFullscreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) exitFullscreen();
    else enterFullscreen();
  }

  function updateFullscreenUI() {
    var isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    document.documentElement.classList.toggle('fullscreen', isFs);
    var fsBtn = $('#btn-fs');
    if (fsBtn) {
      fsBtn.title = isFs ? '退出全屏' : '全屏';
      fsBtn.setAttribute('aria-label', isFs ? '退出全屏' : '全屏');
    }
  }

  /* ---------------- 初始化 ---------------- */
  function bind() {
    $$('.vs-btn').forEach(function (b) {
      b.addEventListener('click', function () { setView(b.dataset.view); });
    });
    $('#btn-fs').addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', updateFullscreenUI);
    document.addEventListener('webkitfullscreenchange', updateFullscreenUI);
    $('#btn-start').addEventListener('click', toggleTimer);
    $('#btn-settings').addEventListener('click', openSettings);
    $('#btn-points').addEventListener('click', openPointsModal);
    $('#btn-checkin').addEventListener('click', openCheckinModal);
    $('#btn-preview-exit').addEventListener('click', exitThemePreview);
    var checkBtn = $('#btn-check-update');
    if (checkBtn) checkBtn.addEventListener('click', function () { checkForUpdate(); });
    $('#cal-prev').addEventListener('click', function () {
      cal.m--;
      if (cal.m < 0) { cal.m = 11; cal.y--; }
      cal.sel = null;
      renderCalendar();
    });
    $('#cal-next').addEventListener('click', function () {
      cal.m++;
      if (cal.m > 11) { cal.m = 0; cal.y++; }
      cal.sel = null;
      renderCalendar();
    });
    $('#btn-add-board').addEventListener('click', openAddModal);
    $('#btn-empty-add').addEventListener('click', openAddModal);
    $('#btn-confirm-add').addEventListener('click', confirmAdd);
    $$('.modal-backdrop').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m) closeModals();
      });
    });
    $$('[data-close]').forEach(function (b) {
      b.addEventListener('click', closeModals);
    });
    $('#add-name').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') confirmAdd();
    });
    $('#note-input').addEventListener('input', updateNoteCount);
    $('#btn-note-save').addEventListener('click', saveNote);
    $('#btn-note-del').addEventListener('click', deleteNote);
    $('#note-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveNote();
    });

    $$('.chart-mode').forEach(function (box) {
      var key = box.dataset.mode;
      var btn = box.querySelector('.mode-btn');
      box.querySelectorAll('.mode-opt').forEach(function (opt) {
        opt.addEventListener('click', function () {
          state.modes[key] = opt.dataset.val;
          box.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          renderStats();
        });
      });
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = box.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
      });
      document.addEventListener('click', function () {
        box.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        $$('.chart-mode').forEach(function (box) {
          box.classList.remove('open');
          box.querySelector('.mode-btn').setAttribute('aria-expanded', 'false');
        });
      }
    });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (state.ui.lastView === 'stats') renderStats();
      }, 200);
    });

    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space' && state.ui.lastView === 'timer' &&
        document.activeElement && document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'SELECT') {
        e.preventDefault();
        toggleTimer();
      }
    });
  }

  function init() {
    applyTheme(activeBoard());
    initStars();
    bind();
    var v = state.ui.lastView === 'stats' ? 'stats' : 'timer';
    setView(v);
    renderBoards();
    initSortable();
    renderTimer();
    renderSessions();
    renderPointsBadge();
    if (state.ui.running) tick();
    if (state.ui.running) toast('已恢复计时中');
    setTimeout(function () { checkForUpdate(true); }, 2500);
  }

  loadStore();
})();