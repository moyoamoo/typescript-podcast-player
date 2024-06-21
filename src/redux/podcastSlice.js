import { createSlice } from "@reduxjs/toolkit";
import { getStore, saveStore } from "./diskUtils";

const diskData = getStore("podcast");
const initialState = {
  value: 0,
  status: "idle",
  apiData: { searchForTerm: { podcastSeries: [] } },
  userLibrary: [],
  sortOrder: "2",
  searchTerm: "",
  isLoading: false,
  // emptySearch: false,
};

export const podcastSlice = createSlice({
  name: "podcastSlice",
  initialState: diskData ? diskData : initialState,
  reducers: {
    storeApiData: (state, { payload }) => {
      console.log(payload);
      state.apiData = payload;
      saveStore("podcast", state);
    },

    storeLibrary: (state, { payload }) => {
      console.log(payload);
      if (!payload) {
        return;
      }
      state.apiData.searchForTerm.podcastSeries.push(payload);
      saveStore("podcast", state);
    },

    addNewEpisodes: (state, { payload }) => {
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex(
        (podcast) => {
          console.log(podcast);
          return podcast.uuid === payload.uuid;
        }
      );
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes =
        payload.episodes;
    },

    //adds new episodes to store
    storeAdditionalApiData: (state, { payload }) => {
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex(
        (podcast) => {
          return podcast.uuid === payload.uuid;
        }
      );
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.push(
        ...payload.episodes
      );
      saveStore("podcast", state);
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },

    //adds to library
    appendApiData: (state, { payload }) => {
      state.apiData.searchForTerm.podcastSeries.push(payload);

      saveStore("podcast", state);
    },

    //append search data
    appendApiDataSearch: (state, { payload }) => {
      state.apiData.searchForTerm.podcastSeries.push(
        ...payload.searchForTerm.podcastSeries
      );
      console.log(state.apiData.searchForTerm.podcastSeries);
      saveStore("podcast", state);
    },

    deletefromLibrary: (state, { payload }) => {
      for (
        let i = 0;
        i < state.apiData.searchForTerm.podcastSeries.length;
        i++
      ) {
        if (state.apiData.searchForTerm.podcastSeries[i].uuid === payload) {
          state.apiData.searchForTerm.podcastSeries.splice(i, 1);
        }
        saveStore("podcast", state);
      }
    },

    storeEpisodeLength: (state, { payload }) => {
      state.episodeLength = payload;
      saveStore("podcast", state);
    },

    sortEpisodeOrder: (state, { payload }) => {
      console.log(payload);
      const indexOf = state.apiData.searchForTerm.podcastSeries.findIndex(
        (podcast) => {
          return podcast.uuid === payload.uuid;
        }
      );
      console.log(indexOf);
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.length = 0;
      state.apiData.searchForTerm.podcastSeries[indexOf].episodes.push(
        ...payload.episodes
      );
      saveStore("podcast", state);
    },

    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      saveStore("podcast", state);
    },

    sortPodcasts: (state, { payload }) => {
      switch (payload) {
        case "sortAsc":
          state.apiData.searchForTerm.podcastSeries.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            }
          });
          break;
        case "sortDesc":
          state.apiData.searchForTerm.podcastSeries.sort((a, b) => {
            if (a.name < b.name) {
              return 1;
            } else if (a.name > b.name) {
              return -1;
            }
          });
          break;

        default:
          break;
      }
      saveStore("podcast", state);
    },

    clearApiData: (state) => {
      state.apiData = initialState.apiData;
      saveStore("podcast", state);
    },

    addTopChartsCountry: (state, { payload }) => {
      payload.forEach((podcast) => {
        state.apiData.searchForTerm.podcastSeries.forEach((_podcast) => {
          if ((podcast.uuid = _podcast.uuid)) {
            return;
          }
        });
        podcast.topChartsCountry = true;
      });
      state.apiData.searchForTerm.podcastSeries.push(...payload);
      saveStore("podcast", state);
    },

    addTopPodcasts: (state, { payload }) => {
      payload.topPodcast = true;
      state.apiData.searchForTerm.podcastSeries.push(payload);
      saveStore("podcast", state);
    },

    //add to userLibary array
    addToLibrary: (state, { payload }) => {
      console.log(payload);
      //check if in library
      for (let i = 0; i < state.userLibrary.length; i++) {
        if (state.userLibrary[i] === payload) {
          return;
        }
        saveStore("podcast", state);
      }
      state.userLibrary.push(payload);
      saveStore("podcast", state);
    },

    //order of podcast sort - oldest/newest'
    setOrder: (state, { payload }) => {
      state.sortOrder = payload;
      saveStore("podcast", state);
    },

    saveSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      saveStore("podcast", state);
    },

    setEmptySearch: (state, { payload }) => {
      state.emptySearch = payload;
      saveStore("podcast", state);
    },

    clearUserLibrary: (state, { payload }) => {
      state.userLibrary = [];
      saveStore("podcast", state);
    },

    clearLibrary: (state, { payload }) => {
      Object.assign(state, initialState);
      saveStore("podcast", state);
    },
  },
});

export const {
  storeApiData,
  storeAdditionalApiData,
  storeEpisodeLength,
  getLibrary,
  addToLibrary,
  deletefromLibrary,
  setSearchTerm,
  getLibraryState,
  appendApiData,
  sortEpisodeOrder,
  setOrder,
  sortPodcasts,
  setEmptySearch,
  clearApiData,
  appendApiDataSearch,
  saveSearchTerm,
  setIsLoading,
  clearUserLibrary,
  storeLibrary,
  addTopChartsCountry,
  addTopPodcasts,
  addNewEpisodes,
} = podcastSlice.actions;

export const selectPodcastsSeries = (state) =>
  state.podcast.apiData.searchForTerm.podcastSeries;
export const selectPodcast = (id) => (state) => {
  return state.podcast.apiData.searchForTerm.podcastSeries.find((podcast) => {
    return podcast.uuid == id;
  });
};
export const selectLibrary = (state) => {
  return state.podcast.userLibrary;
};

export const selectEmptySearch = (state) => {
  return state.podcast.emptySearch;
};
export const selectSearchTerm = (state) => {
  return state.podcast.searchTerm;
};

export const selectSortOrder = (state) => {
  return state.podcast.sortOrder;
};
export const selectEpisodeLength = (state) => {
  state.podcast.episodeLength;
};

export const selectIsLoading = (state) => {
  state.podcast.isLoading;
};

export default podcastSlice.reducer;
