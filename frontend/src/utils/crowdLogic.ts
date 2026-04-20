export type ZoneStatus = 'normal' | 'moderate' | 'congested';

export type Zone = {
  name: string;
  queue: number;
  density: number;
  status: ZoneStatus;
};

export const getZoneStatus = (density: number): ZoneStatus => {
  if (density >= 85) return 'congested';
  if (density >= 50) return 'moderate';
  return 'normal';
};

export const getStatusClass = (status: ZoneStatus): string => {
  if (status === 'congested') return 'badge status-congested';
  if (status === 'moderate') return 'badge status-moderate';
  return 'badge status-normal';
};

export const deployStaffToZones = (zones: Zone[]): Zone[] => {
  return zones.map((zone) => {
    if (zone.name === 'Concession B') {
      const newQueue = Math.max(zone.queue - 8, 0);
      const newDensity = Math.max(zone.density - 15, 0);
      return {
        ...zone,
        queue: newQueue,
        density: newDensity,
        status: getZoneStatus(newDensity),
      };
    }
    return zone;
  });
};

export const rerouteCrowdAcrossZones = (zones: Zone[]): Zone[] => {
  return zones.map((zone) => {
    if (zone.name === 'Concession B') {
      const newQueue = Math.max(zone.queue - 10, 0);
      const newDensity = Math.max(zone.density - 20, 0);
      return {
        ...zone,
        queue: newQueue,
        density: newDensity,
        status: getZoneStatus(newDensity),
      };
    }

    if (zone.name === 'Gate A Entrance') {
      const newDensity = Math.min(zone.density + 10, 100);
      return {
        ...zone,
        density: newDensity,
        status: getZoneStatus(newDensity),
      };
    }

    if (zone.name === 'East Washrooms') {
      const newQueue = zone.queue + 2;
      const newDensity = Math.min(zone.density + 8, 100);
      return {
        ...zone,
        queue: newQueue,
        density: newDensity,
        status: getZoneStatus(newDensity),
      };
    }

    return zone;
  });
};