import { useQuery, useMutation } from "react-query";
import { GraphQLClient, request } from "graphql-request";

const endpoint = 'http://127.0.0.1:5000/graphql';
export const useGQLQuery = (key, query, variables, config = {}) => {

    const fetchdata =  async () => await request(endpoint,query, variables)

    return useQuery(key, fetchdata, config);
};

export const useGQLMutation = ( query, variables, config = {}) => {
    const GQLClient = new GraphQLClient(endpoint,{
        headers: {
            authorization: 'Bearer MY_TOKEN',
          },
    });

    const postData =  async () => await GQLClient.request(query,variables)

    console.log(postData)
    return useMutation(postData,config);
};