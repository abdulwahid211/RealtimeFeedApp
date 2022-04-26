import { default as Cars } from "../data/jsonData.json"

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
        getCars() { return Cars }
    },
    Mutation:{
        createCar(parent: any, args: any){
            console.log("Output: ")
            const car = { ...args.input};
            console.log("Output: "+car.description)
             Cars.push(car);
            return car;
        }
    }
}