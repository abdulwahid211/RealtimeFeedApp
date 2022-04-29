import * as Teams from "../data/jsonData.json"
import { PubSub } from 'graphql-yoga'
const pubsub = new PubSub()
export const resolvers = {
    Query: {
        getTeam(parent: any, args: any) {

            const id = parseInt(args.id, 10);
            let Team = Teams[0];

            for (var i = 0; i < Teams.length; i++) {

                if (id == Teams[i].id) {
                    Team = Teams[i];
                }
            }
            if (Team.id == id) {
                return Team;
            } else {
                throw ("No Team was found")
            }
        },
        getAllTeams() {

            pubsub.publish('getAllTeams', {
                getAllTeams: {
                    results: Teams
                }
            })

            return Teams

        }
    },
    Mutation: {
        createTeam(parent: any, args: any) {
            const newTeam = { ...args.input };
            if (newTeam != undefined) {
                Teams.push({ ...args.input });
            }

            pubsub.publish('Team', {
                Team: {
                    results: Teams
                }
            })

            return newTeam;
        },
        updateTeam(parent: any, args: any) {
            const Team = { ...args.input };

            for (var i = 0; i < Teams.length; i++) {
                if (Team.id == Teams[i].id) {
                    Teams[i].name = Team.name;
                    Teams[i].points = Team.points;
                }
            }

            pubsub.publish('Team', {
                Team: {
                    results: Teams
                }
            })

            return Teams;
        }
    },
    Subscription: {
        Team: {
            subscribe(parent: any, args: any) {
                return pubsub.asyncIterator('Team')
            }

        },
        getAllTeams: {
            subscribe(parent: any, args: any) {
                return pubsub.asyncIterator('getAllTeams')
            }
        }
    }
}