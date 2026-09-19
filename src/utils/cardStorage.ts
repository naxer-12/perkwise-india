import type { CreditCard, SiteConfig } from '../types';
import { CREDIT_CARDS_DATA } from '../data/creditCardsData';

const STORAGE_KEY_CUSTOM_CARDS = 'perkwise_custom_cards';
const STORAGE_KEY_DEACTIVATED_CARDS = 'perkwise_deactivated_cards';
const STORAGE_KEY_SITE_CONFIG = 'perkwise_site_config';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  showNotificationBar: true,
  notificationMessage: 'Zero Affiliate Bias • Verified Against Official Bank MITCs & RBI Schedules',
  showDealsHub: true,
  showCardGuide: true,
  showCalculator: true,
  showLifeOperations: true,
  showHeroSection: true,
  enableUserReviews: true,
  heroHeadline: 'Stop Leaving Money on the Table. Every Rupee, Loyalty Perk & Scheme Optimized.',
  heroSubheadline: 'India’s unbiased consumer awareness repository and mathematical personal finance compendium. Designed to optimize daily life operations, eliminate unnecessary fees, unlock member privileges, and elevate financial literacy across all strata of consumers.'
};

export function getSiteConfig(): SiteConfig {
  if (typeof window === 'undefined') return DEFAULT_SITE_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SITE_CONFIG);
    if (!raw) return DEFAULT_SITE_CONFIG;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SITE_CONFIG, ...parsed };
  } catch (e) {
    console.error('Failed to parse perkwise_site_config:', e);
    return DEFAULT_SITE_CONFIG;
  }
}

export function saveSiteConfig(config: SiteConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SITE_CONFIG, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('perkwise_config_updated', { detail: config }));
  } catch (e) {
    console.error('Failed to save perkwise_site_config:', e);
  }
}

export function resetSiteConfig(): SiteConfig {
  saveSiteConfig(DEFAULT_SITE_CONFIG);
  return DEFAULT_SITE_CONFIG;
}

export function getCustomCards(): CreditCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_CARDS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load custom cards:', e);
    return [];
  }
}

export function saveCustomCards(cards: CreditCard[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_CARDS, JSON.stringify(cards));
    window.dispatchEvent(new CustomEvent('perkwise_cards_updated'));
  } catch (e) {
    console.error('Failed to save custom cards:', e);
  }
}

export function getDeactivatedCardIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEACTIVATED_CARDS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load deactivated card IDs:', e);
    return [];
  }
}

export function toggleCardActiveStatus(cardId: string, shouldBeActive: boolean): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = new Set(getDeactivatedCardIds());
    if (shouldBeActive) {
      current.delete(cardId);
    } else {
      current.add(cardId);
    }
    const updated = Array.from(current);
    localStorage.setItem(STORAGE_KEY_DEACTIVATED_CARDS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('perkwise_cards_updated'));
    return updated;
  } catch (e) {
    console.error('Failed to toggle card active status:', e);
    return [];
  }
}

export function getAllCards(): CreditCard[] {
  const customCards = getCustomCards();
  const deactivatedIds = new Set(getDeactivatedCardIds());

  // Mark cards as published or not
  const baseCards = CREDIT_CARDS_DATA.map(card => ({
    ...card,
    isCustom: false,
    isPublished: !deactivatedIds.has(card.id)
  }));

  const formattedCustom = customCards.map(card => ({
    ...card,
    isCustom: true,
    isPublished: !deactivatedIds.has(card.id)
  }));

  return [...formattedCustom, ...baseCards];
}

export function getEffectiveCards(): CreditCard[] {
  // Returns only the published (active) cards for public consumption
  return getAllCards().filter(c => c.isPublished !== false);
}

export function publishCard(newCard: CreditCard): CreditCard[] {
  const customCards = getCustomCards();
  const existingIndex = customCards.findIndex(c => c.id === newCard.id);

  const cardToSave: CreditCard = {
    ...newCard,
    isCustom: true,
    isPublished: true,
    publishedAt: newCard.publishedAt || new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  };

  let updatedList: CreditCard[];
  if (existingIndex >= 0) {
    updatedList = [...customCards];
    updatedList[existingIndex] = cardToSave;
  } else {
    updatedList = [cardToSave, ...customCards];
  }

  saveCustomCards(updatedList);
  // Ensure it's not marked deactivated
  toggleCardActiveStatus(newCard.id, true);
  return updatedList;
}

export function deleteCustomCard(cardId: string): CreditCard[] {
  const customCards = getCustomCards();
  const filtered = customCards.filter(c => c.id !== cardId);
  saveCustomCards(filtered);
  return filtered;
}
