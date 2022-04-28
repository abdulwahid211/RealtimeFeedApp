export const typeDefs = `
input TeamInput {
    id: Int
    name: String
    points: Int
}
type Team {
    id: Int
    name: String
    points: Int
}
type Mutation {
    createTeam(input: TeamInput): Team
    updateTeam(input: TeamInput): Team
}
type Query {
    getTeam(id: Int): Team
    getAllTeams: [Team!]
}
type TeamSubscriptionMutation {
    results: [Team!]
}

type TeamSubscriptionQuery {
    results: [Team!]
}
type Subscription {
    Team: TeamSubscriptionMutation!
    getAllTeams: TeamSubscriptionQuery
}
`;