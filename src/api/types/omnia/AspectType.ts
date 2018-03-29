import {
    GraphQLFieldConfigMap, GraphQLObjectType, GraphQLString, GraphQLList
} from "graphql";

import { GraphQLContext } from "../../../lib/graphql";
import { Aspect } from "../../models/omnia/Aspect";
import { PropertyType } from "./PropertyType";

const AspectFields: GraphQLFieldConfigMap<any, any> = {
    namespace: {
        type: GraphQLString,
        description: "The namespace of this aspect",
    },
    key: {
        type: GraphQLString,
        description: "The key of the aspect.",
    },
    name: {
        type: GraphQLString,
        description: "The name of the aspect.",
    },
    description: {
        type: GraphQLString,
        description: "Briefly describe this aspect.",
    },
};

export const PropertyOwnerType = new GraphQLObjectType({
    name: "PropertyOwner",
    description: "The owner of a property",
    fields: () => ({ ...AspectFields }),
});

export const AspectType = new GraphQLObjectType({
    name: "Aspect",
    description: "An aspect.",
    fields: () => ({
        ...AspectFields, ...{
            properties: {
                type: new GraphQLList(PropertyType),
                description: "Properties owned by this aspect.",
                resolve: async (aspect: Aspect, args: any, context: GraphQLContext<any, any>) => {
                    context.dataLoaders.propertiesByAspectKey.load(aspect.key);
                },
            },
        },
    }),
});
