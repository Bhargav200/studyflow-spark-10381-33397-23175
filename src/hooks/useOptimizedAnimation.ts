import { useDeviceDetection } from './useDeviceDetection';

export const useOptimizedAnimation = () => {
  const { isMobile, isTablet, prefersReducedMotion, connectionSpeed } = useDeviceDetection();

  const shouldReduceMotion = prefersReducedMotion || (isMobile && connectionSpeed === 'slow');
  const shouldDisableHeavyEffects = isMobile || isTablet || connectionSpeed === 'slow';

  return {
    shouldReduceMotion,
    shouldDisableHeavyEffects,
    animationDuration: shouldReduceMotion ? 0 : isMobile ? 0.2 : 0.3,
    enableParticles: !shouldDisableHeavyEffects,
    enableRibbons: !shouldDisableHeavyEffects,
    enableAurora: !shouldDisableHeavyEffects,
  };
};
