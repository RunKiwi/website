'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { type ReactNode, useEffect as useReactEffect, useState } from 'react';

function useMountedReducedMotion() {
  const preferReduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useReactEffect(() => setMounted(true), []);
  return mounted ? preferReduce : false;
}

/**
 * Reveal — the site's single reveal-on-scroll vocabulary.
 *
 * A staggered fade + rise that fires once as the element scrolls into view.
 * Honors prefers-reduced-motion: when set, content renders immediately with
 * no transform/opacity animation.
 *
 * Use <Reveal> for a single block, or <Reveal stagger> as a parent with
 * <RevealItem> children for a coordinated cascade.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  as = 'div',
  className,
  delay = 0,
  stagger = false,
  y = 24,
}: {
  children: ReactNode;
  as?: 'div' | 'section' | 'ul' | 'li' | 'header';
  className?: string;
  delay?: number;
  stagger?: boolean;
  y?: number;
}) {
  const reduce = useMountedReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const StaticTag = as as 'div';
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: 0.09,
      },
    },
  };

  const single: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay },
    },
  };

  return (
    <MotionTag
      className={`reveal-root ${className ?? ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -80px 0px' }}
      variants={stagger ? container : single}
    >
      {children}
    </MotionTag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function RevealItem({
  children,
  as = 'div',
  className,
}: {
  children: ReactNode;
  as?: 'div' | 'li';
  className?: string;
}) {
  const reduce = useMountedReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce) {
    const StaticTag = as as 'div';
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
