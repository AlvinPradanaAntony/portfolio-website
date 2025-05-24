import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// GSAP Animation Presets
export const gsapAnimations = {
  // Fade animations
  fadeIn: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration, delay, ease: "power2.out" }
    );
  },

  fadeUp: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
    );
  },

  fadeDown: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
    );
  },

  fadeLeft: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration, delay, ease: "power2.out" }
    );
  },

  fadeRight: (element: string | Element, duration = 1, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration, delay, ease: "power2.out" }
    );
  },

  // Scale animations
  scaleIn: (element: string | Element, duration = 0.8, delay = 0) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" }
    );
  },

  scaleUp: (element: string | Element, duration = 0.3) => {
    return gsap.to(element, {
      scale: 1.05,
      duration,
      ease: "power2.out",
    });
  },

  scaleDown: (element: string | Element, duration = 0.3) => {
    return gsap.to(element, {
      scale: 1,
      duration,
      ease: "power2.out",
    });
  },

  // Stagger animations
  staggerFadeUp: (elements: string | Element[], duration = 1, stagger = 0.1) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power2.out",
      }
    );
  },

  staggerScale: (elements: string | Element[], duration = 0.8, stagger = 0.1) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        ease: "back.out(1.7)",
      }
    );
  },

  // Text animations
  typeWriter: (element: string | Element, text: string, duration = 2) => {
    const tl = gsap.timeline();
    const chars = text.split("");
    
    tl.set(element, { text: "" });
    chars.forEach((char, index) => {
      tl.to(element, {
        duration: duration / chars.length,
        text: text.substring(0, index + 1),
        ease: "none",
      });
    });
    
    return tl;
  },

  // Scroll-triggered animations
  scrollFadeUp: (element: string | Element, trigger?: string | Element) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  },

  parallax: (element: string | Element, speed = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  },

  // 3D animations
  rotate3D: (element: string | Element, x = 0, y = 0, z = 0, duration = 1) => {
    return gsap.to(element, {
      rotationX: x,
      rotationY: y,
      rotationZ: z,
      duration,
      ease: "power2.out",
    });
  },

  // Continuous animations
  float: (element: string | Element, distance = 20, duration = 3) => {
    return gsap.to(element, {
      y: -distance,
      duration,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  },

  rotate: (element: string | Element, duration = 10) => {
    return gsap.to(element, {
      rotation: 360,
      duration,
      ease: "none",
      repeat: -1,
    });
  },

  pulse: (element: string | Element, scale = 1.1, duration = 1) => {
    return gsap.to(element, {
      scale,
      duration,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    });
  },
};

// Framer Motion Variants
export const motionVariants = {
  // Container variants
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  },

  // Item variants
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  },

  // Fade variants
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  },

  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  },

  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  },

  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  },

  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  },

  // Scale variants
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      } 
    },
  },

  // Hover variants
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },

  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },

  // Page transitions
  pageTransition: {
    initial: { opacity: 0, x: -200 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
    transition: { duration: 0.5 },
  },

  // Card variants
  card: {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      } 
    },
    hover: {
      y: -10,
      rotateX: 5,
      transition: { duration: 0.3 },
    },
  },

  // Text variants
  text: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
      }
    },
  },

  // Stagger text
  staggerText: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  // Letter animation
  letter: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
      }
    },
  },
};

// Utility functions
export const createScrollTrigger = (element: string | Element, animation: gsap.core.Animation) => {
  return ScrollTrigger.create({
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    animation,
    toggleActions: "play none none reverse",
  });
};

export const killScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};