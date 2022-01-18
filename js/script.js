//overview - profile information appeares here //
const overview = document.querySelector(".overview");
//repoList - where list of each repo appears //
const repoList = document.querySelector(".repo-list");
//repoSect - section where all repo information shows //
const repoSect = document.querySelector(".repos");
//individualRepo - selects where each repo's data appears //
const individualRepo = document.querySelector(".repo-data");

const username = "jwyc"

const getData = async function(){
   const res = await fetch(`https://api.github.com/users/${username}`);
   const data = await res.json();
   //dconsole.log(data);
   userProfileInfo(data);

};

getData();

const userProfileInfo = function(data){
   let profileDiv= document.createElement("div");
   profileDiv.classList.add("user-info");
   profileDiv.innerHTML =`   
   <figure>
      <img alt="user avatar" src=${data.avatar_url} />
   </figure>
   <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
   </div>`

   overview.append(profileDiv);
   
};

const listingRepos = async function(){
   const repoInfoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=99`);
   const repos = await repoInfoRes.json();
   //console.log("hello");
   console.log(repos);
   //console.log("goodbye");
   displayRepo(repos);
};
listingRepos();

const displayRepo = function(repos){
   for (const repo of repos){
      let listItem = document.createElement("li");
      listItem.classList.add("repo");
      listItem.innerHTML=`<h3>${repo.name}</h3>`;
      repoList.append(listItem);
      //console.log(` hello ${repo.name}`);
   }
};

repoList.addEventListener("click", function(e){
   if(e.target.matches("h3")){
   const repoName = e.target.innerText;
   //console.log(`${repoName}`);
   individualRepoData(repoName);
   }
});

const individualRepoData = async function(repoName){
   const res2 = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
   const repoInfo = await res2.json();
   
   console.log(repoInfo);
//this code does go into the object of the object  and isn't dynamic (has to hard code /laguages to displays an array of languages. 

  /*const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
   //console.log(fetchLanguages);
   const languageData = await fetchLanguages.json();
   console.log(languageData);*/

// Originally this didn't work because it is missing the await fetch to wait for the api request. 
   /*const fetchLanguages = repoInfo.languages_url;
   //retruns https://api.github.com/repos/JWYC/random-image-generator/languages in console//
   const languageData = await fetchLanguages.json();
   console.log(languageData)*/

// Working Answer // - note the await fetch that always surrounds the api URL and is needed for storing of the variable. this is an additional call so you need to wait a second time. 
  const fetchLanguages = await fetch (repoInfo.languages_url)
   //console.log(fetchLanguages);
   const languageData = await fetchLanguages.json();
   //console.log(languageData);

   console.log(` This is languageData ${languageData}`);

/// runs through key value pairs from language Data which is the fetchedLanguages - then loops and displays each language /// note: you don't need the for of loop you aren't looking at multiple arrays but an object with an array.
   
const languages = []

   //for (let item of languageData ){
      for (let item in languageData){
         console.log(`${item}`);
         languages.push(item);
      }
   //}
      console.log(languages);
};