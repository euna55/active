import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HelperId } from '../data/helpers';

export interface GameState {
  helperId: HelperId | null;
  startedAt: number | null;
  currentSpot: number;
  collectedFragments: string[];
  spotStatus: Record<number, 'locked' | 'arrived' | 'solved'>;
  copGauge: number;
  finished: boolean;
}

interface GameActions {
  selectHelper: (id: HelperId) => void;
  arriveAtSpot: (spotId: number) => void;
  solveSpot: (spotId: number, fragment: string) => void;
  updateCopGauge: () => void;
  finish: () => void;
  reset: () => void;
}

const initialSpotStatus: Record<number, 'locked' | 'arrived' | 'solved'> = {
  1: 'locked', 2: 'locked', 3: 'locked', 4: 'locked',
  5: 'locked', 6: 'locked', 7: 'locked', 8: 'locked',
};

const initialState: GameState = {
  helperId: null,
  startedAt: null,
  currentSpot: 1,
  collectedFragments: [],
  spotStatus: initialSpotStatus,
  copGauge: 0,
  finished: false,
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      selectHelper: (id) =>
        set({
          helperId: id,
          startedAt: Date.now(),
          spotStatus: { ...initialSpotStatus, 1: 'arrived' },
        }),

      arriveAtSpot: (spotId) =>
        set((s) => ({
          spotStatus: { ...s.spotStatus, [spotId]: 'arrived' },
        })),

      solveSpot: (spotId, fragment) =>
        set((s) => {
          const nextSpot = spotId + 1;
          const nextStatus: Record<number, 'locked' | 'arrived' | 'solved'> =
            nextSpot <= 8
              ? { ...s.spotStatus, [spotId]: 'solved', [nextSpot]: 'arrived' }
              : { ...s.spotStatus, [spotId]: 'solved' };
          return {
            spotStatus: nextStatus,
            collectedFragments: [...s.collectedFragments, fragment],
            currentSpot: nextSpot <= 8 ? nextSpot : spotId,
          };
        }),

      updateCopGauge: () => {
        const { startedAt } = get();
        if (!startedAt) return;
        const elapsed = (Date.now() - startedAt) / 1000;
        const gauge = Math.min(100, (elapsed / 3600) * 100);
        set({ copGauge: gauge });
      },

      finish: () => set({ finished: true }),

      reset: () => set({ ...initialState, spotStatus: { ...initialSpotStatus } }),
    }),
    {
      name: 'active-seodaemun-progress',
    }
  )
);
