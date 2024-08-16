import axios, { AxiosResponse } from "axios";
import { getToken } from "./authApi";

export const TicketFilters =async (FiltersData: object): Promise<AxiosResponse> => {
  return axios.post(
    "http://10.101.104.140:8090/filter",
    FiltersData,
    {
      headers: {
        Authorization: getToken(),
      },
    }
  );
};



