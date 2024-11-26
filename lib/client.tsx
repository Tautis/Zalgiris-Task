import { ApolloClient, InMemoryCache,gql} from '@apollo/client';

const client = new ApolloClient({
    uri:'https://nbaapi.com/graphql/',
    cache: new InMemoryCache(),
  });

export const GET_TEAMS = gql`
  query GetTeams($first: Int, $limit: Int, $season: Int) { 
    team(first: $first, limit: $limit, season: $season) { 
      teamName
      teamAbbr 
      season 
      finish 
      id 
    }
    allTeams: team {
      id
      season
  }
  }
`;

export const GET_TEAM_AND_PLAYER = gql`
query MyQuery($season: Int, $teamAbbr: String) {
team(season: $season, teamAbbr: $teamAbbr) {
    wins
    loss
    coaches
    topWsPlayer
    teamName
}
playerTotals(team: $teamAbbr, season: $season) {
    playerName
    position
    age
    threePercent
    assists
    totalRb
    points
    steals
}
}
`;

export const GET_TEAM_ENTRIES = gql`
query MyQuery{
  team{
  id
  }
}
`;
  export default client;
  