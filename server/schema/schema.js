const graphql = require('graphql');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID,
    GraphQLInt,
    GraphQLList 
} = graphql;

const campaigns = [
    {
        id: "1",
        name: "Starter Campaign",
        currentAdventure: "Level 1"
    }
]


const CampainType = new GraphQLObjectType({
    name: 'campaign',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type : GraphQLString },
        currentAdventure: { type: GraphQLString },
        characters: { type: GraphQLList(CharacterType) }
    })
});

const CharacterType = new GraphQLObjectType({
    name: 'character',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        class: { type: GraphQLString},
        gold: { type: GraphQLInt},
        campaignId: {type: GraphQLID}
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