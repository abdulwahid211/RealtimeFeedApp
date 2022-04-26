export const typeDefs = `
input CarInput {
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
    createCar(input: CarInput): Car
    updateCar(id: Int!, input: CarInput): Car
}
type Query {
    getCar(id: Int): Car
    getCars: [Car]
}
type Subscription {
    getCars: [Car]
}
`;