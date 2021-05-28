const graphql = require('graphql');

const { 
    GraphQLSchema,
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList 
} = graphql;


//dummy data
const campaigns = [
    {
        id: "1",
        name: "Starter Campaign",
        currentAdventure: "Level 1"
    }
]

const characters = [
    {
        id: 1,
        name: "Barbar",
        class: "Barbarian",
        creator: "default"
    }
]


const CampaignType = new GraphQLObjectType({
    name: 'campaign',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type : GraphQLString },
        currentAdventure: { type: GraphQLString },
        characters: { 
            type: new GraphQLList(CharacterType),
            resolve(campaign, args) {
                return characters.filter(char => char.creator === 'default' || char.creator === campaign.id)
            } 
        }
    })
});

const CharacterType = new GraphQLObjectType({
    name: 'character',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        class: { type: GraphQLString},
        gold: { type: GraphQLInt},
        creator : { type: GraphQLString }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type : GraphQLString },
        name : { type : GraphQLString },
        genre: { type : GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        campaign: {
            type: CampaignType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return campaigns.find(campaign => campaign.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});