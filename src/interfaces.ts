interface IPodcast {
  description?: string;
  genres?: string[];
  episodes?: IPodcast[];
  imageUrl: string;
  totalEpisodesCount?: number;
  name?: string;
  uuid: string;
  datePublished?: Date;
  podcastName?: string;
  podcastUuid: string;
  topPodcast?: boolean;
}

export type { IPodcast };
