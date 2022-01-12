//overview - profile information appeares here //
const overview = document.querySelector(".overview");

const username = "jwyc"

const getData = async function(){
   const res = await fetch(`https://api.github.com/users/${username}`);
   const data = await res.json();
   console.log(data);
};

getData();