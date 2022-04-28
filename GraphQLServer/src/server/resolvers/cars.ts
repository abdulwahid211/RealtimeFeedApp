import * as Cars from "../data/jsonData.json"
import { PubSub } from 'graphql-yoga'
const pubsub = new PubSub()
export const resolvers = {
    Query: {
        getCar(parent: any, args: any) {

            const id = parseInt(args.id, 10);
            let car = Cars[0];

            for (var i = 0; i < Cars.length; i++) {

                if (id == Cars[i].id) {
                    car = Cars[i];
                }
            }
            if (car.id == id) {
                return car;
            } else {
                throw ("No Car is found")
            }
        },
        getCars() {

            pubsub.publish('getCars', {
                getCars: {
                    query: 'getCars',
                    data: Cars
                }
            })

            return Cars

        }
    },
    Mutation: {
        createCar(parent: any, args: any) {
            const car = { ...args.input };
            if (car != undefined) {
                Cars.push({ ...args.input });
            }

            pubsub.publish('car', {
                car: {
                    mutation: 'Added',
                    data: car
                }
            })

            return car;
        },
        updateCar(parent: any, args: any) {
            const car = { ...args.input };

            for (var i = 0; i < Cars.length; i++) {
                if (car.id == Cars[i].id) {
                    Cars[i].name = car.name;
                    Cars[i].description = car.description;
                    Cars[i].value = car.value;
                }
            }

            pubsub.publish('car', {
                car: {
                    mutation: 'Updated',
                    data: car
                }
            })

            return car;
        }
    },
    Subscription: {
        car: {
            subscribe(parent: any, args: any) {
                return pubsub.asyncIterator('car')
            }

        },
        getCars: {
            subscribe(parent: any, args: any) {
                return pubsub.asyncIterator('getCars')
            }
        }
    }
}