const {Client} = require('@notionhq/client')
const axios = require('axios');
const { create } = require('domain');

const notion = new Client({auth:process.env.NOTION_API_KEY})
const url = 'https://pokeapi.co/api/v2/pokemon/2'

const pokeArray=[];

const getData = async()=>{
  await axios.get(url)
    .then((poke)=>{
       const pokeData = {
        "name": poke.data.species.name,
        "number":poke.data.id,
        "hp" :poke.data.stats[0].base_stat,
        "height":poke.data.height,
        "weight":poke.data.weight,
        "attack":poke.data.stats[1].base_stat,
        "defense":poke.data.stats[2].base_stat,
        "special-attack":poke.data.stats[3].base_stat,
        "special-defense":poke.data.stats[4].base_stat,
        "speed":poke.data.stats[5].base_stat,
       }
       
       pokeArray.push(pokeData);
       console.log(`Fetching ${pokeData.name} from PokeAPI`);
       console.log(pokeData);
    })
    .catch((error)=>{
        console.log(error);
    })

    //createNotionPage();
}




const createNotionPage = async()=>{
   
    pokeArray.map((pokemon)=>{
        console.log("Sending Data to Notion");
        const response =notion.pages.create({

       
            "parent":{
                "type":"databse_id",
                "database_id":process.env.NOTION_DATABASE_ID
            },
            "properties":{
                "Name":{
                    "title":[
                        {
                            "type": "text",
                            "text": {
                                "content": pokemon.name
                            }
                        }
                    ]
                },
                "No":{
                    "number": pokemon.number
                },
                "HP":{
                    "number": pokemon.hp
                },
                "Attack":{
                    "number": pokemon.attack
                },
                "Defense":{
                    "number": pokemon.hp
                },
                "Sp. Attack":{
                    "number": pokemon['special-attack']
                },
                "Sp. Defense":{
                    "number": pokemon['special-defense']
                },
                "Spped":{
                    "number": pokemon.speed
                },
                "Height":{
                    "number": pokemon.height
                },
                "Weight":{
                    "number": pokemon.weight
                }

            }
        })
        console.log(response);
    })
}

getData();
