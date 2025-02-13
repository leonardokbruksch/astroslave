import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            className="absolute inset-0"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#0a0a1f"
                    }
                },
                fpsLimit: 60,
                particles: {
                    color: {
                        value: ["#ffffff", "#4a90e2", "#8e44ad"]
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out"
                        },
                        random: true,
                        speed: 0.3,
                        straight: false
                    },
                    number: {
                        density: {
                            enable: true,
                            height: 800,
                            width: 800
                        },
                        value: 100
                    },
                    opacity: {
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false,
                            minimumValue: 0.1
                        },
                        value: { min: 0.1, max: 0.9 }
                    },
                    shape: {
                        type: "circle"
                    },
                    size: {
                        value: { min: 1, max: 3 }
                    },
                    twinkle: {
                        particles: {
                            enable: true,
                            frequency: 0.05,
                            opacity: 0.5
                        }
                    }
                },
                detectRetina: true
            }}
        />
    );
}
