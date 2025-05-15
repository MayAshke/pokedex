export interface Pokemon {
    id: number;
    name: string;
    height: number;
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    types: {
      slot: number;
      type: {
        name: string;
      };
    }[];
  }