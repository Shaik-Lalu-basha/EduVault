/* ============================================
   EDUVAULT - PARTICLES.JS CONFIGURATION
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // Only initialize particles if the element exists
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer || typeof particlesJS === 'undefined') {
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#00d4ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00d4ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Optional: Add canvas-based gradient background
    if (window.pJSDom && window.pJSDom[0]) {
        const canvas = window.pJSDom[0].pJS.canvas.el;
        const ctx = canvas.getContext('2d');

        // Create gradient background
        function drawGradient() {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, 'rgba(15, 15, 30, 0.1)');
            gradient.addColorStop(0.5, 'rgba(26, 26, 46, 0.1)');
            gradient.addColorStop(1, 'rgba(15, 15, 30, 0.1)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Redraw gradient on animation frame
        const originalAnimate = window.pJSDom[0].pJS.fn.animate;
        window.pJSDom[0].pJS.fn.animate = function () {
            drawGradient();
            originalAnimate.call(this);
        };
    }
});
