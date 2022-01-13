//overview - profile information appeares here //
const overview = document.querySelector(".overview");

const username = "jwyc"

const getData = async function(){
   const res = await fetch(`https://api.github.com/users/${username}`);
   const data = await res.json();
   console.log(data);
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






