const dummy = (blogs) => {
    return 1;
  }
// tyhjä lista palauttaa nolla
// yhden blogin sisältävän listan yhteistykkäykset vastaavat kyseisen blogin tykkäysten määrää
// erään isomman blogilistan tykkäykset lasketaan oikein
const totalLikes = (blogs) => {
    if(blogs.length === 0){
        return 0
    }
    else{
        let allLikes = 0
        for(i = 0; i < blogs.length; i++){
            allLikes = allLikes + blogs[i].likes
        }

        return allLikes
    }
}

  module.exports = {
    dummy,
    totalLikes
  }