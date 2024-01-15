const {Client} = require('@notionhq/client')
const axios = require('axios');
require('dotenv').config();


const notion = new Client({auth:process.env.NOTION_API_KEY})


const pokeArray=[];
const addData = async()=>{
    for(let i = 2; i<25 ;i++){
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`
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
       //console.log(pokeData);
    })
    .catch((error)=>{
        console.log(error);
    })
    }

  }

  const createNotionPage = async()=>{
   

    pokeArray.map((pokemon)=>{
        console.log("Sending Data to Notion");
        try{
            const response =notion.pages.create({

       
                "parent":{
                    "type":"database_id",
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
                        "number": pokemon.defense
                    },
                    "Sp. Attack":{
                        "number": pokemon['special-attack']
                    },
                    "Sp. Defense":{
                        "number": pokemon['special-defense']
                    },
                    "Speed":{
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
    }catch(error){
        console.error("Error creating Notion page:", error);
    }
    })

}

const getData = async()=>{
 
   await addData();
    createNotionPage();
}






getData();
