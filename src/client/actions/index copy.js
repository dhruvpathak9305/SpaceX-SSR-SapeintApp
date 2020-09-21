import axios from "axios";
import config from '../../../config';

import dataUtils from "../utils/dataUtils";

export const FETCH_MISSIONS = "fetch_articles";

export const fetchMissions = (source) => async (dispatch) => {
  let url;
  let params = { ...source };

  url = `https://api.spaceXdata.com/v3/launches?limit=1`;

  const res = await axios.get(url, {
    params: {
      ...params,
    },
  });
  const formatData = dataUtils.formatLaunchData(res.data);
  console.log(formatData);
  dispatch({
    type: FETCH_MISSIONS,
    payload: res.data,
  });
};
