import type { Vendor } from '../../types/vendor';

export function compareDirectoryItems(first: Vendor, second: Vendor): number {
  if (first.tier !== second.tier) {
    return first.tier - second.tier;
  }

  if (first.startupFriendly && !second.startupFriendly) {
    return -1;
  }

  if (!first.startupFriendly && second.startupFriendly) {
    return 1;
  }

  return first.name.localeCompare(second.name);
}
