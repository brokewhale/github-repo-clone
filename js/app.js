const misc = window.atob(
  "ZWZiM2RmMzRlMGZiZWZmMDczZGE0MDQ4M2JlYmEwOGFmNGM1NTM5NA=="
);
const queryFetch = (query) => {
  return fetch("https://api.github.com/graphql", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      authorization: `token ${misc}`,
    },
    body: JSON.stringify({
      query: query,
    }),
  }).then((res) => res.json());
};

queryFetch(
  `
  {
    
    viewer {
      login
      name
      avatarUrl
      websiteUrl
    }
      
      
  }`
)
  .then((data) => {
    const userDetails = data.data.viewer;
    return userDetails;
  })
  .then((userDetails) => {
    document.getElementById("top_infoid").innerHTML += `${userTemplate(
      userDetails.avatarUrl,
      userDetails.name,
      userDetails.login,
      userDetails.websiteUrl
    )}`;
    sticknav();
  });

let test = "";

queryFetch(
  `
  query MyQuery {
    user(login: "codingmage") {
      repositories(last: 20, isFork: false) {
        nodes {
          name
          description
          forkCount
          isPrivate
          url
          updatedAt
          languages(orderBy: {field: SIZE, direction: DESC}, first: 1) {
              nodes {
                color
                name
              }
            }
        }
      }
    }
  }

  `
)
  .then((data) => {
    const myRepos = data.data.user.repositories.nodes;
    return myRepos;
  })
  .then((myRepos) => {
    document.getElementById("repolist").innerHTML = `
  ${myRepos
    .map((myRepo) =>
      repoTemplate(
        myRepo.name,
        myRepo.description,
        myRepo.updatedAt,
        myRepo.url,
        myRepo.languages.nodes,
        myRepo.forkCount
      )
    )
    .join("")}
 `;
  });

//UI TEMPLATES
function userTemplate(avatarUrl, name, login, websiteUrl) {
  return `
      
      <h3 id="testheader" class='headertest'>
      <span class="small-img">

          <img src="./img/small.jpeg" alt="">
      </span>
      <span class="small-name">codingmage</span>
  </h3>
 
    <div  class="top_info">
      <div class="user_img">
         <img src="${avatarUrl}" alt="avartar">

         <div class="status-anime">
         <div class="emoji-container">
             <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16"
                 aria-hidden="true">
                 <path fill-rule="evenodd"
                     d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z">
                 </path>
             </svg>

         </div>
         <span>Set Status</span>
     </div>
     </div>
     <div id="userinfo" class="user_info">
        <h2>${name}</h2>
        <p >${login}</p>
      </div>
   </div>

  <div class="setstatus">
      <svg class="octicon octicon-smiley" viewBox="0 0 16 16" version="1.1" width="16" height="16"
          aria-hidden="true">
          <path fill-rule="evenodd"
              d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM8 0a8 8 0 100 16A8 8 0 008 0zM5 8a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zM5.32 9.636a.75.75 0 011.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 111.222.87l-.614-.431c.614.43.614.431.613.431v.001l-.001.002-.002.003-.005.007-.014.019a1.984 1.984 0 01-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.32 3.32 0 01-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 01.183-1.044h.001z">
          </path>
      </svg>

      <span>Set status</span>
  </div>

  <div class="editprofile">
      <button>Edit profile</button>
  </div>

  <div id="navbarlogin" class="website">
      <svg class="octicon octicon-link" viewBox="0 0 16 16" version="1.1" width="16" height="16"
          aria-hidden="true">
          <path fill-rule="evenodd"
              d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z">
          </path>
      </svg>

      <a class="website_link " href="${websiteUrl}">${websiteUrl}
      </a>
  </div>
      
      `;
}

function repoTemplate(
  name,
  description,
  updatedAt,
  url,
  languagearray,
  forkCount
) {
  return `
            
            <div class="repo-container flex">
            <div class="repo-container_left">
                <div class="repo-top">
                    <h3 class="repo-text">
                        <a href="${url}">${name}</a>
                    </h3>
                </div>
                <div class="forkfrom">
                    Forked from <a href="#">codingmage.com</a>
                </div>
                <div class="repo-des">

                    <p class="repo-details">
                    ${description ? description : ""}
                    </p>
                </div>
         
                <div class="repo-bottom">

                ${languagearray.map((language) => {
                  return `
                    <div class="repo-language">
                    <span class="repo-language-color" style="background-color: ${language.color}"></span>
                    <span class="repo-language-stack">${language.name}</span>
                  </div>
                    `;
                })}
                


                    ${
                      forkCount
                        ? `
                      <a href="#" class="fork">
                        <svg aria-label="fork" class="octicon octicon-repo-forked" viewBox="0 0 16 16"
                            version="1.1" width="16" height="16" role="img">
                            <path fill-rule="evenodd"
                                d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                            </path>
                        </svg>
                        ${forkCount}
                    </a>
                      `
                        : ""
                    }
                    Updated on ${dateTimeFormat(updatedAt)}
                </div>
            </div>

            <div class="repo-container_right">
                <div class="btn-con">

                    <button class="repo_star_button">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                            height="16" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>Star
                    </button>
                </div>


            </div>
        </div>


            `;
}

//STICKY HEADER IMAGE AND LOGIN
const sticknav = () => {
  window.onscroll = function () {
    myFunction();
    myFunction2();
  };

  // Get the navbar
  var navbarlogin = document.getElementById("navbarlogin");
  var tret = document.querySelector(".headertest");
  var eee = document.querySelector(".user_info");
  var userinfo = document.getElementById("userinfo");

  // Get the offset position of the navbar
  var sticky = navbarlogin.offsetTop;
  var userinfo = navbarlogin.offsetTop;

  function myFunction2() {
    if (window.pageYOffset >= userinfo) {
      eee.classList.add("commot");
    } else {
    }
  }

  // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  function myFunction() {
    if (window.pageYOffset >= sticky) {
      tret.classList.add("sticky");
    } else {
      tret.classList.remove("sticky");
    }
  }
};

//DATE FORMAT

function dateTimeFormat(date) {
  const d = new Date(date);
  const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  return `${day} ${month} ${year}`;
}
