import { useQuery, useMutation} from "react-query";
import { GraphQLClient, request } from "graphql-request";
const endpoint = 'http://127.0.0.1:5000/graphql';
const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'Bearer MY_TOKEN',
    },
  });
export const useGQLQuery = (key, query, variables, config = {}) => {

    const fetchdata =  async () => await request(endpoint,query,variables)

    return useQuery(key, fetchdata, config);
};

export const useGQLMutation = (query, variables, config ) =>{
    const postData = async()=> await graphQLClient.request(query,variables)
    return useMutation(postData,config)
}

export const useGQLFind = (key,query, variables, config )=>{
  const findUser = async() => await graphQLClient.request(query,variables)
  return useQuery(key, findUser, config);
}