export const typeDefs = `
input CarInput {
    id: Int!
    name: String!
    description: String!
    value: Int!
}
type Car {
    id: Int!
    name: String!
    description: String!
    value: Int!
}
type Mutation {
    createCar(input: CarInput): Car!
    updateCar(input: CarInput): Car!
}
type Query {
    getCar(id: Int): Car!
    getCars: [Car!]!
}
type CarSubscriptionMutation {
    mutation: String!
    data: Car!
}

type CarSubscriptionQuery {
    query: String!
    data: [Car!]!
}
type Subscription {
    car: CarSubscriptionMutation!
    getCars: CarSubscriptionQuery
}

`;