import axios from "axios";
import { store } from "../../redux/store";
import { setRankedGenres } from "../../redux/statsSlice";
import { url } from "../../config";

export const getTopGenres = async () => {
  const state = store.getState();
  const token = state.library.token;
  try {
    const { data } = await axios.get(`${url}/genres/get/5`, {
      headers: {
        token: token,
      },
    });
    if (data.data) {
      store.dispatch(setRankedGenres(data.data));
    }
  } catch (e) {
    console.log(e);
 
  }
};
