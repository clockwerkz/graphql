const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


const campaigns = [
    {
        id: '1',
        name: "Starter Campaign",
        currentAdventure: "Level 1"
    },
    {
        id: '2',
        name: "Starter Campaign - Part 2",
        currentAdventure: "Level 2"
    }
]

const characters = [
    {
        id: '1',
        name: "Barbar",
        class: "Barbarian",
        gold: 34
    },
    {
        id: '2',
        name: "Germ",
        class: "Wizard",
        gold: 34,
        creator: '2'
    }
]

const items = [
    {
        id: '1',
        name: 'Short sword',
        sellPrice: 10,
    },
    {
        id: '2',
        name: 'Health Potion',
        sellPrice: 5,
        campaign: '1'
    }
]

const ItemType = new GraphQLObjectType({
    name: 'item',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type : GraphQLString },
        sellPrice: { type: GraphQLInt },
        campaign: { type: GraphQLID }
    })
})

const CampaignType = new GraphQLObjectType({
    name: 'campaign',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type : GraphQLString },
        currentAdventure: { type: GraphQLString },
        characters: {
            type: new GraphQLList(CharacterType),
            resolve(campaign, args) {
                return characters.filter(char => !char.creator || char.creator === campaign.id)
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
        creator : { type: GraphQLID },
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        campaign: {
            type: CampaignType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // code to get data from db / other source
                return campaigns.find(campaign => campaign.id === args.id)
            }
        },
        character: {
            type: CharacterType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return characters.find(char => char.id === args)
            }
        }
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery
});
