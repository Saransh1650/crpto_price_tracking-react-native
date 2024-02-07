import axios from "axios";

export const getMarketData = async () => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.livecoinwatch.com/coins/list",
      headers: {
        "content-type": "application/json",
        "x-api-key": "2b850377-9d33-4745-ab9d-7534e0cdde92",
      },
      data: {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: 0,

        meta: true,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getGraphData = async (code) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://api.livecoinwatch.com/coins/single/history",
      headers: {
        "content-type": "application/json",
        "x-api-key": "2b850377-9d33-4745-ab9d-7534e0cdde92",
      },
      data: {
        currency: "USD",
        code: code,
        start: 1617035100000,
        end: Math.floor(Date.now()),
        meta: false,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
